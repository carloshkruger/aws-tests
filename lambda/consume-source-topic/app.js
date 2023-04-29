let count = 0;

export const lambdaHandler = async (event, context) => {
  count++;
  if (count % 2 === 0) {
    throw new Error("Test");
  }

  return {};
};
