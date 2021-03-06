import React from 'react';
import cookies from 'browser-cookies';
import requests from 'superagent';
import Select from './Select';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';

class AddVideoExisting extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            video_id: '',
            submitting: false,
            videoValid: true,
            videoMessage: '',
            formMessage: ''
        };
    }
    onSelect(x) {
        this.setState({
            video_id: x.id
        });
    }
    validateForm() {
        let valid = true;
        if (!this.state.video_id) {
            this.setState({
                videoValid: false,
                videoMessage: 'No video selected'
            });
            valid = false;
        } else {
            this.setState({
                videoValid: true,
                videoMessage: ''
            });
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });
            requests
                .post(`/api/v1/thing/${this.props.id}/videos`)
                .type('form')
                .send({
                    video_id: this.state.video_id,
                    _xsrf: cookies.get('_xsrf')
                })
                .end((err, res) => {
                    this.setState({
                        submitting: false
                    });
                    if (err && err.status) {
                        this.setState({
                            formMessage: res.body.message
                        });
                    } else {
                        this.setState({
                            formMessage: ''
                        });
                        snackbar({ message: 'Video added' });
                        history.pushState(
                            null,
                            null,
                            window.location.pathname + window.location.search
                        );
                        Mentions.route(
                            window.location.pathname + window.location.search
                        );
                    }
                });
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.formMessage
                    ? <div className="callout alert">
                          {this.state.formMessage}
                      </div>
                    : null}
                Search for video
                <Select
                    name="video_id"
                    onSelectValue={this.onSelect}
                    types={['video']}
                    valid={this.state.videoValid}
                    message={this.state.videoMessage}
                />
                <SubmitButton
                    title="Add"
                    className="button primary float-right"
                    submitting={this.state.submitting}
                />
            </form>
        );
    }
}

export default AddVideoExisting;
