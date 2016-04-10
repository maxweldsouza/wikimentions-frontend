var React = require('react');
var Select = require('./Select');
var requests = require('superagent');
var Xsrf = require('./Xsrf');

var AddAuthors = React.createClass({
    getInitialState: function() {
        return {
            opened: false
        };
    },
    onOpen () {
        this.setState({
            opened: true
        });
    },
    onClose () {
        this.setState({
            opened: false
        });
    },
    onSubmit () {
        requests
        .post('/api')
        .send({ name: 'Manny', species: 'cat' })
        .set('Accept', 'application/json')
        .end(function(err, res){
            // Calling the end function will send the request
        });
    },
    render () {
        var id = this.props.id;
        return (
            <span>
                {this.state.opened ? <span>
                    <form action='' method='post'>
                        <Xsrf/>
                        <Select name='author' placeholder='Author'/>
                        <div className="small button-group">
                            <button type="button" className="button" onClick={this.onSubmit}>Add this author</button>
                            <button type="button" className="button" onClick={this.onClose}>Close</button>
                        </div>
                    </form>
                    </span> : <span>
                    <button className='tiny button' onClick={this.onOpen}>Add authors <span className='ion-plus-round'></span></button>
                </span>}
            </span>
        );
    }
});

module.exports = AddAuthors;
