import { Auth } from '../src/auth';
import { Router } from 'express';
import { expect } from 'chai';
import * as sinon from 'sinon';

const timestamp = Math.floor(Date.now() / 1000).toString();

describe('Auth', () => {

    var RouterStub = sinon.stub(Router);

    it('Sould create an Auth instance with constructor', () => {
        let mock_auth = new Auth(
            function(token: string, action: string) {return true;},
            []
        );
        expect(mock_auth).to.be.instanceof(Auth);
    });

});
