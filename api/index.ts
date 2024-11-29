import 'module-alias/register';
import "reflect-metadata";
require('dotenv').config();
import express, { Application, Request, Response } from "express";

const expressApp = require('./express-app');

const StartServer = async() => {

    // initialize the application server
    const app: Application = express();
    const port = process.env.PORT || 3000;
    
    await expressApp(app);

    // listen to the application server on PORT
    app.listen(port, (): void => {
        console.log(`Express application server running on address => http://localhost:${port}`);
    });
}

if (process.env.VERCEL === '1') {
    module.exports = (req: Request, res: Response) => {
        const app: Application = express();
        expressApp(app);
        app(req, res);
    }
} else StartServer();