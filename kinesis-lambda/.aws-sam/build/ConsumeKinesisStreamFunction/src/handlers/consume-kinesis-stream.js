export const handler = async (event) => {
  for (const record of event.Records) {
    console.log(record);
    const payload = Buffer.from(record.kinesis.data, "base64").toString(
      "ascii"
    );
    console.log("Decoded payload:", payload);
  }
};
