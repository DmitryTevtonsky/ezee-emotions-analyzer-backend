/**
 * @swagger
 * components:
 *      schemas:
 *          Item:
 *              type: object
 *              properties:
 *                  itemType:
 *                      type: string
 *                      description: Type of item ('lost' or 'found').
 *                      example: 'lost'
 *                  email:
 *                      type: string
 *                      description: The user's email.
 *                      example: Leanne Graham
 *                  points:
 *                      type: string
 *                      description: The geocoordinate points of item.
 *                      example: [60, 40]
 *                  date:
 *                      type: string
 *                      description: The creation date of item.
 *                      example: 17.08.21
 *                  imageURL:
 *                      type: string
 *                      description: The user's URL to image(foto) of item.
 *                  contacts:
 *                      type: string
 *                      description: The user's contact, e.g. mail, phone, links.
 *                      example: "@telegramAlias"
 *                  description:
 *                      type: string
 *                      description: The user's description of item.
 *                      example: My losted item
 *          ItemWithFile:
 *              type: object
 *              required:
 *                          - itemType
 *                          - itemImage
 *                          - date
 *                          - point
 *                          - description
 *                          - email
 *                          - contacts
 *              properties:
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
 *          ItemTypeEnum:
 *              type: string
 *              enum:
 *                  - lost
 *                  - found
 */
