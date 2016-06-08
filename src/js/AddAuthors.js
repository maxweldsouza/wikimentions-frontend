var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var requests = require('superagent');
var Select = require('./Select');
var SubmitButton = require('./SubmitButton');

var AddAuthors = React.createClass({
    getInitialState () {
        return {
            opened: false,
            author: '',
            submiting: false
        };
    },
    onOpen () {
        this.setState({
            opened: true
        });
    },
    onClose () {
        this.setState({
            opened: false
        });
    },
    onChangeAuthor (x) {
        this.setState({
            author: x.id
        });
    },
    onSubmit () {
        if (!this.state.author) {
            Snackbar({message: 'You need to add an author'});
        } else {
            var type;
            if (this.props.type === 'book') {
                type = '/booksby';
            } else if (this.props.type === 'video') {
                type = '/videosby';
            }
            requests
            .post('/api/v1/thing/' + this.props.id + type)
            .type('form')
            .send({
                author_id: this.state.author,
                action: 'add',
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submiting: false
                });
                if (err && err.status) {
                    Snackbar({message: res.body.message});
                } else {
                    Snackbar({message: 'Added author'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    removeAuthor (id) {
        var type;
        if (this.props.type === 'book') {
            type = '/booksby';
        } else if (this.props.type === 'video') {
            type = '/videosby';
        }
        requests
        .post('/api/v1/thing/' + this.props.id + type)
        .type('form')
        .send({
            author_id: id,
            action: 'remove',
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submiting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Removed author'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    render () {
        var id = this.props.id;
        return (
            <span>
                {this.state.opened ? <span>
                    <div>
                        <strong>Authors</strong>
                        {this.props.authors.map((x) => {
                            var path = '/people/' + x.id + '/' + x.slug;
                            return <div>
                                <a href={path}>{x.title}</a> <a href='' className='secondary small' onClick={this.removeAuthor.bind(null, x.id)}>Remove</a>
                            </div>;
                        })}
                    </div>
                    <form action='' method='post'>
                        <Select name='author'
                            placeholder='Author'
                            onSelectValue={this.onChangeAuthor}/>
                        <div className='button-group small'>
                            <SubmitButton title='Add Author' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                            <button type="button" className="button" onClick={this.onClose}>Close</button>
                        </div>
                    </form>
                </span> : <span className='edit-links'>{' '}
                    <a className='secondary' onClick={this.onOpen}>Edit Authors</a>
                </span>}
            </span>
        );
    }
});

module.exports = AddAuthors;
