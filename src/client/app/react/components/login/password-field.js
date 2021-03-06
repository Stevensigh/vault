import React from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  sizes,
  Button,
  Spacing,
  Text,
  TextField,
} from 'react-elemental';
import LongArrowRight from 'client/app/react/components/ui/icon/long-arrow-right';

/**
 * Field for entering the master decryption password.
 */
const PasswordField = ({
  value,
  error,
  disabled,
  onChange,
  onSubmit,
  isCompact,
}) => (
  <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <Spacing size="large" bottom>
      <Text size={isCompact ? sizes.epsilon : sizes.delta} color="gray20">
        Enter the master password to continue.
      </Text>
    </Spacing>

    <TextField
      type="password"
      value={value}
      onChange={onChange}
      error={error}
      disabled={disabled}
      style={{
        color: colors.gray10,
        fontSize: isCompact ? sizes.delta : sizes.beta,
        opacity: disabled ? 0.6 : 1,
      }}
      secondary
      autoFocus
    />

    <Spacing size="large" style={{ alignSelf: 'flex-end' }} top>
      <Button
        type="submit"
        onClick={onSubmit}
        style={{
          backgroundColor: 'inherit',
          marginRight: '-16px',
        }}
      >
        <LongArrowRight style={{ fill: colors.gray10, width: '25px' }} />
      </Button>
    </Spacing>
  </form>
);

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isCompact: PropTypes.bool.isRequired,
};

PasswordField.defaultProps = {
  error: null,
};

export default PasswordField;
