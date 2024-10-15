
import { Container, Modal, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { compareDate } from "../../helper";
export default function CustomModal({ show, handleClose, handlePresensi, title, body }) {
  const { photo } = useSelector(state => state.photo)
  const presensi = useSelector(state => state.presensi);
  return (
    <Container>
      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {photo && presensi.verifikasi_checkin && !presensi.verifikasi_checkout && compareDate(presensi.tanggal_checkin) && <Button variant="success" onClick={() => handlePresensi('checkout')}>
            Confirm Check-Out
          </Button>}
          {photo && !presensi.verifikasi_checkin && !presensi.verifikasi_checkout || photo && presensi.verifikasi_checkin && presensi.verifikasi_checkout || photo && presensi.verifikasi_checkin && !presensi.verifikasi_checkout && !compareDate(presensi.tanggal_checkin) ? <Button variant="success" onClick={() => handlePresensi('checkin')}>
            Confirm Check-In
          </Button> : null}
        </Modal.Footer>
      </Modal>
    </Container >
  )
}