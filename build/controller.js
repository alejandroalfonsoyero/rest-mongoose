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
    constructor(Model, actions) {
        this.Model = Model;
        if (!MongoController.validate_actions(actions))
            throw Error(`Invalid set of actions ${actions}`);
        this.actions = actions;
    }
    doit(excecutor, action, request, response) {
        if (!this.actions.includes(action)) {
            throw Error(`Cannot ${action} items in this model. Err: Action not allowed`);
        }
        else {
            switch (action) {
                case "CREATE":
                    excecutor.create(request, response);
                    break;
            }
        }
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
}
exports.MongoController = MongoController;
