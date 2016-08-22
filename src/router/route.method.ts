import {IRouteHandler} from "./route.handler";

export class RouteMethod {
  constructor(public methods: string[],
              public handler: IRouteHandler) {

  }
}