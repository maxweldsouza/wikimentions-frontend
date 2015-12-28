var React = require('react');
var Helmet = require('react-helmet');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render: function () {
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                />
                <h1>h1. This is a very large header.</h1>
                <h2>h2. This is a large header.</h2>
                <h3>h3. This is a medium header.</h3>
                <h4>h4. This is a moderate header.</h4>
                <h5>h5. This is a small header.</h5>
                <h6>h6. This is a tiny header.</h6>
            </span>
        );
    }
});

module.exports = HomePage;
