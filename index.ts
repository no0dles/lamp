import {Lamb} from "./src/lamb";
import {Router} from "./src/router/router";

var builder: {
  (): Lamb;
  Router: { new(): Router };
};

builder = (() => {
  var fn : any = () => new Lamb();
  fn.Router = Router;
  return fn;
})();

export = builder;