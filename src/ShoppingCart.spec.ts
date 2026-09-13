import {describe, expect, test} from '@jest/globals';
import {ShoppingCart} from "./ShoppingCart";
import {IPricesLookup, PricesLookup} from "./Prices";

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

    test('Test adding single product to basket', async () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        await cart.add("cheerios", 2);

        expect(cart.subTotal).toBeCloseTo(0.4);
        expect(cart.tax).toBeCloseTo(0.05);
        expect(cart.total).toBeCloseTo(0.45);
    });

    test('Test adding more of the same product to the basket', async () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        await cart.add("cheerios", 2);
        const cartItem = await cart.add("cheerios", 4);

        expect(cartItem.quantity).toBe(6);
        expect(cart.subTotal).toBeCloseTo(1.2);
        expect(cart.tax).toBeCloseTo(0.16);
        expect(cart.total).toBeCloseTo(1.36);
    });

    test('Test calculation of cart subtotal, tax and total', async () => {
        const cart = new ShoppingCart(mockPricesLookup, 12.5);
        await cart.add("cheerios", 3);
        await cart.add("weetabix", 4);

        expect(cart.subTotal).toBeCloseTo(4.6);
        expect(cart.tax).toBeCloseTo(0.58);
        expect(cart.total).toBeCloseTo(5.18);
    });
});


describe('Integration tests for ShoppingCart component', () => {
    test('Test adding single product to basket', async () => {
        const cart = new ShoppingCart(new PricesLookup(), 12.5);
        await cart.add("cheerios", 2);

        expect(cart.subTotal).toBeCloseTo(16.86);
        expect(cart.tax).toBeCloseTo(2.11);
        expect(cart.total).toBeCloseTo(18.97);
    });

    test('Test adding more of the same product to the basket', async () => {
        const cart = new ShoppingCart(new PricesLookup(), 12.5);
        await cart.add("cheerios", 2);
        const cartItem = await cart.add("cheerios", 4);

        expect(cartItem.quantity).toBe(6);
        expect(cart.subTotal).toBeCloseTo(50.58);
        expect(cart.tax).toBeCloseTo(6.33);
        expect(cart.total).toBeCloseTo(56.91);
    });

    test('Test calculation of cart subtotal, tax and total', async () => {
        const cart = new ShoppingCart(new PricesLookup(), 12.5);
        await cart.add("cheerios", 3); // 8.43 * 3 = 25.29
        await cart.add("weetabix", 4); // 9.98 * 4 = 39.92

        expect(cart.subTotal).toBeCloseTo(65.21);
        expect(cart.tax).toBeCloseTo(8.16);
        expect(cart.total).toBeCloseTo(73.37);
    });
})
