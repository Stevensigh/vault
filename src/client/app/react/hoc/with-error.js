import React from 'react';

/**
 * HOC factory for separating error message selection logic outside of the component itself. The
 * final error message, if available, is injected as an additional prop on the wrapped component.
 *
 * @param {Function} reducer Function mapping the component props to an error message.
 * @return {Function} HOC factory, taking as input a component instance and returning a component
 *                    with an error prop injected via the reducer.
 */
const withError = (reducer) => (WrappedComponent) => (props) => (
  <WrappedComponent
    {...props}
    error={reducer(props)}
  />
);

export default withError;
