var React = require('react');
var Modal = require('./Modal');
var Markdown = require('./Markdown');

var MarkdownHelp = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    onCloseModal () {
        this.setState({
            modalIsOpen: false
        });
    },
    render () {
        var mdHelp = [
            ['> Blockquote', '> quote'],
            ['**Bold**', '**text**'],
            ['`Code`', '`code`'],
            ['*Italic*', '*text*'],
            ['[Link]()', '[Title](http://)'],
            ['~~Strikethrough~~', '~~text~~']
        ];
        return (
            <span>
                <a onClick={this.onOpenModal} className='secondary'><span className='ion-help-circled'/></a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <h1>Markdown Help</h1>
                    {mdHelp.map((line) => {
                        return <div className='row'>
                            <div className='columns'>
                                <Markdown markdown={line[0]}/>
                            </div>
                            <div className='columns'>
                                {line[1]}
                            </div>
                        </div>;
                    })}
                    <button className='button' onClick={this.onCloseModal}>Close</button>
                </Modal>
            </span>
        );
    }
});

module.exports = MarkdownHelp;
