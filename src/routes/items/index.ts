import axios from "axios";
import { Application } from "express";
import fs from 'fs';
import sockjs from 'sockjs';
import http from 'http';


const apiPrefix = "/api";

const axiosInstanceDS = axios.create({
    baseURL: 'http://127.0.0.1:5001', // DS сервис
});

const initRoutes = (app: Application) => {
    const echo = sockjs.createServer({ sockjs_url: 'http://84.252.137.43:3000', prefix: '/echo', websocket: true });
    console.log(echo);
    
    echo.on('connection', (conn) => {
        console.log('!connection');
        
        conn.on('data', (message) => {
            console.log('!data', message);

            conn.write(message);
        });

        conn.on('close', () => { });
    });

    const server = http.createServer(app);
    echo.installHandlers(server, {prefix:'/ws'});

    // Принимаем входное видео с фронта, сохраняем видео и отправляем его на анализ в DS
    app.post(`${apiPrefix}/init-class-analyze`, async (req, res) => {
        try {
            console.log('path', req.file);

            const { status, data } = await axiosInstanceDS.post("/class-analyze", {
                filename: req.file.path
            });

            console.log('response from DS', { status, data });

            res.send({
                pathToOutputVideo: data
            });
        } catch (error) {
            console.log('error', error);
        }
    });

    // Принимаем результат формирования "класса" из DS сервиса
    app.post(`${apiPrefix}/result-class`, (req, res) => {
        const bufferData = [];
        const { status, data } = req.body;

        console.log('/result-class', { status, data });

        if (status === 'processing') {
            const formattedData = Object.values(data);

            console.log('formattedData', formattedData);

            bufferData.push(...formattedData);
        }

        if (status === 'finished') {

        }

        res.send({});
    });

    app.post(`${apiPrefix}/init-emotion-analyze`, (req, res) => {
        console.log(req.body);

        res.send({});
    });
}

export default initRoutes;
