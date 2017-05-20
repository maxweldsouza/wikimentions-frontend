import React from 'react';
import Lazy from 'react-lazyload';
import VideoApiThumb from './VideoApiThumb';

const Thumbnail = (
    {
        image = '',
        type = '',
        alt = '',
        url = '',
        shadow = false,
        round = false,
        marginBottom = false,
        bordered = false,
        offset = 0,
        displayWidth,
        displayHeight
    }
) => {
    const imageClass = shadow ? 'img shadow' : 'img';

    let imageUrl;
    let imageWidth;
    let imageHeight;
    let imageMd5;
    let aspectRatio;
    let useOriginal;
    if (image) {
        useOriginal = displayWidth > 75;
        if (type === 'book' && displayHeight === 200) {
            useOriginal = true;
        }
        if (useOriginal) {
            imageMd5 = image.md5;
            imageWidth = image.width;
            imageHeight = image.height;
        } else {
            imageMd5 = image.thumb_md5;
            imageWidth = image.thumb_width;
            imageHeight = image.thumb_height;
        }
        imageUrl = `https://d198s6k47dh00z.cloudfront.net/${imageMd5}-${imageWidth}-${imageHeight}.jpg`;
        aspectRatio = imageWidth / imageHeight;
    } else if (type === 'book') {
        aspectRatio = 0.75;
    } else if (type === 'person') {
        aspectRatio = 1;
    } else if (type === 'video') {
        aspectRatio = 120 / 90;
    }
    let dw = displayWidth;
    let dh = displayHeight;
    if (!dw) {
        dw = displayHeight * aspectRatio;
    }
    if (!dh) {
        dh = displayWidth / aspectRatio;
    }
    const placeholder =
        <div
            className={bordered ? 'placeholder bordered' : 'placeholder'}
            style={{ lineHeight: `${dh}px` }}
        >
            {type === 'person' ? <span className="ion-image" /> : null}
            {type === 'book' ? <span className="ion-ios-book" /> : null}
            {type === 'video' ? <span className="ion-play" /> : null}
        </div>
    ;
    let main;
    if (image) {
        main =
            <Lazy offset={offset} placeholder={placeholder}>
                <img
                    className={imageClass}
                    style={round ? { borderRadius: '999em' } : null}
                    src={imageUrl}
                    width={imageWidth}
                    height={imageHeight}
                    alt={alt}
                />
            </Lazy>
        ;
    } else if (type === 'video') {
        main =
            <Lazy offset={offset} placeholder={placeholder}>
                <VideoApiThumb url={url} alt={alt}>
                    {placeholder}
                </VideoApiThumb>
            </Lazy>
        ;
    } else {
        main = placeholder;
    }
    const style = { width: dw, height: dh };
    return (
        <div
            className={
                marginBottom
                    ? 'image-container bottom-margin'
                    : 'image-container'
            }
            style={style}
        >
            {main}
        </div>
    );
};

export default Thumbnail;
