import swaggerUi from "swagger-ui-express";
import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import { Application } from "express";

const swaggerOptions: OAS3Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Loforoll "items" API',
            description: 'API for lost and found items',
            version: '0.0.1',
            contact: {
                name: 'Dmitry Tevtonsky',
                url: 'https://github.com/DmitryTevtonsky',
            },
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/items',
                description: 'Development server',
            },
        ],
        externalDocs: {
            url: 'http://localhost:3000/swagger.json',
            description: 'Link to pure swagger.json'
        }
    },
    apis: ["src/routes/**/*.ts"]
}

const configureSwagger = (app: Application) => {
    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

    app.get('/swagger.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
};

export { configureSwagger };
