import React from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  Button,
  Label,
  Spacing,
  Text,
  TextField,
} from 'react-elemental';
import BaseModal from 'client/app/react/components/ui/base-modal';

/**
 * Read-only modal for viewing the secret value.
 */
const SecretValueModal = ({ value, onHide }) => (
  <BaseModal
    isLoading={false}
    title="Secret value"
    body={
      <div>
        <Spacing size="large" bottom>
          <Text color="gray30">
            The literal secret value associated with this credential is displayed below.
          </Text>
        </Spacing>

        <Label title="Secret" />
        <TextField
          value={value}
          style={{ color: colors.gray10, fontFamily: 'secondary--regular' }}
          readOnly
          secondary
        />
      </div>
    }
    submit={
      <Button
        type="submit"
        text="Ok"
        onClick={onHide}
      />
    }
  />
);

SecretValueModal.propTypes = {
  value: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SecretValueModal;
