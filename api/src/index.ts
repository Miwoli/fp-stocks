import express from 'express';
import spdy from 'spdy';
import Knex from 'knex';
import { Model } from 'objection';
import cors from 'cors';
import passport from 'passport';
import { Auth, PassportSettings } from './auth';
import bodyParser from 'body-parser';
import fs from 'fs';
import ws from 'ws';
import { Stock } from './models';
import { Api } from './api';

const config = require('../config.json');
const knexConfig = require('../knexfile');

const ssl = {
    key: fs.readFileSync('cert/dev.key'),
    cert: fs.readFileSync('cert/dev.cert')
}

const app = express();

const knex = Knex(knexConfig);
Model.knex(knex);

const server = spdy.createServer(ssl, app);
const wss = new ws.Server({ server });

const socket = new ws(config.wsAddress);

socket.on('message', (data: string) => {
    const stocks = JSON.parse(data);
    const time = stocks.PublicationDate.slice(0, 19).replace('T', ' ');

    stocks.Items.forEach((stock) => {
        Stock.query()
            .patch({
                price: stock.Price,
                updatedAt: time,
            })
            .where({
                code: stock.Code
            })
            .then(() => {
                return;
            })
            .catch((err) => {
                console.error(err);
            })
    });

    Stock.query()
        .select()
        .then((stocks) => {
            const data = JSON.stringify(stocks);
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(data);
                }
            })
        })

});

app.use(cors({
    origin: config.page,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    exposedHeaders: ['Location'],
    allowedHeaders: ['content-type', 'AccessToken', 'observe', 'authorization']
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

PassportSettings({ config, passport });
app.use(passport.initialize());
app.use('/auth', Auth({ config, passport }));
app.use(passport.authenticate(['jwt', 'anonymous'], { session: false }));
app.use('/api', Api({ config }));

server.listen(process.env.PORT || config.port, () => {
    console.log(`Server is listening on port ${process.env.PORT || config.port}`);
});