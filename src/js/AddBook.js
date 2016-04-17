var React = require('react');
var cookies = require('browser-cookies');
var ButtonSelect = require('./ButtonSelect');
var Select = require('./Select');

var AddBook = React.createClass({
    getInitialState: function() {
        return {
            type: 'New'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    onSubmit () {

    },
    render () {
        var options = [{name:'New', value: 'New'}, {name: 'Existing', value:'Existing'}];
        return (
            <div>
                Add a book by this author
                <ButtonSelect
                    options={options}
                    default={this.state.type}
                    onChange={this.onChangeType}
                    />
                {this.state.type === 'New' ? <div>
                    <form method='post' action={'/api/v1/thing/' + this.props.id + '/books'}>
                        <input type='hidden' name='action' value='create'/>
                        <input type='text' name='title' placeholder='Title'/>
                        <input type='text' name='description' placeholder='Short Description' />
                        <button type='button' className='button' onClick={this.onSubmit}>Save</button>
                    </form>
                </div> : <span>
                <form action='/api/v1/thing' method='post'>
                    Search for the title of a book to add
                    <Select name='book_id' placeholder='Search for book'/>
                    <button type='button' className='button' onClick={this.onSubmit}>Save</button>
                </form>
                </span>}
            </div>
        );
    }
});

module.exports = AddBook;
