import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link';

test('Link renders correctly', () => {
    ['person', 'video', 'book'].map(type => {
        const tree = renderer
            .create(<Link type={type} id={1} slug="target-name" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
