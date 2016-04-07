var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');
var cookies = require('browser-cookies');

var EditMention = React.createClass({
    statics: {
        resources (appstate) {
            var id = appstate.url.split('/')[1];
            return {
                api: [
                    {
                        name: 'mention',
                        path: '/api/v1/editmention/' + id
                    }
                ]
            };
        }
    },
    render () {
        var mention = this.props.data.mention;
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
                        <form action={'/api/v1/editmention/' + mention.id} method='post'>
                            <input type='hidden' name='_xsrf' value={cookies.get('_xsrf')}/>
                            <h1 className='page-title'>Edit Mention</h1>
                            <Select
                                    name='mentioned'
                                    initialValue={mention.mentioned.id}
                                    initialLabel={mention.mentioned.title}
                                    placeholder='Mentioned'
                                    />
                            <Select
                                    name='mentioned_by'
                                    initialValue={mention.mentioner.id}
                                    initialLabel={mention.mentioner.title}
                                    placeholder='Mentioned By'
                                />
                            <input type='text' name='description' placeholder='Description' defaultValue={mention.quote}/>
                            <input type='text' name='references' defaultValue={mention.references} placeholder='References' />
                            <button type='submit' className='success button'>Save</button>
                        </form>
                        <form action={'/api/v1/deletemention/' + mention.id} method='post'>
                            <button type='submit' className='success button'>Delete</button>
                        </form>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = EditMention;
