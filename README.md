# Easy Modal #

This is an object that allows for easy creation of modals.

A modal here consists of the following:

- A content area that is hidden and becomes visible and dominant when a button is clicked
- A button that unhides the modal when clicked
- A button the hides the modal when clicked

## How to use it? ##

Add the module to the environment...

Create an instance of `EasyModal` providing the id of the `<div>` that should be converted to a modal:

``` JavaScript
new EasyModal('#my-modal')
```

`EasyModal` generates the necessary elements and provides default styling for this element.

### How to override styling? ###
