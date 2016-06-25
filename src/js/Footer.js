var React = require('react');

var Footer = React.createClass({
    render () {
        return (
                <div className='row page-footer'>
                    <div className='small-12 columns'>
                        <hr/>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className="menu">
                            <li><a href="#">Create</a></li>
                            <li><a href="#">Contribute</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className="menu align-right">
                            <li><a href="/terms-of-use">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

        );
    }
});

module.exports = Footer;
