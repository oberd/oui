/*global define */
define(function(require) {
    var React = require('react.backbone');
    var Users = require('../../ExampleData/Users');
    var MultiSelect = require('jsx!Oui/Form/MultiSelect');

    var users = new Users();
    users.addRandom(5);
    var SelectExample = React.createClass({
        getInitialState: function() {
            return { values: [] };
        },
        render: function() {
            var valueString = this.state.values.length ?
                'Selected user ids: ' + this.state.values.join(', ') : 'No one is selected!';
            return (
                <div>
                <span>{valueString}</span>
                <MultiSelect title="Select a user"
                    collection={users}
                    value={this.state.values}
                    onChange={this.handleChange}
                    optionAttribute="username" />
                </div>
            );
        },
        handleChange: function(values) {
            this.setState({ values: values });
        }
    });
    return SelectExample;
});
