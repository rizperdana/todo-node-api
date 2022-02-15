process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const Todo = require("../app/models/todo");

chai.use(chaiHttp);

describe("Todo", () => {
    beforeEach((done) => {
        Todo.deleteMany({}, (err) => {
            done();
        });
    });
    describe('/GET api/todos/', () => {
        it('it should GET all the todos', (done) => {
            chai.request(server)
                .get('/api/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});