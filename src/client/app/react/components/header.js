import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Tabs, Text } from 'react-elemental';
import Logo from 'client/app/react/components/ui/logo';

/**
 * Single tab in the header.
 */
const HeaderTab = ({ isSelected, text }) => (
  <Spacing top bottom>
    <Spacing size="small" right left>
      <Text size="kilo" color={isSelected ? 'gray10' : 'gray25'} bold={isSelected} uppercase>
        {text}
      </Text>
    </Spacing>
  </Spacing>
);

HeaderTab.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

/**
 * Global header for navigation.
 */
const Header = ({ tab, onChange }) => (
  <header>
    <Spacing style={{ display: 'flex', justifyContent: 'space-between' }} bottom>
      <Spacing top>
        <Logo style={{ fill: 'white', width: '130px' }} />
      </Spacing>

      <Tabs
        options={[
          { value: 'secrets', label: <HeaderTab text="Secrets" isSelected={tab === 'secrets'} /> },
          { value: 'admin', label: <HeaderTab text="Admin" isSelected={tab === 'admin'} /> },
        ]}
        value={tab}
        onChange={onChange}
        secondary
        invert
        fit
      />
    </Spacing>
  </header>
);

Header.propTypes = {
  tab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Header;
