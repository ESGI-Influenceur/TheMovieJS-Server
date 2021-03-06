const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/env');
const authRoutes = require('./router/auth.route');
const userRoutes = require('./router/user.route');
const roleRoutes = require('./router/role.route');
const movieRoutes = require('./router/movie.route');
const serialRoutes = require('./router/serial.route');
const searchRoutes = require('./router/search.route');
const commentRoutes = require('./router/comment.route');
const ratingRoutes = require('./router/rating.route');
const database = require('./config/database');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// add swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// enable cors origin
app.use(cors({origin:'*'}));


// add rest endpoints
authRoutes(app);
userRoutes(app);
roleRoutes(app);
movieRoutes(app);
serialRoutes(app);
searchRoutes(app);
commentRoutes(app);
ratingRoutes(app);

// connect to the mongo database
database(app);
 
// create a server
module.exports = app.listen(env.serverPort, function () {
    console.log("App started : http://%s:%s",env.serverUl, env.serverPort);
});

