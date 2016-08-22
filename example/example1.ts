import * as lamb from "../index";

const app = lamb();

app.get("/", (req) => {
  return req.db.get("keyvaluedemo", req.event.id);
});

app.put("/", (req) => {
  return req.db.put("keyvaluedemo", req.event.item);
});

app.post("/", (req) => {
  return req.db.put("keyvaluedemo", req.event.item);
});

app.delete("/", (req) => {
  return req.db.del("keyvaluedemo", req.event.id);
});

export = app;