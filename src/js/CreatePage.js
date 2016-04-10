var React = require('react');
var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Login = require('./Login');
var Signup = require('./Signup');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Xsrf = require('./Xsrf');

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
            type: 'person'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
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
                        <form action='/api/v1/thing' method='post'>
                            <input type='hidden' name='action' value='create'/>
                            <Xsrf/>
                            <h1 className='page-title'>Create Page</h1>
                            <input type='text' name='title' placeholder='Title' />
                            <input type='text' name='description' placeholder='Description' />
                            <div className='row'>
                                <div className='small-12 medium-6 columns'>
                                    <label>Type
                                        <ButtonSelect
                                            name='type'
                                            options={options}
                                            onChange={this.onChangeType}/>
                                    </label>
                                </div>
                                <div className='small-12 medium-6 columns'>
                                    {this.state.type === 'book' ? <input type='text' name='isbn' placeholder='ISBN' /> : null}
                                </div>
                            </div>
                            <label htmlFor="exampleFileUpload" className="button">Upload Image</label>
                            <input type="file" id="exampleFileUpload" className="show-for-sr"/>
                            <div>
                                <button type='submit' className='success button'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = HomePage;
