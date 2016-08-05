var config = require('./config');
var LoginModal = require('./LoginModal');
var React = require('react');
var Select = require('./Select');
var SignupModal = require('./SignupModal');
var Spinner = require('./Spinner');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;
var Xsrf = require('./Xsrf');

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
    search () {
        var path = '/search?q=' + this.state.searchText;
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    onSearchTextChanged (x) {
        this.setState({
            searchText: x
        });
    },
    handleKeys (event) {
        if (event.key === 'Enter') {
            this.search();
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
            throw new Error('No page type specified');
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

        var SearchBar = <div className='input-group navbar-search-large' style={{marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
            <Select
                name='searchText'
                className='input-group-field'
                onSelectValue={this.onSelectSearchResult}
                onSearchTextChanged={this.onSearchTextChanged}
                placeholder={'Search'}
                width={400}
                moreResults={true}/>
            <button
                className='input-group-button button primary'
                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                onClick={this.search}
                aria-label='Search'>
                <span className='ion-android-search' style={{fontSize: 17}}/>
            </button>
        </div>;

        var navicon = <span
            className='ion-navicon-round navicon hide-for-xxlarge'
            onClick={this.props.toggleSidebar}
            aria-label='Toggle Sidebar'/>;

        var searchIcon = <button className='button primary small' aria-label='Open search bar' onClick={this.onOpenSearchBar}><span className='ion-android-search navbar-icon'  style={{fontSize: 17}}/></button>;
        if (loggedin) {
            rhs = <ul className='menu align-right'>
                <li className='show-for-xlarge'>
                    {SearchBar}
                </li>
                <li className='show-for-medium'>
                    <a className='navbar-link' href={'/users/' + userid + '/' + username} title='Profile'>
                        <span className='ion-android-person icon'/>
                        <span className='show-for-xxlarge'>{username}</span>
                    </a>
                </li>
                <li className='show-for-medium'>
                    <a className='navbar-link' onClick={Mentions.logout}>
                        <span className='ion-log-out icon'/>
                        <span className='show-for-xxlarge'>Logout</span>
                    </a>
                </li>
                <li className='hide-for-xlarge'>{searchIcon}</li>
            </ul>;
        } else {
            rhs = <ul className='menu align-right'>
                <li className='hide-for-xlarge'>{searchIcon}</li>
                <li className='show-for-xlarge'>
                    {SearchBar}
                </li>
                <li className='show-for-medium'>
                    <a className='navbar-link' href='/login'>
                        <span className='ion-log-in icon'/>
                        <span className='show-for-xxlarge'>Login</span>
                    </a>
                </li>
                <li className='show-for-medium'>
                    <a className='navbar-link' href='/signup'>
                        <span className='ion-android-person-add icon'/>
                        <span className='show-for-xxlarge'>Signup</span>
                    </a>
                </li>
            </ul>;
        }
        return (
            <div>
                <nav className='top-bar' role='navigation'>
                    <div className="top-bar-title align-center">
                        {navicon}
                        <span className='site-title'><a href='/'>{config.name}</a></span>
                    </div>
                    <div className='top-bar-left'>
                        <ul className='menu'>
                            <li className='show-for-xxlarge'>
                                <a className='navbar-link' href='/create'>
                                    <span className='ion-compose icon'/>Create Page
                                </a>
                            </li>
                            <li><Spinner /></li>
                        </ul>
                    </div>
                    <div className='top-bar-right'>
                        {rhs}
                    </div>
                </nav>
                <VelocityTransitionGroup enter={{animation: 'transition.fadeIn'}} leave={{animation: 'transition.fadeOut'}}>
                    {this.state.searchBarOpen ? <div className='navbar-search hide-for-xlarge'>
                        <div className='row'>
                            <div className='input-group'>
                                <input
                                    className='search-bar input-group-field'
                                    type='text'
                                    placeholder='Search'
                                    onChange={this.onChangeText}
                                    onKeyDown={this.handleKeys}
                                    name='searchText'
                                    style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}></input>
                                <button
                                    className='button alert input-group-button'
                                    aria-label='Close search bar'
                                    onClick={this.onCloseSearchBar}
                                    style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
                                    <span className='ion-android-close navbar-icon'/>
                                </button>
                            </div>
                        </div>
                    </div> : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
});

module.exports = Navbar;
