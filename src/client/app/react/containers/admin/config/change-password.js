import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { colors } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import ChangePasswordModalContainer from 'client/app/react/containers/admin/modal/change-password';
import ConfigItem from 'client/app/react/components/admin/config-item';
import withToast from 'client/app/react/hoc/with-toast';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Admin configuration item for changing the master password.
 */
class ChangePasswordConfigContainer extends Component {
  static propTypes = {
    toast: PropTypes.shape({
      success: PropTypes.func.isRequired,
      warn: PropTypes.func.isRequired,
      error: PropTypes.func.isRequired,
    }).isRequired,
    isVisible: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  handleSuccess = () => {
    const { hideModal, toast } = this.props;

    hideModal();
    toast.success('Successfully updated the master password.');
    toast.warn('All your existing secrets have been deleted.');
  };

  render() {
    const { isVisible, showModal, hideModal } = this.props;

    return (
      <div>
        <div style={{ cursor: 'pointer' }} onClick={showModal} tabIndex={0}>
          <ConfigItem
            title="Change master decryption password"
            text={
              'Update the key used for encrypting and decrypting all of Vault\'s secrets. ' +
              'You will need to re-add all existing secrets.'
            }
          >
            <KeyboardArrowRight style={{ color: colors.gray40 }} />
          </ConfigItem>
        </div>

        {isVisible && (
          <ChangePasswordModalContainer
            onCancel={hideModal}
            onSuccess={this.handleSuccess}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withToast,
  withToggleState({
    key: 'isVisible',
    enable: 'showModal',
    disable: 'hideModal',
  }),
)(ChangePasswordConfigContainer);
