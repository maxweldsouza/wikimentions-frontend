var React = require('react');
var Select = require('./Select');
var Xsrf = require('./Xsrf');
var config = require('./config');
var Modal = require('./Modal');
var Spinner = require('./Spinner');

var Navbar = React.createClass({
    getInitialState () {
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
        var path = pagepath + x.id + '/' + x.props.slug;
        history.pushState(null, null, path);
        Mentions.route(path);
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
        var searchIcon = <span className='ion-search navbar-icon' onClick={this.onOpenModal}/>;
        if (loggedin) {
            rhs = <ul className='menu'>
                <li className='hide-for-xlarge'>{searchIcon}</li>
                <li className='show-for-xlarge'>{SearchBar}</li>
                <li className='show-for-large'><a href={'/users/' + userid + '/' + username}>{username}</a></li>
            </ul>;
        } else {
            rhs = <ul className='menu'>
                <li className='hide-for-medium'>{searchIcon}</li>
                <li className='show-for-xlarge'>{SearchBar}</li>
            </ul>;
        }
        return (
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='menu icon-top'>
                        <li>{navicon}</li>
                        <li className='menu-text'><a href='/'>{config.name}</a></li>
                        <li><Spinner /></li>
                        <li><a href='/create'>Create Page</a></li>
                    </ul>
                </div>
                <div className='top-bar-right'>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
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
                    {rhs}
                </div>
            </div>
        );
    }
});

module.exports = Navbar;
