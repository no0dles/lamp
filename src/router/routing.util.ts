import {Route} from "./route";
import {HttpMethod} from "./http.method";
import {IRouteHandler} from "./route.handler";
import {PathUtil} from "./path.util";

export interface IRouteTreeNode {
  url: string;
  method: HttpMethod;
}

export class RoutingUtil {
  static getMatchingRoute(url: string, route: Route): Route {
    let parts = PathUtil.getParts(url);

    while(parts.length >= 0) {
      if(parts.length === 0) return route;

      for(let subRoute of route.subRoutes) {
        if(subRoute.path === parts[0]) {
          route = subRoute;
          parts = parts.splice(1);
          break;
        }
      }

      return null;
    }
  }

  static getRouteTree(route: Route, baseUrl?: string) {
    let nodes = new Array<IRouteTreeNode>();

    if(!baseUrl) baseUrl = "/";

    for(let method in route.methods) {
      nodes.push({ url: baseUrl, method: method as HttpMethod });
    }

    for(let subRoute of route.subRoutes) {
      nodes.push(...RoutingUtil.getRouteTree(subRoute, PathUtil.combineParts(baseUrl, subRoute.path)));
    }

    return nodes;
  }

  static getMatchingHandlers(method: HttpMethod, route: Route): IRouteHandler {
    return method in route.methods ? route.methods[method].handler : null;
  }
}