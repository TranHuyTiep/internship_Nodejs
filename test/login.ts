import * as chai from 'chai';
import * as sinon from 'sinon';
import * as Passport from 'passport'
import {Strategy} from 'passport-local'
import {app} from '../src/App';
import {connectMysql} from '../src/config/dbConnect'
import {request} from "http";
chai.use(require('chai-http'));
var expect = chai.expect;

describe('User Login', ()=> {
    describe.only('GET /user/sign-in', () => {
        it('Test load page dang nhap', (done) => {
            chai.request(app)
                .get('/user/sign-in')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe.only('POST /user/sign-in', () => {
        it('Dang nhap thanh cong', (done) => {
            chai.request(app)
                .post('/user/sign-in')
                .send({
                    email: "tranhuytiep95@gmail.com",
                    password: "Aa123456"
                })
                .end((err, res) => {
                    console.log(res.body);
                    done()
                });
        });

        it('Dang nhap bi loi', (done) => {
            let authenticate = sinon.stub(Passport, 'authenticate').returns(() => {
            });
            authenticate.yields(true)
            chai.request(app)
                .post('/user/sign-in')
                .end((err, res) => {
                    expect(res.body.err).eq(true);
                    done()
                });
        });

        it('Dang nhap bang facebook thanh cong', (done) => {
            let authenticate = sinon.stub(Passport, 'use').returns(() => {
            });
            authenticate.yields(request, 'asda', 'asda', null, null);
            chai.request(app)
                .get('/user/sign-in/facebook')
                .end((err, res) => {
                    console.log(res.body);
                    done();
                });
        });
    })
})

describe('User Dang ky', ()=> {
    describe.only('GET /user/sign-up', () => {
        it('Dang ky thanh cong', (done) => {
            let connect = new connectMysql();
            chai.request(app)
                .get('/user/sign-up')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
})

