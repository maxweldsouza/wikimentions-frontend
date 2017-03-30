import React from 'react';
import renderer from 'react-test-renderer';
import VideoEmbed from './VideoEmbed';

test('VideoEmbed renders correctly', () => {
    const tree = renderer
        .create(<VideoEmbed url='https://www.youtube.com/watch?v=BBCFQtDLPA0' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
