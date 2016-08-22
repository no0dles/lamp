import {tester} from "../src/tools/test";

const app = tester("./example1");

describe("example1", () => {
  describe("POST /", () => {
    it("should create an item", () => {
      return app.post("/", { item: { id: "test", data: "any" } }).then(res => {
        console.log(res);
      });
    });
  });

  describe("GET /", () => {
    it("should get an item", () => {
      return app.get("/", { id: "test" }).then(res => {
        console.log(res);
      });
    })
  });


  describe("PUT /", () => {
    it("should create an item", () => {
      return app.put("/", { item: { id: "test", data: "demoany" } }).then(res => {
        console.log(res);
      });
    });
  });

  describe("DELETE /", () => {
    it("should delete an item", () => {
      return app.delete("/", { id: "test" }).then(res => {
        console.log(res);
      });
    });
  });
});