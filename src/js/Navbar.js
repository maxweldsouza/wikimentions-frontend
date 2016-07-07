var React = require('react');
var Select = require('./Select');
var Xsrf = require('./Xsrf');
var config = require('./config');
var Spinner = require('./Spinner');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;

var Navbar = React.createClass({
    getInitialState () {
        return {
            searchBarOpen: false,
            searchText: ''
        };
    },
    onChangeText (e) {
        var temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    onOpenSearchBar () {
        this.setState({
            searchBarOpen: true
        });
    },
    onCloseSearchBar () {
        this.setState({searchBarOpen: false});
    },
    handleKeys (event) {
        if (event.key === 'Enter') {
            var path = '/search?q=' + this.state.searchText;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    },
    onSelectSearchResult (x) {
        var pagepath;
        if (x.props.type === 'video') {
            pagepath = '/videos/';
        } else if (x.props.type === 'book') {
            pagepath = '/books/';
        } else if (x.props.type === 'person') {
            pagepath = '/people/';
        } else {
            pagepath = '/pages/';
            console.warn('No page type specified for Link');
        }
        pagepath += x.id + '/' + x.props.slug;
        history.pushState(null, null, pagepath);
        Mentions.route(pagepath);
    },
    render () {
        var rhs;
        var userid = this.props.userid;
        var username = this.props.username;
        var loggedin = this.props.loggedin;

        var SearchBar = <Select
            name='mentioned'
            onSelectValue={this.onSelectSearchResult}
            placeholder={'Search'}
            moreResults={true}/>;

        var navicon = <span className='ion-navicon-round navbar-icon' onClick={this.props.toggleSidebar}/>;
        var searchIcon = <button className='button secondary hollow small'><span className='ion-search navbar-icon' onClick={this.onOpenSearchBar}/></button>;
            if (loggedin) {
                rhs = <ul className='menu align-right'>
                    <li className='show-for-xlarge'>{SearchBar}</li>
                    <li className='show-for-large'><a href={'/users/' + userid + '/' + username}>{username}</a></li>
                    <li className='show-for-xlarge'><a onClick={Mentions.logout}>Logout</a></li>
                    <li className='hide-for-xlarge'>{searchIcon}</li>
                </ul>;
            } else {
                rhs = <ul className='menu align-right'>
                    <li className='hide-for-xlarge'>{searchIcon}</li>
                    <li className='show-for-xlarge'>{SearchBar}</li>
                </ul>;
            }
            return (
                <div>
                    <div className='top-bar'>
                        <div className='top-bar-left'>
                            <ul className='menu icon-top'>
                                <li className='hide-for-xxlarge'>{navicon}</li>
                                <li className='menu-text'><a href='/'>{config.name}</a></li>
                                <li><Spinner /></li>
                                <li className='show-for-xxlarge'><a href='/create'>Create Page</a></li>
                            </ul>
                        </div>
                        <div className='top-bar-right'>
                            {rhs}
                        </div>
                    </div>
                    <VelocityTransitionGroup enter={{animation: 'transition.fadeIn'}} leave={{animation: 'transition.fadeOut'}} duration={200}>
                        {this.state.searchBarOpen ? <div className='navbar-search hide-for-xlarge'>
                            <div className='row'>
                                <div className='columns'>
                                    <input className='search-bar' type='text' placeholder='Search' onChange={this.onChangeText} onKeyDown={this.handleKeys} name='searchText'></input>
                                </div>
                                <div className='shrink columns'>
                                    <button className='button secondary hollow small'><span className='ion-close navbar-icon' onClick={this.onCloseSearchBar}/></button>
                                </div>
                            </div>
                        </div> : null}
                    </VelocityTransitionGroup>
                </div>
            );
        }
    });

    module.exports = Navbar;
