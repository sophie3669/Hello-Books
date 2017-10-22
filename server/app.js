import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import  router from './routes/admin';
import  bookRouter from './routes/books';
import userRouter from './routes/user';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
app.use('/', bookRouter);
app.use('/', userRouter);

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


