import { Router } from 'express';
import { User } from '../models';

const Users = () => {
    const createApi = () => {
        const api = Router({ mergeParams: true });
        
        api.get('/', (req, res) => {
            User.query()
                .select('id', 'first_name', 'last_name', 'login', 'money')
                .findById(req.user.id)
                .first()
                .then((user) => {
                    res.json(user);
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

export { Users };