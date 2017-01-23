import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import _ from 'underscore';
import Link from './Link';
import config from './config';
const tags = ['book_without_author', 'missing_isbn', 'person_without_description'];

class Maintenance extends React.Component {
    static resources (appstate) {
        const parts = appstate.url.split('/');
        const tag = parts[1];
        const limit = parts[2];
        const offset = parts[3];
        if (!tags.includes(tag)) {
            throw { status: 404, message: 'Count not find what you were looking for'};
        }
        return {
            api: [
                {
                    name: 'data',
                    path: `/api/v1/maintenance/${tag}/${limit}/${offset}`
                }
            ]
        };
    }
    render () {
        const parts = this.props.path.split('/');
        const tag = parts[1];
        const limit = Number(parts[2]);
        const offset = Number(parts[3]);

        const data = this.props.data.data[tag];
        let title;
        let results;
        if (tag === 'book_without_author') {
            title = 'Books with no Author';
            results = <div>
                {data.map((x) => {
                    return <div>
                        <Link
                        type='book'
                        id={x.id}
                        slug={x.props.slug}>
                        {x.props.title}
                        </Link>
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
                        slug={x.props.slug}>
                        {x.props.title}
                        </Link>
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
                        slug={x.props.slug}>
                        {x.props.title}
                        </Link>
                    </div>;
                })}
            </div>;
        }
        let prev;
        let next;
        if (offset === 0) {
            prev = '#';
        } else {
            prev = `/maintenance/${tag}/${limit}/${offset - limit}`;
        }
        next = `/maintenance/${tag}/${limit}/${offset + limit}`;
        return (
            <span>
                <Helmet
                    title={'Maintenance'}
                    titleTemplate={`%s - ${config.name}`}
                    meta={[
                        {'name': 'robots', 'content': 'noindex'}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url + this.props.path}
                    ]}
                    />
                <Navbar
                    loggedin={this.props.loggedin}
                    username={this.props.username}
                    userid={this.props.userid}
                    toggleSidebar={this.props.toggleSidebar}/>
                <div className='row page-body white'>
                    <div className='small-12 large-8 columns'>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <h1>{title}</h1>
                                <div className='row'>
                                    <div className='small-4 columns'>
                                        {`Showing results ${offset} to ${limit + offset}`}
                                    </div>
                                    <div className='small-4 columns'>
                                        <span className='button-group small'>
                                            <a className='button' href={`/maintenance/${tag}/50/0`}>50</a>
                                            <a className='button' href={`/maintenance/${tag}/100/0`}>100</a>
                                            <a className='button' href={`/maintenance/${tag}/200/0`}>200</a>
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
}

export default Maintenance;
