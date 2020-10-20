import { MongoModel } from '../src/model';
import { expect } from 'chai';
import { model } from 'mongoose';

const timestamp = Math.floor(Date.now() / 1000).toString();

describe('MongoModel', function() {
    it('Sould create a MongoModel instance with constructor', function() {
        var mock_model = new MongoModel("mock_name", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        expect(mock_model).instanceof(MongoModel);
    });

    it('Sould get name property', function() {
        var mock_model = new MongoModel(`mock_name1_${timestamp}`, {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        var name = mock_model.name;
        expect(name).to.be.equal(`mock_name1_${timestamp}`);
    });

    it('Sould get fields property', function() {
        const __field = {
            type: String,
            required: true,
            default: `mock_default_${timestamp}`
        }
        var mock_model = new MongoModel(`mock_name2`, {
            mock_field: __field
        }, true);

        var fields: any = mock_model.fields;
        expect(fields["mock_field"]).to.be.eql(__field);
    });

    it('Sould get model property', function() {
        var mock_model = new MongoModel("mock_name3", {
            mock_field: {
                type: String,
                required: true,
                default: ""
            }
        }, true);

        var __model = mock_model.model;
        expect(__model)instanceof(model);
    });

});