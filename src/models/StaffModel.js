const { Pool } = require('pg');

class StaffModel {
  constructor() {
    this._pool = new Pool();
  }

  async addStaff(staff) {
    const { id, username, password, name, role } = staff;
    const query = {
      text: 'INSERT INTO users (id, name, username, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username',
      values: [id, name, username, password, role],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async findOneStaff(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async saveToken(id, refreshToken) {
    const query = {
      text: 'INSERT INTO sessions (id, token) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET token = $2',
      values: [id, refreshToken],
    };
    await this._pool.query(query);
  }


  async deleteToken(id) {
    const query = {
      text: 'DELETE FROM sessions WHERE id = $1',
      values: [id],
    };
    await this._pool.query(query);
  }

  async getStaff(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async addPresensi(data) {
    const query = {
      text: 'INSERT INTO presensi (id, user_id, foto_checkin, latitude_checkin, longitude_checkin, tanggal_checkin, status,verifikasi_checkin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [data.presensi_id, data.user_id, data.foto_checkin, data.latitude_checkin, data.longitude_checkin, data.tanggal_checkin, data.status, data.verifikasi_checkin],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPresensi(id) {
    const query = {
      text: 'SELECT * FROM presensi WHERE user_id = $1 ORDER BY tanggal_checkin DESC LIMIT 1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async updatePresensi(data) {
    const query = {
      text: 'UPDATE presensi SET foto_checkout = $1, latitude_checkout = $2, longitude_checkout = $3, tanggal_checkout = $4, verifikasi_checkout = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
      values: [data.foto_checkout, data.latitude_checkout, data.longitude_checkout, data.tanggal_checkout, data.verifikasi_checkout, data.presensi_id, data.user_id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPresensiByUserId(id) {
    const query = {
      text: 'SELECT * FROM presensi WHERE user_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

}

module.exports = StaffModel;
