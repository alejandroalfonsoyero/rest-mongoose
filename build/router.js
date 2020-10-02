"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRouter = void 0;
class MongoRouter {
    constructor(app, controller) {
        this.controller = controller;
        this.app = app;
    }
    route() {
        var mongo_model = this.controller.mongo_model();
        var actions = this.controller.actions();
        var model_fields = mongo_model.fields();
        var _model = mongo_model.model();
        var model_name = mongo_model.name();
        for (let i = 0; i < actions.length; i++) {
            switch (actions[i]) {
                case "CREATE":
                    this.app.post(`/${model_name}s`, (request, response) => {
                        var body = {};
                        var fields = Object.keys(model_fields);
                        for (let i = 0; i < fields.length; i++) {
                            body[fields[i]] = request.body[fields[i]];
                        }
                        const instance = new _model(body);
                        instance.save()
                            .then(data => {
                            response.status(201).send(data);
                        }).catch(err => {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
            }
        }
    }
}
exports.MongoRouter = MongoRouter;
