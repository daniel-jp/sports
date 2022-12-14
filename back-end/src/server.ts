import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

import { convertMinutesToHours } from './utils/conver-minutes-to-hours';
import { convertHourStringToMinutes } from './utils/convert-hour-string-tominuts';

const app = express();
app.use(express.json());//To send information on serveur in JSON format
app.use(cors())//access of all front-end 
const prisma = new PrismaClient({log:['query']});

//localhost:3333/adverts
//request:Client search somenthing
//response: return the response to client
//Router(rotas)

//Http method(get, post,put,puth, delete...) / API RESTFul

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads:true
                }
            }
        }
    })
    return response.json(games);
});
app.get('/games/:id/adverts', async (request, response) => {
      const gameId = request.params.id;
      const ads = await prisma.ad.findMany({
        select:{
            id:true,
            gameId:true,
            name:true,
            weekDays:true,
            useVoiceChannel:true,
            yearsPlaying:true,
            hourStart:true,
            hourEnd:true,
            },
        where:{
            gameId:gameId},

        orderBy:{
            createdDat:'desc',
        }
      })
    return response.json(ads.map(ad => {

        return {
              ...ads,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHours(ad.hourStart),
                hourEnd: convertMinutesToHours(ad.hourEnd),
        }
    }))
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body:any = request.body;
      const ad= await prisma.ad.create({
          data:{
             gameId,
             name: body.name,
             yearsPlaying: body.yearsPlaying,
             discord: body.discord,
             weekDays: body.weekDays.join(','),
             hourStart: convertHourStringToMinutes(body.hourStart),
             hourEnd: convertHourStringToMinutes(body.hourEnd),
             useVoiceChannel: body.useVoiceChannel
         } })
    return response.status(201).json(ad);
});
app.get('/adverts/:id/discord', async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select:{
        discord: true,
    },
    where:{
        id: adId,
    }
  });
    return response.json({
        discord: ad.discord
    });
});

app.listen(3333);