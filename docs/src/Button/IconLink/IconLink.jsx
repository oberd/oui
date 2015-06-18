/*global define */
define(function(require) {
    var React = require('react');
    var IconLink = require('jsx!Oui/Button/IconLink');
    var IconLinkExample = React.createClass({
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
                                    <IconLink icon="user-md">Login</IconLink>
                                </td>
                            </tr>
                            <tr>
                                <td>Always display content</td>
                                <td>
                                    <IconLink icon="user-md" breakpoint="mobile">Login</IconLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    });
    return IconLinkExample;
});
