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

        var SearchBar = <div className='input-group navbar-search-large' style={{marginBottom: 0}}>
            <Select
                name='searchText'
                className='input-group-field'
                onSelectValue={this.onSelectSearchResult}
                onSearchTextChanged={this.onSearchTextChanged}
                placeholder={'Search'}
                width={300}
                moreResults={true}/>
            <button className='input-group-button button primary' style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} onClick={this.search}>
                <span className='ion-android-search' style={{fontSize: 17}}/>
            </button>
        </div>;

        var navicon = <span style={{paddingLeft: '0.8rem', paddingRight: '0.8rem'}} className='ion-navicon-round navbar-icon' onClick={this.props.toggleSidebar}/>;
        var searchIcon = <button className='button secondary small'><span className='ion-android-search navbar-icon' onClick={this.onOpenSearchBar}/></button>;
        if (loggedin) {
            rhs = <ul className='menu align-right'>
                <li className='show-for-xlarge'>
                    {SearchBar}
                </li>
                <li className='show-for-large'><a href={'/users/' + userid + '/' + username} title='Profile'>{username}</a></li>
                <li className='show-for-xlarge'><a onClick={Mentions.logout}>Logout</a></li>
                <li className='hide-for-xlarge'>{searchIcon}</li>
            </ul>;
        } else {
            rhs = <ul className='menu align-right'>
                <li className='hide-for-xlarge'>{searchIcon}</li>
                <li className='show-for-xlarge'>{SearchBar}</li>
                <li className='show-for-xlarge'><a href='/login'>Login</a></li>
                <li className='show-for-xlarge'><a href='/signup'>Signup</a></li>
            </ul>;
        }
        return (
            <div>
                <div className='top-bar'>
                    <div className='top-bar-left'>
                        <ul className='menu icon-top'>
                            <li className='hide-for-xxlarge'>{navicon}</li>
                            <li className='menu-text'><a href='/' style={{fontSize: 16}}>{config.name}</a></li>
                            <li><Spinner /></li>
                            <li className='show-for-xxlarge'><a href='/create'>Create Page</a></li>
                        </ul>
                    </div>
                    <div className='top-bar-right'>
                        {rhs}
                    </div>
                </div>
                <VelocityTransitionGroup enter={{animation: 'transition.fadeIn'}} leave={{animation: 'transition.fadeOut'}}>
                    {this.state.searchBarOpen ? <div className='navbar-search hide-for-xlarge'>
                        <div className='row'>
                            <div className='columns'>
                                <input className='search-bar' type='text' placeholder='Search' onChange={this.onChangeText} onKeyDown={this.handleKeys} name='searchText'></input>
                            </div>
                            <div className='shrink columns'>
                                <button className='button secondary small'><span className='ion-android-close navbar-icon' onClick={this.onCloseSearchBar}/></button>
                            </div>
                        </div>
                    </div> : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
});

module.exports = Navbar;
