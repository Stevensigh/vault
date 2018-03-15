import React from 'react';
import { Helmet } from 'react-helmet';
import { Spacing, Text } from 'react-elemental';
import BugsConfigContainer from 'client/app/react/containers/admin/config/bugs';
import ChangePasswordConfigContainer
  from 'client/app/react/containers/admin/config/change-password';
import DeleteSecretsConfigContainer from 'client/app/react/containers/admin/config/delete-secrets';

/**
 * Listing of admin configuration options.
 */
const AdminContainer = () => (
  <div>
    <Helmet>
      <title>Admin - Vault</title>
    </Helmet>

    <Spacing size="huge" bottom>
      <Spacing size="tiny" bottom>
        <Text color="gray10" size="beta" bold>
          Admin
        </Text>
      </Spacing>
      <Text color="gray60">
        Control Vault configuration and settings.
      </Text>
    </Spacing>

    <Spacing bottom>
      <DeleteSecretsConfigContainer />
    </Spacing>

    <Spacing bottom>
      <ChangePasswordConfigContainer />
    </Spacing>

    <Spacing bottom>
      <BugsConfigContainer />
    </Spacing>
  </div>
);

export default AdminContainer;
