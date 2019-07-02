export class Stock {
    public id: number;
    public name: string;
    public code: string;
    public unit: number;
    public price: number;
    public amount: number;
    public createdAt: string;
    public updatedAt: string;

    public fromJson(data: any): Stock {
        const me = this;

        me.id = data.id;
        me.name = data.name;
        me.code = data.code;
        me.unit = data.unit;
        me.price = data.price;
        me.amount = data.amount;
        me.createdAt = data.createdAd;
        me.updatedAt = data.updatedAt;

        return me;
    }
}
