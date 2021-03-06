import React from 'react';
import MarkdownHelp from './MarkdownHelp';
import Markdown from './Markdown';
import autoBind from 'react-autobind';

class MarkdownInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            preview: false,
            firstChange: true
        };
    }
    showPreview() {
        this.setState({
            preview: true
        });
    }
    hidePreview() {
        this.setState({
            preview: false
        });
    }
    onChangeText(e) {
        if (this.state.firstChange) {
            this.setState({
                preview: true,
                firstChange: false
            });
        }
        this.props.onChange(e);
    }
    render() {
        const layout = this.props.sideBySide && this.state.preview
            ? 'small-12 large-6 columns'
            : 'small-12 columns';
        return (
            <div className="row">
                <div className={layout}>
                    {this.props.label} <MarkdownHelp />
                    {this.state.preview
                        ? <a
                              className="secondary float-right"
                              onClick={this.hidePreview}
                          >
                              Hide Preview
                          </a>
                        : null}
                    {this.state.preview
                        ? null
                        : <a
                              className="secondary float-right"
                              onClick={this.showPreview}
                          >
                              Preview
                          </a>}
                    <textarea
                        type="text"
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.content}
                        onChange={this.onChangeText}
                        rows={this.props.rows}
                        maxLength={this.props.maxLength}
                    />
                </div>
                {this.state.preview
                    ? <div className={layout}>
                          <strong>Preview</strong>
                          <Markdown
                              className="callout"
                              markdown={this.props.content}
                          />
                      </div>
                    : null}
            </div>
        );
    }
}

export default MarkdownInput;
