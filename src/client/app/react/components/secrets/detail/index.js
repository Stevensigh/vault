import React from 'react';
import PropTypes from 'prop-types';
import humanize from 'humanize';
import { Link, Spacing, Text } from 'react-elemental';
import DetailField from 'client/app/react/components/secrets/detail/detail-field';
import DetailHeader from 'client/app/react/components/secrets/detail/detail-header';

/**
 * Detail page for a single credential.
 */
const SecretDetail = ({
  secret,
  onCopyClick,
  onShowClick,
  onDeleteClick,
  isValueCopied,
  isCompact,
}) => (
  <div>
    <Spacing size="large" bottom>
      <DetailHeader
        name={secret.name}
        isValueCopied={isValueCopied}
        isCompact={isCompact}
        onCopyClick={onCopyClick}
        onShowClick={onShowClick}
        onDeleteClick={onDeleteClick}
      />
    </Spacing>

    {secret.identity && (
      <Spacing bottom>
        <DetailField
          title="Identity"
          text={secret.identity}
        />
      </Spacing>
    )}

    {secret.link && (
      <Spacing bottom>
        <DetailField title="Link">
          <Text color="primary" size="20px">
            <Link href={secret.link} activeColor="white">
              {secret.link}
            </Link>
          </Text>
        </DetailField>
      </Spacing>
    )}

    <Spacing bottom>
      <DetailField
        title="Added on"
        text={humanize.date('l, F j, Y, g:i:s A', secret.timestamp / 1000)}
      />
    </Spacing>

    {secret.notes && (
      <Spacing bottom>
        <DetailField
          title="Notes"
          text={secret.notes}
        />
      </Spacing>
    )}
  </div>
);

SecretDetail.propTypes = {
  secret: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identity: PropTypes.string,
    link: PropTypes.string,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  onCopyClick: PropTypes.func.isRequired,
  onShowClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isValueCopied: PropTypes.bool.isRequired,
  isCompact: PropTypes.bool.isRequired,
};

export default SecretDetail;
