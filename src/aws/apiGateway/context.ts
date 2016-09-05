import {HttpMethod} from "../../router/http.method";

export interface IApiGatewayContext {
  "body-json": any;
  params: {
    path: any;
    querystring: any;
    header: any;
  }
  "stage-variables": any;
  context: {
    "account-id": string;
    "api-id": string;
    "api-key": string;
    "authorizer-principal-id": string;
    "caller": string;
    "cognito-authentication-provider": string;
    "cognito-authentication-type": string;
    "cognito-identity-id": string;
    "cognito-identity-pool-id": string;
    "http-method": HttpMethod;
    "stage": string;
    "source-ip": string;
    "user": string;
    "user-agent": string;
    "user-arn": string;
    "request-id": string;
    "resource-id": string;
    "resource-path": string;
  }
}




// {
//   "body-json":{
//
//   },
//   "params":{
//     "path":{
//       "myId":"12"
//     },
//     "querystring":{
//       "val":"test"
//     },
//     "header":{
//       "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//         "Accept-Encoding":"gzip, deflate, sdch, br",
//         "Accept-Language":"en-US,en;q=0.8,de;q=0.6",
//         "CloudFront-Forwarded-Proto":"https",
//         "CloudFront-Is-Desktop-Viewer":"true",
//         "CloudFront-Is-Mobile-Viewer":"false",
//         "CloudFront-Is-SmartTV-Viewer":"false",
//         "CloudFront-Is-Tablet-Viewer":"false",
//         "CloudFront-Viewer-Country":"CH",
//         "Host":"h7prkg3au8.execute-api.eu-west-1.amazonaws.com",
//         "Upgrade-Insecure-Requests":"1",
//         "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
//         "Via":"1.1 1d84a1245f218854f6a7e9ee9bc163d9.cloudfront.net (CloudFront)",
//         "X-Amz-Cf-Id":"onXY2Cu2L7iuOKyekAoy2BP8z_cTe7sh4E74WBwU0KlCQqjeszfSlg==",
//         "X-Forwarded-For":"212.51.147.142, 54.240.150.19",
//         "X-Forwarded-Port":"443",
//         "X-Forwarded-Proto":"https"
//     }
//   },
//   "stage-variables":{
//
//   },
//   "context":{
//     "account-id":"",
//       "api-id":"h7prkg3au8",
//       "api-key":"",
//       "authorizer-principal-id":"",
//       "caller":"",
//       "cognito-authentication-provider":"",
//       "cognito-authentication-type":"",
//       "cognito-identity-id":"",
//       "cognito-identity-pool-id":"",
//       "http-method":"GET",
//       "stage":"prod",
//       "source-ip":"212.51.147.142",
//       "user":"",
//       "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
//       "user-arn":"",
//       "request-id":"36040f40-6ecf-11e6-994d-87ac787422dd",
//       "resource-id":"5hda8s",
//       "resource-path":"/handler/{myId}"
//   }
// }}