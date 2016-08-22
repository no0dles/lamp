export class PathUtil {
  static getParts(path: string) {
    if(!path) return [];

    return path
      .split("/")
      .filter(part => part && part.length > 0);
  }

  static combineParts(...parts: string[]) {
    return parts
      .filter(part => part && part.length > 0)
      .map(part => {
        if(part[0] === "/") {
          return part.substr(1);
        }
        return part;
      })
      .join("/");
  }
}