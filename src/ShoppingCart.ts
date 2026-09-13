import {IPricesLookup} from "./Prices";

export interface ICartItem {
    readonly productName: string;
    readonly basePrice: number;
    quantity: number;
}

export class ShoppingCart {
    constructor(
        private _pricesLookup: IPricesLookup,
        private _taxRate: number,
        private _items: {[key: string]: ICartItem} = {},
    ) {
        // Quiet the compiler
        this._pricesLookup;
        this._taxRate;
        this._items;
    }

    public add(product: string, quantity: number) {
        // Quiet compiler for now
        product;
        quantity;
        // TODO: Real implementation
    }

    get subTotal(): number {
        return 0;
        // TODO: Real implementation
    }

    get tax(): number {
        return 0;
        // TODO: Real implementation
    }

    get total(): number {
        return 0;
        // TODO: Real implementation
    }
}
