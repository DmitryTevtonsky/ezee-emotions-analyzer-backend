import { Application } from "express";
import { Collection, Db, ObjectId } from 'mongodb';

const allRoute = (app: Application, collection: Collection, apiPrefix: string) => {
    /**
     * @swagger
     * /:
     *  get:
     *      tags:
     *          - Items
     *      summary: Return a list of JSONPlaceholder items
     *      responses:
     *          200:
     *              description: Array of items
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Item'
     */
    app.get(`${apiPrefix}/`, (_req, res) => {

        collection.find({}).toArray((error, result) => {
            if (error) return res.send(`An error has occurred: ${error.message}`);
            return res.send(result);
        });
    });
}

export default allRoute;
