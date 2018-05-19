import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, spacing, Spacing, Toast, Text } from 'react-elemental';
import { SUCCESS_COLOR, WARN_COLOR, ERROR_COLOR } from 'client/app/util/constants/color';

const BACKGROUND_COLORS = {
  success: SUCCESS_COLOR,
  warn: WARN_COLOR,
  error: ERROR_COLOR,
};

const ACCENT_COLORS = {
  success: colors.green,
  warn: colors.yellow,
  error: colors.red,
};

const ToastsContainer = ({ toasts }) => {
  const toastElems = toasts.map(({ toastID, type, text }, idx) => (
    <Spacing key={toastID} bottom={idx < toasts.length - 1}>
      <Toast
        color={BACKGROUND_COLORS[type]}
        accent={ACCENT_COLORS[type]}
        style={{ bottom: 0, position: 'relative', right: 0 }}
      >
        <Text color={ACCENT_COLORS[type]}>
          {text}
        </Text>
      </Toast>
    </Spacing>
  ));

  return (
    <div
      style={{
        bottom: spacing.large,
        position: 'fixed',
        right: spacing.large,
        zIndex: 3,
      }}
    >
      {toastElems}
    </div>
  );
};

ToastsContainer.propTypes = {
  toasts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ toast }) => ({
  toasts: toast.active,
});

export default connect(mapStateToProps)(ToastsContainer);
