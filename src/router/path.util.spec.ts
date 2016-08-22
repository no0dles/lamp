import {PathUtil} from "./path.util";
import * as chai from "chai";

describe('path.util', () => {
  describe('#getParts', () => {
    it('should handle null', () => {
      let res = PathUtil.getParts(null);
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 0);
    });

    it('should handle "" url', () => {
      let res = PathUtil.getParts("");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 0);
    });

    it('should handle "/" url', () => {
      let res = PathUtil.getParts("/");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 0);
    });

    it('should handle "/sub" url', () => {
      let res = PathUtil.getParts("/sub");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 1);
    });

    it('should handle "sub" url', () => {
      let res = PathUtil.getParts("sub");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 1);
    });

    it('should handle "sub/" url', () => {
      let res = PathUtil.getParts("sub/");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 1);
    });

    it('should handle "sub/subsub" url', () => {
      let res = PathUtil.getParts("sub/subsub");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 2);
    });

    it('should handle "sub/12" url', () => {
      let res = PathUtil.getParts("sub/12");
      chai.assert.isNotNull(res);
      chai.assert.isArray(res);
      chai.assert.equal(res.length, 2);
      chai.assert.equal(res[1], "12");
    });
  });
});