import express from "express"; //Import Express
import { Low } from "lowdb"; //Import the LowDB module. Uses a JSON file to create our "database"
import { JSONFile } from "lowdb/node";

(async function () {
  // Configure lowdb to write to JSONFile. This will be our "database"
  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);

  //Reads the database
  await db.read();

  //Checks if there is any data in the database. If not, we give default data.
  db.data = db.data || { todos: [] };

  //This writes to the database if there are any changes
  await db.write();

  //Instantiate our express application
  const app = express();

  //Use Builtin middleware to extract JSON data from the body of any request made to the server
  app.use(express.json());

  //Create our GET route that just sends back the Todos data
  app.get("/", function (_request, response) {
    //The underscore means to ignore the param that's not being used
    response.status(200).json({
      //Set our response to have a status of 200 (OK!) and to respond with JSON
      success: true,
      todos: db.data.todos, //Returns the todos from our DB
    });
  });

  app.post("/", function (request, response) {
    //Push the new todo
    db.data.todos.push({
      name: request.body.todo,
    });

    //Save the todo to the "database"
    db.write();

    //Respond with 200 (OK!) and tell the user the request is successful
    response.status(200).json({
      success: true,
    });
  });

  //Have the app listen on port 8080
  app.listen(8080, function () {
    //After the app is running, run this console.log
    console.log("App running on http://localhost:8080");
  });
})();
