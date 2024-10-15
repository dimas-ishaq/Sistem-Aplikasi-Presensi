/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('sessions', {
    id: {
      type: 'varchar(255)',
      primaryKey: true,
      notNull: true
    },
    token: {
      type: 'varchar(255)',
      notNull: true
    }
  })

  pgm.addConstraint('sessions', 'unique_id', 'UNIQUE(id)')
  pgm.addConstraint('sessions', 'unique_token', 'UNIQUE(token)')
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('sessions');
};
