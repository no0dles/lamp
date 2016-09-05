import "reflect-metadata";

function model(target: any) {
  var original = target;

  function construct(constructor, args) {
    var c : any = function () {
      return constructor.apply(this, args);
    };

    c.prototype = constructor.prototype;
    return new c();
  }

  var f : any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  };

  f.prototype = original.prototype;

  return f;
}

const typeMetadataKey = "type";
const requiredMetadataKey = "required";

function type(type: string) {
  return Reflect.metadata(typeMetadataKey, type);
}

function required(target : any, key : string) {
  console.log(target.constructor);
  return Reflect.defineMetadata(requiredMetadataKey, true, target, key);
}

function param(target : any, key : string) {
  let params = getParams(target);
  params.push(key);
  return Reflect.defineMetadata("param:list", params, target);
}


function getParams(target: any) {
  return Reflect.getMetadata("param:list", target) || [];
}

function getRequiredParams(target: any) {
  let params = getParams(target);
  let required = [];

  for(let param of params) {
    let req = isRequired(target, param);
    if(req) {
      required.push(param);
    }
  }

  return required;
}

function isRequired(target: any, propertyKey: string) {
  return Reflect.getMetadata(requiredMetadataKey, target, propertyKey);
}

function getType(target: any, propertyKey: string) {
  return Reflect.getMetadata(typeMetadataKey, target, propertyKey);
}


class Book {
  @param
  @required
  @type("string")
  id: string;

  @param
  name: string;
}

var book = new Book();

console.log("required:", isRequired(book, "id"));
console.log("required:", isRequired(book, "name"));
console.log("type:", getType(book, "id"));
console.log("type:", getType(book, "name"));

/*
console.log("Book:", Book);
console.log("book:", book);*/
console.log("getParams:", getParams(Book));
console.log("getRequiredParams:", getRequiredParams(Book));