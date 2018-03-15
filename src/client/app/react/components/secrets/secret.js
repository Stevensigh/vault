import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, Button, Link, Spacing, Text } from 'react-elemental';
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

/**
 * Component representing a single secret.
 */
export default class Secret extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    identity: PropTypes.string,
    value: PropTypes.string,
    link: PropTypes.string,
    isCopied: PropTypes.bool.isRequired,
    isCompact: PropTypes.bool.isRequired,
    onCopyClick: PropTypes.func.isRequired,
    onShowClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    identity: null,
    value: null,
    link: null,
  };

  state = { isActionPanelVisible: false };

  handleExpansionClick = (evt) => {
    evt.preventDefault();

    this.setState(({ isActionPanelVisible }) => ({ isActionPanelVisible: !isActionPanelVisible }));
  };

  render() {
    const {
      name,
      identity,
      value,
      link,
      isCopied,
      isCompact,
      onCopyClick,
      onShowClick,
      onDeleteClick,
    } = this.props;
    const { isActionPanelVisible } = this.state;

    const secretMeta = (
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
    );

    const actionPanel = (
      <div style={{ display: 'flex' }}>
        <Spacing size="small" right>
          <Button
            size="gamma"
            text={isCopied ? 'Copied' : 'Copy'}
            onClick={onCopyClick}
            disabled={isCopied}
            secondary
          />
        </Spacing>

        <Spacing size="small" right>
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
    );

    return (
      <div>
        <Spacing
          style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
          bottom={!!value}
        >
          <div>
            {isCompact ? (
              <div>
                <div
                  style={{
                    marginLeft: isActionPanelVisible ? '-70px' : 0,
                    opacity: isActionPanelVisible ? 0 : 1,
                    pointerEvents: isActionPanelVisible ? 'none' : 'inherit',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {secretMeta}
                </div>
                <div
                  style={{
                    height: '0px',
                    opacity: isActionPanelVisible ? 1 : 0,
                    pointerEvents: isActionPanelVisible ? 'inherit' : 'none',
                    position: 'relative',
                    right: isActionPanelVisible ? 0 : '-70px',
                    top: '-45px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {actionPanel}
                </div>
              </div>
            ) : secretMeta}
          </div>

          {isCompact ? (
            <a href="#" onClick={this.handleExpansionClick}>
              <Spacing size="tiny" top right left bottom padding>
                <KeyboardArrowRight
                  style={{
                    color: colors.gray40,
                    transform: `rotate(${isActionPanelVisible ? 180 : 0}deg)`,
                    transition: 'all 0.15s ease',
                  }}
                />
              </Spacing>
            </a>
          ) : actionPanel}
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
  }
}
