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
define('jsx!Oui/List/EmptyMessage',['require','react'],function(require) {
    var React = require('react');
    var EmptyMessage = React.createClass({displayName: 'EmptyMessage',
        propTypes: {
            message: React.PropTypes.string
        },
        getDefaultProps: function() {
            return { message: 'No items found' };
        },
        render: function() {
            return React.createElement("div", null, this.props.message);
        }
    });
    return EmptyMessage;
});


/*global define */
define('jsx!Oui/Icon/Icon',['require','react.backbone'],function(require) {
    var React = require('react.backbone');

    var Icon = React.createClass({displayName: 'Icon',
        propTypes: {
            name: React.PropTypes.string
        },
        getDefaultProps: function() {
            return { name: 'user' };
        },
        render: function() {
            var className = 'icomoon icomoon-' + this.props.name;
            delete this.props.name;
            return React.createElement("span", React.__spread({},  this.props, {className: className}));
        }
    });
    return Icon;
});

/*global define */
define('Oui/Utilities/classnames',[],function() {
    function classNames() {
        var args = arguments;
        var classes = [];

        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (!arg) {
                continue;
            }

            if (typeof arg === 'string' || typeof arg === 'number') {
                classes.push(arg);
            } else if (typeof arg === 'object') {
                for (var key in arg) {
                    if (!arg.hasOwnProperty(key) || !arg[key]) {
                        continue;
                    }
                    classes.push(key);
                }
            }
        }
        return classes.join(' ');
    }
    return classNames;
});


/*global define */
define('jsx!Oui/Loader/Loader',['require','react','jsx!Oui/Icon/Icon','Oui/Utilities/classnames'],function(require) {
    var React = require('react');
    var Icon = require('jsx!Oui/Icon/Icon');
    var classnames = require('Oui/Utilities/classnames');
    var Loader = React.createClass({displayName: 'Loader',
        propTypes: {
            on: React.PropTypes.bool
        },
        getDefaultProps: function() {
            return { on: false };
        },
        render: function() {
            var classList = classnames({
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
define('Oui/Error/ImproperUse',[],function() {
    function ImproperUse(message, url) {
        this.message = message;
        this.url = url;
    }
    ImproperUse.prototype.toString = function() {
        var err = 'Oui Error [ ImproperUse ] ' + this.message;
        if (this.url) {
            err += ' find out more at ' + this.url;
        }
        return err;
    };
    return ImproperUse;
});


/*global define */

define('jsx!Oui/List/List',['require','underscore','jquery','react.backbone','jsx!Oui/List/EmptyMessage','jsx!Oui/Loader/Loader','Oui/Error/ImproperUse'],function(require) {
    var _ = require('underscore');
    var $ = require('jquery');
    var React = require('react.backbone');

    var EmptyMessage = require('jsx!Oui/List/EmptyMessage');
    var DefaultLoader = require('jsx!Oui/Loader/Loader');
    var ImproperUseError = require('Oui/Error/ImproperUse');
    var PropTypes = React.PropTypes;

    var Row = React.createBackboneClass({
        render: function() {
            return React.createElement("li", null, "Please customize this row component ", this.getModel().id);
        }
    });

    var List = React.createBackboneClass({
        propTypes: {
            row: PropTypes.func,
            empty: PropTypes.func,
            loader: PropTypes.func,
            onSelect: PropTypes.func
        },
        getInitialState: function() {
            return { loading: false, currentIndex: -1 };
        },
        getDefaultProps: function() {
            return {
                row: Row,
                empty: EmptyMessage,
                loader: DefaultLoader,
                onSelect: function() {}
            };
        },
        componentWillMount: function() {
            this.startLoadingBind = _.bind(this.startLoading, this);
            this.stopLoadingBind = _.bind(this.stopLoading, this);
            if (typeof this.props.collection === 'undefined') {
                throw new ImproperUseError('List requires a collection property.  Please provide a Backbone compatible collection.');
            }
        },
        bindLoading: function(onOrOff) {
            this.getCollection()[onOrOff]('request', this.startLoadingBind);
            this.getCollection()[onOrOff]('sync error', this.stopLoadingBind);
            var $contain = $(this.refs.container.getDOMNode());
            $contain[onOrOff]('keydown', function(e) {
                if (e.which === 38 || e.which === 40 || e.which === 13) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        },
        componentDidMount: function() {
            this.bindLoading('on');
        },
        componentWillUnmount: function() {
            this.bindLoading('off');
        },
        startLoading: function() {
            this.setState({ loading: true });
        },
        stopLoading: function() {
            this.setState({ loading: false });
        },
        selectNext: function() {
            this.setState({
                currentIndex: this.clampIndex(this.state.currentIndex + 1)
            });
        },
        selectPrevious: function() {
            this.setState({
                currentIndex: this.clampIndex(this.state.currentIndex - 1)
            });
        },
        clampIndex: function(index) {
            var length = this.getCollection().length;
            var currIndex = index;
            if (currIndex <= -1) {
                currIndex = length - 1;
            }
            return currIndex % length;
        },
        handleKeyDown: function(e) {
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
        renderList: function() {
            var selected = this.state.currentIndex;
            var ListRow = this.props.row;
            return (
                React.createElement("ul", {className: "oui-list"}, 
                    this.getCollection().map(function(m, index) {
                        return React.createElement(ListRow, {key: m.id, model: m, selected: selected === index});
                    })
                )
            );
        },
        render: function() {
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

/*global define, Modernizr, document, window */
define('oberd-media-query',['require','underscore','jquery','backbone'],function (require) {

  
  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');

  function MediaQuery() {
    this._breakpoints = {
      'mobile': '(min-width: 0px)',
      'tablet': '(min-width: 450px)',
      'desktop': '(min-width: 769px)',
      'wide': '(min-width: 1025px)',
      'hd': '(min-width: 1401px)'
    };
  }
  _.extend(MediaQuery.prototype, Backbone.Events);

  MediaQuery.prototype.breakpoints = function (bp) {
    if (typeof bp === 'undefined') {
      return this._breakpoints;
    } else {
      this._breakpoints = bp;
      return this;
    }
  };

  MediaQuery.prototype.update = function () {
    var self = this;
    var prev = _.clone(this.matched || []);
    this.matched = [];
    _.each(this._breakpoints, this.testBreakPoint, this);
    _.each(prev, function (key) {
      if (self.matched.indexOf(key) < 0) {
        self.trigger('unmatch:' + key);
        self.trigger('unmatch', key);
      }
    });
    _.each(this.matched, function (key) {
      if (prev.indexOf(key) < 0) {
        self.trigger('match:' + key);
        self.trigger('match', key);
      }
    });
    return this;
  };

  MediaQuery.prototype.testBreakPoint = function (mq, key) {
    var hasMq = Modernizr.mq(mq);
    if (hasMq) {
      $(document.documentElement).addClass(key);
      this.matched.push(key);
    } else {
      $(document.documentElement).removeClass(key);
    }
  };

  MediaQuery.prototype.watch = function (el, deb) {
    var mqUpdater = _.debounce(_.bind(this.update, this), deb);
    $(window).resize(mqUpdater);
    this.update();
  };

  MediaQuery.prototype.getMatched = function () {
    return _.unique(this.matched);
  };

  MediaQuery.prototype.is = function (breakpoint) {
    return this.getMatched().indexOf(breakpoint) >= 0;
  };

  return new MediaQuery();
});

/*global define */
define('Oui/Mixins/Responsive',['require','react','oberd-media-query'],function(require) {
    var React = require('react');
    var mq = require('oberd-media-query');
    var ResponsiveMixin = {
        propTypes: {
            breakpoint: React.PropTypes.string
        },
        getInitialState: function() {
            return this._getBreakpointState();
        },
        getDefaultProps: function() {
            return { breakpoint: 'tablet' };
        },
        componentDidMount: function() {
            mq.on('all', this._updateBreakpoints);
        },
        componentWillUnmount: function() {
            mq.off('all', this._updateBreakpoints);
        },
        _getBreakpointState: function() {
            return { breakpoints: mq.getMatched(), isWide: mq.is(this.props.breakpoint) };
        },
        _updateBreakpoints: function() {
            this.setState(this._getBreakpointState());
        }
    };
    return ResponsiveMixin;
});


/*global define */
define('jsx!Oui/Button/IconButton',['require','underscore','react','Oui/Mixins/Responsive','jsx!Oui/Icon/Icon'],function(require) {
    var _ = require('underscore');
    var React = require('react');
    var ResponsiveMixin = require('Oui/Mixins/Responsive');
    var Icon = require('jsx!Oui/Icon/Icon');
    var IconButton = React.createClass({displayName: 'IconButton',
        mixins: [ResponsiveMixin],
        propTypes: {
            icon: React.PropTypes.string.isRequired,
            children: React.PropTypes.node,
            breakpoint: React.PropTypes.string
        },
        render: function() {
            var props = _.omit(this.props, 'icon', 'children', 'breakpoint');
            props.className = [props.className || '', 'oui-button'].join(' ');
            var icon = this.props.icon ? React.createElement(Icon, {name: this.props.icon}) : React.createElement("span", null);
            var btn;
            if (this.props.icon) {
                btn = this.state.isWide ? React.createElement("button", React.__spread({},  props), icon, " ", this.props.children) : React.createElement("button", React.__spread({},  props), icon);
            } else {
                btn = React.createElement("button", React.__spread({},  props), this.props.children);
            }
            return btn;
        }
    });
    return IconButton;
});


/*global define */
define('jsx!Oui/Button/IconLink',['require','underscore','react','Oui/Mixins/Responsive','jsx!Oui/Icon/Icon'],function(require) {
    var _ = require('underscore');
    var React = require('react');
    var ResponsiveMixin = require('Oui/Mixins/Responsive');
    var Icon = require('jsx!Oui/Icon/Icon');
    var Link = React.createClass({displayName: 'Link',
        mixins: [ResponsiveMixin],
        propTypes: {
            icon: React.PropTypes.string.isRequired,
            children: React.PropTypes.node,
            breakpoint: React.PropTypes.string
        },
        render: function() {
            var props = _.omit(this.props, 'icon', 'children', 'breakpoint');
            var icon = this.props.icon ? React.createElement(Icon, {name: this.props.icon}) : React.createElement("span", null);
            var anchor;
            if (this.props.icon) {
                anchor = this.state.isWide ? React.createElement("a", React.__spread({},  props), icon, " ", this.props.children) : React.createElement("a", React.__spread({},  props), icon);
            } else {
                anchor = React.createElement("a", React.__spread({},  props), this.props.children);
            }
            return anchor;
        }
    });
    return Link;
});

/*global define */

define('Oui/Form/Validator',['require','underscore'],function(require) {
    var _ = require('underscore');

    function Validator() {
        this._validations = [];
    }

    Validator.prototype.addValidations = function(/* validator, validator2, ... */) {
        var self = this;
        _.each(arguments, function(validator) {
            self.addValidation(validator);
        });
    };

    Validator.prototype.addValidation = function(validator) {
        this._validations.push(validator);
    };

    Validator.prototype.getValidationErrors = function(value) {
        var errs = [];
        if (this._validations.length) {
            errs = _.unique(_.compact(_.map(this._validations, function(validator) {
                return validator.getValidationError(value);
            })));
        }
        return errs;
    };

    Validator.prototype.hasValidations = function() {
        return this._validations.length > 0;
    };

    return Validator;
});

/*global define */
define('Oui/Error/InterfaceError',[],function() {
    function InterfaceError(message) {
        this.message = message;
    }
    InterfaceError.prototype.toString = function() {
        return 'Oui Error [ InterfaceError ] ' + this.message;
    };
    return InterfaceError;
});

/*global define */
define('Oui/Form/Validators/AbstractValidator',['require','Oui/Error/InterfaceError'],function(require) {
    var InterfaceError = require('Oui/Error/InterfaceError');

    function AbstractValidator() {
        if (typeof this.validate !== 'function' || this.validate.length !== 1) {
            throw new InterfaceError('Validator requires implementation of a validate(value) function');
        }
        this.message = 'Invalid Value';
    }

    AbstractValidator.prototype.getValidationError = function(value) {
        if ( !this.validate(value) ) {
            return this.message;
        }
    };

    return AbstractValidator;
});

/*global define */
define('Oui/Form/Validators/RegExp',['require','Oui/Form/Validators/AbstractValidator'],function(require) {
    var Validator = require('Oui/Form/Validators/AbstractValidator');

    function RegExValidator(regex, message) {
        Validator.apply(this);
        this.regex = regex;
        this.message = message || 'Invalid value';
    }

    RegExValidator.prototype = Object.create(Validator.prototype);

    RegExValidator.prototype.validate = function(value) {
        return value.match(this.regex);
    };

    return RegExValidator;
});


/*global define */
define('jsx!Oui/Form/TextField',['require','underscore','react','Oui/Form/Validator','Oui/Form/Validators/RegExp','Oui/Utilities/classnames'],function(require) {
    var _ = require('underscore');
    var React = require('react');

    var Validator = require('Oui/Form/Validator');
    var RegExpValidator = require('Oui/Form/Validators/RegExp');
    var classnames = require('Oui/Utilities/classnames');

    var counter = 0;

    var TextInput = React.createClass({displayName: 'TextInput',
        propTypes: {
            icon: React.PropTypes.node,
            validator: React.PropTypes.instanceOf(Validator),
            pattern: React.PropTypes.string,
            onChange: React.PropTypes.func,
            onEnter: React.PropTypes.func,
            title: React.PropTypes.node,
            disabled: React.PropTypes.bool,
            placeholder: React.PropTypes.string,
            maxLength: React.PropTypes.number,
            help: React.PropTypes.string,
            value: React.PropTypes.string,
            label: React.PropTypes.string,
            large: React.PropTypes.bool
        },
        componentWillMount: function() {
            this.inputId = 'oui_textfield_' + counter;
            if (!this._validator) {
                this._validator = this.props.validator || new Validator();
            }
            this.receivePattern(this.props.pattern);
            counter++;
        },
        componentWillReceiveProps: function(nextProps) {
            if (nextProps.validator) {
                this._validator = nextProps.validator;
            }
            this.receivePattern(nextProps.pattern);
        },
        getDefaultProps: function() {
            return {
                onChange: function() { },
                value: '',
                disabled: false
            };
        },
        getInitialState: function() {
            return {
                focused: false,
                value: this.props.value,
                hasFocused: false
            };
        },
        renderLabel: function() {
            var above = this.state.value.length > 0;
            var classes = classnames({
                't-1': true,
                'u-reset-translate': above,
                'u-translate-down': false // !above
            });
            return React.createElement("label", {htmlFor: this.inputId, className: classes, onClick: this.handleLabelClick}, this.props.label);
        },
        renderHelp: function(isErrored, errorText) {
            var errors = '';
            var help = this.props.help || '\u00a0';
            var classes = classnames({
                'help': true,
                't-1': true,
                'u-reset-translate': this.state.focused,
                'u-translate-up': !this.state.focused && !isErrored
            });
            if (isErrored) {
                errors = React.createElement("span", {className: "errors"}, errorText);
            }
            return React.createElement("label", {htmlFor: this.inputId, role: "presentation", className: classes}, help, errors);
        },
        render: function() {
            var place = this.props.label ? this.renderLabel() : '';
            var validationErrors = this._validator.getValidationErrors(this.state.value);
            var isValid = validationErrors.length === 0;
            var isEmpty = this.state.value.length === 0;
            var hasHelpLine = this.props.help || this._validator.hasValidations();
            var isErrored = !isValid && this.state.hasFocused && !isEmpty;
            var errorText = isErrored ? validationErrors.join(', ') : '';
            var helpLine = hasHelpLine ? this.renderHelp(isErrored, errorText) : '';
            var classes = classnames({
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
                'maxLength': this.props.maxLength || 524288,
                'placeholder': this.props.placeholder,
                'disabled': this.props.disabled
            };
            var icon = this.props.icon || '';
            return (
                React.createElement("div", {className: classes}, 
                    place, 
                    React.createElement("div", {className: "oui-text-control"}, 
                        icon, 
                        React.createElement("div", null, 
                            React.createElement("input", React.__spread({'aria-describedby': this.props.help, id: this.inputId, ref: "textInput", type: "text", className: "t-1"},  inputProps))
                        )
                    ), 
                    helpLine
                )
            );
        },
        handleFocus: function() {
            this.setState({ 'focused': true });
        },
        handleBlur: function() {
            this.setState({ 'focused': false, hasFocused: this.state.value.length > 0 });
        },
        handleChange: function(event) {
            var newValue = event.target.value;
            var validationErrors = this._validator.getValidationErrors(newValue);
            this.setState({
                value: newValue
            });
            if (!validationErrors.length && typeof this.props.onChange === 'function') {
                this.props.onChange(newValue);
            }
        },
        handleKeyDown: function(e) {
            if (e.keyCode === 13 && typeof this.props.onEnter === 'function') {
                this.props.onEnter(this.state.value);
            }
        },
        handleLabelClick: function() {
            this.setState({ focused: true });
            this.refs.textInput.getDOMNode().focus();
        },
        receivePattern: function(pattern) {
            if (_.isString(pattern) && pattern !== this._pattern) {
                this._validator.addValidation(
                    new RegExpValidator(
                        new RegExp(pattern), this.props.title
                        )
                    );
                this._pattern = pattern;
                this.forceUpdate();
            }
        }
    });
    return TextInput;
});

/*global define */
define('Oui/PropTypes',['require','react.backbone','backbone','backbone-filtered-collection'],function(require) {
    var React = require('react.backbone');
    var Backbone = require('backbone');
    var FilteredCollection = require('backbone-filtered-collection');
    return {
        collection: React.PropTypes.oneOfType([
            React.PropTypes.instanceOf(Backbone.Collection),
            React.PropTypes.instanceOf(FilteredCollection)
        ]),
        model: React.PropTypes.instanceOf(Backbone.Model)
    };
});


/*global define */
define('jsx!Oui/Form/Select',['require','Oui/Error/ImproperUse','react.backbone','Oui/PropTypes','Oui/Utilities/classnames'],function(require) {
    var ImproperUseError = require('Oui/Error/ImproperUse');
    var React = require('react.backbone');
    var PropTypes = require('Oui/PropTypes');
    var classnames = require('Oui/Utilities/classnames');

    var counter = 0;

    var Select = React.createBackboneClass({
        propTypes: {
            collection: PropTypes.collection.isRequired,
            title: React.PropTypes.string,
            placeholder: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            label: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            optionAttribute: React.PropTypes.string,
            onChange: React.PropTypes.func,
            disabled: React.PropTypes.bool,
            help: React.PropTypes.string,
            error: React.PropTypes.bool,
            className: React.PropTypes.string
        },
        componentWillMount: function() {
            this.inputId = 'oui_select_' + counter;
            if (typeof this.props.collection === 'undefined') {
                throw new ImproperUseError('Select requires a collection property.  Please provide a Backbone compatible collection.');
            }
            counter++;
        },
        componentWillReceiveProps: function(props) {
            if (props.value !== this.props.value) {
                this.setState({ value: props.value });
            }
        },
        getDefaultProps: function() {
            return { optionAttribute: 'label', onChange: function() {}, disabled: false };
        },
        getInitialState: function() {
            return { value: this.props.value };
        },
        getClassList: function() {
            return classnames({
                'oui-form-control': true,
                'error': this.props.error
            });
        },
        onSelect: function(e) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.getCollection().get(e.target.value));
            }
        },
        renderOption: function(model) {
            var id = model.id;
            var data = model.toJSON();
            return (
                React.createElement("option", {key: id, value: id}, 
                    data[this.props.optionAttribute]
                )
            );
        },
        renderOptions: function() {
            return this.getCollection().map(this.renderOption, this);
        },
        renderPlaceholder: function() {
            var placeProp = false;
            if (typeof this.props.placeholder !== 'undefined') {
                placeProp = this.props.placeholder;
            } else if (this.props.title) {
                placeProp = this.props.title + '...';
            }
            return placeProp ? React.createElement("option", null, placeProp) : '';
        },
        renderLabel: function() {
            var label = '';
            var inputId = this.inputId;
            var labelProp = this.props.title || false;
            if (typeof this.props.label !== 'undefined') {
                labelProp = this.props.label;
            }
            if (labelProp) {
                label = React.createElement("label", {htmlFor: inputId}, labelProp);
            }
            return label;
        },
        renderHelp: function() {
            var hasHelp = this.props.help && !!this.props.help.length;
            var help = this.props.help || '\u00a0';
            var classes = classnames({
                'help': true,
                't-1': true,
                'u-reset-translate': hasHelp,
                'u-translate-up': !hasHelp
            });
            return React.createElement("label", {htmlFor: this.inputId, role: "presentation", className: classes}, help);
        },
        render: function() {
            var classList = this.getClassList();
            var options = this.renderOptions();
            var placeholderOption = this.renderPlaceholder();
            var label = this.renderLabel();
            var help = this.renderHelp();
            var className = this.props.className ? 'form-control ' + this.props.className : 'form-control';
            return (
                React.createElement("div", {className: classList}, 
                    label, 
                    React.createElement("select", {className: className, onChange: this.onSelect, value: this.state.value, name: this.inputId, disabled: this.props.disabled}, 
                        placeholderOption, 
                        options
                    ), 
                    help
                )
            );
        }
    });
    return Select;
});


/*global define*/
define('jsx!Oui/Shims/ReactSelect',['require','react','Oui/Utilities/classnames'],function(require) {
    /* disable some rules until we refactor more completely; fixing them now would
       cause conflicts with some open PRs unnecessarily. */
    /* eslint react/jsx-sort-prop-types: 0, react/sort-comp: 0, react/prop-types: 0 */
    var _extends = Object.assign || function(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var React = require('react');
    var classes = require('Oui/Utilities/classnames');

    var sizerStyle = { position: 'absolute', visibility: 'hidden', height: 0, width: 0, overflow: 'scroll', whiteSpace: 'nowrap' };

    var Input = React.createClass({
        displayName: 'AutosizeInput',

        propTypes: {
            value: React.PropTypes.any, // field value
            defaultValue: React.PropTypes.any, // default field value
            onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
            style: React.PropTypes.object, // css styles for the outer element
            className: React.PropTypes.string, // className for the outer element
            minWidth: React.PropTypes.oneOfType([// minimum width for input element
            React.PropTypes.number, React.PropTypes.string]),
            inputStyle: React.PropTypes.object, // css styles for the input element
            inputClassName: React.PropTypes.string // className for the input element
        },
        getDefaultProps: function getDefaultProps() {
            return {
                minWidth: 1
            };
        },
        getInitialState: function getInitialState() {
            return {
                inputWidth: this.props.minWidth
            };
        },
        componentDidMount: function componentDidMount() {
            this.copyInputStyles();
            this.updateInputWidth();
        },
        componentDidUpdate: function componentDidUpdate() {
            this.updateInputWidth();
        },
        copyInputStyles: function copyInputStyles() {
            if (!this.isMounted() || !window.getComputedStyle) {
                return;
            }
            var inputStyle = window.getComputedStyle(this.refs.input.getDOMNode());
            var widthNode = this.refs.sizer.getDOMNode();
            widthNode.style.fontSize = inputStyle.fontSize;
            widthNode.style.fontFamily = inputStyle.fontFamily;
            if (this.props.placeholder) {
                var placeholderNode = this.refs.placeholderSizer.getDOMNode();
                placeholderNode.style.fontSize = inputStyle.fontSize;
                placeholderNode.style.fontFamily = inputStyle.fontFamily;
            }
        },
        updateInputWidth: function updateInputWidth() {
            if (!this.isMounted() || typeof this.refs.sizer.getDOMNode().scrollWidth === 'undefined') {
                return;
            }
            var newInputWidth;
            if (this.props.placeholder) {
                newInputWidth = Math.max(this.refs.sizer.getDOMNode().scrollWidth, this.refs.placeholderSizer.getDOMNode().scrollWidth) + 2;
            } else {
                newInputWidth = this.refs.sizer.getDOMNode().scrollWidth + 2;
            }
            if (newInputWidth < this.props.minWidth) {
                newInputWidth = this.props.minWidth;
            }
            if (newInputWidth !== this.state.inputWidth) {
                this.setState({
                    inputWidth: newInputWidth
                });
            }
        },
        getInput: function getInput() {
            return this.refs.input;
        },
        focus: function focus() {
            this.refs.input.getDOMNode().focus();
        },
        select: function select() {
            this.refs.input.getDOMNode().select();
        },
        render: function render() {
            var escapedValue = (this.props.value || '').replace(/ /g, '&nbsp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
            var wrapperStyle = this.props.style || {};
            wrapperStyle.display = 'inline-block';
            var inputStyle = this.props.inputStyle || {};
            inputStyle.width = this.state.inputWidth;
            var placeholder = this.props.placeholder ? React.createElement(
                'div',
                { ref: 'placeholderSizer', style: sizerStyle },
                this.props.placeholder
            ) : null;
            return React.createElement(
                'div',
                { className: this.props.className, style: wrapperStyle },
                React.createElement('input', _extends({}, this.props, { ref: 'input', className: this.props.inputClassName, style: inputStyle })),
                React.createElement('div', { ref: 'sizer', style: sizerStyle, dangerouslySetInnerHTML: { __html: escapedValue } }),
                placeholder
            );
        }
    });

    var Value = React.createClass({

        displayName: 'Value',

        propTypes: {
            label: React.PropTypes.string.isRequired,
            onOptionLabelClick: React.PropTypes.func,
            onRemove: React.PropTypes.func,
            optionLabelClick: React.PropTypes.bool
        },

        blockEvent: function(event) {
            event.stopPropagation();
        },

        render: function() {
            var label = this.props.label;

            if (this.props.optionLabelClick) {
                label = (
                    React.createElement("a", {className: "Select-item-label__a", 
                        onMouseDown: this.blockEvent, 
                        onTouchEnd: this.props.onOptionLabelClick, 
                        onClick: this.props.onOptionLabelClick}, 
                        label
                    )
                );
            }

            return (
                React.createElement("div", {className: "Select-item"}, 
                    React.createElement("span", {className: "Select-item-icon", 
                        onMouseDown: this.blockEvent, 
                        onClick: this.props.onRemove, 
                        onTouchEnd: this.props.onRemove}, "×"), 
                    React.createElement("span", {className: "Select-item-label"}, label)
                )
            );
        }

    });

    var requestId = 0;

    var Select = React.createClass({

        displayName: 'Select',

        propTypes: {
            value: React.PropTypes.any,                // initial field value
            multi: React.PropTypes.bool,               // multi-value input
            disabled: React.PropTypes.bool,            // whether the Select is disabled or not
            options: React.PropTypes.array,            // array of options
            delimiter: React.PropTypes.string,         // delimiter to use to join multiple values
            asyncOptions: React.PropTypes.func,        // function to call to get options
            autoload: React.PropTypes.bool,            // whether to auto-load the default async options set
            placeholder: React.PropTypes.string,       // field placeholder, displayed when there's no value
            noResultsText: React.PropTypes.string,     // placeholder displayed when there are no matching search results
            clearable: React.PropTypes.bool,           // should it be possible to reset value
            clearValueText: React.PropTypes.string,    // title for the "clear" control
            clearAllText: React.PropTypes.string,      // title for the "clear" control when multi: true
            searchable: React.PropTypes.bool,          // whether to enable searching feature or not
            searchPromptText: React.PropTypes.string,  // label to prompt for search input
            name: React.PropTypes.string,              // field name, for hidden <input /> tag
            onChange: React.PropTypes.func,            // onChange handler: function(newValue) {}
            onFocus: React.PropTypes.func,             // onFocus handler: function(event) {}
            onBlur: React.PropTypes.func,              // onBlur handler: function(event) {}
            className: React.PropTypes.string,         // className for the outer element
            filterOption: React.PropTypes.func,        // method to filter a single option: function(option, filterString)
            filterOptions: React.PropTypes.func,       // method to filter the options array: function([options], filterString, [values])
            matchPos: React.PropTypes.string,          // (any|start) match the start or entire string when filtering
            matchProp: React.PropTypes.string,         // (any|label|value) which option property to filter on
            ignoreCase: React.PropTypes.bool,          // whether to perform case-insensitive filtering
            inputProps: React.PropTypes.object,        // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
            allowCreate: React.PropTypes.bool,         // wether to allow creation of new entries
            /*
            * Allow user to make option label clickable. When this handler is defined we should
            * wrap label into <a>label</a> tag.
            *
            * onOptionLabelClick handler: function (value, event) {}
            *
            */
            onOptionLabelClick: React.PropTypes.func
        },

        getDefaultProps: function() {
            return {
                value: undefined,
                options: undefined,
                disabled: false,
                delimiter: ',',
                asyncOptions: undefined,
                autoload: true,
                placeholder: 'Select...',
                noResultsText: 'No results found',
                clearable: true,
                clearValueText: 'Clear value',
                clearAllText: 'Clear all',
                searchable: true,
                searchPromptText: 'Type to search',
                name: undefined,
                onChange: undefined,
                className: undefined,
                matchPos: 'any',
                matchProp: 'any',
                ignoreCase: true,
                inputProps: {},
                allowCreate: false,

                onOptionLabelClick: undefined
            };
        },

        getInitialState: function() {
            return {
                /*
                 * set by getStateFromValue on componentWillMount:
                 * - value
                 * - values
                 * - filteredOptions
                 * - inputValue
                 * - placeholder
                 * - focusedOption
                */
                options: this.props.options,
                isFocused: false,
                isOpen: false,
                isLoading: false
            };
        },

        componentWillMount: function() {
            this._optionsCache = {};
            this._optionsFilterString = '';


            var self = this;
            this._closeMenuIfClickedOutside = function(event) {
                if (!self.state.isOpen) {
                    return;
                }
                var menuElem = self.refs.selectMenuContainer.getDOMNode();
                var controlElem = self.refs.control.getDOMNode();

                var eventOccuredOutsideMenu = self.clickedOutsideElement(menuElem, event);
                var eventOccuredOutsideControl = self.clickedOutsideElement(controlElem, event);

                // Hide dropdown menu if click occurred outside of menu
                if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
                    self.setState({
                        isOpen: false
                    }, self._unbindCloseMenuIfClickedOutside);
                }
            };

            this._bindCloseMenuIfClickedOutside = function() {
                if (!document.addEventListener && document.attachEvent) {
                    document.attachEvent('onclick', this._closeMenuIfClickedOutside);
                } else {
                    document.addEventListener('click', this._closeMenuIfClickedOutside);
                }
            };

            this._unbindCloseMenuIfClickedOutside = function() {
                if (!document.removeEventListener && document.detachEvent) {
                    document.detachEvent('onclick', this._closeMenuIfClickedOutside);
                } else {
                    document.removeEventListener('click', this._closeMenuIfClickedOutside);
                }
            };

            this.setState(this.getStateFromValue(this.props.value), function(){
                //Executes after state change is done. Fixes issue #201
                if (this.props.asyncOptions && this.props.autoload) {
                    this.autoloadAsyncOptions();
                }
        });
        },

        componentWillUnmount: function() {
            clearTimeout(this._blurTimeout);
            clearTimeout(this._focusTimeout);

            if(this.state.isOpen) {
                this._unbindCloseMenuIfClickedOutside();
            }
        },

        componentWillReceiveProps: function(newProps) {
            if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
                this.setState({
                    options: newProps.options,
                    filteredOptions: this.filterOptions(newProps.options)
                });
            }
            if (newProps.value !== this.state.value) {
                this.setState(this.getStateFromValue(newProps.value, newProps.options));
            }
        },

        componentDidUpdate: function() {
            var self = this;

            if (!this.props.disabled && this._focusAfterUpdate) {
                clearTimeout(this._blurTimeout);

                this._focusTimeout = setTimeout(function() {
                    self.getInputNode().focus();
                    self._focusAfterUpdate = false;
                }, 50);
            }

            if (this._focusedOptionReveal) {
                if (this.refs.focused && this.refs.menu) {
                    var focusedDOM = this.refs.focused.getDOMNode();
                    var menuDOM = this.refs.menu.getDOMNode();
                    var focusedRect = focusedDOM.getBoundingClientRect();
                    var menuRect = menuDOM.getBoundingClientRect();

                    if (focusedRect.bottom > menuRect.bottom ||
                        focusedRect.top < menuRect.top) {
                        menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
                    }
                }

                this._focusedOptionReveal = false;
            }
        },

        focus: function() {
            this.getInputNode().focus();
        },

        clickedOutsideElement: function(element, event) {
            var eventTarget = (event.target) ? event.target : event.srcElement;
            while (eventTarget != null) {
                if (eventTarget === element) return false;
                eventTarget = eventTarget.offsetParent;
            }
            return true;
        },

        getStateFromValue: function(value, optionsIn) {
            var options = optionsIn || this.state.options;

            // reset internal filter string
            this._optionsFilterString = '';

            var values = this.initValuesArray(value, options);
            var filteredOptions = this.filterOptions(options, values);

            return {
                value: values.map(function(v) { return v.value; }).join(this.props.delimiter),
                values: values,
                inputValue: '',
                filteredOptions: filteredOptions,
                placeholder: !this.props.multi && values.length ? values[0].label : this.props.placeholder,
                focusedOption: !this.props.multi && values.length ? values[0] : filteredOptions[0]
            };
        },

        initValuesArray: function(valuesIn, options) {
            var values = valuesIn;
            if (!Array.isArray(values)) {
                if (typeof values === 'string') {
                    values = values.split(this.props.delimiter);
                } else {
                    values = values ? [values] : [];
                }
            }

            return values.map(function(val) {
                var out = val;
                if (typeof val === 'string') {
                    for (var key in options) {
                        if (options.hasOwnProperty(key) && options[key] && options[key].value === val) {
                            return options[key];
                        }
                    }
                    out = { value: val, label: val };
                }
                return out;
            });
        },

        setValue: function(value, focusAfterUpdate) {
            if (focusAfterUpdate || focusAfterUpdate === undefined) {
                this._focusAfterUpdate = true;
            }
            var newState = this.getStateFromValue(value);
            newState.isOpen = false;
            this.fireChangeEvent(newState);
            this.setState(newState);
        },

        selectValue: function(value) {
            if (!this.props.multi) {
                this.setValue(value);
            } else if (value) {
                this.addValue(value);
            }
            this._unbindCloseMenuIfClickedOutside();
        },

        addValue: function(value) {
            this.setValue(this.state.values.concat(value));
        },

        popValue: function() {
            this.setValue(this.state.values.slice(0, this.state.values.length - 1));
        },

        removeValue: function(valueToRemove) {
            this.setValue(this.state.values.filter(function(value) {
                return value !== valueToRemove;
            }));
        },

        clearValue: function(event) {
            // if the event was triggered by a mousedown and not the primary
            // button, ignore it.
            if (event && event.type === 'mousedown' && event.button !== 0) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this.setValue(null);
        },

        resetValue: function() {
            this.setValue(this.state.value === '' ? null : this.state.value);
        },

        getInputNode: function() {
            var input = this.refs.input;
            return this.props.searchable ? input : input.getDOMNode();
        },

        fireChangeEvent: function(newState) {
            if (newState.value !== this.state.value && this.props.onChange) {
                this.props.onChange(newState.value, newState.values);
            }
        },

        handleMouseDown: function(event) {
            // if the event was triggered by a mousedown and not the primary
            // button, or if the component is disabled, ignore it.
            if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            if (this.state.isFocused) {
                this.setState({
                    isOpen: true
                }, this._bindCloseMenuIfClickedOutside);
            } else {
                this._openAfterFocus = true;
                this.getInputNode().focus();
            }
        },

        handleMouseDownOnArrow: function(event) {
            // if the event was triggered by a mousedown and not the primary
            // button, or if the component is disabled, ignore it.
            if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
                return;
            }
            // If not focused, handleMouseDown will handle it
            if (!this.state.isOpen) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            this.setState({
                isOpen: false
            }, this._unbindCloseMenuIfClickedOutside);
        },

        handleInputFocus: function(event) {
            var newIsOpen = this.state.isOpen || this._openAfterFocus;
            this.setState({
                isFocused: true,
                isOpen: newIsOpen
            }, function() {
                if (newIsOpen) {
                    this._bindCloseMenuIfClickedOutside();
                } else {
                    this._unbindCloseMenuIfClickedOutside();
                }
            });
            this._openAfterFocus = false;

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        },

        handleInputBlur: function(event) {
            var self = this;

            this._blurTimeout = setTimeout(function() {
                if (self._focusAfterUpdate) return;

                self.setState({
                    isFocused: false
                });
            }, 50);

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        },

        handleKeyDown: function(event) {
            if (this.state.disabled) return;

            switch (event.keyCode) {

                case 8: // backspace
                    if (!this.state.inputValue) {
                        this.popValue();
                    }
                return;

                case 9: // tab
                    if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
                        return;
                    }
                    this.selectFocusedOption();
                break;

                case 13: // enter
                    if (!this.state.isOpen) return;

                    this.selectFocusedOption();
                break;

                case 27: // escape
                    if (this.state.isOpen) {
                        this.resetValue();
                    } else {
                        this.clearValue();
                    }
                break;

                case 38: // up
                    this.focusPreviousOption();
                break;

                case 40: // down
                    this.focusNextOption();
                break;

                case 188: // ,
                    if (this.props.allowCreate) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.selectFocusedOption();
                    } else {
                        return;
                    }
                break;

                default: return;
            }

            event.preventDefault();
        },

        // Ensures that the currently focused option is available in filteredOptions.
        // If not, returns the first available option.
        _getNewFocusedOption: function(filteredOptions) {
            for (var key in filteredOptions) {
                if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
                    return filteredOptions[key];
                }
            }
            return filteredOptions[0];
        },

        handleInputChange: function(event) {
            // assign an internal variable because we need to use
            // the latest value before setState() has completed.
            this._optionsFilterString = event.target.value;

            if (this.props.asyncOptions) {
                this.setState({
                    isLoading: true,
                    inputValue: event.target.value
                });
                this.loadAsyncOptions(event.target.value, {
                    isLoading: false,
                    isOpen: true
                }, this._bindCloseMenuIfClickedOutside);
            } else {
                var filteredOptions = this.filterOptions(this.state.options);
                this.setState({
                    isOpen: true,
                    inputValue: event.target.value,
                    filteredOptions: filteredOptions,
                    focusedOption: this._getNewFocusedOption(filteredOptions)
                }, this._bindCloseMenuIfClickedOutside);
            }
        },

        autoloadAsyncOptions: function() {
            var self = this;
            this.loadAsyncOptions('', {}, function() {
                // update with fetched but don't focus
                self.setValue(self.props.value, false);
            });
        },

        loadAsyncOptions: function(input, state, callback) {
            var thisRequestId = this._currentRequestId = requestId++;

            for (var i = 0; i <= input.length; i++) {
                var cacheKey = input.slice(0, i);
                if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
                    var options = this._optionsCache[cacheKey].options;
                    var filteredOptions = this.filterOptions(options);

                    var newState = {
                        options: options,
                        filteredOptions: filteredOptions,
                        focusedOption: this._getNewFocusedOption(filteredOptions)
                    };
                    for (var key in state) {
                        if (state.hasOwnProperty(key)) {
                            newState[key] = state[key];
                        }
                    }
                    this.setState(newState);
                    if (callback) {
                        callback.call(this, {});
                    }
                    return;
                }
            }

            var self = this;
            this.props.asyncOptions(input, function(err, data) {
                if (err) throw err;

                self._optionsCache[input] = data;

                if (thisRequestId !== self._currentRequestId) {
                    return;
                }
                var filteredOpts = self.filterOptions(data.options);

                var _newState = {
                    options: data.options,
                    filteredOptions: filteredOpts,
                    focusedOption: self._getNewFocusedOption(filteredOpts)
                };
                for (var _key in state) {
                    if (state.hasOwnProperty(_key)) {
                        _newState[_key] = state[_key];
                    }
                }
                self.setState(_newState);

                if (callback) {
                    callback.call(self, {});
                }
            });
        },

        filterOptions: function(options, values) {
            if (!this.props.searchable) {
                return options;
            }

            var filterValue = this._optionsFilterString;
            var exclude = (values || this.state.values).map(function(i) {
                return i.value;
            });
            var out;
            if (this.props.filterOptions) {
                out = this.props.filterOptions.call(this, options, filterValue, exclude);
            } else {
                var filterOption = function(op) {
                    if (this.props.multi && exclude.indexOf(op.value) > -1) return false;
                    if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
                    var valueTest = String(op.value);
                    var labelTest = String(op.label);
                    if (this.props.ignoreCase) {
                        valueTest = valueTest.toLowerCase();
                        labelTest = labelTest.toLowerCase();
                        filterValue = filterValue.toLowerCase();
                    }
                    return !filterValue || (this.props.matchPos === 'start') ? (
                        (this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue) ||
                        (this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue)
                    ) : (
                        (this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0) ||
                        (this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0)
                    );
                };
                out = (options || []).filter(filterOption, this);
            }
            return out;
        },

        selectFocusedOption: function() {
            if (this.props.allowCreate && !this.state.focusedOption) {
                return this.selectValue(this.state.inputValue);
            }
            return this.selectValue(this.state.focusedOption);
        },

        focusOption: function(op) {
            this.setState({
                focusedOption: op
            });
        },

        focusNextOption: function() {
            this.focusAdjacentOption('next');
        },

        focusPreviousOption: function() {
            this.focusAdjacentOption('previous');
        },

        focusAdjacentOption: function(dir) {
            this._focusedOptionReveal = true;

            var ops = this.state.filteredOptions;

            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true,
                    inputValue: '',
                    focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
                }, this._bindCloseMenuIfClickedOutside);
                return;
            }

            if (!ops.length) {
                return;
            }

            var focusedIndex = -1;

            for (var i = 0; i < ops.length; i++) {
                if (this.state.focusedOption === ops[i]) {
                    focusedIndex = i;
                    break;
                }
            }

            var focusedOption = ops[0];

            if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
                focusedOption = ops[focusedIndex + 1];
            } else if (dir === 'previous') {
                if (focusedIndex > 0) {
                    focusedOption = ops[focusedIndex - 1];
                } else {
                    focusedOption = ops[ops.length - 1];
                }
            }

            this.setState({
                focusedOption: focusedOption
            });
        },

        unfocusOption: function(op) {
            if (this.state.focusedOption === op) {
                this.setState({
                    focusedOption: null
                });
            }
        },

        buildMenu: function() {
            var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;

            if (this.state.filteredOptions.length > 0) {
                focusedValue = focusedValue === null ? this.state.filteredOptions[0] : focusedValue;
            }
            // Add the current value to the filtered options in last resort
            if (this.props.allowCreate && this.state.inputValue.trim()) {
                var inputValue = this.state.inputValue;
                this.state.filteredOptions.unshift({
                    value: inputValue,
                    label: inputValue,
                    create: true
                });
            }

            var ops = Object.keys(this.state.filteredOptions).map(function(key) {
                var op = this.state.filteredOptions[key];
                var isFocused = focusedValue === op.value;

                var optionClass = classes({
                    'Select-option': true,
                    'is-focused': isFocused,
                    'is-disabled': op.disabled
                });

                var ref = isFocused ? 'focused' : null;

                var mouseEnter = this.focusOption.bind(this, op);
                var mouseLeave = this.unfocusOption.bind(this, op);
                var mouseDown = this.selectValue.bind(this, op);
                var out;
                if (op.disabled) {
                    out = React.createElement("div", {ref: ref, key: 'option-' + op.value, className: optionClass}, op.label);
                } else {
                    out = React.createElement("div", {ref: ref, key: 'option-' + op.value, className: optionClass, onMouseEnter: mouseEnter, onMouseLeave: mouseLeave, onMouseDown: mouseDown, onClick: mouseDown},  op.create ? 'Add ' + op.label + ' ?' : op.label);
                }
                return out;
            }, this);

            return ops.length ? ops : (
                React.createElement("div", {className: "Select-noresults"}, 
                    this.props.asyncOptions && !this.state.inputValue ? this.props.searchPromptText : this.props.noResultsText
                )
            );
        },

        handleOptionLabelClick: function(value, event) {
            var handler = this.props.onOptionLabelClick;

            if (handler) {
                handler(value, event);
            }
        },

        render: function() {
            var selectClass = classes('Select', this.props.className, {
                'is-multi': this.props.multi,
                'is-searchable': this.props.searchable,
                'is-open': this.state.isOpen,
                'is-focused': this.state.isFocused,
                'is-loading': this.state.isLoading,
                'is-disabled': this.props.disabled,
                'has-value': this.state.value
            });

            var value = [];

            if (this.props.multi) {
                this.state.values.forEach(function(val) {
                    var props = {
                        key: val.value,
                        optionLabelClick: !!this.props.onOptionLabelClick,
                        onOptionLabelClick: this.handleOptionLabelClick.bind(this, val),
                        onRemove: this.removeValue.bind(this, val)
                    };
                    for (var _key in val) {
                        if (val.hasOwnProperty(_key)) {
                            props[_key] = val[_key];
                        }
                    }
                    value.push(React.createElement(Value, React.__spread({},  props)));
                }, this);
            }

            if (this.props.disabled || (!this.state.inputValue && (!this.props.multi || !value.length))) {
                value.push(React.createElement("div", {className: "Select-placeholder", key: "placeholder"}, this.state.placeholder));
            }

            var loading = this.state.isLoading ? React.createElement("span", {className: "Select-loading", 'aria-hidden': "true"}) : null;
            var clear = this.props.clearable && this.state.value && !this.props.disabled ? React.createElement("span", {className: "Select-clear", title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;'}}) : null;

            var menu;
            var menuProps;
            if (this.state.isOpen) {
                menuProps = {
                    ref: 'menu',
                    className: 'Select-menu'
                };
                if (this.props.multi) {
                    menuProps.onMouseDown = this.handleMouseDown;
                }
                menu = (
                    React.createElement("div", {ref: "selectMenuContainer", className: "Select-menu-outer"}, 
                        React.createElement("div", React.__spread({},  menuProps), this.buildMenu())
                    )
                );
            }

            var input;
            var inputProps = {
                ref: 'input',
                className: 'Select-input',
                tabIndex: this.props.tabIndex || 0,
                onFocus: this.handleInputFocus,
                onBlur: this.handleInputBlur
            };
            for (var key in this.props.inputProps) {
                if (this.props.inputProps.hasOwnProperty(key)) {
                    inputProps[key] = this.props.inputProps[key];
                }
            }

            if (this.props.searchable && !this.props.disabled) {
                input = React.createElement(Input, React.__spread({value: this.state.inputValue, onChange: this.handleInputChange, minWidth: "5"},  inputProps));
            } else {
                input = React.createElement("div", React.__spread({},  inputProps), " ");
            }

            return (
                React.createElement("div", {ref: "wrapper", className: selectClass}, 
                    React.createElement("input", {type: "hidden", ref: "value", name: this.props.name, value: this.state.value, disabled: this.props.disabled}), 
                    React.createElement("div", {className: "Select-control", ref: "control", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown}, 
                        value, 
                        input, 
                        React.createElement("span", {className: "Select-arrow-zone", onMouseDown: this.handleMouseDownOnArrow}), 
                        React.createElement("span", {className: "Select-arrow", onMouseDown: this.handleMouseDownOnArrow}), 
                        loading, 
                        clear
                    ), 
                    menu
                )
            );
        }
    });
    return Select;
});


/*global define */
define('jsx!Oui/Form/MultiSelect',['require','underscore','react.backbone','Oui/PropTypes','jsx!Oui/Shims/ReactSelect','Oui/Utilities/classnames'],function(require) {
    var _ = require('underscore');
    var React = require('react.backbone');
    var PropTypes = require('Oui/PropTypes');
    var Select = require('jsx!Oui/Shims/ReactSelect');
    var classnames = require('Oui/Utilities/classnames');
    var bb = React.BackboneMixin;
    var MultiSelect = React.createClass({displayName: 'MultiSelect',
        mixins: [bb('collection')],
        propTypes: {
            collection: PropTypes.collection.isRequired,
            title: React.PropTypes.string.isRequired,
            placeholder: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            label: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            optionAttribute: React.PropTypes.string,
            onChange: React.PropTypes.func,
            disabled: React.PropTypes.bool,
            value: React.PropTypes.array
        },
        getInitialState: function() {
            return { loading: true };
        },
        getDefaultProps: function() {
            return { optionAttribute: 'label', onChange: function() {}, disabled: false };
        },
        componentWillMount: function() {
            var self = this;
            this.props.collection.fetch().then(function() {
                self.setState({ loading: false });
            });
        },
        getOptions: function() {
            var props = this.props;
            return props.collection.map(function(model) {
                var modelData = model.toJSON();
                var label = modelData[props.optionAttribute] || model.id;
                return { value: model.id.toString(), label: label };
            });
        },
        renderLabel: function() {
            var label = '';
            var labelProp = this.props.title || false;
            if (typeof this.props.label !== 'undefined') {
                labelProp = this.props.label;
            }
            if (labelProp) {
                label = React.createElement("label", null, labelProp);
            }
            return label;
        },
        getClassList: function() {
            return classnames({
                'oui-form-control': true
            });
        },
        render: function() {
            var props = {
                multi: true,
                options: this.getOptions(),
                onChange: this.handleChange,
                value: _.compact(this.props.value)
            };
            if (typeof this.props.placeholder !== 'undefined') {
                props.placeholder = this.props.placeholder;
            } else if (this.props.title) {
                props.placeholder = this.props.title + '...';
            }
            var label = this.renderLabel();
            var classList = this.getClassList();
            var out;
            if (!this.state.loading) {
                if (props.options.length) {
                    out = (
                        React.createElement("div", {className: classList}, 
                            label, 
                            React.createElement(Select, React.__spread({},  props))
                        )
                    );
                } else {
                    out = React.createElement("span", null, "No results found.");
                }
            } else {
                out = React.createElement("span", null, "Loading...");
            }
            return out;
        },
        handleChange: function(value) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(value.split(','));
            }
        }
    });
    return MultiSelect;
});

/*globals define:false */
define('Oui/Oui',['require','jsx!./List/List','jsx!./Icon/Icon','jsx!./Loader/Loader','jsx!./Button/IconButton','jsx!./Button/IconLink','jsx!./Form/TextField','jsx!./Form/Select','jsx!./Form/MultiSelect','./Form/Validator'],function(require) {
    return {
        List: require('jsx!./List/List'),
        Icon: require('jsx!./Icon/Icon'),
        Loader: require('jsx!./Loader/Loader'),
        Button: {
            IconButton: require('jsx!./Button/IconButton'),
            IconLink: require('jsx!./Button/IconLink')
        },
        Form: {
            TextField: require('jsx!./Form/TextField'),
            Select: require('jsx!./Form/Select'),
            MultiSelect: require('jsx!./Form/MultiSelect'),
            Validator: require('./Form/Validator')
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
    define('backbone-filtered-collection', function () {
        return FilteredCollection;
    });

    //Use almond's special top-level, synchronous require to trigger factory
    //functions, get the final module value, and export it as the public
    //value.
    return require('Oui/Oui');
}));
