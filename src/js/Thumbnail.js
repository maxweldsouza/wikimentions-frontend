import React from 'react';
import Lazy from 'react-lazyload';
import VideoApiThumb from './VideoApiThumb';

class Thumbnail extends React.Component {
    static get defaultProps () {
        return {
            image: '',
            type: '',
            alt: '',
            url: '',
            shadow: false,
            round: false,
            marginBottom: false,
            bordered: false,
            offset: 0
        };
    }
    render () {
        const imageClass = this.props.shadow ? 'img shadow' : 'img';

        let imageUrl;
        let imageWidth;
        let imageHeight;
        let imageMd5;
        let aspectRatio;
        let useOriginal;
        if (this.props.image) {
            useOriginal = this.props.displayWidth > 75;
            if (this.props.type === 'book' && this.props.displayHeight === 200) {
                useOriginal = true;
            }
            if (useOriginal) {
                imageMd5 = this.props.image.md5;
                imageWidth = this.props.image.width;
                imageHeight = this.props.image.height;
            } else {
                imageMd5 = this.props.image.thumb_md5;
                imageWidth = this.props.image.thumb_width;
                imageHeight = this.props.image.thumb_height;
            }
            imageUrl = `/api/v1/static/images/${imageMd5}-${imageWidth}-${imageHeight}.jpg`;
            aspectRatio = imageWidth / imageHeight;
        } else {
            if (this.props.type === 'book') {
                aspectRatio = 0.75;
            } else if (this.props.type === 'person') {
                aspectRatio = 1;
            } else if (this.props.type === 'video') {
                aspectRatio = 120 / 90;
            }
        }
        let displayWidth = this.props.displayWidth;
        let displayHeight = this.props.displayHeight;
        if (!displayWidth) {
            displayWidth = displayHeight * aspectRatio;
        }
        if (!displayHeight) {
            displayHeight = displayWidth / aspectRatio;
        }
        const placeholder = <div className={this.props.bordered ? 'placeholder bordered' : 'placeholder'} style={{lineHeight: `${displayHeight}px`}}>
                {this.props.type === 'person' ? <span className='ion-image' /> : null}
                {this.props.type === 'book' ? <span className='ion-ios-book' /> : null}
                {this.props.type === 'video' ? <span className='ion-play' /> : null}
        </div>;
        let main;
        if (this.props.image) {
            main = <Lazy offset={this.props.offset} placeholder={placeholder}>
                <img
                    className={imageClass}
                    style={this.props.round ? {borderRadius: '999em'} : null}
                    src={imageUrl}
                    width={imageWidth}
                    height={imageHeight}
                    alt={this.props.alt}/>
            </Lazy>;
        } else if (this.props.type === 'video') {
            main = <Lazy offset={this.props.offset} placeholder={placeholder}><VideoApiThumb url={this.props.url} alt={this.props.alt}>
                {placeholder}
            </VideoApiThumb>
            </Lazy>;
        } else {
            main = placeholder;
        }
        const style = {'width': displayWidth, 'height': displayHeight};
        return (
            <div className={this.props.marginBottom ? 'image-container bottom-margin' : 'image-container'} style={style}>
                {main}
            </div>
        );
    }
}

export default Thumbnail;
