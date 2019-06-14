import React from 'react';

// A component that wraps another component. If the `showSpinner` prop is true, then
// the spinner image will be displayed. Otherwise the wrapped component (the special prop `children`)
// will be rendered.
const Spinner = ({showSpinner, children}) => (
    showSpinner
        ? <img src="https://media.giphy.com/media/3ohzdL95gkIo73F3Vu/source.gif" alt="" style={{width: '200px'}} />
        : children
);

export default Spinner;
