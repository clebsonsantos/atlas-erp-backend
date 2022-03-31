import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env`});

import "./database";

const app = express();

app.use(cors())
app.use('/uploads', express.static('uploads'))

app.options('*', cors());

app.use(express.json());

app.use(routes);

app.listen(4000, () => console.log("Server is running in port 4000"));
