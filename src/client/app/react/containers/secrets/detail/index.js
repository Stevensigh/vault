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
  };

  state = {
    isValueCopied: false,
    isValueModalVisible: false,
    isDeleteModalVisible: false,
  };

  handleValueModalVisibilityChange = (isVisible) =>
    () => this.setState({ isValueModalVisible: isVisible });

  handleDeleteModalVisibilityChange = (isVisible) =>
    () => this.setState({ isDeleteModalVisible: isVisible });

  handleDeleteSuccess = () => {
    const { details, history, toast } = this.props;

    history.push('/secrets');
    toast.success(`Successfully deleted secret ${details.data.name}.`);
  };

  handleCopyClick = () => {
    const { details, toast } = this.props;

    copy(details.data.secret);
    this.setState({ isValueCopied: true });
    toast.success(`Copied secret value for ${details.data.name} to the system clipboard.`);
  };

  handleBackNavClick = (evt) => {
    evt.preventDefault();
    this.props.history.push('/secrets');
  };

  render() {
    const { details: { err, isLoaded, data }, width } = this.props;
    const { isValueCopied, isValueModalVisible, isDeleteModalVisible } = this.state;

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
            onShowClick={this.handleValueModalVisibilityChange(true)}
            onDeleteClick={this.handleDeleteModalVisibilityChange(true)}
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
            onHide={this.handleValueModalVisibilityChange(false)}
          />
        )}

        {isDeleteModalVisible && (
          <DeleteSecretModalContainer
            id={data.id}
            name={data.name}
            onCancel={this.handleDeleteModalVisibilityChange(false)}
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
  withResource({
    key: 'details',
    method: 'GET',
    endpoint: '/api/secrets',
    data: ({ match: { params } }) => ({ id: parseInt(params.id, 10) || -1 }),
  }),
)(SecretDetailContainer);
