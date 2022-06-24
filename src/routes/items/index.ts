import { Application } from "express";
import { Db, ObjectId } from 'mongodb';

import allRoute from './all';
import createRoute from './create'
import readRoute from './read'
import updateRoute from './update'
import deleteRoute from './delete'

const initItemsRoutes = (app: Application, db: Db) => {
    const collection = db.collection("videos");
    const apiPrefix = "/api/items";

    allRoute(app, collection, apiPrefix);
    createRoute(app, collection, apiPrefix);
    readRoute(app, collection, apiPrefix);
    updateRoute(app, collection, apiPrefix);
    deleteRoute(app, collection, apiPrefix);
}

export default initItemsRoutes;
