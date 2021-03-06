import axios from "axios";
import { Application } from "express";
import fs from 'fs';
import sockjs from 'sockjs';
import http from 'http';
import { Server } from "socket.io";


const apiPrefix = "/api";

const axiosInstanceDS = axios.create({
    baseURL: 'http://127.0.0.1:5001', // DS сервис
});

let bufferData: any[] = [];

const initRoutes = (app: Application, io: Server) => {
    
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
        const { status, data } = req.body;

        // console.log('/result-class', { status, data });

        if (status === 'processing') {
            const [formattedData]: any = Object.values(data);

            console.log('formattedData', formattedData);

            const emotions = {
                'Злость': formattedData['Злость'],
                'Отвращение': formattedData['Отвращение'],
                'Страх': formattedData['Страх'],
                'Радость': formattedData['Радость'],
                'Нейтральное состояние': formattedData['Нейтральное состояние'],
                'Грусть': formattedData['Грусть'],
                'Удивление': formattedData['Удивление'],
            }

            const dominantEmotion = Object.entries(emotions).reduce((dominant, [key,value]) => {
                if (dominant.value < value) {
                    dominant.emotion = key;
                    dominant.value = value;
                }
                return dominant;
            }, {emotion: '', value: 0});

            console.log('dominantEmotion', dominantEmotion);

            // bufferData.push(dominantEmotion);
            bufferData.push({time: formattedData?.time, ...dominantEmotion});

        }

        if (status === 'finished') {       
            console.log('!bufferData', bufferData);

            const maximals: Record<string, number> = bufferData.reduce((acc, el) => {
                acc[el.emotion] = (acc[el.emotion] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);

              console.log('!maximals', maximals);

              const dominantCommonEmotion =  Object.entries(maximals).reduce((dominant, [key,value]) => {
                if (dominant.value < value) {
                    dominant.emotion = key;
                    dominant.value = value;
                }
                return dominant;
            }, {emotion: 'Нейтральное состояние', value: 0});
              
            console.log(dominantCommonEmotion, bufferData, bufferData.length);
            
            io.emit('finished', dominantCommonEmotion);

            bufferData = [];
        }

        res.send({});
    });

}

export default initRoutes;
