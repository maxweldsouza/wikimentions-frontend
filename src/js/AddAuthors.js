var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var cookies = require('browser-cookies');
var Snackbar = require('./Snackbar');
var requests = require('superagent');
var Select = require('./Select');
var SubmitButton = require('./SubmitButton');
var AuthorCard = require('./AuthorCard');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;

var AddAuthors = React.createClass({
    getInitialState () {
        return {
            opened: false,
            author: '',
            submiting: false,
            authorValid: true,
            authorMessage: '',
            formMessage: ''
        };
    },
    onOpen (e) {
        this.setState({
            opened: true
        });
        e.preventDefault();
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
    validateForm () {
        var valid = true;
        if (!this.state.author) {
            this.setState({
                authorValid: false,
                authorMessage: 'Mentioned By is empty'
            });
            valid = false;
        } else {
            this.setState({
                authorValid: true,
                authorMessage: ''
            });
        }
        return valid;
    },
    onSubmit () {
        if (this.validateForm()) {
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
                    this.setState({
                        formMessage: res.body.message
                    });
                } else {
                    this.setState({
                        formMessage: ''
                    });
                    Snackbar({message: 'Added author'});
                    history.pushState(null, null, window.location.pathname + window.location.search);
                    Mentions.route(window.location.pathname + window.location.search);
                }
            });
        }
    },
    render () {
        var id = this.props.id;
        return (
            <div>
                <span className='edit-links'>{' '}
                    <a className='secondary' onClick={this.onOpen}>Edit Authors</a>
                </span>
                <VelocityTransitionGroup
                    enter={{animation: 'fadeIn'}}
                    leave={{animation: 'fadeOut'}}>
                {this.state.opened ? <div className='small-12 columns'>
                        <div className='card-container'>
                            {this.state.formMessage ? <div className='callout warning'>
                                {this.state.formMessage}
                            </div> : null}
                            {this.props.authors.map((x) => {
                                return <AuthorCard key={x.id} id={x.id} slug={x.props.slug} title={x.props.title} type={x.props.type} description={x.props.description} image={x.image} sourceType={this.props.type} sourceId={this.props.id}/>;
                            })}
                            <div className='card'>
                                <div className='small-12 columns'>
                                    <Select name='author'
                                        placeholder='Author'
                                        onSelectValue={this.onChangeAuthor}
                                        valid={this.state.authorValid}
                                        message={this.state.authorMessage}
                                        types={['person']}/>
                                    <div className='button-group small'>
                                        <SubmitButton title='Add Author' className='button primary' submitting={this.state.submitting} onSubmit={this.onSubmit}/>
                                        <button type='button' className='button secondary' onClick={this.onClose}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                </VelocityTransitionGroup>
            </div>
        );
    }
});

module.exports = AddAuthors;
