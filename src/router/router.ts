import {Route} from "./route";
import {HttpMethod} from "./http.method";
import {IRouteHandler} from "./route.handler";

export class Router {
  public route: Route;

  constructor() {
    this.route = new Route("");
  }

  use(path: string, router: Router) {
    this.route.addRouter(path, router);
  }

  method(path: string, methods: HttpMethod[], handler: IRouteHandler) {
    this.route.addMethod(path, methods, handler);
  }

  all(path: string, handler: IRouteHandler) {
    this.method(path, ["GET", "POST", "DELETE", "PUT", "DELETE", "HEAD", "OPTIONS"], handler);
  }

  get(path: string, handler: IRouteHandler) {
    this.method(path, ["GET"], handler);
  }

  post(path: string, handler: IRouteHandler) {
    this.method(path, ["POST"], handler);
  }

  delete(path: string, handler: IRouteHandler) {
    this.method(path, ["DELETE"], handler);
  }

  put(path: string, handler: IRouteHandler) {
    this.method(path, ["PUT"], handler);
  }

  head(path: string, handler: IRouteHandler) {
    this.method(path, ["HEAD"], handler);
  }

  options(path: string, handler: IRouteHandler) {
    this.method(path, ["OPTIONS"], handler);
  }
}