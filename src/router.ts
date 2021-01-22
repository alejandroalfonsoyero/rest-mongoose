import { MongoController } from './controller';
import { MongoModel } from './model';
import { Auth } from './auth';
import { Model } from 'mongoose';
import { hashSync } from 'bcryptjs';

interface App {
    post: Function,
    get: Function,
    put: Function,
    delete: Function
}

export class MongoRouter {
    private _controller: MongoController;
    private _app: App;
    private _auth: Auth;

    constructor(app: App, controller: MongoController, auth: Auth) {
        this._controller = controller;
        this._app = app;
        this._auth = auth;
    }

    public route(_callback?: Function): void {

        var mongo_model: MongoModel = this._controller.mongo_model;
        var actions: Array<string> = this._controller.actions;
        var model_fields: object = mongo_model.fields;
        var model_encrypted_fields: Array<string> = mongo_model.encrypted_fields;
        var _model: Model<any> = mongo_model.model;
        var model_name = mongo_model.name;
        for(let i = 0; i < actions.length; i++) {
            switch (actions[i]) {
                case "CREATE":
                    this._app.post(`/${model_name}s`, this._auth.create, function(request: any, response: any) {
                        var body: any = {};
                        var fields: Array<string> = Object.keys(model_fields);
                        for(let i = 0; i < fields.length; i++) {
                            body[fields[i]] = model_encrypted_fields.includes(fields[i]) ? hashSync(request.body[fields[i]], 10) : request.body[fields[i]];
                        }
                        const instance = new _model(body);
                        instance.save()
                        .then( function(data: any) {
                            if(_callback) {
                                _callback("CREATE", data);
                            }
                            response.status(201).send(data);
                        }).catch( function(err: any) {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
                case "FINDALL":
                    this._app.get(`/${model_name}s`, this._auth.findall, function(request: any, response: any) {
                        _model.find()
                        .then( function(instances: any) {
                            if(_callback) {
                                _callback("FINDALL", instances);
                            }
                            response.status(200).send(instances);
                        }).catch( function(err: any) {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
                case "FINDONE":
                    this._app.get(`/${model_name}s/:${model_name}id`, this._auth.findone, function(request: any, response: any) {
                        _model.findById(request.params[`${model_name}id`])
                        .then( function(instance: any) {
                            if(_callback) {
                                _callback("FINDONE", instance);
                            }
                            response.status(200).send(instance);
                        }).catch( function(err: any) {
                            response.status(500).send({
                                message: err.message
                            });
                        });
                    });
                    break;
                case "UPDATE":
                    this._app.put(`/${model_name}s/:${model_name}id`, this._auth.update, function(request: any, response: any) {
                        var body: any = {};
                        var fields: Array<string> = Object.keys(model_fields);
                        for(let i = 0; i < fields.length; i++) {
                            body[fields[i]] = request.body[fields[i]];
                        }
                        _model.findByIdAndUpdate(request.params[`${model_name}id`], body, { new: true})
                        .then( function(instance: any) {
                            if(!instance) {
                                response.status(404).send({
                                    message: `${model_name} not found with id ${request.params[`${model_name}id`]}`
                                });
                            } else {
                                if(_callback) {
                                    _callback("UPDATE", instance);
                                }
                                response.status(200).send(instance);
                            }
                        }).catch( function(err: any) {
                            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                                return response.status(404).send({
                                    message: `${model_name} not found with id ${request.params[`${model_name}id`]}`
                                });
                            } else {
                                response.status(500).send({
                                    message: `Error updating ${model_name} with id ${request.params[`${model_name}id`]}`
                                });
                            }
                        });
                    });
                    break;
                case "DELETE":
                    this._app.delete(`/${model_name}s/:${model_name}id`, this._auth.delete, function(request: any, response: any) {
                        _model.findByIdAndRemove(request.params[`${model_name}id`])
                        .then( function(instance: any) {
                            if (!instance) {
                                response.status(404).send({
                                    message: `${model_name} not found with id ${request.params[`${model_name}id`]}`
                                });
                            } else {
                                if(_callback) {
                                    _callback("DELETE", instance);
                                }
                                response.status(200).send({
                                    message: `${model_name} deleted successfully`
                                });
                            }
                        }).catch( function(err: any) {
                            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                                response.status(404).send({
                                    message: `${model_name} not found with id ${request.params[`${model_name}id`]}`
                                });
                            } else {
                                response.status(500).send({
                                    message: `Error deleting ${model_name} with id ${request.params[`${model_name}id`]}`
                                });
                            }
                        });
                    });
                    break;
            }
        }
    }

    public get controller(): MongoController {
        return this._controller;
    }

    public get app(): App {
        return this._app;
    }
}