var React = require('react');
var Select = require('./Select');
var cookies = require('browser-cookies');
var isNode = require('./isNode');
var Xsrf = require('./Xsrf');
var config = require('./config');
var Modal = require('react-modal');

var Navbar = React.createClass({
    getInitialState: function() {
        return {
            modalIsOpen: false
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    closeModal () {
        this.setState({modalIsOpen: false});
    },
    onSelectSearchResult (x) {
        this.closeModal();
        var pagepath;
        if (x.type === 'video') {
            pagepath = '/videos/';
        } else if (x.type === 'book') {
            pagepath = '/books/';
        } else if (x.type === 'person') {
            pagepath = '/people/';
        } else {
            pagepath = '/pages/';
            console.warn('No page type specified for Link');
        }
        var path = pagepath + x.id + '/' + x.slug;
        history.pushState(null, null, path);
        Mentions.route(path);
    },
    render () {
        var session, username, userid, loggedin;
        if (isNode.isBrowser()) {
            session = cookies.get('mentions');
            username = cookies.get('username');
            userid = cookies.get('userid');
        }
        loggedin = session ? true : false;
        var user;
        var SearchBar = <Select
        name='mentioned'
        onSelectValue={this.onSelectSearchResult}
        placeholder={'Search'}
        moreOptions={true}/>;

        if (loggedin) {
            user = <ul className='menu'>
                <li className='hide-for-large'><span className='ion-search' onClick={this.onOpenModal}/></li>
                <li className='show-for-large'>
                    {SearchBar}
                </li>
                <li className='show-for-large'><a href={'/users/' + userid + '/' + username}>{username}</a></li>
            </ul>;
        } else {
            user = <ul className='menu'>
                <li className='hide-for-medium'><span className='ion-search' onClick={this.onOpenModal}/></li>
                <li className='show-for-large'>{SearchBar}</li>
            </ul>;
        }
        return (
            <div className='top-bar'>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='row'>
                        <div className='small-12 columns'>
                            <h1>Search</h1>
                        </div>
                        <div className='small-12 columns'>
                            {SearchBar}
                        </div>
                        <div className='small-12 columns'>
                            <button className='button' onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </Modal>
                <div className='top-bar-left'>
                    <ul className='menu icon-top'>
                        <li className='menu-text'><a href='/'>{config.name}</a></li>
                        <li className=''><a href='/create'>Create Page</a></li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    {user}
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
