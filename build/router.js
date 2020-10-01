"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRouter = void 0;
class MongoRouter {
    constructor(app, controller) {
        this.controller = controller;
        this.app = app;
    }
    route() {
        for (let i = 0; i < this.controller.actions.length; i++) {
            switch (this.controller.actions[i]) {
                case "CREATE":
                    this.app.post(`/${this.controller.Model.name}s`, this.controller.doit);
                    break;
            }
        }
    }
}
exports.MongoRouter = MongoRouter;
