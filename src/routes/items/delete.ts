import { Application } from "express";
import { Collection, ObjectId } from 'mongodb';
import { unlink } from 'fs';


const deleteRoute = (app: Application, collection: Collection, apiPrefix: string) => {
    /**
     * @swagger
     * /delete/{id}:
     *  delete:
     *      tags:
     *        - Items
     *      summary: Removing an item
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          description: ID of the item to remove
     *          schema:
     *              type: string
     *      responses:
     *          200:
     *              description: Id of removed item
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: string
     *                          example: 6122cfc3fe3597635f000db0
     */
    app.delete(`${apiPrefix}/delete/:id`, (req, res) => {
        const { id } = req.params;

        collection.findOneAndDelete({ '_id': new ObjectId(id) }, (error, result) => {
            if (error) return res.send(`An error has occurred: ${error.message}`);
            if (!result.value) return res.send(`Item with provided ID doesn't exist!`)

            unlink(`${result.value.itemImageURL}`, (fsErr) => {
                if (fsErr) return res.send(`An error has occurred while deleting file: ${fsErr.message}`);;
                return res.send(`Item ${id} deleted!`);
            });
        });
    });
}

export default deleteRoute;
