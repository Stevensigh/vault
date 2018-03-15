import React from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Link, Spacing, Text } from 'react-elemental';

/**
 * Component representing a single secret.
 */
const Secret = ({
  name,
  identity,
  value,
  link,
  isCopied,
  onCopyClick,
  onShowClick,
  onDeleteClick,
}) => (
  <div>
    <Spacing
      style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
      bottom={!!value}
    >
      <div>
        <Text size="epsilon" color="gray10" bold>
          {name}
        </Text>

        {identity && (
          <Spacing size="micro" top>
            <Text size="kilo" color="gray40">
              {identity}
            </Text>
          </Spacing>
        )}

        {link && (
          <Spacing size="micro" top>
            <Text size="kilo" color="gray50">
              <Link href={link} activeColor={colors.primary}>
                {link}
              </Link>
            </Text>
          </Spacing>
        )}
      </div>

      <div>
        <Spacing size="small" right inline>
          <Button
            size="gamma"
            text={isCopied ? 'Copied' : 'Copy'}
            onClick={onCopyClick}
            disabled={isCopied}
            secondary
          />
        </Spacing>

        <Spacing size="small" right inline>
          <Button
            size="gamma"
            text={value ? 'Hide' : 'Show'}
            onClick={onShowClick}
            secondary
          />
        </Spacing>

        <Button
          size="gamma"
          color={colors.red}
          text="Delete"
          onClick={onDeleteClick}
          secondary
        />
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
  identity: PropTypes.string,
  value: PropTypes.string,
  link: PropTypes.string,
  isCopied: PropTypes.bool.isRequired,
  onCopyClick: PropTypes.func.isRequired,
  onShowClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

Secret.defaultProps = {
  identity: null,
  value: null,
  link: null,
};

export default Secret;
