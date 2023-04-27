import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import pg from "pg";

const secretName = process.env.DATABASE_SECRET_NAME;

const secretsManagerClient = new SecretsManagerClient({
  region: "us-east-1",
});

const secretsManagerResponse = await secretsManagerClient.send(
  new GetSecretValueCommand({
    SecretId: secretName,
    VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
  })
);

const secrets = JSON.parse(secretsManagerResponse.SecretString);

console.log({ secrets });

const client = new pg.Client({
  host: secrets.host,
  user: secrets.username,
  password: secrets.password,
  database: secrets.dbname,
  port: secrets.port,
  ssl: true,
});
await client.connect();
console.log("Connected");

export const lambdaHandler = async (event, context) => {
  try {
    // const { email, name } = JSON.parse(event.body);

    const result = await client.query("SELECT $1::text as message", [
      "Hello world!",
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: result.rows[0].message,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
