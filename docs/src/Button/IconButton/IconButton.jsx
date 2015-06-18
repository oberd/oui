/*global define */
define(function(require) {
    var React = require('react');
    var IconButton = require('jsx!Oui/Button/IconButton');
    var IconButtonExample = React.createClass({
        render: function() {
            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Required Size</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Will display content if tablet or larger</td>
                                <td>
                                    <IconButton icon="user-md">Login</IconButton>
                                </td>
                            </tr>
                            <tr>
                                <td>Always display content</td>
                                <td>
                                    <IconButton icon="user-md" breakpoint="mobile">Login</IconButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    });
    return IconButtonExample;
});
