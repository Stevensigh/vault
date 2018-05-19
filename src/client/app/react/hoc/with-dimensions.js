import React, { Component } from 'react';

/**
 * HOC factory for injecting the dimensions of the parent component into the specified component.
 *
 * @param {Component} WrappedComponent Component to wrap.
 * @returns {Component} HOC with props `width` and `height` describing the dimensions of the parent
 *                      container when allowed to expand to 100% width and height.
 */
const withDimensions = (WrappedComponent) =>
  class WithDimensionsHOC extends Component {
    state = {
      width: undefined,
      height: undefined,
      window: {
        width: undefined,
        height: undefined,
      },
    };

    componentDidMount() {
      window.addEventListener('resize', this.onResize);

      this.onResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
      const { clientWidth, clientHeight } = this.ref.current || {};

      this.setState({
        width: clientWidth,
        height: clientHeight,
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    };

    ref = React.createRef();

    render() {
      const { width, height, window } = this.state;

      const containerStyle = { width: '100%', height: '100%' };
      const isDimensionDefined = (width !== undefined) && (height !== undefined);

      return (
        <div ref={this.ref} style={containerStyle}>
          {isDimensionDefined && (
            <WrappedComponent
              width={width}
              height={height}
              window={window}
              {...this.props}
            />
          )}
        </div>
      );
    }
  };

export default withDimensions;
