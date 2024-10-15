import { Container, Row, Col } from 'react-bootstrap';
import TablePresensi from '../components/riwayat_presensi/TablePresensi';
import { useDispatch, useSelector } from 'react-redux';
import { getPresensiHistoryThunk } from '../redux/api';
import { useEffect } from 'react';
export default function History() {
  const dispatch = useDispatch();
  const presensiHistory = useSelector(state => state.presensiHistory);

  useEffect(() => {
    dispatch(getPresensiHistoryThunk());
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="d-flex flex-column mt-2">
            <h2 className='fs-4'>Riwayat Presensi</h2>
            <TablePresensi presensiHistory={presensiHistory} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}