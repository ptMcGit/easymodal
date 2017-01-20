# Easy Modal #

This module provides a simple implementation of modals.

A modal here consists of the following:

- A content area that is hidden and appears as the dominant element in the foreground when a button is clicked
- A button that unhides the modal when clicked
- A button the hides the modal when clicked
- An element that emphasizes the modal and de-emphasizes the background

Multiple modals can exist on a single page, without conflicts.

## How to use it? ##

Create a button for your modal, and assign it an id.

You can create the modal from a single `<div>`; or, if you have multiple elements for use with your modal you'll want to wrap these in a `<div>`.
This element should also be assigned an id.

Add the module to the environment...

Create an instance of `EasyModal` providing the id of the `<div>` that should be converted to a modal, and the button that should activate it as strings:

``` JavaScript
new EasyModal('#photos', '#photos-button');
```

This causes all the necessary elements, styles, and event listeners to be created.

## How does it work? ##

The `EasyModal` instance creates several complementary elements, which is a DOM element inside of a wrapper.
Each of these has a generic `class` and `id`.
The `id` is the generic class prefixed with the `id` of the first argument used to instantiate the `EasyModal` instance.

Simply put, there are three elements created by the `EasyModal` instance.
Descriptions of each component by way of class follow.

The `modal-outside` `<div>` serves as a container for modal content.
The `modal-close` button, which closes the modal, is placed inside `modal-outside`.
Just below `modal-outside` is the `modal-transparency` `<div>`, which is used to de-emphasized the rest of the page when the modal is active.

Event listeners are set up so that the modal button activates the modal.
Once the modal is activated it can be closed by click the `modal-close` button, or clicking outside of the modal content area.

`EasyModal` generates a default stylesheet.
`EasyModal` will not generate a default stylesheet under two conditions:

1. There is an existing stylesheet with an `id` of `EasyModal`.
2. When an `EasyModal` is instantiated with a third argument of `true`

If the default stylesheet is not bypassed, it is prepended to the list of stylesheets.
This, combined with the fact that each component is classed and ID'ed, makes the default styles easy to override.

## Testing ##

A rudimentary test suite is included.
Simply open the `./tests.html` file in a browser and follow the links to each spec.
