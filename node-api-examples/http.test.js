const server = require("./http");
const request = require("supertest");

describe("Testing the server", () => {
    describe("Testing the root route", () => {
        it("/ should get back a 200", (done) => {
            request(server).get("/").expect(200).end((err) => {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            })
        })
    })

    describe("Testing the /data route", () => {
        it("/data should get back a 200", (done) => {
            request(server).get("/data").expect(200).end((err) => {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            })
        });
        
        it("/data should display my name", (done) => {
            request(server).get("/data").end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.data).toEqual({"name": "bebo"})
                    done();
                }
            });
            
        })

    })
})