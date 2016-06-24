var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var PreviousNext = require('./PreviousNext');
var HistoryItem = require('./HistoryItem');
var PageBar = require('./PageBar');
var config = require('./config');
var Time = require('./Time');
var Modal = require('react-modal');
var ImageUpload = require('./ImageUpload');
var Markdown = require('./Markdown');
var Restricted = require('./Restricted');

var ImagesPage = React.createClass({
    statics: {
        resources (appstate) {
            var [type, id, slug] = appstate.path.split('/');
            var page = appstate.query.page;
            var query = page ? '?page=' + page : '';
            return {
                api: [
                    {
                        name: 'images',
                        path: '/api/v1/images/' + id + query
                    }
                ]
            };
        }
    },
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
    render () {
        var nodata = <div className='card'>
            <div className='small-12 columns'>
                Nothing to show here
            </div>
        </div>;
        var loggedOutMessage = <span>You need to <a href='/login'>Log In</a> to upload images.</span>;
        return (
            <span>
                <Helmet
                    title={'Images - ' + this.props.data.images.title}
                    titleTemplate={'%s - ' + config.name}
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': config.url}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>{'Images - ' + this.props.data.images.title}</h1>
                        <PageBar
                            id={this.props.data.images.id}
                            slug={this.props.data.images.slug}
                            type={this.props.data.images.type}
                            />
                        <div className='small-12 columns'>
                            <div className='card-container'>
                                <div className='card small-12 columns'>
                                    <Restricted
                                        message={loggedOutMessage}>
                                        <a
                                            className='' onClick={this.onOpenModal}>Upload</a> an image for this page.
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onRequestClose={this.closeModal}
                                            className='modal-content'
                                            overlayClassName='modal-overlay'>
                                            <div className='small-12 columns'>
                                                <ImageUpload id={this.props.data.images.id} width={250} height={250} onClose={this.closeModal}/>
                                            </div>
                                        </Modal>
                                    </Restricted>
                                </div>
                                {this.props.data.images.images.length === 0 ? nodata : null}
                                {this.props.data.images.images.map((x) => {
                                    var name = x.md5 + '-' + x.width + '-' + x.height + '.jpg';
                                    return <div className='card'>
                                        <div className='small-12 columns'>
                                            <a href={'/api/v1/static/images/' + name} target='_blank'>{name}</a> added <Time timestamp={x.added} type='ago' />
                                            <Markdown markdown={x.description} />
                                        </div>
                                    </div>;
                                })}
                                <PreviousNext path={this.props.path} page={this.props.query.page}/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ImagesPage;
