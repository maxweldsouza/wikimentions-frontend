var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var _ = require('underscore');
var Mention = require('./Mention');
var Pagination = require('./Pagination');
var requests = require('superagent');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: [
                    // {
                    //     name: 'new',
                    //     path: '/api/v1/new/10/0'
                    // }
                ]
            };
        }
    },
    getInitialState () {
        return {
            pageno: 0,
            newmentions: this.props.data.new
        };
    },
    loadData (pageno) {
        // requests.get('/api/v1/new/10/' + pageno).end((err, res) => {
        //     this.setState({
        //         newmentions: res.body,
        //         pageno: pageno
        //     });
        // });
    },
    onPrevPage () {
        this.loadData(this.state.pageno - 1);
    },
    onNextPage () {
        this.loadData(this.state.pageno + 1);
    },
    render () {
        var mentions = [];//this.state.newmentions;
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
                <div className='row page-body'>
                    <div className='small-12 large-8 large-centered columns'>
                        <h2>New Mentions</h2>
                        <div className='row'>
                            <div className='small-12 columns'>
                                <a href='/pages/108/richard-dawkins'>Richard Dawkins</a>
                                {mentions.map((x) => {
                                    return <Mention
                                        id={x.id}
                                        slug={x.slug}
                                        title={x.title}
                                        description={x.description}
                                        quote={x.quote}
                                        type={x.type}
                                        books={x.books}
                                        />;
                                })}
                            <Pagination
                                current={this.state.pageno}
                                onPrev={this.onPrevPage}
                                onNext={this.onNextPage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
