import { Router } from 'express';
import { Stock, UserStock } from '../models';

const Stocks = () => {
    const createApi = () => {
        const api = Router({ mergeParams: true });
        
        api.get('/', (req, res) => {
            UserStock.query()
                .select()
                .where('user_id', req.user.id)
                .eager('[stock]')
                .then((stocks) => {
                    res.json(stocks);
                })
                .catch((err) => {
                    console.error(err);
                    res.sendStatus(500);
                });
        })

        return api;
    };

    return createApi();
};

export { Stocks };