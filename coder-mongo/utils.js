
//para usar _dirname
import { fileURLToPath } from "url";
import { dirname } from 'path';

//para usar socket, en mi ruta
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// inicializo express y server.io
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);