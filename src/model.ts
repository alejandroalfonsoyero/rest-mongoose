import { Schema } from 'mongoose';
import { SchemaDefinition } from 'mongoose';
import { model } from 'mongoose';
import { Model } from 'mongoose';

const sanitizer = require('mongoose-sanitize');

export class MongoModel {
    private _name: string;
    private _fields: object;
    private _encrypted_fields: Array<string>;
    private _shema: Schema;
    private _model: Model<any>;

    constructor(name: string, fields: SchemaDefinition, time_stamps: boolean, encrypted_fields?: Array<string>) {
        this._name = name;
        this._fields = fields;
        this._encrypted_fields = encrypted_fields || [];

        let field_names = Object.keys(fields);
        if(!this._encrypted_fields.every( field => field_names.includes(field))) {
            throw Error("Invalid encrypted fields.");
        }

        this._shema = new Schema(
            fields,
            {
                timestamps: time_stamps
            }
        );
        this._shema.plugin(sanitizer, {});
        this._model = model(name, this._shema)
    }

    public get name(): string {
        return this._name;
    }

    public get fields(): object {
        return this._fields;
    }

    public get encrypted_fields(): Array<string> {
        return this._encrypted_fields;
    }

    public get model(): Model<any> {
        return this._model;
    }

}
