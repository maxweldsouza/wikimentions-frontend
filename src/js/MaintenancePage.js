var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var moment = require('moment');
var Link = require('./Link');

var Maintenance = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    {
                        name: 'ids',
                        path: '/api/v1/maintenance/missing_isbn'
                    }
                ]
            };
        }
    },
    render () {
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
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1 className='page-title'>Recent Changes</h1>
                                {this.props.data.ids.missing_isbn.map((x) => {
                                    return <div>
                                        <Link
                                        type='book'
                                        id={x.id}
                                        slug={x.slug}
                                        title={x.title}
                                        />
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = Maintenance;
