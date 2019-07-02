import { Model, snakeCaseMappers, mixin } from 'objection';
import { timestampPlugin } from 'objection-timestamps';

const timestamps = timestampPlugin({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    genDate: () => {
        return (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    }
});

export default class Stock extends mixin(Model, [
    timestamps,
]) {
    readonly id!: number;
    name?: string;
    price?: number;
    createdAt?: string;
    updatedAt?: string;

    static tableName = 'stock';

    static columnNameMappers = snakeCaseMappers();
}