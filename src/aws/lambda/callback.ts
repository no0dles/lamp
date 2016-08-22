export interface ILambdaCallback {
  (err: Error);
  (err: Error, data: any);
}