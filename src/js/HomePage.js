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
                <h1>Mentions</h1>
                <div className="row">
                    <div className="small-2 columns">2 columns</div>
                    <div className="small-10 columns">10 columns</div>
                </div>
                <div className="row">
                    <div className="small-3 columns">3 columns</div>
                    <div className="small-9 columns">9 columns</div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
