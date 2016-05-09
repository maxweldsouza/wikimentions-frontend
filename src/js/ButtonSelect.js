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
                    value={this.state.selected ? this.state.selected : ''}
                />
                <div className='small button-group'>
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
