import React from 'react';
import { Spacing, Text } from 'react-elemental';

const {
  FOOTER_TEXT = '',
} = process.env;

/**
 * Footer displayed in the login page.
 */
const Footer = () => (
  <footer>
    <Spacing
      style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
      top
      bottom
    >
      <Spacing right>
        <Text color="gray80" size="kilo" bold inline>
          Vault&nbsp;
        </Text>
        <Text color="gray80" size="kilo" inline>
          is an open source secrets and credentials manager.
        </Text>
      </Spacing>

      <Text color="gray60" size="kilo">
        {FOOTER_TEXT}
      </Text>
    </Spacing>
  </footer>
);

export default Footer;
