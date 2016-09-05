import {Lamb} from "./src/lamb";
import {Router} from "./src/router/router";
import {Mock} from "./src/testing/mock";

var builder: {
  (): Lamb;
  Router: { new(): Router };
  Mock: { new(): Mock }
};

builder = (() => {
  var fn : any = () => new Lamb();
  fn.Router = Router;
  fn.Mock = Mock;
  return fn;
})();

export = builder;