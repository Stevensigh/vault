import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'react-elemental';
import BaseModal from 'client/app/react/components/ui/base-modal';

/**
 * Modal for displaying login session errors.
 */
const LoginModal = ({ err, onSubmit }) => (
  <BaseModal
    isLoading={false}
    title="Invalid session"
    body={
      <div>
        <Text color="gray30" inline>
          {err}
        </Text>
      </div>
    }
    submit={
      <Button
        text="Login"
        onClick={onSubmit}
      />
    }
  />
);

LoginModal.propTypes = {
  err: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginModal;
