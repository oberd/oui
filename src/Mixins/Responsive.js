/*global define */
define(function(require) {
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
