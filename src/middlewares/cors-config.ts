import { Application, NextFunction, Request, Response } from "express";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

/**
 * Cors Configurations
 */
module.exports = async (app: Application) => {

    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.header("Access-Control-Allow-Origin", "https://pft-client.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.status(200).send();
            return;
        }
        next();
    });
}