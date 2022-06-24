import { Application } from "express";
import { Collection } from 'mongodb';
import multer from "multer";

const createRoute = (app: Application, collection: Collection, apiPrefix: string) => {
    /**
     * @swagger
     * /create:
     *  post:
     *      tags:
     *        - Items
     *      requestBody:
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - itemType
     *                          - itemImage
     *                          - date
     *                          - point
     *                          - description
     *                          - email
     *                          - contacts
     *                      properties:
     *                          itemType:
     *                              type: string
     *                              required: true
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
     *      summary: Creating an item
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


    app.post(`${apiPrefix}/create`, async (req, res) => {
        const item = {
            itemType: req.body.itemType,
            email: req.body.email,
            date: req.body.date,
            point: req.body.point,
            itemImageURL: req.file.path,
            contacts: req.body.contacts,
            description: req.body.description
        }

        collection.insertOne(item, (error, result) => {
            if (error) return res.send(`An error has occurred: ${error.message}`);
            res.send('Item ' + result.insertedId + ' created!');
        });
    });
}

export default createRoute;
