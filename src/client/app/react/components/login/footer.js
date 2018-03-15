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
      <div>
        <Text color="gray80" size="kilo" bold inline>
          Vault&nbsp;
        </Text>
        <Text color="gray80" size="kilo" inline>
          is an open source secrets and credentials manager.
        </Text>
      </div>

      <Text color="gray60" size="kilo">
        {FOOTER_TEXT}
      </Text>
    </Spacing>
  </footer>
);

export default Footer;
