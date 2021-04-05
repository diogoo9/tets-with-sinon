const fs = require("fs");
const sinon = require("sinon");
const { expect } = require("chai");
const proxyquire = require("proxyquire");


describe("File Management Stub", ()=>{
    afterEach(()=>{
        sinon.restore();
    });

    it("True should be true",() => {
        const writeFake = sinon.fake(fs.writeFileSync);
        sinon.replace(fs, "writeFileSync", writeFake);

        const fileManagement = proxyquire("./file.management", { fs });

        fileManagement.createFile("test.txt");
        expect(writeFake.calledWith("./data/test.txt")).to.be.true;
    });

    it("Should throw an exception when the file already existis",()=>{
        const writeFake = sinon.fake.throws(new Error());
        sinon.replace(fs, "writeFileSync", writeFake);

        const fileManagement = proxyquire("./file.management", { fs });

        expect(() => fileManagement.createFile("test.txt")).to.throw();
    });

    it("getAllFiles should return a list of files", ()=>{
        const readFake = sinon.fake.yields(null,["test.txt"]);
        sinon.replace(fs, "readdir", readFake);

        const fileManagement = proxyquire("./file.management", { fs });

        fileManagement.getAllFiles((err, data)=>{
            expect(data).to.eql(["test.txt"]);
        })
    })
});