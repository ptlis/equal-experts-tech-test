import {IPricesLookup} from "./Prices";

export interface ICartItem {
    readonly product: string;
    readonly price: number;
    readonly quantity: number;
}

export class ShoppingCart {
    constructor(
        private readonly _pricesLookup: IPricesLookup,
        private readonly _taxRatePercent: number,
        private readonly _items: {[key: string]: ICartItem} = {},
    ) {
    }

    async add(product: string, quantity: number): Promise<ICartItem> {
        this._items[product] = (this._items[product] && this._items.hasOwnProperty(product))
            ? {
                product: product,
                price: this._items[product].price,
                quantity: this._items[product].quantity + quantity,
            }
            : {
                product: product,
                price: (await this._pricesLookup.get(product)).price,
                quantity: quantity,
            }

        return Promise.resolve(this._items[product]);
    }

    get subTotal(): number {
        return Object.keys(this._items).map(key => this._items[key]).reduce(
            (acc, current) =>
                current ? acc + (current.price * current.quantity) : acc,
            0
        );
    }

    get tax(): number {
        return Math.ceil(this.subTotal * this._taxRatePercent) / 100;
    }

    get total(): number {
        return this.subTotal + this.tax;
    }
}
