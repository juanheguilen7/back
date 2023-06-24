
//para usar _dirname
import { fileURLToPath } from "url";
import { dirname } from 'path';

//para usar socket, en mi ruta
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

//importamos bcrypt para hasheo de contraseñas
import bcrypt from 'bcrypt'; //toma las contraseñas que creamos y con un salt agregaria hasheo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// inicializo express y server.io
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

//inciializo y exporto hash   
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //genero un hasheo de la contraseña y le agrego una sal;
export const validPassword = (user, password) => bcrypt.compareSync(password, user.password); //comparo los hash devuelve true or false si coincide o no;