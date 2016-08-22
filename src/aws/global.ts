import {ILambdaContext} from "./lambda/context";
import {ILambdaCallback} from "./lambda/callback";

export module NodeJS {
  export interface Global {
    aws:{
      event: any,
      context: ILambdaContext,
      callback: ILambdaCallback
    }
  }
}

