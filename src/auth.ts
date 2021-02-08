import { Router } from 'express';
import { MongoModel } from './model';

export class Auth {
    private _model: MongoModel;
    private _create: Router;
    private _findall: Router;
    private _findone: Router;
    private _update: Router;
    private _delete: Router;

    constructor(model: MongoModel, verify: Function, no_token_for: Array<string>) {
        this._model = model;
        this._create = Router();
        this._findall = Router();
        this._findone = Router();
        this._update = Router();
        this._delete = Router();

        this._create.use( (request, response, next) => {
            if (no_token_for.includes("CREATE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "CREATE", null)
                    .then(function(verified: boolean) {
                        if(verified) {
                            next();
                        } else {
                            response.sendStatus(401);
                        }
                    }).catch(function(error: any) {
                        response.sendStatus(401);
                    });
                } else {
                    response.sendStatus(401);
                }
            }
        });

        this._findall.use( (request, response, next) => {
            if (no_token_for.includes("FINDALL")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "FINDALL", null)
                    .then(function(verified: boolean) {
                        if(verified) {
                            next();
                        } else {
                            response.sendStatus(401);
                        }
                    }).catch(function(error: any) {
                        response.sendStatus(401);
                    });
                } else {
                    response.sendStatus(401);
                }
            }
        });

        this._findone.use( (request, response, next) => {
            if (no_token_for.includes("FINDONE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                const instance_id = request.params[`${this._model.name}id`]
                if (token) {
                    verify(token, "FINDONE", instance_id)
                    .then(function(verified: boolean) {
                        if(verified) {
                            next();
                        } else {
                            response.sendStatus(401);
                        }
                    }).catch(function(error: any) {
                        response.sendStatus(401);
                    });
                } else {
                    response.sendStatus(401);
                }
            }
        });

        this._update.use( (request, response, next) => {
            if (no_token_for.includes("UPDATE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                const instance_id = request.params[`${this._model.name}id`]
                if (token) {
                    verify(token, "UPDATE", instance_id)
                    .then(function(verified: boolean) {
                        if(verified) {
                            next();
                        } else {
                            response.sendStatus(401);
                        }
                    }).catch(function(error: any) {
                        response.sendStatus(401);
                    });
                } else {
                    response.sendStatus(401);
                }
            }
        });

        this._delete.use( (request, response, next) => {
            if (no_token_for.includes("DELETE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                const instance_id = request.params[`${this._model.name}id`]
                if (token) {
                    verify(token, "DELETE", instance_id)
                    .then(function(verified: boolean) {
                        if(verified) {
                            next();
                        } else {
                            response.sendStatus(401);
                        }
                    }).catch(function(error: any) {
                        response.sendStatus(401);
                    });
                } else {
                    response.sendStatus(401);
                }
            }
        });

    }

    public get create(): Router {
        return this._create;
    }

    public get findall(): Router {
        return this._findall;
    }

    public get findone(): Router {
        return this._findone;
    }

    public get update(): Router {
        return this._update;
    }

    public get delete(): Router {
        return this._delete;
    }

}
