import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))
app.use(errorHandler);

//rota = conjunto
//recurso - usuario
//metodo HTTP = get, post, put, delete
//parametros

// query params: http://localhost:3333/users?search=rafael&page=1
//console.log(request.query)
// route params: http://localhost:3333/users/1 (identificar um recurso)
//console.log(request.params)
// body: http://localhost:3333/users (identificar um recurso)
//console.log(request.body)

/* app.get('/users/:id', (request, response)=>{
    return response.send('Hello World');
})

app.post('/users', (request, response)=>{
    return response.send('metodo post');
}) */



app.listen(process.env.PORT || 3333);