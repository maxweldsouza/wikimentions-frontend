var React = require('react');

var ButtonSelect = React.createClass({
    getInitialState () {
        return {
            selected: this.props.default
        };
    },
    onChangeSelected (x) {
        this.setState({
            selected: x
        });
        this.props.onChange(x);
    },
    render () {
        return (
            <div>
                <input
                    type='hidden'
                    name={this.props.name}
                    value={this.state.selected}
                />
                {this.props.options.map((x) => {
                    var cls;
                    if (this.state.selected === x.value) {
                        cls = 'button primary';
                    } else {
                        cls = 'button secondary';
                    }
                    return <button type='button' className={cls} onClick={this.onChangeSelected.bind(null, x.value)}>{x.name}</button>;
                })}
            </div>
        );
    }
});

module.exports = ButtonSelect;
