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
  pgm.createTable('users', {
    id: {
      type: 'varchar(255)',
      primaryKey: true,
      notNull: true
    },
    name: {
      type: 'varchar(30)',
      notNull: true
    },
    username: {
      type: 'varchar(50)',
      notNull: true,
      unique: true // Menambahkan constraint unik
    },
    password: {
      type: 'varchar(60)', // Memperpanjang panjang untuk password
      notNull: true
    },
    role: {
      type: 'varchar(10)',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp') // Menambahkan waktu buat
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp') // Menambahkan waktu perbarui
    }
  });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
};
