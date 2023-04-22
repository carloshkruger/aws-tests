export const handler = async (event) => {
  for (const record of event.Records) {
    console.log(JSON.stringify(record, null, 2));
  }
};
