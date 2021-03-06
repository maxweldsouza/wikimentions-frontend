import React from 'react';
import Thumbnail from './Thumbnail';
import Link from './Link';
import requests from 'superagent';
import cookies from 'browser-cookies';
import snackbar from './snackbar';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';

class AuthorCard extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitting: false
        };
    }
    removeAuthor(e) {
        e.preventDefault();
        let type;
        if (this.props.sourceType === 'book') {
            type = 'booksby';
        } else if (this.props.sourceType === 'video') {
            type = 'videosby';
        }
        requests
            .delete(`/api/v1/thing/${this.props.sourceId}/${type}`)
            .type('form')
            .send({
                author_id: this.props.id,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submitting: false
                });
                if (err && err.status) {
                    snackbar({ message: res.body.message });
                } else {
                    snackbar({ message: 'Removed author' });
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
    render() {
        return (
            <form onSubmit={this.removeAuthor} className="card box">
                <div className="shrink columns">
                    <Thumbnail
                        type={this.props.type}
                        image={this.props.image}
                        alt={this.props.title}
                        displayWidth={40}
                    />
                </div>
                <div className="columns">
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        type={this.props.type}
                    >
                        {this.props.title}
                    </Link>
                    <div>
                        {this.props.description}
                    </div>
                </div>
                <div className="shrink columns">
                    <SubmitButton
                        title={
                            <span className="ion-close" aria-label="Remove" />
                        }
                        className="button small"
                        submitting={this.state.submitting}
                    />
                </div>
            </form>
        );
    }
}

export default AuthorCard;
