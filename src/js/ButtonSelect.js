var React = require('react');

var ButtonSelect = React.createClass({
    getDefaultProps () {
        return {
            className: 'small button-group'
        };
    },
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
                    value={this.state.selected ? this.state.selected : ''}
                />
                <div className={this.props.className}>
                    {this.props.options.map((x) => {
                        var cls;
                        if (this.state.selected === x.value) {
                            cls = 'button primary';
                        } else {
                            cls = 'button secondary hollow';
                        }
                        return <button type='button' className={cls} onClick={this.onChangeSelected.bind(null, x.value)} key={x.value}>{x.name}</button>;
                    })}
                </div>
            </div>
        );
    }
});

module.exports = ButtonSelect;
