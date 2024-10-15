import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
export default function TablePresensi({ presensiHistory }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal CheckIn</th>
          <th>Tanggal Checkout</th>
          <th>Status</th>
          <th>Alasan</th>
          <th>Durasi Kerja</th>
          <th>Verifikasi Check-In</th>
          <th>Verifikasi Check-Out</th>
        </tr>
      </thead>
      <tbody>
        {presensiHistory.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td> {/* Nomor Urut */}
            <td>{DateTime.fromISO(item.tanggal_checkin).toLocaleString(DateTime.DATETIME_MED)}</td>
            <td>{DateTime.fromISO(item.tanggal_checkout).toLocaleString(DateTime.DATETIME_MED)}</td>
            <td>{item.status}</td> {/* Status */}
            <td>{item.alasan || '-'}</td> {/* Alasan */}
            <td>{item.durasi_kerja || '-'}</td> {/* Durasi Kerja */}
            <td>{item.verifikasi_checkin ? 'Terverifikasi' : 'Belum Terverifikasi'}</td> {/* Verifikasi Check-In */}
            <td>{item.verifikasi_checkout ? 'Terverifikasi' : 'Belum Terverifikasi'}</td> {/* Verifikasi Check-Out */}
            <td>
              <a href={`/staff/showPhoto/checkin/${item.id}`}
                target="_blank" rel="noopener noreferrer">
                Foto CheckIn
              </a>
            </td>
            <td>
              <a href={`/staff/showPhoto/checkout/${item.id}`}
                target="_blank" rel="noopener noreferrer">
                Foto Checkout
              </a>
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
  )
}