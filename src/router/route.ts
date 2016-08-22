import {RouteMethod} from "./route.method";
import {PathUtil} from "./path.util";
import {Router} from "./router";
import {IRouteHandler} from "./route.handler";
import {HttpMethod} from "./http.method";

export class Route {
  public subRoutes: Route[];
  public methods: { [method: string]: RouteMethod };

  constructor(public path: string) {
    this.subRoutes = [];
    this.methods = {};
  }

  addMethod(path: string, methods: HttpMethod[], handler: IRouteHandler) {
    let parts = PathUtil.getParts(path);

    if(parts.length === 0) {
      for(let method of methods) {
        this.methods[method] = new RouteMethod(methods, handler);
      }
    } else {
      let route = new Route(parts[0]);
      route.addMethod(PathUtil.combineParts(...parts.splice(1, 0)), methods, handler);
      this.subRoutes.push(route);
    }
  }

  addRouter(path: string, router: Router) {
    let parts = PathUtil.getParts(path);

    if(parts.length === 0) {
      this.subRoutes.push(...router.route.subRoutes);
      for(let method in router.route.methods) {
        this.methods[method] = router.route.methods[method];
      }
    } else {
      let route = new Route(parts[0]);
      route.addRouter(PathUtil.combineParts(...parts.splice(1, 0)), router);
      this.subRoutes.push(route);
    }
  }
}