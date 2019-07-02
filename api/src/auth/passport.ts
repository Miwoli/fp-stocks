import { User } from '../models';
import PassportAnonymous from 'passport-anonymous';
import PassportLocal from 'passport-local';
import PassportJwt from 'passport-jwt';
import moment from 'moment';

export default ({ config, passport }) => {
    passport.serializeUser((user, done) => {
        done(null, {
            userId: user.id
        });
    });

    passport.deserializeUser(async (payload, done) => {
        findUser(payload.userId).then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, 'Unauthorized');
            }
        }, (err) => {
            done(err);
        })

    });

    passport.use('anonymous', new PassportAnonymous.Strategy());

    passport.use('user-local', new PassportLocal.Strategy({
        usernameField: 'login',
        passwordField: 'password'
    }, (login, password, done) => {
        User.query()
            .where('login', login)
            .first()
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect login' })
                }

                user.verifyPassword(password).then((verifyPassword) => {
                    if (verifyPassword) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            }, (err) => {
                console.error(err);
                return done(err);
            });
    }));

    passport.use('jwt', new PassportJwt.Strategy({
        secretOrKey: config.jwtAuth.secret,
        jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (payload, done) => {
        if (!payload) {
            return done(null, true);
        }

        if (moment(payload.expiresAt).isBefore(moment())) {
            return done(null, false, 'Access token expired');
        }

        findUser(payload.userId).then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false, 'Unauthorized');
            }
        }, (err) => {
            done(err);
        })
        
    }));

    const findUser = (id: number) => {
        return User
            .query()
            .select('first_name', 'last_name', 'login', 'id')
            .findById(id);
    }
}