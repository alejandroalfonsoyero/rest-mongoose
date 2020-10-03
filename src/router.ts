import { MongoController } from './controller';
import { MongoModel } from './model';
import { model } from 'mongoose';

interface App {
    post: Function,
    get: Function
}

export class MongoRouter {
    private controller: MongoController;
    private app: App;

    constructor(app: App, controller: MongoController) {
        this.controller = controller;
        this.app = app;
    }

    public route(): void {

        var mongo_model: MongoModel = this.controller.mongo_model();
        var actions: Array<string> = this.controller.actions();
        var model_fields: object = mongo_model.fields();
        var _model: model = mongo_model.model();
        var model_name = mongo_model.name();

        for(let i = 0; i < actions.length; i++) {
            switch (actions[i]) {
                case "CREATE":
                    this.app.post(`/${model_name}s`, (request, response) => {
                        var body: object = {};
                        var fields: Array<string> = Object.keys(model_fields);
                        for(let i = 0; i < fields.length; i++) {
                            body[fields[i]] = request.body[fields[i]];
                        }
                        const instance = new _model(body);
                        instance.save()
                        .then( data => {
                            response.status(201).send(data);
                        }).catch( err => {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
                case "FINDALL":
                    this.app.get(`/${model_name}s`, (request, response) => {
                        _model.find()
                        .then( instances => {
                            response.status(200).send(instances);
                        }).catch( err => {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
                case "FINDONE":
                    this.app.get(`/${model_name}s/:${model_name}id`, (request, response) => {
                        _model.findById(request.params[`${model_name}id`])
                        .then( instance => {
                            response.status(200).send(instance);
                        }).catch( err => {
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