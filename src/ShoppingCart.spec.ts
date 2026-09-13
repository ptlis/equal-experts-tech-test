import {describe, expect, test} from '@jest/globals';
import {ShoppingCart} from "./ShoppingCart";
import {IPricesLookup} from "./Prices";

describe('Unit tests for ShoppingCart component', () => {
    const mockPricesLookup: IPricesLookup = {
        get: (productName: string) => {
            const product = {
                "cheerios": {
                    title: "cheerios",
                    price: 0.2,
                },
                "cornflakes": {
                    title: "cornflakes",
                    price: 0.4,
                },
                "frosties": {
                    title: "frosties",
                    price: 0.6,
                },
                "shreddies": {
                    title: "shreddies",
                    price: 0.8,
                },
                "weetabix": {
                    title: "weetabix",
                    price: 1.0,
                },
            }[productName];

            if (!product) throw `Invalid product name ${productName}`;

            return Promise.resolve(product)
        },
    }

    test('Test adding single product to basket', () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        cart.add("cheerios", 2);

        expect(cart.subTotal).toBe(0.4);
        expect(cart.tax).toBe(0.05);
        expect(cart.total).toBe(0.45);
    });

    test('Test adding more of the same product to the basket', () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        cart.add("cheerios", 2);
        cart.add("cheerios", 4);

        expect(cart.subTotal).toBe(1.4);
        expect(cart.tax).toBe(0.15);
        expect(cart.total).toBe(1.55);
    });

    test('Test calculation of cart subtotal, tax and total', () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        cart.add("cheerios", 3);
        cart.add("weetabix", 4);

        expect(cart.subTotal).toBe(4.6);
        expect(cart.tax).toBe(0.57);
        expect(cart.total).toBe(5.17);
    });
});
