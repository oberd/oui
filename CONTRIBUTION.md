##  Contributing to Oui!

To contribute to Oui! please submit a pull request, preferably with the code separated into a descriptive branch name.

For instance, if I am adding a dialog component, I would create a pull request into master form a branch called `dialog`.

### Testing

Please ensure that your components are well tested.  What this means is up to you, but just know that the tests in this library are meant to be the end all be all of whether or not your component is working as expected.  If your tests are not complete, you will run the risk of breaking changes coming unknowingly down the line.

### Examples / Documentation

Demos and examples are an important part of expanding use (and usefulness) of your component.  To add an example, you will need to do a few things:

* Add a folder to the `docs/src` folder, with the same name as your component
* Add content files (see `docs/src/List` for example)
  * Example usage file - this should provide the expected use of your component in an easy to understand form.
  * Markdown description file - Plain language documentation to be shown on the components home page
  * Manifest file - specifies computer readable attributes of your component for display, such as customizable properties.
* Add an entry to `docs/src/manifest.js`
