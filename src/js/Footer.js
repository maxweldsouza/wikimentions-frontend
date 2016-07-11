var React = require('react');

var Footer = React.createClass({
    render () {
        return (
                <div className='row page-footer'>
                    <div className='small-12 columns'>
                        <hr/>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className='menu'>
                            <li><a href='/create'>Create</a></li>
                            <li><a href='/contribute'>Contribute</a></li>
                            <li><a href='/blog'>Blog</a></li>
                            <li><a href='/contact'>Contact</a></li>
                        </ul>
                    </div>
                    <div className='small-12 large-6 columns'>
                        <ul className='menu align-right'>
                            <li><a href='/terms-of-use'>Terms of Use</a></li>
                            <li><a href='/privacy-policy'>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

        );
    }
});

module.exports = Footer;
