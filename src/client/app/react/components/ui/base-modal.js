import React from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  Link,
  LoadingBar,
  Modal,
  Spacing,
  Text,
} from 'react-elemental';
import Delayed from 'client/app/react/components/ui/delayed';

/**
 * Base composite component for a two-action (positive and negative) modal with a title, body,
 * optional alert, and loading state.
 */
const BaseModal = ({
  title,
  body,
  alert,
  submit,
  isLoading,
  onHide,
}) => (
  <Modal
    style={{ backgroundColor: colors.gray90 }}
    onHide={onHide}
    persistent
  >
    {isLoading && (
      <Delayed>
        <LoadingBar style={{ position: 'absolute' }} />
      </Delayed>
    )}

    <Spacing
      size="large"
      style={{ display: 'flex', flexDirection: 'column' }}
      top
      right
      bottom
      left
      padding
    >
      {alert && (
        <Spacing size="large" bottom>
          {alert}
        </Spacing>
      )}

      <Spacing size="large" bottom>
        <Text color="gray10" size="30px" bold>
          {title}
        </Text>
      </Spacing>

      {body}
    </Spacing>

    <Spacing
      size="large"
      style={{
        alignItems: 'center',
        backgroundColor: 'rgb(27, 27, 27)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      top
      right
      bottom
      left
      padding
    >
      <Text color="gray30" uppercase bold>
        <Link activeColor={colors.gray80} onClick={onHide}>
          Cancel
        </Link>
      </Text>

      <Spacing left>
        {submit}
      </Spacing>
    </Spacing>
  </Modal>
);

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  alert: PropTypes.node,
  submit: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

BaseModal.defaultProps = {
  alert: null,
};

export default BaseModal;
