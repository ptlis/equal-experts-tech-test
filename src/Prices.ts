
export interface IProductPrice {
    readonly title: string;
    readonly price: number;
}

export interface IPricesLookup {
    get(productName: string): Promise<IProductPrice>;
}

export class PricesLookup {
    async get(productName: string): Promise<IProductPrice> {
        // TODO: Real implementation
        return Promise.resolve({
            title: productName,
            price: 1.75,
        });
    }
}
