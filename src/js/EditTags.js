var React = require('react');
var Modal = require('./Modal');
var requests = require('superagent');
var SubmitButton = require('./SubmitButton');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');

var allTags = ['Science', 'Startups', 'Programming'];

var EditTags = React.createClass({
    getDefaultProps: function() {
        return {
            tags: []
        };
    },
    getInitialState () {
        return {
            modalIsOpen: false,
            submitting: false,
            tag: ''
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    onCloseModal () {
        this.setState({
            modalIsOpen: false
        });
    },
    onRemoveTag (tag) {
        this.setState({
            submitting: true
        });
        requests
        .delete('/api/v1/tag/' + this.props.id)
        .type('form')
        .send({
            tag: tag,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Tag removed'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    onAddTag () {
        this.setState({
            submitting: true
        });
        requests
        .post('/api/v1/tag/' + this.props.id)
        .type('form')
        .send({
            tag: this.state.tag,
            _xsrf: cookies.get('_xsrf')
        })
        .end((err, res) => {
            this.setState({
                submitting: false
            });
            if (err && err.status) {
                Snackbar({message: res.body.message});
            } else {
                Snackbar({message: 'Tag added'});
                history.pushState(null, null, window.location.pathname + window.location.search);
                Mentions.route(window.location.pathname + window.location.search);
            }
        });
    },
    onChangeTag (e) {
        this.setState({
            tag: e.target.value
        });
    },
    render () {
        return (
            <span>
                <a onClick={this.onOpenModal} className='tag round secondary hint--right hint--rounded hint--no-animate' aria-label='Edit Tags'>
                    <span className='ion-edit'/>
                </a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <h1>Edit Tags</h1>
                        <p>
                            Tags:
                            {this.props.tags.map((x) => {
                                return <span className='tag round no-margin-bottom' href={'/tags/' + x} key={x}>
                                    {x} <span onClick={this.onRemoveTag.bind(null, x)} className='ion-close-circled'/>
                                </span>;
                            })}
                        </p>
                        <select onChange={this.onChangeTag} value={this.state.tag}>
                            <option value='' disabled>Add Tag...</option>
                            {allTags.map((x) => {
                                return <option value={x} key={x}>{x}</option>;
                            })}
                        </select>
                        <SubmitButton
                            title='Add'
                            className='button float-right'
                            submitting={this.state.submitting}
                            onSubmit={this.onAddTag}/>
                    </div>
                </Modal>
            </span>
        );
    }
});

module.exports = EditTags;
