import { MongoController, valid_actions } from '../src/controller';
import { MongoModel } from '../src/model';
import { expect } from 'chai';

describe('MongoController', () => {
    it('Should validate rigth actions', async () => {

        const actions = await MongoController.validate_actions(["CREATE", "FINDALL", "FINDONE", "UPDATE", "DELETE"]);
        expect(actions).to.have.length(5);
        expect(actions).to.eql(["CREATE", "FINDALL", "FINDONE", "UPDATE", "DELETE"]);

        const actions1 = await MongoController.validate_actions(["UPDATE", "DELETE"]);
        expect(actions1).to.have.length(2);
        expect(actions1).to.eql(["UPDATE", "DELETE"]);

        const actions2 = await MongoController.validate_actions(["FINDALL"]);
        expect(actions2).to.have.length(1);
        expect(actions2).to.eql(["FINDALL"]);


    });
    it('Should invalidate wrong actions', async () => {
        let err_msg: string;
        
        await MongoController.validate_actions([])
        .catch( err => {
            err_msg = err;
        });

        expect(err_msg).to.equal("Can not create empty controller.");


        await MongoController.validate_actions(["CREATE", "MOCK_WRONG_ACT"])
        .catch( err => {
            err_msg = err;
        });

        expect(err_msg).to.equal("Invalid action: MOCK_WRONG_ACT");

    });
});