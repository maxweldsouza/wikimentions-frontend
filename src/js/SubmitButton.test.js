import React from 'react';
import renderer from 'react-test-renderer';
import SubmitButton from './SubmitButton';

test('SubmitButton renders correctly', () => {
    const tree = renderer
        .create(<SubmitButton title='Fb' submitting confirm />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
