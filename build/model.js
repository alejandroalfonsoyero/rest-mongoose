"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
class MongoModel {
    constructor(name, fields, time_stamps) {
        this._name = name;
        this._fields = fields;
        this._shema = new mongoose_1.Schema(fields, {
            timestamps: time_stamps
        });
        this._model = mongoose_2.model(name, this._shema);
    }
    name() {
        return this._name;
    }
    fields() {
        return this._fields;
    }
    model() {
        return this._model;
    }
}
exports.MongoModel = MongoModel;
