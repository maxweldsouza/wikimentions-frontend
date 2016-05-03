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
        var data = this.props.data.data[tag];
        var title, results;
        if (tag === 'book_without_author') {
            title = 'Books Without Author';
            results = <div>
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
            </div>;
        } else if (tag === 'missing_isbn') {
            title = 'Books with Missing ISBN';
            results = <div>
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
        }
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
                                <h1 className='page-title'>{title}</h1>
                                {data.length === 0 ? <div>
                                    There is no data here.
                                </div> : null}
                                {results}
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = Maintenance;
