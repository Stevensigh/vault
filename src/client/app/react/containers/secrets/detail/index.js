import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import copy from 'copy-text-to-clipboard';
import { colors, Spacing, Spinner } from 'react-elemental';
import { withResource } from 'supercharged/client';
import SecretDetail from 'client/app/react/components/secrets/detail';
import SecretValueModal from 'client/app/react/components/secrets/detail/value-modal';
import DeleteSecretModalContainer from 'client/app/react/containers/secrets/detail/delete-secret-modal';
import BackNav from 'client/app/react/components/ui/back-nav';
import Delayed from 'client/app/react/components/ui/delayed';
import ErrorAlert from 'client/app/react/components/ui/alert/error';
import withDimensions from 'client/app/react/hoc/with-dimensions';
import withToast from 'client/app/react/hoc/with-toast';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

// Number of pixels before which the layout should be considered compact.
const COMPACT_THRESHOLD_WIDTH = 600;

/**
 * Data-fetching container for the detail page for a single secret.
 */
class SecretDetailContainer extends Component {
  static propTypes = {
    toast: PropTypes.shape({
      success: PropTypes.func.isRequired,
      warn: PropTypes.func.isRequired,
      error: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    details: PropTypes.shape({
      err: PropTypes.object,
      isLoaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
    }).isRequired,
    width: PropTypes.number.isRequired,
    isValueModalVisible: PropTypes.bool.isRequired,
    showValueModal: PropTypes.func.isRequired,
    hideValueModal: PropTypes.func.isRequired,
    isDeleteModalVisible: PropTypes.bool.isRequired,
    showDeleteModal: PropTypes.func.isRequired,
    hideDeleteModal: PropTypes.func.isRequired,
    isValueCopied: PropTypes.bool.isRequired,
    setValueCopied: PropTypes.func.isRequired,
  };

  handleDeleteSuccess = () => {
    const { details, history, toast } = this.props;

    toast.success(`Successfully deleted secret ${details.data.name}.`);
    history.push('/secrets');
  };

  handleCopyClick = () => {
    const { details, toast, setValueCopied } = this.props;

    copy(details.data.secret);
    setValueCopied();
    toast.success(`Copied secret value for ${details.data.name} to the system clipboard.`);
  };

  handleBackNavClick = (evt) => {
    evt.preventDefault();
    this.props.history.push('/secrets');
  };

  render() {
    const {
      details: { err, isLoaded, data },
      width,
      isValueModalVisible,
      showValueModal,
      hideValueModal,
      isDeleteModalVisible,
      showDeleteModal,
      hideDeleteModal,
      isValueCopied,
    } = this.props;

    const isCompact = width <= COMPACT_THRESHOLD_WIDTH;

    const body = (() => {
      if (!isLoaded) {
        return (
          <Delayed>
            <Spinner ringColor={colors.gray90} style={{ display: 'block', margin: '0 auto' }} />
          </Delayed>
        );
      }

      if (err) {
        return (
          <ErrorAlert
            title="Error"
            message={err.message}
          />
        );
      }

      return (
        <div>
          <Helmet>
            <title>{data.name} - Secrets - Vault</title>
          </Helmet>

          <SecretDetail
            secret={data}
            onCopyClick={this.handleCopyClick}
            onShowClick={showValueModal}
            onDeleteClick={showDeleteModal}
            isValueCopied={isValueCopied}
            isCompact={isCompact}
          />
        </div>
      );
    })();

    return (
      <div>
        <Spacing size="large" bottom>
          <BackNav
            href="/secrets"
            onClick={this.handleBackNavClick}
          />
        </Spacing>

        {body}

        {isValueModalVisible && (
          <SecretValueModal
            value={data.secret}
            onHide={hideValueModal}
          />
        )}

        {isDeleteModalVisible && (
          <DeleteSecretModalContainer
            id={data.id}
            name={data.name}
            onCancel={hideDeleteModal}
            onSuccess={this.handleDeleteSuccess}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withDimensions,
  withToast,
  withToggleState({
    key: 'isValueCopied',
    enable: 'setValueCopied',
  }),
  withToggleState({
    key: 'isValueModalVisible',
    enable: 'showValueModal',
    disable: 'hideValueModal',
  }),
  withToggleState({
    key: 'isDeleteModalVisible',
    enable: 'showDeleteModal',
    disable: 'hideDeleteModal',
  }),
  withResource({
    key: 'details',
    method: 'GET',
    endpoint: '/api/secrets',
    data: ({ match: { params } }) => ({ id: parseInt(params.id, 10) || -1 }),
  }),
)(SecretDetailContainer);
