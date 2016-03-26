var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');

var HomePage = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState () {
        return {
            type: 'book'
        };
    },
    onChangeType (e) {
        this.setState({
            type: e.currentTarget.value
        });
    },
    render () {
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
                        <form action='/api/v1/thing' method='post'>
                            <input type='hidden' name='action' value='create'/>
                            <h1 className='page-title'>Create Page</h1>
                            <label>Title
                                <input type='text' name='title' placeholder='' />
                            </label>
                            <label>Short Description
                                <input type='text' name='description' placeholder='' />
                            </label>
                            <label>Type
                                <select name='type' onChange={this.onChangeType}>
                                    <option value="book">Book</option>
                                    <option value="person">Person</option>
                                    <option value="video">Video</option>
                                </select>
                            </label>
                            {this.state.type === 'book' ? <label>ISBN
                                <input type='text' name='isbn' placeholder='' />
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

module.exports = HomePage;
