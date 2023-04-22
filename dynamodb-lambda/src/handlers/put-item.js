import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const putItemHandler = async (event) => {
  console.info("received:", event);

  const { artist, songTitle, albumTitle, awards } = JSON.parse(event.body);
  const dateToRemove = new Date();
  dateToRemove.setSeconds(dateToRemove.getSeconds() + 30);

  const params = {
    TableName: tableName,
    Item: {
      artist,
      songTitle,
      albumTitle,
      awards,
      dateToRemove: dateToRemove.getTime(),
    },
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
