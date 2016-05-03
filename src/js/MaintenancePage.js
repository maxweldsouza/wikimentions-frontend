var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var moment = require('moment');
var Link = require('./Link');

var tags = ['book_without_author', 'missing_isbn'];

var Maintenance = React.createClass({
    statics: {
        resources (appstate) {
            var tag = appstate.url.split('/')[1];
            if (tags.indexOf(tag) < 0) {
                throw { status: 404, message: 'Count not find what you were looking for'};
            }
            return {
                api: [
                    {
                        name: 'data',
                        path: '/api/v1/maintenance/' + tag
                    }
                ]
            };
        }
    },
    render () {
        var tag = this.props.path.split('/')[1];
        var titles = {
            'book_without_author': 'Books Without Author'
        };
        var data = this.props.data.data[tag];
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
                                <h1 className='page-title'>{titles[tag]}</h1>
                                {data.map((x) => {
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
