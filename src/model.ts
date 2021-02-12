import { Schema } from 'mongoose';
import { SchemaDefinition } from 'mongoose';
import { model } from 'mongoose';
import { Model } from 'mongoose';

const sanitizer = require('mongoose-sanitize');

interface Index {
    fields: any,
    options: any
}

export class MongoModel {
    private _name: string;
    private _fields: object;
    private _encrypted_fields: Array<string>;
    private _indexes: Array<Index>;
    private _shema: Schema;
    private _model: Model<any>;

    constructor
    (
        name: string,
        fields: SchemaDefinition,
        time_stamps: boolean,
        encrypted_fields?: Array<string>,
        indexes?: Array<Index>
    )
    {
        this._name = name;
        this._fields = fields;
        this._encrypted_fields = encrypted_fields || [];
        this._indexes = indexes || [];

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
        for(let i = 0; i < this._indexes.length; i++) {
            this._shema.index(this._indexes[i].fields, this._indexes[i].options);
        }
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
