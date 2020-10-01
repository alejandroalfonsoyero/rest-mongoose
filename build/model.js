"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
class MongoModel {
    constructor(name, fields, time_stamps) {
        this.name = name;
        this.fields = fields;
        this.shema = new mongoose_1.Schema(fields, {
            timestamps: time_stamps
        });
        this.model = mongoose_2.model(name, this.shema);
    }
}
exports.MongoModel = MongoModel;
