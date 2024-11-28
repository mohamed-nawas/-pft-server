// import userRouter from "@routers/UserRouter";
import userRouter from "./routers/UserRouter";
import express, { Application } from "express";
// const corsConfig = require('@middlewares/cors-config');
const corsConfig = require('./middlewares/cors-config');
// const dbConfig = require("@middlewares/db-config");
const dbConfig = require("./middlewares/db-config");
// const errorHandler = require("@middlewares/error-handle-config");
const errorHandler = require("./middlewares/error-handle-config");

const BASE_URL = '/api/v1';
const USER_BASE_URL = BASE_URL + '/user'

/**
 * Express app
 */
module.exports = async (app: Application) => {
    
    // configuring necessary properties for server
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // db connection
    dbConfig;

    // cors
    await corsConfig(app);
    

    // auth configurations
    // await authConfig(app);

    // routes definition
    app.use(USER_BASE_URL, userRouter);
    // app.use(ROLE_BASE_URL, RoleRouter);
    // app.use(PERMISSION_BASE_URL, PermissionRouter);

    // error handling
    await errorHandler(app);
}