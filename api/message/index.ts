import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { createClient} from "redis";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    const client = createClient({
        url: 'rediss://sa-ui-service.redis.cache.windows.net:6380',
        password: "ABSOcdj5SHhLIwAx8WLmfxIb6O5Oyx42UAzCaCabdxc="
    });
    
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    
    await client.set('Message', 'The Message is set from Azure Function Redis call ...', {
        EX: 3000
    });
    
    const value = await client.get('Message');

    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        status: 200,
        body: {
            data: value
        }
    };
};

export default httpTrigger;