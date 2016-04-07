var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');

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
            type: 'Person'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var options = ['Book', 'Person', 'Video'];
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
                        <form action='/api/v1/thing' method='post'>
                            <input type='hidden' name='action' value='create'/>
                            <input type='hidden' name='_xsrf' value={cookies.get('_xsrf')}/>
                            <h1 className='page-title'>Create Page</h1>
                            <label>Title
                                <input type='text' name='title' placeholder='' />
                            </label>
                            <label>Short Description
                                <input type='text' name='description' placeholder='' />
                            </label>
                            <div className='row'>
                                <div className='small-12 medium-6 columns'>
                                    <label>Type
                                        <ButtonSelect options={options}  onChange={this.onChangeType}/>
                                    </label>
                                </div>
                                <div className='small-12 medium-6 columns'>
                                    {this.state.type === 'Book' ? <label>ISBN
                                        <input type='text' name='isbn' placeholder='' />
                                    </label> : null}
                                </div>
                            </div>
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
