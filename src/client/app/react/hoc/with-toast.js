import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'client/app/redux/actions/toast';

/**
 * HOC factory to inject any component with props to toast a globally visible message.
 *
 * @param {Component} Component Component class or function to wrap.
 * @returns {Component} Higher-order component that injects a function that can be invoked
 *                      imperatively to toast a message.
 */
const withToast = (Component) => {
  const mapDispatchToProps = (dispatch) => ({ toast: bindActionCreators(toast, dispatch) });
  return connect(null, mapDispatchToProps)(Component);
};

export default withToast;
