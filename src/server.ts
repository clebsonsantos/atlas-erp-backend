import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env`});
const PORT = process.env.PORT || 4000
import "./database";

const app = express();

app.use(cors())
app.use('/uploads', express.static('uploads'))

app.options('*', cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
