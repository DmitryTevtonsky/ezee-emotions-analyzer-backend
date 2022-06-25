import axios from "axios";
import { Application } from "express";


const apiPrefix = "/api";

const axiosInstanceDS = axios.create({
    baseURL: 'http://127.0.0.1:5001', // DS сервис
});

const calculateClassData = (data) => {

}

const initRoutes = (app: Application) => {

    // Принимаем входное видео с фронта, сохраняем видео и отправляем его на анализ в DS
    app.post(`${apiPrefix}/init-class-analyze`, async (req, res) => {
        try {
            console.log('path', req.file);
            const { status, data } = await axiosInstanceDS.post("/class-analyze", {
                filename: req.file.path
            });

            console.log('response from DS', { status, data });

            res.send({
                path: req.file.path
            });
        } catch (error) {
            console.log('error', error);
        }
    });

    // Принимаем результат формирования "класса" из DS сервиса
    app.post(`${apiPrefix}/result-class`, (req, res) => {
        console.log('/result-class', req.body);

        res.send({});
    });

    app.post(`${apiPrefix}/init-emotion-analyze`, (req, res) => {
        console.log(req.body);

        res.send({});
    });
}

export default initRoutes;
