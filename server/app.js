let express = require('express');
let logger = require ('morgan');
let bodyParser= require('body-parser');
const router = require ('./routes/admin');

const app = express();
var server = app.listen(3000, listening);

function listening () {
	// body...
	console.log("listening...");
}



app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', admin);

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


