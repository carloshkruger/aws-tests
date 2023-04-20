export const handler = async (event) => {
  throw new Error("test");
  try {
    for (const record of event.Records) {
      console.log(record);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
