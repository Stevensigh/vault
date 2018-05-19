import React from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  Button,
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
    style={{
      backgroundColor: colors.gray90,
      boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)',
    }}
    onHide={onHide}
    persistent
  >
    {isLoading && (
      <Delayed>
        <LoadingBar style={{ position: 'absolute' }} />
      </Delayed>
    )}

    <form>
      <Spacing
        size="44px"
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
        {onHide && (
          <Spacing size="small" right>
            <Button type="button" style={{ backgroundColor: 'transparent' }} onClick={onHide}>
              <Text color="gray30" size="kilo" uppercase bold>
                Cancel
              </Text>
            </Button>
          </Spacing>
        )}

        {submit}
      </Spacing>
    </form>
  </Modal>
);

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  alert: PropTypes.node,
  submit: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};

BaseModal.defaultProps = {
  alert: null,
  onHide: null,
};

export default BaseModal;
