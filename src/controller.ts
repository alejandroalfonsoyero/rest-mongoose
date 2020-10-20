import { Types } from 'mongoose';
import { MongoModel } from './model';

const valid_actions: Array<string>= [
    "CREATE",
    "FINDALL",
    "FINDONE",
    "UPDATE",
    "DELETE"
];

export { valid_actions };

export class MongoController {
    private _mongo_model: MongoModel;
    private _actions: Array<string>;

    constructor(model: MongoModel, actions: Array<string>) {
        this._mongo_model = model;
        if (!MongoController.validate_actions(actions)) throw Error(`Invalid set of actions ${actions}`);
        this._actions = actions;
    }

    public static validate_actions(actions: Array<string>): boolean {
        if (actions.length == 0) return false;
        for (let i = 0; i < actions.length; i++) {
            if (!valid_actions.includes(actions[i])) return false;
        }
        return true;
    }

    public get mongo_model(): MongoModel {
        return this._mongo_model;
    }

    public get actions(): Array<string> {
        return this._actions;
    }

}