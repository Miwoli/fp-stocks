import { Router } from 'express';
import { Stock } from '../models';

const Market = () => {
    const createApi = () => {
        const api = Router({ mergeParams: true });

        api.get('/', (req, res) => {
            Stock.query()
                .select('name', 'code', 'id')
                .then((stocks) => {
                    res.json(stocks);
                })
                .catch((err) => {
                    console.error(err);
                    res.sendStatus(500);
                });
        });

        return api;
    };

    return createApi();
};

export { Market };