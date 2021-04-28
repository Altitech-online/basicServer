import AWS from 'aws-sdk';
import config from '../config';

const {AWS_REGION} = config.get();

const client = new AWS.DynamoDB.DocumentClient({region: AWS_REGION});

export const getItem = async (key, table) => {
    try {
        const command = {
            TableName: table,
            Key: key
        };
        const result = await client.get(command).promise();
        return result.Item
    } catch(e) {
        console.log(e)
    }
}

export const putItem = async (item, table) => {
    try {
        const command = {
            TableName: table,
            Item: item,
        };
        await client.put(command).promise();
    } catch(e) {
        console.log(e)
    }
}
