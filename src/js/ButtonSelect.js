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
                    if (this.state.selected === x) {
                        cls = 'button success';
                    } else {
                        cls = 'button';
                    }
                    return <button type='button' className={cls} onClick={this.onChangeSelected.bind(null, x)}>{x}</button>
                })}
            </div>
        );
    }
});

module.exports = ButtonSelect;
