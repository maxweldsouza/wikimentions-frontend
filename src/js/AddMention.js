var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');

var AddMention = React.createClass({
    statics: {
        resources (appstate) {
            return {
                api: []
            };
        }
    },
    getInitialState: function () {
        return {
            autocomplete: [],
            searchText: ''
        };
    },
    onSearchTextChanged (x) {
        this.setState({
            searchText: x
        });
        requests.get('/api/v1/search/' + x).end((err, res) => {
            this.setState({
                autocomplete: res.body,
                isLoadingExternally: false
            });
        });
    },
    render () {
        var parts = this.props.path.split('/');
        var id = Number(parts[1]);
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
                        <form action={'/api/v1/mentions/' + id} method='post'>
                            <input type='hidden' name='_xsrf' value={cookies.get('_xsrf')}/>
                            <input type='hidden' name='action' value='create'/>
                            <h1 className='page-title'>Add Mention</h1>
                            Mention: TODO
                            <label>Mentioned In
                                <Select
                                name='mentioned_in'
                                />
                            </label>
                            <label>Mentioned
                                <Select
                                name='mentioned'
                                />
                            </label>
                            <label>Description
                                <input type='text' name='description' placeholder=''/>
                            </label>
                            <label>References
                                <input type='text' name='references' placeholder=''/>
                            </label>
                            <button type='submit' className='success button'>Save</button>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = AddMention;
