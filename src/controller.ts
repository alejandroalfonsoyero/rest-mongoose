import { MongoModel } from './model';

const valid_actions= [
    "CREATE",
    "FINDALL",
    "FINDONE",
    "UPDATE",
    "DELETE"
];

export { valid_actions };

export class MongoController {
    public Model: MongoModel;
    public actions;

    constructor(Model: MongoModel, actions: Array<string>) {
        this.Model = Model;
        if (!MongoController.validate_actions(actions)) throw Error(`Invalid set of actions ${actions}`);
        this.actions = actions;
    }

    public doit(excecutor, action: string, request, response) {
        if (!this.actions.includes(action)) {
            throw Error(`Cannot ${action} items in this model. Err: Action not allowed`);
        } else {
            switch (action) {
                case "CREATE":
                    excecutor.create(request, response);
                    break;
            }
        }
    }

    public static validate_actions(actions: Array<string>): boolean {
        if (actions.length == 0) return false;
        for (let i = 0; i < actions.length; i++) {
            if (!valid_actions.includes(actions[i])) return false;
        }
        return true;
    }
}