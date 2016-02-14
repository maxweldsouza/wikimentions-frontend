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
                <form action='/api/v1/login' method='post'>
                    <div className='row'>
                        <div className='small-12 medium-6 columns'>
                            <h2>Create Page</h2>
                            <label>Title
                                <input type='text' name='title' placeholder='' />
                            </label>
                            <label>Short Description
                                <input type='text' name='description' placeholder='' />
                            </label>
                            <label>Type
                                <select>
                                    <option value="person">Person</option>
                                    <option value="book">Book</option>
                                </select>
                            </label>
                            <label>ISBN
                                <input type='text' name='ISBN' placeholder='' />
                            </label>
                            <label htmlFor="exampleFileUpload" className="button">Upload Image</label>
      <input type="file" id="exampleFileUpload" className="show-for-sr"/>
                            <button type='submit' className='success button'>Submit</button>
                        </div>
                    </div>
                </form>
            </span>
        );
    }
});

module.exports = HomePage;
