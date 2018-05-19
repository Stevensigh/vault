import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Spacing, Text } from 'react-elemental';

/**
 * Secret detail header, with interactive action panel.
 */
const DetailHeader = ({
  name,
  onCopyClick,
  onShowClick,
  onDeleteClick,
  isValueCopied,
  isCompact,
}) => (
  <div style={{ display: isCompact ? 'inherit' : 'flex', justifyContent: 'space-between' }}>
    <Spacing size="small" bottom={isCompact}>
      <Spacing right>
        <Text size="kilo" color="gray50" style={{ letterSpacing: '1px' }} uppercase bold>
          Credential details
        </Text>
        <Text size="beta" color="gray10" bold>
          {name}
        </Text>
      </Spacing>
    </Spacing>

    <div style={{ display: 'flex' }}>
      <Spacing size="small" right>
        <Button
          text={isValueCopied ? 'Copied' : 'Copy'}
          onClick={onCopyClick}
          disabled={isValueCopied}
          secondary
        />
      </Spacing>

      <Spacing size="small" right>
        <Button
          text="Show"
          onClick={onShowClick}
          secondary
        />
      </Spacing>

      <div>
        <Button
          text="Delete"
          color={colors.red}
          onClick={onDeleteClick}
          secondary
        />
      </div>
    </div>
  </div>
);

DetailHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onCopyClick: PropTypes.func.isRequired,
  onShowClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isValueCopied: PropTypes.bool.isRequired,
  isCompact: PropTypes.bool.isRequired,
};

export default DetailHeader;
