import { Application } from "express";
import { Collection, ObjectId } from 'mongodb';
import { unlink } from 'fs';

const updateRoute = (app: Application, collection: Collection, apiPrefix: string) => {
    /**
     * @swagger
     * /update/{id}:
     *  put:
     *      tags:
     *        - Items
     *      requestBody:
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          itemType:
     *                              type: string
     *                              required: true
     *                              default: lost
     *                              $ref: '#/components/schemas/ItemTypeEnum'
     *                          email:
     *                              type: string
     *                              format: email
     *                              required: true
     *                              allowEmptyValue: false
     *                              default: mailuser@mail.ru
     *                          date:
     *                              type: string
     *                              required: true
     *                              default: 03.06.97
     *                          point:
     *                              type: string
     *                              required: true
     *                              default: lat lng
     *                          contacts:
     *                              type: string
     *                              required: true
     *                              default: "@telegramAlias"
     *                          description:
     *                              type: string
     *                              required: true
     *                              default: My fav item
     *                          itemImage:
     *                              type: string
     *                              format: binary
     *                              required: false
     *      summary: Updating an item
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          description: ID of the item to update
     *          schema:
     *              type: string
     *      responses:
     *          200:
     *              description: Updated item
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/Item'
     */
    app.put(`${apiPrefix}/update/:id`, async (req, res) => {
        const { id } = req.params;

        const item: Record<string, string> = {
            itemType: req.body.itemType,
            email: req.body.email,
            date: req.body.date,
            point: req.body.point,
            itemImageURL: req.file?.path,
            contacts: req.body.contacts,
            description: req.body.description
        }

        /** Фильтрация пустых полей, чтобы не обновлять их. */
        const fieldsForUpdate = Object.assign({},
            ...Object.keys(item)
                .filter((key) => item[key])
                .map(key => ({ [key]: item[key] }))
        )

        collection.findOneAndUpdate(
            { '_id': new ObjectId(id) },
            { $set: fieldsForUpdate },
            { returnDocument: 'before' },
            (error, result) => {
                if (error) return res.send(`An error has occurred: ${error.message}`);
                if (!result.value) return res.send(`Item with provided ID doesn't exist!`)

                const updatedItem = {...result.value, ...fieldsForUpdate}

                /** Удаление предыдущего файла. */ 
                if (fieldsForUpdate.itemImageURL) {
                    return unlink(`${result.value.itemImageURL}`, (fsErr) => {
                        if (fsErr) return res.send(`An error has occurred while deleting file: ${fsErr.message}`);;
                        if (result.ok) return res.send(updatedItem);
                    });
                }
                
                if (result.ok) return res.send(updatedItem);
            }
        );
    });
}

export default updateRoute;
