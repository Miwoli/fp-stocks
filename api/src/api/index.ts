import { Router } from 'express';
import { Market } from './market';
import { Stocks } from './stocks';
import { Users } from './user';

const Api = ({ config }) => {
    const api = Router();

    api.use('/market', Market());

    api.use('/stocks', (req, res, next) => {
        checkIsUser(req, res, next);
    });
    api.use('/stocks', Stocks());

    api.use('/users', (req, res, next) => {
        checkIsUser(req, res, next);
    });
    api.use('/users', Users());

    return api;
};

function checkIsUser(req, res, next) {
    if (!req.user) {
        return res.status(401).send('Invalid token');
    } else {
        next();
    }
};

export { Api };