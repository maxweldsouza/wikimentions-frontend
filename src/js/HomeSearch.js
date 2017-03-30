import React from 'react';
import autoBind from 'react-autobind';

class HomeSearch extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            searchText: ''
        };
    }
    onChangeText(e) {
        const temp = {
            error: false,
            message: ''
        };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
    }
    handleKeys(event) {
        if (event.key === 'Enter') {
            const path = `/search?q=${this.state.searchText}`;
            history.pushState(null, null, path);
            Mentions.route(path);
        }
    }
    render() {
        return (
            <div>
                <h2>Search</h2>
                <input
                    type="text"
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onChangeText}
                    onKeyDown={this.handleKeys}
                />
            </div>
        );
    }
}

export default HomeSearch;
