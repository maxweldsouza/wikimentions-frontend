var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Xsrf = require('./Xsrf');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/thing/' + id
                    }
                ]
            };
        }
    },
    getInitialState () {
        return {
            type: this.props.data.thing.type
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.thing;
        var options = [{name: 'Book', value: 'book'},
            {name: 'Person', value: 'person'},
            {name: 'Video', value: 'video'}];
        return (
            <span>
                <Helmet
                    title={'Mentions'}
                    titleTemplate='%s - Mentions'
                    meta={[
                        {'name': 'description', 'content': ''}
                    ]}
                    link={[
                        {'rel': 'canonical', 'href': ''}
                    ]}
                    />
                <Navbar/>
                <div className='row page-body align-center'>
                    <div className='small-12 large-8 columns'>
                        <h1 className='page-title'>Edit</h1>
                        <span className='edit-links'>
                            <a href={'/pages/' + id + '/' + entry.slug}>Page</a>
                            {' | Edit | '}
                            <a href={'/discuss/' + id + '/' + entry.slug}>Discuss</a>
                            {' | '}
                            <a href={'/history/' + id + '/' + entry.slug}>History</a>
                        </span>
                        <form action={'/api/v1/thing/' + id} method='post'>
                            <Xsrf/>
                            <input type='hidden' name='action' value='update'/>
                            <input type='text' name='title' placeholder='Title' defaultValue={this.props.data.thing.title}/>
                            <input type='text' name='description' placeholder='Description' defaultValue={this.props.data.thing.description}/>
                            <ButtonSelect
                                name='type'
                                default={this.props.data.thing.type}
                                options={options}
                                onChange={this.onChangeType}/>
                            {this.state.type === 'book' ? <input type='text' name='isbn' placeholder='ISBN' defaultValue={this.props.data.thing.isbn}/> : null}
                            <label htmlFor="exampleFileUpload" className="button">Upload Image</label>
                            <input type="file" id="exampleFileUpload" className="show-for-sr"/>
                            <div>
                                <button type='submit' className='success button'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
