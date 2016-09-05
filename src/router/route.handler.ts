import {ILambdaContext} from "../aws/lambda/context";
import {ILambdaCallback} from "../aws/lambda/callback";
import * as Promise from "bluebird";

export interface IRouteHandler {
  (request: IRouteRequest, callback: IRouteCallback): void | Promise<any>;
}

export interface IRouteRequest {
  //db: Database;
  event: any;
  context: IRouteContext;
}

export interface IRouteContext extends ILambdaContext {

}

export interface IRouteCallback extends ILambdaCallback {
}