import { Model, snakeCaseMappers, RelationMappings } from 'objection';
import { Stock } from '.';

export default class UserStock extends Model {
    readonly userId!: number;
    readonly stockId!: number;
    amount!: number;

    static tableName = 'user_stock';

    static columnNameMappers = snakeCaseMappers();

    static modelPaths = [__dirname];

    static relationMappings: RelationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'User',
            join: {
                from: 'user_stock.user_id',
                to: 'user.id'
            }
        },

        stock: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stock,
            join: {
                from: 'user_stock.stock_id',
                to: 'stock.id'
            }
        }
    }
}