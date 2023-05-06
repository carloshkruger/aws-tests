import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  console.info("received:", event);

  const artist = event.pathParameters.artist;
  console.log({ artist });

  const params = {
    TableName: tableName,
    ProjectionExpression: "songTitle",
    KeyConditionExpression: "artist = :artist",
    ExpressionAttributeValues: {
      ":artist": artist,
    },
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));

    console.log(JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
