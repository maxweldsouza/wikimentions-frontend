import React from 'react';
import Link from './Link';
import Thumbnail from './Thumbnail';

class HomeItem extends React.Component {
    render () {
        return (
            <div className='card box'>
                <div className='shrink columns'>
                    <Link
                        id={this.props.id}
                        slug={this.props.slug}
                        type={this.props.type}>
                        <Thumbnail
                        alt={this.props.title}
                        type={this.props.type}
                        image={this.props.image}
                        url={this.props.url}
                        displayWidth={75} />
                    </Link>
                </div>
                <div className='columns'>
                    <div className='row'>
                        <span className='small-12 columns card-title'>
                            <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                type={this.props.type}>{this.props.title}</Link>
                        </span>
                        <span className='small-12 columns'>
                            {this.props.description}
                        </span>
                        <div className='small-12 columns'>
                            {this.props.type === 'person' ? <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                title={this.props.title}
                                type={this.props.type}
                                className='secondary card-count'
                                tab='videos'>{'Videos '}<span className="badge">{this.props.video_count}</span>{'  '}
                            </Link> : null}
                            {this.props.type === 'person' ? <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                title={this.props.title}
                                type={this.props.type}
                                className='secondary card-count'
                                tab='books'>{'Books '}<span className="badge">{this.props.book_count}</span>{'  '}
                            </Link> : null}
                            <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                title={this.props.title}
                                type={this.props.type}
                                className='secondary card-count'
                                tab='mentioned'>{'Mentions '}<span className="badge">{this.props.mentioned_count}</span>{'  '}
                            </Link>
                            <Link
                                id={this.props.id}
                                slug={this.props.slug}
                                title={this.props.title}
                                type={this.props.type}
                                className='secondary card-count'
                                tab='mentionedby'>{'Mentioned By '}<span className="badge">{this.props.mentioned_by_count}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeItem;
