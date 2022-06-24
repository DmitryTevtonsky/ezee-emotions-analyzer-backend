import { Application } from "express";
import { Collection, ObjectId } from 'mongodb';

const readRoute = (app: Application, collection: Collection, apiPrefix: string) => {
    /**
     * @swagger
     * /read/{id}:
     *  get:
     *      tags:
     *        - Items
     *      summary: Return an single item by ID
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          description: ID of the item to read
     *          schema:
     *              type: string
     *      responses:
     *          200:
     *              description: Item
     *              content:
     *                  application/json:
     *                      schema:
     *                              $ref: '#/components/schemas/Item'
     */
    app.get(`${apiPrefix}/read/:id`, (req, res) => {
        const { id } = req.params;

        collection.findOne({ '_id': new ObjectId(id) }, (error, item) => {
            if (error) return res.send(`An error has occurred: ${error.message}`);
            return res.send(item);
        });
    });
}

export default readRoute;
