# kinesis-lambda

This project is used to practice the creation of integration between Kinesis Data Stream and Lambda. All the infrastructure is created using AWS SAM.

# Using the AWS CLI for testing

```bash
KINESIS_BASE64_DATA=$(echo -ne "Hello, this is a test." | base64);

aws kinesis put-record --stream-name TestStream --partition-key 1 --data $KINESIS_BASE64_DATA
```
