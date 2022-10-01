const redis = require("redis");
const KeyVault = require('azure-keyvault');
const AuthenticationContext = require('adal-node').AuthenticationContext;

const authenticator = function(challenge, callback) {

    // Create a new authentication context.
    const context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, process.env.CLIENT_ID, process.env.CLIENT_SECERET, function(err, tokenResponse) {
        if (err) throw err;
        // Calculate the value to be set in the request's Authorization header and resume the call.
        const authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
        return callback(null, authorizationValue);
    });
};


module.exports = async function (context, req) {
    
    let result = '';
    const credentials = new KeyVault.KeyVaultCredentials(authenticator);
    const client = new KeyVault.KeyVaultClient(credentials);

    let res = await client.getSecret(process.env.VAULT_URI, 'redis-connection-string', '');
    context.log('Result for the connection string is => ' , process.env.CLIENT_ID, process.env.CLIENT_SECERET);
    result = res.id;

    const cacheHostName = res.value.split(':')[0]; // redis host name
    let temp = res.value.split(',')[1];    
    const cachePassword = temp.substring(temp.indexOf('=') + 1, temp.length); // secret

    const cacheConnection = redis.createClient({
        // rediss for TLS
        url: "rediss://" + cacheHostName + ":6380",
        password: cachePassword,
    });

    await cacheConnection.connect();

    // context.log("\nCache command: SET Message");
    context.log("Cache response : " + await cacheConnection.set("Message",
        "Hello! The cache is updated from Node.js!",{
            EX: 300
    }));

    // Simple get and put of integral data types into the cache
    context.log("\nCache command: GET Message");
    context.log("Cache response : " + await cacheConnection.get("Message"));

    return Promise.resolve({
        text: "Hello from the API connection string "
    })


};