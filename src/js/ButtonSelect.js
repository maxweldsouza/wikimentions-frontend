import React from 'react';
import autoBind from 'react-autobind';

class ButtonSelect extends React.Component {
    static get defaultProps () {
        return {
            className: 'small button-group'
        };
    }
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            selected: this.props.default
        };
    }
    onChangeSelected (x) {
        this.setState({
            selected: x
        });
        this.props.onChange(x);
    }
    render () {
        return (
            <div>
                <input
                    type='hidden'
                    name={this.props.name}
                    value={this.state.selected ? this.state.selected : ''}
                />
                <div className={this.props.className} role='group'>
                    {this.props.options.map((x) => {
                        return <button
                            aria-selected={this.state.selected === x.value}
                            className={this.state.selected === x.value ? 'button' : 'button secondary'}
                            key={x.value}
                            onClick={this.onChangeSelected.bind(null, x.value)}
                            type='button'>
                            {x.name}
                        </button>;
                    })}
                </div>
            </div>
        );
    }
}

export default ButtonSelect;
