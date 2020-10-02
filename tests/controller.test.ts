import { MongoController, valid_actions } from '../src/controller';
import { MongoModel } from '../src/model';
import { expect } from 'chai';
import * as sinon from 'sinon';


describe('MongoController', () => {
    it('Sould create an instance on constructor', () => {
        let mock_model = new MongoModel("mock_name", {"field": {type: String}}, true);
        let mock_controller = new MongoController(mock_model, ["CREATE"]);

        expect(mock_controller).instanceof(MongoController);
        expect(mock_controller.Model).equal(mock_model);
        expect(mock_controller.actions).eql(["CREATE"]);
    });

    it('Should throw error if invalid action', () => {
        let mock_model = new MongoModel("mock_name2", {"field": {type: String}}, true);
        let mock_controller = new MongoController(mock_model, ["CREATE"]);

        let request = {};
        let response = {};
        let excecutor = {};
        expect( () => {
            mock_controller.doit(excecutor, "UPDATE", request, response);
        }).to.throw("Cannot UPDATE items in this model. Err: Action not allowed");
    });

    it('Should call create function if action is CREATE', () => {
        let mock_model = new MongoModel("mock_name3", {"field": {type: String}}, true);
        let mock_controller = new MongoController(mock_model, ["CREATE"]);

        let request = {};
        let response = {};
        let excecutor = {
            create: sinon.spy()
        };

        mock_controller.doit(excecutor, "CREATE", request, response);

        expect(excecutor.create.calledOnce).to.be.true;
    });

    it('Should validate rigth actions', () => {

        expect(MongoController.validate_actions(["CREATE", "FINDALL", "FINDONE", "UPDATE", "DELETE"])).to.true;
        expect(MongoController.validate_actions(["CREATE", "DELETE"])).to.true;
        expect(MongoController.validate_actions(["DELETE"])).to.true;

    });
    it('Should invalidate wrong actions', () => {
        
        expect(MongoController.validate_actions([])).to.false;
        expect(MongoController.validate_actions(["CREATE", "DELETE", "WRONG"])).to.false;
        expect(MongoController.validate_actions(["WRONG"])).to.false;

    });
});