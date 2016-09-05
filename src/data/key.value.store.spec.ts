import store = require("./key.value.store");
import chai = require("chai");

let testStore = store.get("test");
let key = "demo";

describe('key.value.store', () => {

  describe('#put', () => {
    before(() => {
      return testStore
        .get(key)
        .then(item => {
          if(item !== null) {
            return testStore.del(key);
          }
        });
    });

    it('should insert item', () => {
      let item = { any: "value" };
      return testStore
        .put(key, item)
        .then(() => testStore.get(key))
        .then(data => {
          chai.assert.deepEqual(item, data);
        });
    });

    it('should update item', () => {
      let item = { newKey: "value" };
      return testStore
        .put(key, item)
        .then(() => testStore.get(key))
        .then(data => {
          chai.assert.deepEqual(item, data);
        });
    });
  });

  describe('#get', () => {
    let item = { any: "value" };

    before(() => {
      return testStore.put(key, item);
    });

    it('should get item', () => {
      return testStore
        .get(key)
        .then(data => {
          chai.assert.deepEqual(item, data);
        });
    });
  });

  describe('#del', () => {
    let item = { any: "value" };

    before(() => {
      return testStore.put(key, item);
    });

    it('should delete item', () => {
      return testStore
        .del(key)
        .then(() => testStore.get(key))
        .then(data => {
          chai.assert.equal(data, null);
        })
    })
  });
});