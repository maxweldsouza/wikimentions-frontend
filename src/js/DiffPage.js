var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var DATA = require('./dummy');
var _ = require('underscore');

var DiffPage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = _.find(DATA.things, function (x) {
            return x.id === id;
        });
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
                <Navbar/>
                <div className='row'>
                    <div className='small-12 columns'>
                        <div className='row'>
                            <div className='small-12 medium-8 columns'>
                                <h1>Diff</h1>
                                <div className="row">
                                    <div className="small-6 columns">
                                        V.S. Ramachandran
                                    </div>
                                    <div className="small-6 columns">
                                        V.S. Ramachandran
                                    </div>
                                </div>
                                <form action='' method='post'>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = DiffPage;
