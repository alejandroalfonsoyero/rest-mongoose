export class Executor {
    public static create(Model, request, response) {
        var body: object = {};
        var fields: Array<string> = Object.keys(Model.fields);
        for (let i = 0; i < fields.length; i++) {
            body[fields[i]] = request.body[fields[i]];
        }
        const instance = new Model.model(body);
        instance.save()
        .then( data => {
            response.status(201).send(data);
        }).catch( err => {
            response.status(500).send({
                message: err.message
            })
        })
    }
}
