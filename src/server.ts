import 'reflect-metadata'
import express from 'express';
import "./database/"
import { router } from './routes';
const app = express();

//PAREI O VIDEO EM 18:17

/*
GET => Buscar
POST => Salvar
PUT => Alterar
DELETE => Deletar
PATCH => Alteração especifica
*/

app.use(express.json())

app.use(router)



app.listen(3000, () =>{
 console.log("server is running")
})