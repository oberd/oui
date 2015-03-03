### Oui!

UI components for building smart health applications

[Github Repo](https://github.com/oberd/oui)

[![Build Status](https://jenkins.medamine.com/buildStatus/icon?job=oui)](https://jenkins.medamine.com/job/oui/)

### Installation

```
bower install --save git@github.com:oberd/oui.git
```

### Usage

Designed for use with require.js, but there is basic support for browser globals if require.js (or another package loader) is unavailable.  With require.js, load the components directly from the `src` folder.  With browser globals, you will have to load all of the components in a concatenated file `dist/oui.js`  You can find example usage of specific components in the menu on the left.


### Overview

Oui has the goal of standardizing user interface components for all Oberd Platform Applications.

Components should have these goals in mind:

* Accessibile
* Well tested
* Keyboard Enabled
* Progressively enhanced (with a baseline assumption of Javascript)
* Browser support: IE8+

### Getting Started

```
./tools/init.sh
```

### Contribution

More information on creating your own component can be found in the [Contribution Guide](https://github.com/oberd/oui/blob/master/CONTRIBUTION.md)

### Development Commands

* `gulp serve` - Start a server for mocha tests and documentation.  Use this command for active development
* `gulp build` - Compiles dist folder from source
* `gulp test` - Runs mocha tests in phantomjs

### Directory Structure

<pre>
|-- assets   # Any static assets for use in the compilation / build step
|-- dist     # Compiled files for use with browser globals, compiled CSS
|-- docs
|   `-- src  # Example source code.
|-- src      # Component source, one component per folder please.
|-- test     # Specifications and test files
`-- tools    # Random utilities and build tools
</pre>
