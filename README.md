# rest-mongoose
This package aims to be more easy the build of simple rest apis based on the
combination MongoDB-Nodejs-Express.

## Installation
```
npm install rest-mongoose
```

## For potential developers
I'll be happy to get some extra help from developers who want to collaborate
in this project. If you are one of them please write me to alejandroalfonso1994@gmail.com,
or just start creating issues in the github repo. You should take a look to the issues
already opened. Thank you.

## Basic usage
Here is a simple server example:

### Require necessary packages
```
const rest_mongoose = require('rest-mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
```

### Build a basic express app
```
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

### Conect to a mongoo database
```
mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( () => {
    console.log("Successfully connected to database");    
})
.catch( err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
```

### Create a route for test app
```
app.get('/', (request, response) => {
    response.json({"message": "Welcome to test api."});
});
```

## Now use the magic of rest-mongoose package to define as models as you want and create routes for them

### Defining models, controllers, auths and routers.

```javascript
// Defining a model 1
// This model has one field and we will create all valid routes.
// You can get a list of valid routes by using rest_mongoose.valid_actions
// All the created routes in this case will need authentication because the
// empty list passed in the second parameter in Auth constructor.

const valid_actions = rest_mongoose.valid_actions;

var model_1 = new rest_mongoose.MongoModel("name_1", {
    field_a: {
        type: String,
        unique: true,
        required: true
    }
}, true);

var controller_1 = new rest_mongoose.MongoController(model_1, valid_actions);
var auth_1 = new rest_mongoose.Auth(function(token, action){return true}, []);
var router_1 = new rest_mongoose.MongoRouter(app, controller_1, auth_1);

// Define a model 2
// This model has two fields. For this model we only alow
// CREATE and FINDALL routes specified in the controller constructor,
// and only for the CREATE action the route will need an authentication, because
// we provide a free_actions list ["FINDALL"]

var model_2 = new rest_mongoose.MongoModel("name_2", {
    field_b: {
        type: String,
        unique: true,
        required: true
    },
    field_c: {
        type: Number,
        unique: true,
        required: true
    }
}, true);

var controller_2 = new rest_mongoose.MongoController(model_2, ["CREATE", "FINDALL"]);
var auth_2 = new rest_mongoose.Auth(function(token, action){return true}, ["FINDALL"]);
var router_2 = new rest_mongoose.MongoRouter(app, controller_2, auth_2);
```

### Finally create the routes and listen on port 8000
```javascript
function routing_callback(action, data) {
    // This function will be called once the request had successed and just before
    // it gives the response.
    switch(action) {
        case: "CREATE":
            console.log(`Provided data: ${data}`);
            break;
        case: "FINDALL":
            console.log(`Instances: ${data}`);
            break;
        case: "FINDONE":
            console.log(`Instance: ${data}`);
            break;
        case: "UPDATE":
            console.log(`Updated instance: ${data}`);
            break;
        case: "DELETE":
            console.log(`Deleted instances: ${data}`);
            break;
    }
}

router_1.route(routing_callback);
router_2.route(routing_callback);

app.listen(8000, () => {
    console.log("Server is listening on port " + String(8000));
});
```

### Valid Actions
The valid actions are ["CREATE", "FINDALL", "FINDONE", "UPDATE", "DELETE"]

You can use all of them or only someones.

### Result
The created endpoints are in based to model name. For this example there will
be created the next ones:
Notes the path endpoint use the name of the model followed by an 's'
In this case, the GET endpoint for model 2 does not need an access-token header
because it was specified as a free action in the Auth costructor.
Note also that you are who provides the validation function for the resources
based on the token and the action in requests.

| Method        | url                 | payload                                | Headers      |
| ------------- | :-------------------| :--------------------------------------| :------------|
| POST          | /name_1s            | {"field_a": string}                    | access-token |
| GET           | /name_1s            |                                        | access-token |
| GET           | /names_1s/:name_1id |                                        | access-token |
| PUT           | /names_1s/:name_1id | {"field_a": string}                    | access-token |
| DELETE        | /names_1s/:name_1id |                                        | access-token |
| POST          | /name_2s            | {"field_b": string, "field_c": number} | access-token |
| GET           | /name_2s            |                                        |              |
