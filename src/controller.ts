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
        MongoController.validate_actions(actions)
        .then( actions => {
            this.actions = actions;
        }).catch( err => {
            throw Error(err);
        });
    }

    public doit(action: string, request, response) {
        if (!this.actions.includes(action)) {
            console.log(`Cannot ${action} items in this model. Err: Action not allowed`);
        } else {
            switch (action) {
                case "CREATE":
                    this.create(request, response);
                    break;
            }
        }
    }

    private create(request, response) {
        var body: object = {};
        var fields: Array<string> = Object.keys(this.Model.fields);
        for (let i = 0; i < fields.length; i++) {
            body[fields[i]] = request.body[fields[i]];
        }
        const instance = new this.Model.model(body);
        instance.save()
        .then( data => {
            response.status(201).send(data);
        }).catch( err => {
            response.status(500).send({
                message: err.message
            })
        })
    }

    public static validate_actions(actions: Array<string>): Promise<Array<string>> {
        return new Promise<Array<string>>( (resolve, reject) => {
            if (actions.length == 0) reject("Can not create empty controller.");
            for (let i = 0; i < actions.length; i++) {
                if (!valid_actions.includes(actions[i])) reject(`Invalid action: ${actions[i]}`);
            }
            resolve(actions);
        });
    }
}