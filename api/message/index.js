// const redis = require("redis");
// import {redis} from "redis";
var _ = require('lodash');

module.exports = async function (context, req) {

    let res = '';

    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        let a = _.split('abc,lkf');
    a.forEach(x=> {
     res+= x + ' ';
    })
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage + res
    };
}

// // const redis = require("redis");
// // const KeyVault = require('azure-keyvault');
// // const AuthenticationContext = require('adal-node').AuthenticationContext;
// // const { SecretClient } = require("@azure/keyvault-secrets");
// // const { DefaultAzureCredential } = require("@azure/identity");


// module.exports = async function (context, req) {

//     // "CLIENT_ID": "bde97303-422c-4a8f-8d8b-02782f78510d",
//     // "CLIENT_SECERET": "1qa8Q~z6eCoyjKsJHFkod9RXamfJWx_qQ7WfobMo",
//     // "VAULT_URI": "https://sa-testkeyvault-demo.vault.azure.net/"

//     // const authenticator = function(challenge, callback) {

//     //     // Create a new authentication context.
//     //     const context = new AuthenticationContext(challenge.authorization);
    
//     //     // Use the context to acquire an authentication token.
//     //     return context.acquireTokenWithClientCredentials(challenge.resource, "bde97303-422c-4a8f-8d8b-02782f78510d", "1qa8Q~z6eCoyjKsJHFkod9RXamfJWx_qQ7WfobMo", function(err, tokenResponse) {
//     //         if (err) throw err;
//     //         // Calculate the value to be set in the request's Authorization header and resume the call.
//     //         const authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
//     //         return callback(null, authorizationValue);
//     //     });
//     // }
    
//     // let result = '';
//     // const credentials = new KeyVault.KeyVaultCredentials(authenticator);
//     // const client = new KeyVault.KeyVaultClient(credentials);

//     // let res = await client.getSecret(process.env.VAULT_URI, 'redis-connection-string', '');
//     // context.log('Result for the connection string is => ' , process.env.CLIENT_ID, process.env.CLIENT_SECERET);
//     // result = res.id;

//     // const cacheHostName = res.value.split(':')[0]; // redis host name
//     // let temp = res.value.split(',')[1];    
//     // const cachePassword = temp.substring(temp.indexOf('=') + 1, temp.length); // secret

//     // const cacheConnection = redis.createClient({
//     //     // rediss for TLS
//     //     url: "rediss://" + cacheHostName + ":6380",
//     //     password: cachePassword,
//     // });

//     // await cacheConnection.connect();

//     // // context.log("\nCache command: SET Message");
//     // context.log("Cache response : " + await cacheConnection.set("Message",
//     //     "Hello! The cache is updated from Node.js!",{
//     //         EX: 300
//     // }));

//     // // Simple get and put of integral data types into the cache
//     // context.log("\nCache command: GET Message");
//     // result = await cacheConnection.get("Message");
//     // context.log("Cache response : " + result);

//     // return Promise.resolve({
//     //     text: "Hello from the API connection string " + result
//     // })



//     // context.res.json({
//     //     text: "Hello from the API ippppppppppppppppp"
//     // });

//     return ";lllllllllll"
// };