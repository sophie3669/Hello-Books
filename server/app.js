import express from 'express';
import morgan from 'morgan';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
/**
 * Postgres database imports
 */
 import  adminRouter from './routes/adminRouter';
 import  bookRouter from './routes/bookRouter';
 import userRouter from './routes/userRouter';

/**
 * dummyDb imports
 */
//import  router from './mock/mockRoutes/admin';
//import  bookRouter from './mock/mockRoutes/books';
//import userRouter from './mock/mockRoutes/user';

const app = express();



app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', bookRouter);

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
const port = parseInt(process.env.PORT, 10)|| 3000;

app.listen(port, () => {
	console.log("Listening to port  "+port);
});

export default app;