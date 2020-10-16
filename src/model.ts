import { Schema } from 'mongoose';
import { SchemaDefinition } from 'mongoose';
import { model } from 'mongoose';
import { Model } from 'mongoose';

import sanitizer = require('mongoose-sanitize');

export class MongoModel {
    private _name: string;
    private _fields: object;
    private _shema: Schema;
    private _model: Model<any>;

    constructor(name: string, fields: SchemaDefinition, time_stamps: boolean) {
        this._name = name;
        this._fields = fields;
        this._shema = new Schema(
            fields,
            {
                timestamps: time_stamps
            }
        );
        this._shema.plugin(sanitizer, {});
        this._model = model(name, this._shema)
    }

    public name(): string {
        return this._name;
    }

    public fields(): object {
        return this._fields;
    }

    public model(): Model<any> {
        return this._model;
    }

}
