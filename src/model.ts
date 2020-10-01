import { Schema } from 'mongoose';
import { SchemaDefinition } from 'mongoose';
import { model } from 'mongoose';

export class MongoModel {
    protected shema: Schema;
    public model;
    public name: string;
    public fields: object;

    constructor(name: string, fields: SchemaDefinition, time_stamps: boolean) {
        this.name = name;
        this.fields = fields;
        this.shema = new Schema(
            fields,
            {
                timestamps: time_stamps
            }
        );
        this.model = model(name, this.shema)
    }
}
