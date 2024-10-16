const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const StaffModel = require('../models/StaffModel.js');
const { validateStaff, validateLoginStaff } = require('../validators/staff/staffSchema');
const TokenManager = require('../utils/TokenManager.js');

class StaffController {
  constructor() {
    this._staffModel = new StaffModel();
    this._tokenManager = new TokenManager();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.getStaff = this.getStaff.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
    this.addStaffPresensi = this.addStaffPresensi.bind(this);
    this.getStaffPresensi = this.getStaffPresensi.bind(this);
    this.updateStaffPresensi = this.updateStaffPresensi.bind(this);
    this.getStaffPresensiByUserLogin = this.getStaffPresensiByUserLogin.bind(this);
  }

  async register(req, res) {
    const { name, username, password, role } = req.body;
    const { error } = validateStaff(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      const staff = await this._staffModel.findOneStaff(username);
      if (staff) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const id = `user-${nanoid(16)}`;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newStaff = await this._staffModel.addStaff({ id, name, username, password: hashedPassword, role });

      return res.status(201).json({
        status: 'success',
        data: newStaff
      });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { error } = validateLoginStaff(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, password } = req.body;
    const staff = await this._staffModel.findOneStaff(username);
    if (!staff) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const { accessToken, refreshToken } = this._tokenManager.generateToken(staff.id);
    await this._staffModel.saveToken(staff.id, refreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Pastikan menggunakan https untuk produk
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token berlaku selama 7 hari
    });

    return res.status(200).json({
      status: 'success',
      token: accessToken
    });
  }

  async getNewAccessToken(req, res) {
    const { id } = req.user;
    const newAccessToken = this._tokenManager.generateAccessToken(id);
    return res.status(200).json({
      status: 'success',
      token: newAccessToken
    });
  }

  async logout(req, res) {
    const { id } = await req.user
    await this._staffModel.deleteToken(id)
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({ status: 'success', message: 'Logout success' });

  }

  async getStaff(req, res) {
    const { id } = await req.user
    const staff = await this._staffModel.getStaff(id);

    return res.status(200).json({
      status: 'success',
      data: {
        username: staff.username,
        name: staff.name,
        role: staff.role
      }
    });
  }
  async addStaffPresensi(req, res) {
    const { id: user_id } = await req.user;
    const { foto_checkin, tanggal_checkin, latitude_checkin, longitude_checkin } = req.body;
    const status = 'Hadir';
    const verifikasi_checkin = true;
    const presensi_id = `presensi-${nanoid(16)}`
    const presensi = await this._staffModel.addPresensi({ presensi_id, user_id, foto_checkin, latitude_checkin, longitude_checkin, tanggal_checkin, status, verifikasi_checkin });
    return res.status(201).json({
      status: 'success',
      data: presensi
    });
  }

  async getStaffPresensi(req, res) {
    const { id: user_id } = await req.user;
    const presensi = await this._staffModel.getPresensi(user_id);

    return res.status(200).json({
      status: 'success',
      data: presensi[0]
    });
  }

  async updateStaffPresensi(req, res) {
    const { id: user_id } = await req.user;
    const { presensi_id, foto_checkout, tanggal_checkout, latitude_checkout, longitude_checkout } = req.body;
    const status = 'Hadir';
    const verifikasi_checkout = true;
    const presensi = await this._staffModel.updatePresensi({ presensi_id, user_id, foto_checkout, latitude_checkout, longitude_checkout, tanggal_checkout, verifikasi_checkout });
    return res.status(201).json({
      status: 'success',
      data: presensi
    });

  }
  async getStaffPresensiByUserLogin(req, res) {
    const { id: user_id } = await req.user;
    const presensi = await this._staffModel.getPresensiByUserId(user_id);
    return res.status(200).json({
      status: 'success',
      data: presensi
    });


  }
}


module.exports = StaffController;
