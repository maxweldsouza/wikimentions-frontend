var React = require('react');

var AddBookNew = React.createClass({
    render () {
        return (
            <form method='post' action={'/api/v1/thing/' + this.props.id + '/books'}>
                <input type='text' name='title' placeholder='Title'/>
                <input type='text' name='description' placeholder='Short Description' />
                <button type='button' className='button' onClick={this.onSubmit}>Save</button>
            </form>
        );
    }
});

module.exports = AddBookNew;
