# Equal Experts Tech Test

## AI Declaration

No AI of any kind was used to create this solution.

## Running the code

Install dependencies via `npm install` and then run the tests with `npm test`.

## Solution

The solution consists of a small number of interfaces and two classes; the first class is PricesLookup and provides an
asynchronous API for accessing price data; the second is a shopping cart that implements the minimal required
functionality to fulfuil the brief, making use of an IPricesLookup implementation to retrieve price data.

Unit tests are provided for the Cart implementation and integration tests are provided for the PricesLookup class and
the ShoppingCart class when used in conjunction with it (i.e. accessing the real API).

## Considerations not addressed
 
* No data validation was implemented;
  * The 'add' operation should accept only positive integers as quantities.
  * As part of supporting currencies would likely want to restrict a cart to single currency only.
  * Although the task enumerated only 5 items I chose to not validate against that list as this is it's a realistic 
    expectation for a real shopping cart to have a specific list of valid products. In a production system you'd have
    handing of HTTP errors for (e.g.) 404s and would convert that to some kind of useful exception for the library
    consumer to handle in a manner appropriate to it's purpose.
* I have omitted proper error handling for (e.g.) HTTP errors encountered when interacting with the prices API.
* Functionality that would obviously be required in a real system has been omitted; e.g. the ability to enumerate
  products and quantities contained within; the ability to reduce the quantity of a product in the cart; the ability to
  remove an item from the cart.
* If this was a real system I would likely make use of a library providing currency value objects - specifically this
  would provide financially safe ways of manipulating numbers and prevent nonsense operations like adding together 
  monetary amounts that are different currencies.
* Values that would typically be configuration-drive (such as hostnames) have been hardcoded for simplicity and
  expediency.
* In a real shopping cart;
  * Price data typically would include currency data.
  * Tax would be calculated on a per item basis, not on the cart as a whole.
  * Typically you would have tax rates defined on a per-item basis as not everything is taxed at the same rate; e.g. in
    the UK some items (such as children's clothing) are VAT-free and other items (such as heating oil) is VAT-Reduced.
    Other countries have similar tax requirements.
  * Some method of persistence and retrieval would be required; this has been consciously omitted as per the spec.

## Considerations addressed

* When possible data has been encoded into immutable datastructures.
* As it was trivial to do so a retry library is included to give the prices component a basic level of robustness with
  respect to dependant service availability.
