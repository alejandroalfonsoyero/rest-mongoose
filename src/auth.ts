import { Router } from 'express';


export class Auth {
    private _create: Router;
    private _findall: Router;
    private _findone: Router;
    private _update: Router;
    private _delete: Router;

    constructor(verify: Function, no_token_for: Array<string>) {
        this._create = Router();
        this._findall = Router();
        this._findone = Router();
        this._update = Router();
        this._delete = Router();

        this._create.use( function(request, response, next) {
            if (no_token_for.includes("CREATE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "CREATE")
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

        this._findall.use( function(request, response, next) {
            if (no_token_for.includes("FINDALL")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "FINDALL")
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

        this._findone.use( function(request, response, next) {
            if (no_token_for.includes("FINDONE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "FINDONE")
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

        this._update.use( function(request, response, next) {
            if (no_token_for.includes("UPDATE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "UPDATE")
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

        this._delete.use( function(request, response, next) {
            if (no_token_for.includes("DELETE")) {
                next();
            } else {
                const token = request.headers['access-token'];
                if (token) {
                    verify(token, "DELETE")
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
