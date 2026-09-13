import {describe, expect, test} from "@jest/globals";
import {PricesLookup} from "./Prices";

describe('Integration tests for Prices component', () => {
    test('Lookup an item from the API', async () => {
        const pricesLookup = new PricesLookup();

        const priceData = await pricesLookup.get("cheerios");

        expect(priceData.price).toBeCloseTo(8.43);
    });
})
