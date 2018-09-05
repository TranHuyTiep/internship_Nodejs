"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinon = require("sinon");
const Passport = require("passport");
const App_1 = require("../src/App");
const dbConnect_1 = require("../src/config/dbConnect");
const http_1 = require("http");
chai.use(require('chai-http'));
var expect = chai.expect;
describe('User Login', () => {
    describe.only('GET /user/sign-in', () => {
        it('Test load page dang nhap', (done) => {
            chai.request(App_1.app)
                .get('/user/sign-in')
                .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
        });
    });
    describe.only('POST /user/sign-in', () => {
        it('Dang nhap thanh cong', (done) => {
            chai.request(App_1.app)
                .post('/user/sign-in')
                .send({
                email: "tranhuytiep95@gmail.com",
                password: "Aa123456"
            })
                .end((err, res) => {
                console.log(res.body);
                done();
            });
        });
        it('Dang nhap bi loi', (done) => {
            let authenticate = sinon.stub(Passport, 'authenticate').returns(() => {
            });
            authenticate.yields(true);
            chai.request(App_1.app)
                .post('/user/sign-in')
                .end((err, res) => {
                expect(res.body.err).eq(true);
                done();
            });
        });
        it('Dang nhap bang facebook thanh cong', (done) => {
            let authenticate = sinon.stub(Passport, 'use').returns(() => {
            });
            authenticate.yields(http_1.request, 'asda', 'asda', null, null);
            chai.request(App_1.app)
                .get('/user/sign-in/facebook')
                .end((err, res) => {
                console.log(res.body);
                done();
            });
        });
    });
});
describe('User Dang ky', () => {
    describe.only('GET /user/sign-up', () => {
        it('Dang ky thanh cong', (done) => {
            let connect = new dbConnect_1.connectMysql();
            chai.request(App_1.app)
                .get('/user/sign-up')
                .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
        });
    });
});
//# sourceMappingURL=login.js.map