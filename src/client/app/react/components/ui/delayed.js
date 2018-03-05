import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper component to delay mounting of its children.
 */
export default class Delayed extends Component {
  static propTypes = {
    delayMs: PropTypes.number,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    delayMs: 100,
  };

  state = { display: false };

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ display: true }), this.props.delayMs);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return this.state.display ? this.props.children : null;
  }
}
