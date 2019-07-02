import { Model, snakeCaseMappers, mixin, RelationMappings } from 'objection';
import { timestampPlugin } from 'objection-timestamps';
import bcrypt from 'bcrypt';
import { UserStock } from '.'

const Password = require('objection-password')({
    rounds: 15
});

const timestamps = timestampPlugin({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    genDate: () => {
        return (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    }
});

export default class User extends mixin(Model, [
    timestamps,
    Password
]) {
    readonly id!: number;
    firstName?: string;
    lastName?: string;
    login?: string;
    password?: string;
    money?: number;
    createdAt?: string;
    updatedAt?: string;

    static tableName = 'user';
    
    static columnNameMappers = snakeCaseMappers();

    async verifyPassword(password: string): Promise<boolean> {
        const match = await bcrypt.compare(password, this.password);

        if (match) {
            return true;
        }
    }
}