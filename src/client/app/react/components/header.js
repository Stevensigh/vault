import React from 'react';
import { Spacing, Tabs, Text } from 'react-elemental';
import Logo from 'client/app/react/components/ui/logo';

const HeaderTab = ({ isSelected, text }) => (
  <Spacing top bottom>
    <Spacing size="small" right left>
      <Text size="kilo" color={isSelected ? 'gray10' : 'gray25'} bold={isSelected} uppercase>
        {text}
      </Text>
    </Spacing>
  </Spacing>
);

const Header = () => (
  <header>
    <Spacing style={{ display: 'flex', justifyContent: 'space-between' }} bottom>
      <Spacing top>
        <Logo style={{ fill: 'white', width: '130px' }} />
      </Spacing>

      <Tabs
        options={[
          { value: 'secrets', label: <HeaderTab text="Secrets" isSelected /> },
          { value: 'admin', label: <HeaderTab text="Admin" /> },
        ]}
        value="secrets"
        secondary
        invert
        fit
      />
    </Spacing>
  </header>
);

export default Header;
