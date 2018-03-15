import React from 'react';
import { Button } from 'react-elemental';
import ConfigItem from 'client/app/react/components/admin/config-item';

/**
 * Admin configuration item for reporting bugs.
 */
const BugsConfigContainer = () => (
  <ConfigItem
    title="Report a bug"
    text="File an issue on Github with more details."
  >
    <a href="https://github.com/LINKIWI/vault/issues">
      <Button text="Github issues" />
    </a>
  </ConfigItem>
);

export default BugsConfigContainer;
