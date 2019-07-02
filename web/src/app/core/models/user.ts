import { Stock } from './stock';

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public login: string;
    public password: string;
    public money: number;
    public stocks: Stock[];
    public createdAt: string;
    public updatedAt: string;

    public toJson(): any {
        const me = this;

        return {
            firstName: me.firstName,
            lastName: me.lastName,
            login: me.login,
            password: me.password,
            money: me.money,
            stocks: me.stocks,
        };
    }

    public fromJson(data): User {
        const me = this;

        me.id = data.id;
        me.firstName = data.firstName;
        me.lastName = data.lastName;
        me.login = data.login;
        me.money = data.money;
        me.stocks = data.stocks;
        me.createdAt = data.createdAt;
        me.updatedAt = data.updatedAt;

        return me;
    }
}
