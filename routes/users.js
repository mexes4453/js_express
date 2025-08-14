
const express = require("express")

/*>
 * import Router class from express library and create
 * a router instance */
const router = express.Router()


/* users will be remove as this file is dedicated to users routing */
/*>
 * Routes : /users 
 * This route will list all the users */
//router.get('/users', (req, res) => {
router.get('/', (req, res) => {
    res.send("User List")
})

/*>
 * Routes : /users/new
 * This route will create a new user */
//router.get('/users/new', (req, res) => {
router.get('/new', (req, res) => {
    res.send("User New Form")
})


/* create a new user */
router.post('/', (req, res) => {
    res.send("Create user")
})

/*>
 * This routes will dynamically retrieve the parameter "id"
 * from the client url "localhost:8080/user/2" 
 * it will store the value (2) in req.params.id 
 * Note: Routes are match from top to bottom. Therefore, dynamic 
 * routing should be at the bottom. */
/*> ====
 * These routes (get, put, delete) with the same url can be replace
 * with the following alternative to use the url endpoint once.  */ 
/* 
router.get("/:id", (req, res) => {
    res.send(`Get user with id: ${req.params.id}`)
})

router.put("/:id", (req, res) => {
    res.send(`Update user with id: ${req.params.id}`)
})

router.delete("/:id", (req, res) => {
    res.send(`Delete user with id: ${req.params.id}`)
})
*/
/*>
 * Alternative to 3 routes above which now use the url only once
 */
router.route("/:id")
.get((req, res) => {
    console.log(req.user)
    res.send(`Get user with id: ${req.params.id}`)
})
.put((req, res) => {
    res.send(`Update user with id: ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`Delete user with id: ${req.params.id}`)
})

/*>
 * ==================================
 * Middleware usage with router.param
 * ==================================
 * Middlewares are codes that executes between the client request
 * and the server response. This helps to avoid repitition of codes or events
 * in all the server response.
 * Note that most middleware functions contains the args (req, res, next)
 */
const users = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
    /*>
     * ==> Start of middleware 
     * Create a random variable on the req for further usage 
     * Set a random variable in the request to the user from array users
     * Note that this variable can be called anything */
    req.user = users[id];
    /* ==< End of middleware */

    /*> Resume server response.
     * This call signals the server to begin server response execution
     * which any (get, put, delete) in the routes defined.
     */
    next();

})



/* Export the router for use in other modules */
module.exports = router