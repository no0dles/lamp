export interface ILambdaContext {
  functionName: string;
  functionVersion: string;
  invokeid: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  getRemainingTimeInMillis(): number;
}