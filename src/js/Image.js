var React = require('react');

var Image = React.createClass({
    render () {
        return (
            <div>
                <img className="" src={'/api/v1/images/' + this.props.md5 + '-' + this.props.width + '-' + this.props.height + '.jpg'} alt=""/>
            </div>
        );
    }
});

module.exports = Image;
