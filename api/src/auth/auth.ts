import { Router } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { User, UserStock } from '../models';
import { UserValidator } from '../validators';
import { validationResult } from 'express-validator';
import { matchedData } from 'express-validator';
import { transaction } from 'objection';

export default ({ config, passport }) => {
    const createApi = () => {
        const api = Router();

        api.post('/register', UserValidator().post(), (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors });
            }

            const data = matchedData(req);
            
            transaction(User.knex(), (t) => {
                return User.query(t)
                .insert({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    login: data.login,
                    password: data.password,
                    money: data.money
                })
                .then((user) => {
                        const userStocks = data.stocks.map((stock) => {
                            return {
                                userId: user.id,
                                stockId: stock.id,
                                amount: stock.amount
                            }
                        });

                        return UserStock.query(t)
                            .insertGraph(userStocks)
                    })

            })
            .then(() => {
                res.sendStatus(201);
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });

        });

        api.post('/login', UserValidator().post(), (req, res, next) => {
            passport.authenticate('user-local', onAuth(req, res))(req, res, next);
        });

        api.post('/login/token', (req, res, next) => {
            passport.authenticate('jwt', onAuth(req, res))(req, res, next);
        });

        const onAuth = (req, res) => {
            return (err, user, info) => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (!user) {
                    return res.status(401).send(info.msg);
                }

                req.user = user;

                const payload = {
                    type: 'auth-token',
                    userId: req.user.id,
                    expiresAt: moment().add(14, 'day').format()
                };

                const token = jwt.sign(payload, config.jwtAuth.secret);

                res.json({
                    token: token,
                    expiresAt: payload.expiresAt
                });
            };
        };

        return api;
    };

    return createApi();
};