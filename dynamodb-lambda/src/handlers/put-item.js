import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const putItemHandler = async (event) => {
  console.info("received:", event);

  const { artist, songTitle, albumTitle, awards } = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Item: {
      Artist: artist,
      SongTitle: songTitle,
      AlbumTitle: albumTitle,
      Awards: awards,
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
