import express from 'express';
import morgan from 'morgan';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
/**
 * Postgres database imports
 */
// import  router from './routes/admin';
// import  bookRouter from './routes/books';
import userRouter from './routes/userRouter';

/**
 * dummyDb imports
 */
import  router from './mock/dummyRoutes/admin';
// import  bookRouter from './dummyRoutes/books';
// import userRouter from './dummyRoutes/user';






const app = express();

var swaggerDefinition = {
	info: {
	  title: 'Node Swagger API',
	  version: '1.0.0',
	  description: 'Demonstrating how to describe a RESTful API with Swagger',
	},
	host: 'localhost:3000',
	basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: ['../routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRouter);
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).send({
	 message: 'Welcome to Hello books!'
	 
 });
});

app.use((req, res, next ) => {
 const err = res.status(404).send({
 	Error: '404: Sorry Page Not Found'
 })
 next(err)
});

app.listen(3000, () => {
	console.log("Listening to port 3000");
});

export default app;