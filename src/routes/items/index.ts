import axios from "axios";
import { Application } from "express";


const apiPrefix = "/api";

const axiosInstanceDS = axios.create({
    baseURL: 'http://127.0.0.1:5001', // DS сервис
});

const initRoutes = (app: Application) => {

    // Принимаем входное видео с фронта, сохраняем видео и отправляем его на анализ в DS
    app.post(`${apiPrefix}/create-class`, (req, res) => {
        console.log('path', req.file.path);


        axiosInstanceDS.post("/class-analyze", {
            inputVideoPath: req.file.path
        })
    });

    // Принимаем результат формирования "класса" из DS сервиса
    app.post(`${apiPrefix}/result-class`, (req, res) => {
        console.log(req.body);

    });

    app.post(`${apiPrefix}/emotion-analyze`, (req, res) => {
        console.log(req.body);


    });
}

export default initRoutes;
