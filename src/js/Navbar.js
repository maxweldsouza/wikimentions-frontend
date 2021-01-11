import config from './config';
import LoginModal from './LoginModal';
import React from 'react';
import Select from './Select';
import SignupModal from './SignupModal';
import Spinner from './Spinner';
import { VelocityTransitionGroup } from 'velocity-react';
import Xsrf from './Xsrf';
import requests from 'superagent';
import autoBind from 'react-autobind';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            searchBarOpen: false,
            searchText: ''
        };
    }
    onChangeText(e) {
        const temp = {};
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    onOpenSearchBar() {
        this.setState({
            searchBarOpen: true
        });
    }
    onCloseSearchBar() {
        this.setState({ searchBarOpen: false });
    }
    search() {
        const path = `/search?q=${this.state.searchText}`;
        history.pushState(null, null, path);
        Mentions.route(path);
    }
    onSearchTextChanged(x) {
        this.setState({
            searchText: x
        });
    }
    handleKeys(event) {
        if (event.key === 'Enter') {
            this.search();
        }
    }
    onSelectSearchResult(x) {
        let pagepath;
        if (x.props.type === 'video') {
            pagepath = '/videos/';
        } else if (x.props.type === 'book') {
            pagepath = '/books/';
        } else if (x.props.type === 'person') {
            pagepath = '/people/';
        } else {
            throw new Error('No page type specified');
        }
        pagepath += `${x.id}/${x.props.slug}`;
        history.pushState(null, null, pagepath);
        Mentions.route(pagepath);
    }
    random() {
        requests.get('/api/v1/random').send().end((err, res) => {
            if (!err) {
                history.pushState(null, null, res.body.path);
                Mentions.route(res.body.path);
            }
        });
    }
    render() {
        let rhs;
        const userid = this.props.userid;
        const username = this.props.username;
        const loggedin = this.props.loggedin;

        const SearchBar = (
            <div
                className="input-group"
                style={{
                    marginBottom: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }}
            >
                <Select
                    name="searchText"
                    className="input-group-field"
                    onSelectValue={this.onSelectSearchResult}
                    onSearchTextChanged={this.onSearchTextChanged}
                    placeholder={'Search'}
                    width={400}
                    autoFocus={true}
                    moreResults={true}
                />
                <button
                    className="button primary"
                    style={{
                        borderRadius: '999em',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                    onClick={this.search}
                    aria-label="Search"
                >
                    <span className="ion-android-search" />
                </button>
            </div>
        );

        const navicon = (
            <span
                className="ion-navicon-round navicon hide-for-xxlarge"
                onClick={this.props.toggleSidebar}
                aria-label="Toggle Sidebar"
            />
        );

        let searchIcon;
        if (this.state.searchBarOpen) {
            searchIcon = (
                <button
                    className="button alert no-margin-bottom"
                    aria-label="Close search bar"
                    onClick={this.onCloseSearchBar}
                >
                    <span className="ion-android-close navbar-icon" />
                </button>
            );
        } else {
            searchIcon = (
                <button
                    className="button primary small"
                    aria-label="Open search bar"
                    onClick={this.onOpenSearchBar}
                >
                    <span className="ion-android-search navbar-icon" />
                </button>
            );
        }
        if (loggedin) {
            rhs = (
                <ul className="menu align-right">
                    <li className="show-for-xlarge">
                        {SearchBar}
                    </li>
                    <li className="show-for-medium">
                        <a
                            className="navbar-link hint--bottom hint--rounded hint--no-animate"
                            rel="nofollow"
                            href={`/users/${userid}/${username}`}
                            aria-label="Profile"
                        >
                            <span className="ion-android-person icon" />
                            <span className="show-for-xxlarge">{username}</span>
                        </a>
                    </li>
                    <li className="show-for-medium">
                        <a
                            className="navbar-link hint--bottom hint--rounded hint--no-animate"
                            onClick={Mentions.logout}
                            aria-label="Logout"
                        >
                            <span className="ion-log-out icon" />
                            <span className="show-for-xxlarge">Logout</span>
                        </a>
                    </li>
                    <li className="hide-for-xlarge">{searchIcon}</li>
                </ul>
            );
        } else {
            rhs = (
                <ul className="menu align-right">
                    <li className="show-for-xlarge">
                        {SearchBar}
                    </li>
                    <li className="show-for-medium">
                        <a
                            className="navbar-link hint--bottom hint--rounded hint--no-animate"
                            href="/login"
                            aria-label="Login"
                        >
                            <span className="ion-log-in icon" />
                            <span className="show-for-xxlarge">Login</span>
                        </a>
                    </li>
                    <li className="show-for-medium">
                        <a
                            className="navbar-link hint--bottom hint--rounded hint--no-animate"
                            href="/signup"
                            aria-label="Sign Up"
                        >
                            <span className="ion-android-person-add icon" />
                            <span className="show-for-xxlarge">Sign Up</span>
                        </a>
                    </li>
                    <li className="hide-for-xlarge">{searchIcon}</li>
                </ul>
            );
        }
        return (
            <div>
                <nav className="top-bar" role="navigation">
                    <div className="top-bar-title align-center">
                        {navicon}
                        <span className="site-title">
                            <a href="/">{config.name}</a>
                        </span>
                    </div>
                    <div className="top-bar-left">
                        <ul className="menu">
                            <li className="show-for-large">
                                <a
                                    className="navbar-link hint--bottom hint--rounded hint--no-animate"
                                    href="/create"
                                    aria-label="Create Page"
                                >
                                    <span className="ion-compose icon" />
                                    <span>Create Page</span>
                                </a>
                            </li>
                            <li className="show-for-xxlarge">
                                <a
                                    className="navbar-link hint--bottom hint--rounded hint--no-animate"
                                    onClick={this.random}
                                    aria-label="Random Page"
                                >
                                    <span className="ion-shuffle icon" />
                                    <span>Random Page</span>
                                </a>
                            </li>
                            <li><Spinner /></li>
                        </ul>
                    </div>
                    <div className="top-bar-right">
                        {rhs}
                    </div>
                </nav>
                <VelocityTransitionGroup
                    enter={{ animation: 'transition.fadeIn' }}
                    leave={{ animation: 'transition.fadeOut' }}
                >
                    {this.state.searchBarOpen
                        ? <div className="navbar-search hide-for-xlarge">
                              <div className="row">
                                  <div className="input-group">
                                      <Select
                                          name="searchText"
                                          className="input-group-field search-bar"
                                          onSelectValue={
                                              this.onSelectSearchResult
                                          }
                                          onSearchTextChanged={
                                              this.onSearchTextChanged
                                          }
                                          placeholder={'Search'}
                                          autoFocus={true}
                                          moreResults={true}
                                      />
                                      <button
                                          className="button primary no-margin-bottom"
                                          style={{
                                              borderTopLeftRadius: 0,
                                              borderBottomLeftRadius: 0
                                          }}
                                          onClick={this.search}
                                          aria-label="Search"
                                      >
                                          <span
                                              className="ion-android-search"
                                              style={{ fontSize: 17 }}
                                          />
                                      </button>

                                  </div>
                              </div>
                          </div>
                        : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

export default Navbar;
