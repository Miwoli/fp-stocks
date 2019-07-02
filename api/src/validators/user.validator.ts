import { check } from 'express-validator';
import { User } from '../models';

const UserValidator = () => {
    const validator = {
        post: () => {
            return [
                check('login')
                    .exists()
                    .custom((value, { req }) => {
                        return User.query()
                            .where({ login: value })
                            .first()
                            .then((item) => {
                                if (!item) {
                                    return Promise.resolve();
                                }

                                if (req.user && req.user.id === item.id) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('Login is already in use');
                                }
                            });
                    }).withMessage('Login is already in use'),

                check('firstName')
                    .exists(),

                check('lastName')
                    .exists(),

                check('password')
                    .exists()
                    .isLength({ min: 6 })
                    .withMessage('Password must be min. 6 chars long'),

                check('money')
                    .exists()
                    .isInt(),

                check('stocks')
                    .optional(),
            ];
        }
    };

    return validator;
};

export { UserValidator };