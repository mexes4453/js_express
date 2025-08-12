/* Import the express package for creating server */
const express = require("express")

/* Create a server instance */
const app = express();


/* Configure the server to use ejs engine for render view files
 * like */
app.set('view engine', 'ejs')

/* Routes: Home */
/* client get request  upon connection to website: homepage */
app.get('/', (req, res) => {
    console.log("Server log: homepage");

    /*>
     * send response back to the user (client) 
     * client will see "hello" on browser or as response 
     * on commandline. */
    //res.send("hello");

    /* Respond to client with a only status code */
    //res.sendStatus(404);
    /* Respond to client with a status code along with a message */
    //res.status(404).send("server is down");
    /* Alternative send message as json */
    // res.status(404).json({ message: "error"});
    /* Send messages as json */
    //res.json({ message: "error"});

    /* Allow clients or user to download files from server */
    //res.download("server.js") 

    /*>
     * ===============================
     * Render a file to user or client 
     * ===============================
     * Alternatively a file can be rendered to the user (*.html) or (*.ejs).
     * Note that *.ejs is similar to html except that it allow code 
     * injection inside the html code. this action will be performed
     * by the ejs view enging.
     * > Ensure to run npm i ejs to install the package 
     * > Create a directory called "views" in your project directory
     *   + This directory will store *.html and *.ejs files for rendering
     * > pass the name of ejs files as string args to the method render.
     * */
    res.render("index");

    res.render("index", { text: "world"});
})

/*> 
 * Note that all routes can be moves to a seperate file in a folder called routes
 * This means that they do not have to defined here but rather defined in a 
 * seperate module and then imported into this server file.
 * =========================================================================
 * Therefore, the routes below are only for examples and have been moved to 
 * routes directory in a file "users.js"
 * Note that the app instance will be replaced with router instance created
 * from the Router class imported from the express library there in.
 * /
/*>
 * Routes : /users 
 * This route will list all the users */
/*
app.get('/users', (req, res) => {
    res.send("User List")
})
*/

/*>
 * Routes : /users/new
 * This route will create a new user */
/*
app.get('/users/new', (req, res) => {
    res.send("User New Form")
})
*/
/* ============================ END of routes =============================== */
/*>
 * Import the user routes from  ./routes/users.js for use to direct routes 
 * associated to users */
 const userRouter = require("./routes/users")
// const postRouter = require("./routes/posts")


 /*>
  * Now the application (server) can redirect client request "/users/..." to
  * the userRouter imported */
 app.use("/users", userRouter);
// app.use("/posts", postRouter);




/* activate server to service clients */
app.listen(8080)