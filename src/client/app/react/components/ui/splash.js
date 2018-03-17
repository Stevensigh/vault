import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'react-elemental';
import Delayed from 'client/app/react/components/ui/delayed';
import Triangle from 'client/app/react/components/ui/icon/triangle';

// Number of degrees to rotate the triangle on each tick.
const ROTATION_TICK_OFFSET = 180;

// Number of milliseconds between each rotation tick.
const ROTATION_TICK_DELAY = 600;

export default class Splash extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  };

  state = { rotation: 0, interactivity: false };

  componentDidMount() {
    this.setRotation();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.show) {
      this.interactiveTimeout = setTimeout(() => this.setState({ interactivity: true }), 150);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interactiveTimeout);
    clearTimeout(this.rotationTimeout);
  }

  setRotation = () => {
    this.rotationTimeout = setTimeout(() => {
      this.setState(({ rotation }) => ({ rotation: rotation + ROTATION_TICK_OFFSET }));
      this.setRotation();
    }, ROTATION_TICK_DELAY);
  };

  render() {
    const { show } = this.props;
    const { interactivity, rotation } = this.state;

    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: colors.gray95,
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          opacity: show ? 1 : 0,
          pointerEvents: interactivity ? 'none' : 'inherit',
          position: 'fixed',
          transition: 'all 0.15s ease',
          width: '100%',
          zIndex: 1,
        }}
      >
        <Delayed delayMs={300}>
          <Triangle
            style={{
              fill: colors.gray10,
              transform: `rotate(${rotation}deg)`,
              transition: 'all 0.15s ease',
              width: '30px',
            }}
          />
        </Delayed>
      </div>
    );
  }
}
