//Copyright 2015, Oberd (Universal Research Solutions)

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['jquery', 'underscore', 'backbone', 'react.backbone'], factory);
    } else {
        // Browser globals
        root.Oui = factory(root.$, root._, root.Backbone, root.React);
    }
}(this, function ($, _, Backbone, React) {
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("bower_components/almond/almond", function(){});

define('jsx',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});

/*global define */
define('jsx!Oui/List/EmptyMessage',['require','react'],function (require) {
  
  var React = require('react');
  var EmptyMessage = React.createClass({displayName: 'EmptyMessage',
    getDefaultProps: function () {
      return { message: 'No items found' };
    },
    render: function () {
      return React.createElement("div", null, this.props.message);
    }
  });
  return EmptyMessage;
});


/*global define */
define('jsx!Oui/Icon/Icon',['require','react.backbone'],function (require) {

  
  var React = require('react.backbone');

  var Icon = React.createClass({displayName: 'Icon',
    getDefaultProps: function () {
      return { name: 'user' };
    },
    render: function () {
      var className = 'icomoon icomoon-' + this.props.name;
      delete this.props.name;
      return React.createElement("span", React.__spread({},  this.props, {className: className}));
    }
  });
  return Icon;
});


/*global define */
define('jsx!Oui/Loader/Loader',['require','react','jsx!../Icon/Icon'],function (require) {
  
  var React = require('react');
  var Icon = require('jsx!../Icon/Icon');
  var Loader = React.createClass({displayName: 'Loader',
    getDefaultProps: function () {
      return { on: false };
    },
    render: function () {
      var classList = React.addons.classSet({
        'off': !this.props.on,
        'on': this.props.on,
        'oui-loader': true
      });
      return (
        React.createElement("div", {className: classList}, 
          React.createElement("span", {className: "oui-button-icon u-circle text-center"}, 
            React.createElement("span", {className: "a-spin"}, React.createElement(Icon, {name: "refresh"}))
          )
        )
      );
    }
  });
  return Loader;
});

/*global define */

define('Oui/Error/ImproperUse',['require'],function (require) {
  
  function ImproperUse(message, url) {
    this.message = message;
    this.url = url;
  }
  ImproperUse.prototype.toString = function () {
    var err = 'Oui Error [ ImproperUse ] ' + this.message;
    if (this.url) {
       err += ' find out more at ' + this.url;
    }
    return err;
  }
  return ImproperUse;
});


/*global define */

define('jsx!Oui/List/List',['require','underscore','jquery','react.backbone','jsx!./EmptyMessage','jsx!../Loader/Loader','../Error/ImproperUse'],function (require) {
  

  var _ = require('underscore');
  var $ = require('jquery');
  var React = require('react.backbone');
  var EmptyMessage = require('jsx!./EmptyMessage');
  var DefaultLoader = require('jsx!../Loader/Loader');
  var ImproperUseError = require('../Error/ImproperUse');

  var Row = React.createBackboneClass({
    render: function () {
      return React.createElement("li", null, "Please customize this row component ", this.getModel().id);
    }
  });

  var List = React.createBackboneClass({
    getInitialState: function () {
      return { loading: false, currentIndex: -1 };
    },
    getDefaultProps: function () {
      return {
        row: Row,
        empty: EmptyMessage,
        loader: DefaultLoader,
        onSelect: function () {}
      };
    },
    componentWillMount: function () {
      this.startLoadingBind = _.bind(this.startLoading, this);
      this.stopLoadingBind = _.bind(this.stopLoading, this);
      if (typeof this.props.collection === 'undefined') {
        throw new ImproperUseError('List requires a collection property.  Please provide a Backbone compatible collection.');
      }
    },
    bindLoading: function (onOrOff) {
      this.getCollection()[onOrOff]('request', this.startLoadingBind);
      this.getCollection()[onOrOff]('sync error', this.stopLoadingBind);
      var $contain = $(this.refs.container.getDOMNode());
      $contain[onOrOff]('keydown', function (e) {
        if (e.which === 38 || e.which === 40 || e.which === 13) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    },
    componentDidMount: function () {
      this.bindLoading('on');
    },
    componentWillUnmount: function () {
      this.bindLoading('off');
    },
    startLoading: function () {
      this.setState({ loading: true });
    },
    stopLoading: function () {
      this.setState({ loading: false });
    },
    selectNext: function () {
      this.setState({
        currentIndex: this.clampIndex(this.state.currentIndex + 1)
      });
    },
    selectPrevious: function () {
      this.setState({
        currentIndex: this.clampIndex(this.state.currentIndex - 1)
      });
    },
    clampIndex: function (index) {
      var length = this.getCollection().length;
      if (index <= -1) {
        index = length - 1;
      }
      return index % length;
    },
    handleKeyDown: function (e) {
      if (e.which === 40) {
        this.selectNext();
      } else if (e.which === 38) {
        this.selectPrevious();
      } else if (e.which === 13) {
        var model = this.getCollection().at(this.state.currentIndex);
        if (model) {
          this.props.onSelect(model);
          this.setState({ currentIndex: -1 });
        }
      } else if (e.which === 27) {
        this.setState({ currentIndex: -1 });
      }
    },
    renderList: function () {
      var selected = this.state.currentIndex;
      var Row = this.props.row;
      return (
        React.createElement("ul", {className: "oui-list"}, 
          this.getCollection().map(function (m, index) {
            return React.createElement(Row, {key: m.id, model: m, selected: selected === index});
          })
        )
      );
    },
    render: function () {
      var EmptyElement = this.props.empty;
      var Loader = this.props.loader;
      var listContent = this.getCollection().length ? this.renderList() : React.createElement(EmptyElement, null);
      return (
        React.createElement("div", {ref: "container", className: "oui-list-container", tabIndex: "0", onKeyUp: this.handleKeyDown}, 
          React.createElement(Loader, {on: this.state.loading}), 
          listContent
        )
      );
    }
  });

  return List;
});

/*global define */

define('Oui/Error/InterfaceError',['require'],function (require) {
  
  function InterfaceError(message, url) {
    this.message = message;
  }
  InterfaceError.prototype.toString = function () {
    return 'Oui Error [ InterfaceError ] ' + this.message;
  }
  return InterfaceError;
});

/*global define */

define('Oui/Form/Validators/AbstractValidator',['require','Oui/Error/InterfaceError'],function (require) {
  
  var InterfaceError = require('Oui/Error/InterfaceError');

  function AbstractValidator() {
    if (typeof this.validate !== 'function' || this.validate.length !== 1) {
      throw new InterfaceError('Validator requires implementation of a validate(value) function');
    }
    this.message = 'Invalid Value';
  }

  AbstractValidator.prototype.getValidationError = function (value) {
    if ( !this.validate(value) ) {
      return this.message;
    }
  };

  return AbstractValidator;
});

/*global define */

define('Oui/Form/Validator',['require','underscore','./Validators/AbstractValidator'],function (require) {
  
  var _ = require('underscore');
  var AbstractValidator = require('./Validators/AbstractValidator');

  function Validator() {
    this._validations = [];
  }

  Validator.prototype.addValidations = function (/* validator, validator2, ... */) {
    var self = this;
    _.each(arguments, function (validator) {
      self.addValidation(validator);
    });
  };

  Validator.prototype.addValidation = function (validator) {
    this._validations.push(validator);
  };

  Validator.prototype.getValidationErrors = function (value) {
    var errs = [];
    if (this._validations.length) {
      errs = _.unique(_.compact(_.map(this._validations, function (validator) {
        return validator.getValidationError(value);
      })));
    }
    return errs;
  };

  Validator.prototype.hasValidations = function () {
    return this._validations.length > 0;
  };

  return Validator;
});

/*global define */

define('Oui/Form/Validators/RegExp',['require','./AbstractValidator'],function (require) {
  

  var Validator = require('./AbstractValidator');

  function RegExValidator(regex, message) {
    Validator.apply(this);
    this.regex = regex;
    this.message = message || 'Invalid value';
  }

  RegExValidator.prototype = Object.create(Validator.prototype);

  RegExValidator.prototype.validate = function (value) {
    return value.match(this.regex);
  };

  return RegExValidator;
});


/*global define */
define('jsx!Oui/Form/TextField',['require','underscore','react','./Validator','./Validators/RegExp'],function (require) {
  

  var _ = require('underscore');
  var React = require('react');

  var Validator = require('./Validator');
  var RegExpValidator = require('./Validators/RegExp');

  var counter = 0;

  var TextInput = React.createClass({displayName: 'TextInput',
    propTypes: {
      icon: React.PropTypes.node,
      validator: React.PropTypes.instanceOf(Validator),
      pattern: React.PropTypes.string,
      onChange: React.PropTypes.func,
      title: React.PropTypes.node
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.validator) {
        this._validator = nextProps.validator;
      }
      this.receivePattern(nextProps.pattern);
    },
    componentWillMount: function () {
      this.props.inputId = 'oui_textfield_' + counter;
      if (!this._validator) {
        this._validator = this.props.validator || new Validator();
      }
      this.receivePattern(this.props.pattern);
      counter++;
    },
    getDefaultProps: function () {
      return {
        onChange: function () { },
        value: ''
      };
    },
    getInitialState: function () {
      return {
        focused: false,
        value: this.props.value,
        hasFocused: false
      };
    },
    receivePattern: function (pattern) {
      if (_.isString(pattern) && pattern !== this._pattern) {
        this._validator.addValidation(
          new RegExpValidator(
            new RegExp(pattern), this.props.title
          )
        );
        this._pattern = pattern;
        this.forceUpdate();
      }
    },
    handleFocus: function () {
      this.setState({ 'focused': true });
    },
    handleBlur: function () {
      this.setState({ 'focused': false, hasFocused: this.state.value.length > 0 });
    },
    handleChange: function (event) {
      var newValue = event.target.value;
      var validationErrors = this._validator.getValidationErrors(newValue);
      this.setState({
        value: newValue
      });
      if (!validationErrors.length && typeof this.props.onChange === 'function') {
        this.props.onChange(newValue);
      }
    },
    handlePlaceholderClick: function () {
      this.setState({ focused: true });
      this.refs.textInput.getDOMNode().focus();
    },
    renderPlaceholder: function () {
      var above = this.state.value.length > 0;
      var classes = React.addons.classSet({
        'placeholder': true,
        't-1': true,
        'u-reset-translate': !above,
        'u-translate-up': above
      });
      return React.createElement("label", {htmlFor: this.props.inputId, className: classes, onClick: this.handlePlaceholderClick}, this.props.placeholder);
    },
    renderHelp: function (isErrored, errorText) {
      var errors = '';
      var help = this.props.help || '\u00a0';
      var classes = React.addons.classSet({
        'help': true,
        't-1': true,
        'u-reset-translate': this.state.focused,
        'u-translate-up': !this.state.focused && !isErrored
      });
      if (isErrored) {
        errors = React.createElement("span", {className: "errors"}, errorText);
      }
      return React.createElement("label", {htmlFor: this.props.inputId, role: "presentation", className: classes}, help, errors);
    },
    render: function () {
      var place = this.props.placeholder ? this.renderPlaceholder() : '';
      var validationErrors = this._validator.getValidationErrors(this.state.value);
      var isValid = validationErrors.length === 0;
      var isEmpty = this.state.value.length === 0;
      var hasHelpLine = this.props.help || this._validator.hasValidations();
      var isErrored = !isValid && this.state.hasFocused && !isEmpty;
      var errorText = isErrored ? validationErrors.join(', ') : '';
      var helpLine = hasHelpLine ? this.renderHelp(isErrored, errorText) : '';
      var classes = React.addons.classSet({
        'oui-form-control': true,
        'oui-text': true,
        'focused': this.state.focused,
        'has-icon': !!this.props.icon,
        'empty': isEmpty,
        'not-empty': !isEmpty,
        'complete': !isEmpty && isValid,
        'large': this.props.large,
        'error': isErrored,
        'has-help': hasHelpLine
      });
      var inputProps = {
        'onKeyDown': this.handleKeyDown,
        'onChange': this.handleChange,
        'onFocus': this.handleFocus,
        'onBlur': this.handleBlur,
        'value': this.state.value,
        'maxLength': this.props.maxLength || 524288
      };
      var icon = this.props.icon || '';
      return (
        React.createElement("div", {className: classes}, 
          place, 
          icon, 
          React.createElement("div", null, 
            React.createElement("input", React.__spread({'aria-describedby': this.props.help, id: this.props.inputId, ref: "textInput", type: "text", className: "t-1"},  inputProps))
          ), 
          helpLine
        )
      );
    }
  });
  return TextInput;
});

/*globals define:false */
define('Oui/Oui',['require','jsx!./List/List','jsx!./Icon/Icon','jsx!./Loader/Loader','jsx!./Form/TextField'],function (require) {
  
  return {
    List: require('jsx!./List/List'),
    Icon: require('jsx!./Icon/Icon'),
    Loader: require('jsx!./Loader/Loader'),
    Form: {
      TextField: require('jsx!./Form/TextField')
    }
  };
});

    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('jquery', function () {
        return $;
    });
    define('underscore', function () {
        return _;
    });
    define('backbone', function () {
        return Backbone;
    });
    define('react', function () {
        return React;
    });
    define('react.backbone', function () {
        return React;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('Oui/Oui');
}));
