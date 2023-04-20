#!/bin/bash
for i in {1..100}
do
  KINESIS_BASE64_DATA=$(echo -ne "Hello, this is a test." | base64);

  aws kinesis put-record --stream-name TestStream --partition-key 1 --data $KINESIS_BASE64_DATA --no-cli-pager &
  # The & at the end of the above command will put the execution in the background
done

# will wait until all executions in background are completed
wait
echo "All done"