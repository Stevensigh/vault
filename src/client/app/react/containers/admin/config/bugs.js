import React from 'react';
import { colors } from 'react-elemental';
import OpenExternal from 'react-icons/lib/md/open-in-new';
import ConfigItem from 'client/app/react/components/admin/config-item';

/**
 * Admin configuration item for reporting bugs.
 */
const BugsConfigContainer = () => (
  <a
    href="https://github.com/LINKIWI/vault/issues"
    style={{ textDecoration: 'none' }}
    rel="noopener noreferrer"
    target="_blank"
  >
    <ConfigItem
      title="Report a bug"
      text="File an issue on Github with more details."
    >
      <OpenExternal style={{ color: colors.gray40 }} />
    </ConfigItem>
  </a>
);

export default BugsConfigContainer;
