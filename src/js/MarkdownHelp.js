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
                <a onClick={this.onOpenModal} className='secondary' title='Markdown help'><span className='ion-help-circled'/></a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.onCloseModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <h1>Markdown Help</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Style
                                </td>
                                <td>
                                    Markdown
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>
                                        Bold
                                    </strong>
                                </td>
                                <td>
                                    **text**
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <code>
                                        Code
                                    </code>
                                </td>
                                <td>
                                    `code`
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i>
                                        Italic
                                    </i>
                                </td>
                                <td>
                                    *text*
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>
                                        Link
                                    </a>
                                </td>
                                <td>
                                    [Title](http://)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <blockquote>
                                        Blockquote
                                    </blockquote>
                                </td>
                                <td>
                                    > quote
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='button float-right' onClick={this.onCloseModal}>Close</button>
                </Modal>
            </span>
        );
    }
});

module.exports = MarkdownHelp;
