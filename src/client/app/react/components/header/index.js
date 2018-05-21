import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spacing, Tabs } from 'react-elemental';
import HeaderTab from 'client/app/react/components/header/header-tab';
import Logo from 'client/app/react/components/ui/logo';

/**
 * Global header for navigation.
 */
const Header = ({ tab, onChange }) => (
  <header>
    <Spacing style={{ display: 'flex', justifyContent: 'space-between' }} bottom>
      <Spacing top>
        <Link to="/secrets">
          <Logo style={{ fill: 'white', width: '130px' }} />
        </Link>
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
