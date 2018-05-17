/* eslint-disable no-console */

import inquirer from 'inquirer';
import Context from 'server/context';
import AuthLogic from 'server/logic/auth';

const INSTRUCTIONS_TEXT = `
VAULT | Set Master Password
---------------------------

You are about to set or change the master password associated with this Vault
instance. The master password is the encryption key used to encrypt passwords
before storing them in the server-side database.

Note that changing the master password (if one is already set) will render all
existing secrets unrecoverable. This process will erase all secrets that are
already stored.
`;

const main = async () => {
  const ctx = new Context();
  const auth = new AuthLogic(ctx);

  console.log(INSTRUCTIONS_TEXT);

  const prompts = [
    {
      type: 'password',
      mask: '*',
      name: 'password',
      message: 'Enter the new master password',
    },
  ];

  const { password } = await inquirer.prompt(prompts);

  return auth.setVerification(password, (err) => {
    if (err) {
      console.error('There was an error setting the master password!');
      console.error(err);
    } else {
      console.log('Successfully set or changed the master password.');
    }

    ctx.db.close();
  });
};

main();
