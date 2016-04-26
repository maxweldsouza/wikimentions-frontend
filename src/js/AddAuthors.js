var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var cookies = require('browser-cookies');
var Notification = require('./Notification');
var requests = require('superagent');
var Select = require('./Select');
var SubmitButton = require('./SubmitButton');

var AddAuthors = React.createClass({
    getInitialState () {
        return {
            opened: false,
            author: '',
            submiting: false,
            error: false,
            message: ''
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
    onCloseError () {
        this.setState({
            error: false,
            message: ''
        });
    },
    onSubmit () {
        if (!this.state.author) {
            this.setState({
                error: true,
                message: 'You need to add an author'
            });
        } else {
            requests
            .post('/api/v1/thing/' + this.props.id + '/booksby')
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
                    this.setState({
                        error: true,
                        message: res.body.message
                    });
                } else {
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    render () {
        var id = this.props.id;
        return (
            <span>
                {this.state.opened ? <span>
                    <form action='' method='post'>
                        <Notification level='alert' message={this.state.message} showing={this.state.error} onClose={this.onCloseError} closeable/>
                        <Select name='author'
                            placeholder='Author'
                            onSelectValue={this.onChangeAuthor}/>
                        <div>
                            <SubmitButton title='Add Author' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                            <button type="button" className="button" onClick={this.onClose}>Close</button>
                        </div>
                    </form>
                </span> : <span className='edit-links'>{' '}
                    <a onClick={this.onOpen}>Add Authors <span className='ion-plus-round'></span></a>
                </span>}
            </span>
        );
    }
});

module.exports = AddAuthors;
