import _ from 'underscore';
import cookies from 'browser-cookies';
import Dropdown from './Dropdown';
import Link from './Link';
import parseUrl from 'url-parse';
import React from 'react';
import requests from 'superagent';
import snackbar from './snackbar';
import Thumbnail from './Thumbnail';
import autoBind from 'react-autobind';

class Mention extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            dropdownIsOpen: false
        };
    }
    removeMention() {
        requests
            .delete('/api/v1/mentions')
            .type('form')
            .send({
                mention_id: this.props.mention_id,
                _xsrf: cookies.get('_xsrf')
            })
            .end((err, res) => {
                this.setState({
                    submitting: false
                });
                if (err && err.status) {
                    snackbar({ message: res.body.message });
                } else {
                    snackbar({ message: 'Mention deleted' });
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
    openDropdown() {
        this.setState({
            dropdownIsOpen: true
        });
    }
    closeDropdown() {
        this.setState({
            dropdownIsOpen: false
        });
    }
    render() {
        let icon;
        let secondaryIcon;
        let description;

        let main;
        let secondary;
        let inorby;
        if (this.props.type === 'person') {
            if (this.props.mentioned) {
                main = this.props.mentioned;
            } else {
                main = this.props.mentioned_by;
            }
            secondary = this.props.mentioned_in;
            inorby = 'In ';
        } else if (this.props.mentioned) {
            main = this.props.mentioned;
            secondary = this.props.mentioned_by;
            inorby = 'By ';
        } else {
            main = this.props.mentioned_by;
            secondary = this.props.mentioned_in;
            inorby = 'In ';
        }
        description = main.props && main.props.description
            ? main.props.description
            : '';

        if (secondary && 'props' in secondary && 'type' in secondary.props) {
            if (secondary.props.type === 'book') {
                secondaryIcon = 'ion-ios-book';
            } else if (secondary.props.type === 'video') {
                secondaryIcon = 'ion-ios-videocam';
            } else if (secondary.props.type === 'person') {
                secondaryIcon = 'ion-person';
            }
        }

        if (main.props.type === 'book') {
            icon = 'ion-ios-book';
            description = 'Book';
        } else if (main.props.type === 'video') {
            icon = 'ion-ios-videocam';
            description = 'Video';
        } else if (main.props.type === 'person') {
            icon = 'ion-person';
        }

        let parsed;
        if (this.props.reference) {
            parsed = parseUrl(this.props.reference);
        }
        return (
            <div className="card box">
                <span
                    className="ion-chevron-down card-chevron"
                    onClick={this.openDropdown}
                />
                <Dropdown
                    isOpen={this.state.dropdownIsOpen}
                    onClose={this.closeDropdown}
                >
                    <div className="dropdown-pane bottom-right small">
                        <ul className="dropdown menu vertical">
                            <li>
                                <a
                                    className="secondary"
                                    onClick={this.removeMention}
                                >
                                    Remove
                                </a>
                            </li>
                        </ul>
                    </div>
                </Dropdown>
                <div className="shrink columns">
                    <Link
                        id={main.id}
                        slug={main.props.slug}
                        type={main.props.type}
                    >
                        <Thumbnail
                            alt={main.props.title}
                            type={main.props.type}
                            image={main.image}
                            url={main.props.url}
                            displayWidth={75}
                        />
                    </Link>
                </div>
                <div className="columns no-padding-left">
                    <div className="row">
                        <div className="small-12 columns card-title">
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                type={main.props.type}
                            >
                                {main.props.title}
                            </Link>
                        </div>
                        <div className="small-12 columns">
                            {description
                                ? <span>
                                      <span className={icon} />
                                      {' '}
                                      {' '}
                                      {description}
                                  </span>
                                : null}
                        </div>
                        <div className="small-12 columns">
                            {this.props.quote}
                        </div>
                        <div className="small-12 columns">
                            {main.props.type === 'person'
                                ? <Link
                                      id={main.id}
                                      slug={main.props.slug}
                                      title={main.props.title}
                                      type={main.props.type}
                                      className="secondary card-count"
                                      tab="videos"
                                  >
                                      {'Videos '}
                                      <span className="badge">
                                          {main.video_count}
                                      </span>
                                      {'  '}
                                  </Link>
                                : null}
                            {main.props.type === 'person'
                                ? <Link
                                      id={main.id}
                                      slug={main.props.slug}
                                      title={main.props.title}
                                      type={main.props.type}
                                      className="secondary card-count"
                                      tab="books"
                                  >
                                      {'Books '}
                                      <span className="badge">
                                          {main.book_count}
                                      </span>
                                      {'  '}
                                  </Link>
                                : null}
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className="secondary card-count"
                                tab="mentioned"
                            >
                                {'Mentions '}
                                <span className="badge">
                                    {main.mentioned_count}
                                </span>
                                {'  '}
                            </Link>
                            <Link
                                id={main.id}
                                slug={main.props.slug}
                                title={main.props.title}
                                type={main.props.type}
                                className="secondary card-count"
                                tab="mentionedby"
                            >
                                {'Mentioned By '}
                                <span className="badge">
                                    {main.mentioned_by_count}
                                </span>
                            </Link>
                        </div>
                        {secondary
                            ? <div className="small-12 columns">
                                  {inorby}
                                  {' '}
                                  <span className={secondaryIcon} />
                                  {' '}
                                  <strong>
                                      <Link
                                          className="secondary"
                                          id={secondary.id}
                                          slug={secondary.props.slug}
                                          type={secondary.props.type}
                                      >
                                          {secondary.props.title}
                                      </Link>
                                  </strong>
                              </div>
                            : null}
                        {this.props.reference
                            ? <div className="small-12 columns">
                                  Reference: <a
                                      className="secondary"
                                      style={{ fontWeight: 'bold' }}
                                      href={this.props.reference}
                                      target="_blank"
                                  >
                                      {parsed.hostname}
                                      {' '}
                                      <span className="ion-android-open" />
                                  </a>
                              </div>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Mention;
