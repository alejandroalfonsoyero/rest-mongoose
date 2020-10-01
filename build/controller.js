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
        MongoController.validate_actions(actions)
            .then(actions => {
            this.actions = actions;
        }).catch(err => {
            throw Error(err);
        });
    }
    doit(action, request, response) {
        if (!this.actions.includes(action)) {
            console.log(`Cannot ${action} items in this model. Err: Action not allowed`);
        }
        else {
            switch (action) {
                case "CREATE":
                    this.create(request, response);
                    break;
            }
        }
    }
    create(request, response) {
        var body = {};
        var fields = Object.keys(this.Model.fields);
        for (let i = 0; i < fields.length; i++) {
            body[fields[i]] = request.body[fields[i]];
        }
        const instance = new this.Model.model(body);
        instance.save()
            .then(data => {
            response.status(201).send(data);
        }).catch(err => {
            response.status(500).send({
                message: err.message
            });
        });
    }
    static validate_actions(actions) {
        return new Promise((resolve, reject) => {
            if (actions.length == 0)
                reject("Can not create empty controller.");
            for (let i = 0; i < actions.length; i++) {
                if (!valid_actions.includes(actions[i]))
                    reject(`Invalid action: ${actions[i]}`);
            }
            resolve(actions);
        });
    }
}
exports.MongoController = MongoController;
