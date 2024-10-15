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
  pgm.createType('status', ['Hadir', 'Sakit', 'Izin', 'Alpha']);
  pgm.createTable('presensi', {
    id: {
      type: 'varchar(255)',
      primaryKey: true,
      notNull: true
    },
    user_id: {
      type: 'varchar(255)',
      notNull: true
    },
    tanggal_checkin: {
      type: 'timestamp',
      notNull: true
    },
    tanggal_checkout: {
      type: 'timestamp',
    },
    foto_checkin: {
      type: 'TEXT',
      notNull: true
    },
    foto_checkout: {
      type: 'TEXT',
    },
    latitude_checkin: {
      type: 'decimal(9, 6)',
      notNull: true
    },
    longitude_checkin: {
      type: 'decimal(9, 6)',
      notNull: true
    },
    latitude_checkout: {
      type: 'decimal(9, 6)',
    },
    longitude_checkout: {
      type: 'decimal(9, 6)',
    },
    status: {
      type: 'status',
      notNull: true,
      default: 'Hadir'
    },
    alasan: {
      type: 'varchar(255)',
    },
    durasi_kerja: {
      type: 'time'  // Durasi kerja, bisa dihitung dinamis
    },
    verifikasi_checkin: {
      type: 'boolean',  // Status verifikasi check-in
      default: false
    },
    verifikasi_checkout: {
      type: 'boolean',  // Status verifikasi check-out
      default: false
    }
  })
  pgm.addConstraint('presensi', 'fk_presensi.user_id_users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE'
    }
  })

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('presensi', 'fk_presensi.user_id_users.id');
  pgm.dropTable('presensi');
  pgm.dropType('status');

};
