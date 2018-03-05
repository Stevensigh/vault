import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Link, Spacing, Text } from 'react-elemental';

/**
 * Component representing a single secret.
 */
const Secret = ({
  name,
  value,
  link,
  isCopied,
  onCopyClick,
  onShowClick,
}) => (
  <div>
    <Spacing
      style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
      bottom={!!value}
    >
      <div>
        <Text size="epsilon" color="gray5">
          {name}
        </Text>

        {link && (
          <Spacing size="micro" top>
            <Link href={link} activeColor={colors.primary}>
              {link}
            </Link>
          </Spacing>
        )}
      </div>

      <div>
        <Spacing size="small" right inline>
          <Button
            text={isCopied ? 'Copied' : 'Copy'}
            onClick={onCopyClick}
            disabled={isCopied}
            secondary
          />
        </Spacing>

        <Button text={value ? 'Hide' : 'Show'} onClick={onShowClick} secondary />
      </div>
    </Spacing>

    {value && (
      <Spacing
        size="small"
        style={{ backgroundColor: colors.gray10 }}
        top
        right
        bottom
        left
        padding
      >
        <Text secondary>
          {value}
        </Text>
      </Spacing>
    )}
  </div>
);

Secret.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  link: PropTypes.string,
  isCopied: PropTypes.bool.isRequired,
  onCopyClick: PropTypes.func.isRequired,
  onShowClick: PropTypes.func.isRequired,
};

Secret.defaultProps = {
  value: null,
  link: null,
};

export default Secret;
