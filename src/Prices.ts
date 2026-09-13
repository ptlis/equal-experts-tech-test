import {retryAsync} from "ts-retry";

export interface IProductPrice {
    readonly title: string;
    readonly price: number;
}

export interface IPricesLookup {
    get(product: string): Promise<IProductPrice>;
}

export class PricesLookup {
    async get(product: string): Promise<IProductPrice> {
        return await retryAsync(
            async () => fetch(`https://equalexperts.github.io/backend-take-home-test-data/${product}.json`)
                .then(response => response.json()),
            { delay: 100, maxTry: 5 },
        );
    }
}
