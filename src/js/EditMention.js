var React = require('react');

var Helmet = require('react-helmet');
var Navbar = require('./Navbar');
var Select = require('./Select');

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
                <div className='row page-body'>
                    <div className='small-12 large-8 large-centered columns'>
                        <form action={'/api/v1/editmention/' + mention.id} method='post'>
                            <h1 className='page-title'>Edit Mention</h1>
                            <label>Mentioned
                                <Select
                                    name='mentioned'
                                    initialValue={mention.mentioned.id}
                                    initialLabel={mention.mentioned.title}
                                    />
                            </label>
                            <label>Mentioned by
                                <Select
                                    name='mentioned_by'
                                    initialValue={mention.mentioner.id}
                                    initialLabel={mention.mentioner.title}
                                    />
                            </label>
                            <label>Description
                                <input type='text' name='description' placeholder='' defaultValue={mention.quote}/>
                            </label>
                            <label>References
                                <input type='text' name='references' defaultValue={mention.references} placeholder='' />
                            </label>
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
