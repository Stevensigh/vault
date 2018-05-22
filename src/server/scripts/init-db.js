/* eslint-disable no-console */

import Context from 'server/context';

const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS secret (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT,
      \`protected\` TINYINT(1) NOT NULL DEFAULT 0,
      \`timestamp\` BIGINT(11) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`identity\` TEXT DEFAULT NULL,
      \`link\` TEXT DEFAULT NULL,
      \`secret\` TEXT NOT NULL,
      \`notes\` TEXT DEFAULT NULL,
      KEY \`timestamp_idx\` (\`timestamp\`),
      UNIQUE KEY \`name_idx\` (\`name\`),
      PRIMARY KEY (\`id\`)
  );
`;

const main = () => {
  const ctx = new Context();

  ctx.db.exec(CREATE_TABLES_SQL, (err) => {
    if (err) {
      throw err;
    }

    console.log('Successfully created Vault database tables.');
    ctx.db.close();
  });
};

main();
