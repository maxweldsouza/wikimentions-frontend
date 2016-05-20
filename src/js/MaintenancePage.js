var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var _ = require('underscore');
var Link = require('./Link');
var config = require('./config');

var tags = ['book_without_author', 'missing_isbn', 'person_without_description'];

var Maintenance = React.createClass({
    statics: {
        resources (appstate) {
            var parts = appstate.url.split('/');
            var tag = parts[1];
            var limit = parts[2];
            var offset = parts[3];
            if (tags.indexOf(tag) < 0) {
                throw { status: 404, message: 'Count not find what you were looking for'};
            }
            return {
                api: [
                    {
                        name: 'data',
                        path: '/api/v1/maintenance/' + tag + '/' + limit + '/' + offset
                    }
                ]
            };
        }
    },
    render () {
        var parts = this.props.path.split('/');
        var tag = parts[1];
        var limit = Number(parts[2]);
        var offset = Number(parts[3]);

        var data = this.props.data.data[tag];
        var title, results;
        if (tag === 'book_without_author') {
            title = 'Books with no Author';
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
            </div>;
        } else if (tag === 'person_without_description') {
            title = 'People Pages without Description';
            results = <div>
                {data.map((x) => {
                    return <div>
                        <Link
                        type='person'
                        id={x.id}
                        slug={x.slug}
                        title={x.title}
                        />
                    </div>;
                })}
            </div>;
        }
        var prev, next;
        if (offset === 0) {
            prev = '#';
        } else {
            prev = '/maintenance/' + tag + '/' + limit + '/' + (offset - limit);
        }
        next = '/maintenance/' + tag + '/' + limit + '/' + (offset + limit);
        return (
            <span>
                <Helmet
                    title={'Maintenance'}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1 className='page-title'>{title}</h1>
                                <div className='row'>
                                    <div className='small-4 columns'>
                                        {'Showing results ' + offset + ' to ' + (limit + offset)}
                                    </div>
                                    <div className='small-4 columns'>
                                        <span className='button-group small'>
                                            <a className='button' href={'/maintenance/' + tag + '/50/0'}>50</a>
                                            <a className='button' href={'/maintenance/' + tag + '/100/0'}>100</a>
                                            <a className='button' href={'/maintenance/' + tag + '/200/0'}>200</a>
                                        </span>
                                    </div>
                                    <div className='small-4 columns'>
                                        <span className='button-group small'>
                                            <a className='button' href={prev}>Previous</a>
                                            <a className='button' href={next}>Next</a>
                                        </span>
                                    </div>
                                </div>
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
