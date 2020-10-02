"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoController = exports.valid_actions = void 0;
const valid_actions = [
    "CREATE",
    "FINDALL",
    "FINDONE",
    "UPDATE",
    "DELETE"
];
exports.valid_actions = valid_actions;
class MongoController {
    constructor(model, actions) {
        this._mongo_model = model;
        if (!MongoController.validate_actions(actions))
            throw Error(`Invalid set of actions ${actions}`);
        this._actions = actions;
    }
    static validate_actions(actions) {
        if (actions.length == 0)
            return false;
        for (let i = 0; i < actions.length; i++) {
            if (!valid_actions.includes(actions[i]))
                return false;
        }
        return true;
    }
    mongo_model() {
        return this._mongo_model;
    }
    actions() {
        return this._actions;
    }
}
exports.MongoController = MongoController;
