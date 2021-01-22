import { MongoRouter } from '../src/router';
import { MongoController, valid_actions } from '../src/controller';
import { Auth } from '../src/auth';
import { MongoModel } from '../src/model';
import { expect } from 'chai';
import { model } from 'mongoose';
import * as sinon from 'sinon';

const timestamp = Math.floor(Date.now() / 1000).toString();

const app_spy = {
    post: sinon.spy(),
    get: sinon.spy(),
    put: sinon.spy(),
    delete: sinon.spy(),
}

describe('MongoRouter', () => {

    beforeEach( () => {
        app_spy.post.resetHistory();
        app_spy.get.resetHistory();
        app_spy.put.resetHistory();
        app_spy.delete.resetHistory();
    });

    it('Sould create a MongoRouter instance with constructor', () => {
        var mock_model = new MongoModel("mock_name__1", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, valid_actions);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);

        expect(mock_router).instanceof(MongoRouter);
    });

    it('Sould call rest function in case of they were provided', () => {
        var mock_model = new MongoModel("mock_name__2", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, valid_actions);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);
        mock_router.route(() => {});

        expect(app_spy.post.callCount).to.be.equal(1);
        expect(app_spy.get.callCount).to.be.equal(2);
        expect(app_spy.put.callCount).to.be.equal(1);
        expect(app_spy.delete.callCount).to.be.equal(1);
    });

    it('Sould call rest function in case of they were provided, only CREATE', () => {
        var mock_model = new MongoModel("mock_name__3", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, ["CREATE"]);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);
        mock_router.route(() => {});

        expect(app_spy.post.callCount).to.be.equal(1);
        expect(app_spy.get.callCount).to.be.equal(0);
        expect(app_spy.put.callCount).to.be.equal(0);
        expect(app_spy.delete.callCount).to.be.equal(0);
    });

    it('Sould call rest function in case of they were provided, only CREATE, UPDATE and FINDALL', () => {
        var mock_model = new MongoModel("mock_name__4", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, ["CREATE", "UPDATE", "FINDALL"]);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);
        mock_router.route(() => {});

        expect(app_spy.post.callCount).to.be.equal(1);
        expect(app_spy.get.callCount).to.be.equal(1);
        expect(app_spy.put.callCount).to.be.equal(1);
        expect(app_spy.delete.callCount).to.be.equal(0);
    });

    it('Sould call rest function in case of they were provided, only FINDALL and FINDONE', () => {
        var mock_model = new MongoModel("mock_name__5", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, ["FINDALL", "FINDONE"]);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);
        mock_router.route(() => {});

        expect(app_spy.post.callCount).to.be.equal(0);
        expect(app_spy.get.callCount).to.be.equal(2);
        expect(app_spy.put.callCount).to.be.equal(0);
        expect(app_spy.delete.callCount).to.be.equal(0);
    });

    it('Sould get controller property', () => {
        var mock_model = new MongoModel("mock_name__6", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, ["FINDALL", "FINDONE"]);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);

        expect(mock_router.controller).to.be.equal(mock_controller);
    });

    it('Sould get app property', () => {
        var mock_model = new MongoModel("mock_name__7", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        let mock_controller = new MongoController(mock_model, ["FINDALL", "FINDONE"]);
        let mock_auth = new Auth(()=>{return true}, []);
        let mock_router = new MongoRouter(app_spy, mock_controller, mock_auth);

        expect(mock_router.app).to.be.equal(app_spy);
    });

});