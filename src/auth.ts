import { MongoModel } from './model';

export class Auth {
    private _model: MongoModel;
    private _create: Function;
    private _findall: Function;
    private _findone: Function;
    private _update: Function;
    private _delete: Function;

    constructor
    (
        model: MongoModel,
        verify: Function,
        no_token_for: Array<string>
    )
    {
        this._model = model;
        let self = this;

        this._create = function (request: any, response: any, next: any) {
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
        };

        this._findall = function (request: any, response: any, next: any) {
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
        };

        this._findone = function (request: any, response: any, next: any) {
            if (no_token_for.includes("FINDONE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                const instance_id = request.params[`${self._model.name}id`]
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
        };

        this._update = function (request: any, response: any, next: any) {
            if (no_token_for.includes("UPDATE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                const instance_id = request.params[`${self._model.name}id`]
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
        };

        this._delete = function (request: any, response: any, next: any) {
            if (no_token_for.includes("DELETE")) {
                next();
            } else {
                console.log(request.params);
                const token = request.headers['access-token'];
                const instance_id = request.params[`${self._model.name}id`]
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
        };

    }

    public get create(): Function {
        return this._create;
    }

    public get findall(): Function {
        return this._findall;
    }

    public get findone(): Function {
        return this._findone;
    }

    public get update(): Function {
        return this._update;
    }

    public get delete(): Function {
        return this._delete;
    }

}
