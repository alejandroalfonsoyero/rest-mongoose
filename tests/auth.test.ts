import { Auth } from '../src/auth';
import { MongoModel } from '../src/model';
import { Router } from 'express';
import { expect } from 'chai';
import * as sinon from 'sinon';

const timestamp = Math.floor(Date.now() / 1000).toString();

describe('Auth', () => {

    var RouterStub = sinon.stub(Router);

    it('Sould create an Auth instance with constructor', () => {
        let mock_model = new MongoModel("mock_name__8", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);
        let mock_auth = new Auth(
            mock_model,
            function(instance_id: string, token: string, action: string) {return true;},
            []
        );
        expect(mock_auth).to.be.instanceof(Auth);
    });

});
