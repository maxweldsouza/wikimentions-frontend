var React = require('react');

var HomeSearch = React.createClass({
    getInitialState () {
        return {
            searchText: ''
        };
    },
    onChangeText (e) {
        var temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    },
    handleKeys (event) {
        if (event.key === 'Enter') {
            var path = '/search?q=' + this.state.searchText;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    },
    render () {
        return (
            <div>
                <h2>Search</h2>
                <input type='text' placeholder='Search for anything' name='searchText' value={this.state.searchText} onChange={this.onChangeText} onKeyDown={this.handleKeys}/>
            </div>
        );
    }
});

module.exports = HomeSearch;
