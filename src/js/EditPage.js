var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Mention = require('./Mention');
var _ = require('underscore');

var EditPage = React.createClass({
    statics: {
        resources (appstate) {
            var data;
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'thing',
                        path: '/api/v1/editpage/' + id
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
    onChangeType (e) {
        this.setState({
            type: e.currentTarget.value
        });
    },
    render () {
        var id = Number(this.props.path.split('/')[1]);
        var entry = this.props.data.thing;
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
                <div className='row page-body'>
                    <div className='small-12 large-8 large-centered columns'>
                        <h1 className='page-title'>Edit</h1>
                        <span className='edit-links'>
                            <a href={'/pages/' + id + '/' + entry.slug}>Page</a>
                            {' | Edit | '}
                            <a href={'/discuss/' + id + '/' + entry.slug}>Discuss</a>
                            {' | '}
                            <a href={'/history/' + id + '/' + entry.slug}>History</a>
                        </span>
                        <form action={'/api/v1/editpage/' + id} method='post'>
                            <label>Title
                                <input type='text' name='title' placeholder='' defaultValue={this.props.data.thing.title}/>
                            </label>
                            <label>Short Description
                                <input type='text' name='description' placeholder='' defaultValue={this.props.data.thing.description}/>
                            </label>
                            <label>Slug
                                <input type='text' name='slug' placeholder='' defaultValue={this.props.data.thing.slug}/>
                            </label>
                            <label>Type
                                <select name='type' onChange={this.onChangeType} value={this.state.type}>
                                    <option value="book">Book</option>
                                    <option value="person">Person</option>
                                </select>
                            </label>
                            {this.state.type === 'book' ? <label>ISBN
                                <input type='text' name='isbn' placeholder='' defaultValue={this.props.data.thing.isbn}/>
                            </label> : null}
                            <label htmlFor="exampleFileUpload" className="button">Upload Image</label>
                            <input type="file" id="exampleFileUpload" className="show-for-sr"/>
                            <div>
                                <button type='submit' className='success button'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditPage;
