const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");
const fileManagement = require("./file.management");

describe("File Management", () => {

  afterEach(()=>{
    sinon.restore();
  })

  describe("When creating a file,", () => {
    it("should call writeFileSync", () => {
      const writeSpy = sinon.spy(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });
      fileManagement.createFile("test.txt");

      expect(writeSpy.calledWith("./data/test.txt", "")).to.be.true;
    });

    it("Should not create a new file if no file name is specified",()=>{
      const writeSpy = sinon.spy(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });
      
      try {
        fileManagement.createFile();        
      } catch (error) {}

      expect(writeSpy.notCalled).to.be.true;
    });

  });
});
