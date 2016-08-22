import {PathUtil} from "./path.util";
import {HttpMethod} from "./http.method";
import * as path from "path";

export class BuildUtil {
  static getName(url: string, method: HttpMethod) {
    return ["app", ...PathUtil.getParts(url), method]
      .filter(part => part && part.length > 0)
      .join("-");
  }

  static getBundleName(url: string, method: HttpMethod) {
    return `${this.getName(url, method)}-bundle.js`;
  }

  static getLauncherName(url: string, method: HttpMethod) {
    return `${this.getName(url, method)}-launcher.js`;
  }

  static getWrapperName(url: string, method: HttpMethod) {
    return `${this.getName(url, method)}-wrapper.js`;
  }

  static getZipName(url: string, method: HttpMethod) {
    return `${this.getName(url, method)}.zip`;
  }

  static getBuildDirectory() {
    return path.join(process.cwd(), "tmp");
  }
}