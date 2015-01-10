### Oberd Oui!

[![Build Status](https://jenkins.medamine.com/buildStatus/icon?job=oui)](https://jenkins.medamine.com/job/oui/)

Oui has the goal of standardizing a User Interface platform for all Oberd Platform Applications.

Components should have these goals in mind:

* Accessibile
* Well tested
* Keyboard Enabled
* Progressively enhanced (with a baseline assumption of Javascript)
* Browser support: IE8+

### Getting Started

```sh
./tools/init.sh
```

### Contribution

More information on creating your own component can be found in the [Contribution Guide](https://github.com/oberd/oui/blob/master/CONTRIBUTION.md)

### Development Commands

* `gulp serve` - Start a server for mocha tests and documentation.  Use this command for active development
* `gulp build` - Compiles dist folder from source
* `gulp test` - Runs mocha tests in phantomjs

### Directory Structure

```
|-- dist     # Compiled files for use with browser globals, compiled CSS
|-- docs
|   `-- src  # Example source code.
|-- src      # Component source, one component per folder please.
|-- test     # Specifications and test files
`-- tools    # Random utilities and build tools
```
