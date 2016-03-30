var React = require('react');
var Select = require('./Select');
var requests = require('superagent');

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
            <div>
                {this.state.opened ? <div>
                    <form action='' method='post'>
                        Add Author
                        <Select name='author'/>
                        <div className="small button-group">
                            <button type="button" className="button" onClick={this.onSubmit}>Submit</button>
                            <button type="button" className="button" onClick={this.onClose}>Close</button>
                        </div>
                    </form>
                </div> : <div>
                <button className='tiny button' onClick={this.onOpen}>Add Authors <span className='ion-plus-round'></span></button>
            </div>}
        </div>
    );
}
});

module.exports = AddAuthors;