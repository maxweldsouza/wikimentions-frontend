var React = require('react');
var ButtonSelect = require('./ButtonSelect');
var AddVideoNew = require('./AddVideoNew');
var AddVideoExisting = require('./AddVideoExisting');
var Restricted = require('./Restricted');

var AddVideo = React.createClass({
    getInitialState () {
        return {
            type: 'Existing'
        };
    },
    onChangeType (x) {
        this.setState({
            type: x
        });
    },
    render () {
        var options = [{ name: 'Existing', value: 'Existing' }, { name: 'New', value: 'New' }];
        return (
            <Restricted>
                <div>
                    Add a video of this author
                    <ButtonSelect
                        options={options}
                        default={this.state.type}
                        onChange={this.onChangeType}
                        />
                    {this.state.type !== 'New' ? <div>
                        <AddVideoExisting id={this.props.id}/>
                    </div> : <span>
                        <AddVideoNew id={this.props.id}/>
                    </span>}
                </div>
            </Restricted>
        );
    }
});

module.exports = AddVideo;
