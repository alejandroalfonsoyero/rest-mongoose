import { MongoController, valid_actions } from '../src/controller';
import { MongoModel } from '../src/model';
import { expect } from 'chai';

const timestamp = Math.floor(Date.now() / 1000).toString();

describe('MongoController', () => {
    it('Sould create a MongoController instance with constructor', () => {
        let mock_model = new MongoModel("mock_name_1", {"field": {type: String}}, true);
        let mock_controller = new MongoController(mock_model, valid_actions);

        expect(mock_controller).instanceof(MongoController);
        expect(mock_controller.mongo_model()).equal(mock_model);
        expect(mock_controller.actions()).eql(valid_actions);
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

    it('Sould get mongo_model property', () => {
        let mock_model = new MongoModel("mock_name_2", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);
        let mock_controller = new MongoController(mock_model, valid_actions);

        let _model = mock_controller.mongo_model();
        expect(_model).instanceof(MongoModel);
        expect(_model).to.be.equal(mock_model);
    });

    it('Sould get actions property', () => {
        let mock_model = new MongoModel("mock_name_3", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);
        let mock_controller = new MongoController(mock_model, valid_actions);

        let _actions = mock_controller.actions();
        expect(_actions).instanceof(Array);
        expect(_actions).to.be.equal(valid_actions);
    });

});