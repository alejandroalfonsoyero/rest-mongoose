import { MongoController } from './controller';

export class MongoRouter {
    public controller: MongoController;
    public app;

    constructor(app, controller: MongoController) {
        this.controller = controller;
        this.app = app;
    }

    public route() {
        for(let i = 0; i < this.controller.actions.length; i++) {
            switch (this.controller.actions[i]) {
                case "CREATE":
                    this.app.post(`/${this.controller.Model.name}s`, this.controller.doit);
                    break;
            }
        }
    }
}