/*globals define:false */
define(function(require) {
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
