import { Row, Button, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPresensiThunk, getPresensiThunk, updatePresensiThunk } from '../redux/api';
import { useState, useEffect, useRef } from 'react';
import { DateTime } from "luxon";
import CustomWebcam from "../components/presensi/CustomWebcam";
import CustomModal from "../components/presensi/CustomModal";
import getLocation from "../services/getLocation";
import { resetPhoto } from '../redux/slices/photoSlice';
import { compareDate } from "../helper";


export default function PresensiMenu() {
  const dispatch = useDispatch();
  const presensi = useSelector(state => state.presensi);
  const userPhoto = useSelector(state => state.photo);
  const [location, setLocation] = useState(null);

  const [currentTime, setCurrentTime] = useState(DateTime.now());
  const requestRef = useRef();

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(DateTime.now().setZone('Asia/Jakarta').toLocal());
      requestRef.current = requestAnimationFrame(updateClock);
    };
    requestRef.current = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await getLocation();
        setLocation(locationData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    dispatch(getPresensiThunk());
  }, [])


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(resetPhoto())
  }

  const handleShow = () => setShow(true);

  const handlePresensi = async (param) => {
    if (param === 'checkin') {
      try {
        await dispatch(createPresensiThunk(
          {
            foto_checkin: userPhoto.photo,
            latitude_checkin: location.latitude,
            longitude_checkin: location.longitude,
            tanggal_checkin: DateTime.now().toUTC().toISO(),
          }
        ))
        handleClose();
      } catch (error) {
        console.log(error)
      }
    }
    if (param === 'checkout') {
      try {
        await dispatch(updatePresensiThunk(
          {
            presensi_id: presensi.id,
            foto_checkout: userPhoto.photo,
            latitude_checkout: location.latitude,
            longitude_checkout: location.longitude,
            tanggal_checkout: DateTime.now().toUTC().toISO(),
          }
        ))
        handleClose();
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Container>
      <Row className="align-items-center mt-5" >
        <Col>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column w-75">
              <h1 className="text-center">Waktu Sekarang:</h1>
              <div className="d-flex flex-column align-items-center">
                <span className="display-1 bg-dark text-white fw-semibold px-3">{currentTime.toFormat("HH:mm:ss")}</span>
                <span className="display-5 bg-dark text-white fw-semibold mt-2 px-3">{currentTime.toFormat("dd LLL yyyy")}</span>
              </div>
            </div>
            <div className="d-flex flex-column mt-5">
              {presensi?.verifikasi_checkin && !presensi?.verifikasi_checkout && compareDate(presensi?.tanggal_checkin) ?
                <Button variant="danger" onClick={handleShow} >
                  <span className="display-6 fw-semibold text-white">Check Out Sekarang</span>
                </Button> :
                <Button variant="warning" onClick={handleShow} >
                  <span className="display-6 fw-semibold text-white">Check In Sekarang</span>
                </Button>
              }
            </div>
          </div>
        </Col>
        <Col >
          <div className="d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="410" height="289.57062" viewBox="0 0 610.81982 489.57062" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="m15.17983,488.38062c0,.66.53,1.19,1.19,1.19h593.25999c.65997,0,1.19-.53,1.19-1.19s-.53003-1.19-1.19-1.19H16.36983c-.66,0-1.19.53-1.19,1.19Z" fill="#2f2e43" strokeWidth="0" /><path d="m322.81827,370.94498c-1.62897,9.87393-10.22128,17.43042-20.54929,17.43042s-18.92029-7.55649-20.54926-17.43042h-52.57347v113.93546h146.24547v-113.93542h-52.57349l.00003-.00003Z" fill="#b6b3c5" strokeWidth="0" /><rect x="231.69705" y="484.45539" width="14.4545" height="2.55078" fill="#b6b3c5" strokeWidth="0" /><rect x="359.66187" y="484.88053" width="14.4545" height="2.55078" fill="#b6b3c5" strokeWidth="0" /><path d="m596.38477,373.9209H8.15307c-4.49565,0-8.15307-3.65762-8.15307-8.15308V30.0645c0-4.49544,3.65742-8.15307,8.15307-8.15307h588.2317c4.49567,0,8.15326,3.65763,8.15326,8.15307v335.70335c0,4.49545-3.65765,8.15308-8.15326,8.15308v-.00003Z" fill="#2f2e41" strokeWidth="0" /><rect x="14.87962" y="36.36602" width="575.62905" height="324.80103" fill="#fff" strokeWidth="0" /><path d="m522.12122,161.10268h-31.40942c-2.72925,0-4.94971-2.22021-4.94971-4.94971s2.22046-4.94971,4.94971-4.94971h31.40942c2.72925,0,4.94971,2.22021,4.94971,4.94971s-2.22046,4.94971-4.94971,4.94971Z" fill="#d1d1d2" strokeWidth="0" /><path d="m558.24231,161.10268h-14.65771c-2.72925,0-4.94971-2.22021-4.94971-4.94971s2.22046-4.94971,4.94971-4.94971h14.65771c2.72925,0,4.94971,2.22021,4.94971,4.94971s-2.22046,4.94971-4.94971,4.94971Z" fill="#d1d1d2" strokeWidth="0" /><path d="m207.64661,164.88297h-95.60376c-4.88037,0-8.85083-3.9707-8.85083-8.85107s3.97046-8.85107,8.85083-8.85107h95.60376c4.88062,0,8.85107,3.9707,8.85107,8.85107s-3.97046,8.85107-8.85107,8.85107Z" fill="#6c63ff" strokeWidth="0" /><path d="m155.81335,188.49575h-46.07422c-2.97485,0-5.39526-2.42041-5.39526-5.39502,0-2.9751,2.42041-5.39551,5.39526-5.39551h46.07422c2.97485,0,5.39526,2.42041,5.39526,5.39551,0,2.97461-2.42041,5.39502-5.39526,5.39502Z" fill="#d1d1d2" strokeWidth="0" /><path d="m409.79675,209.80532H108.58727c-2.97485,0-5.39526-2.42041-5.39526-5.39551s2.42041-5.39551,5.39526-5.39551h301.20947c2.97485,0,5.39526,2.42041,5.39526,5.39551s-2.42041,5.39551-5.39526,5.39551Z" fill="#d1d1d2" strokeWidth="0" /><path d="m383.88,224.20328H108.58727c-2.97485,0-5.39526-2.42041-5.39526-5.39551,0-2.97461,2.42041-5.39502,5.39526-5.39502h275.29272c2.97485,0,5.39526,2.42041,5.39526,5.39502,0,2.9751-2.42041,5.39551-5.39526,5.39551Z" fill="#d1d1d2" strokeWidth="0" /><polygon points="557.3418 432.03742 543.5249 446.54551 528.79944 432.9325 542.61639 418.42444 557.3418 432.03742" fill="#ed9da0" strokeWidth="0" /><path d="m568.3783,446.89655l-29.37,30.83914c-2.51031,2.63586-5.64563,4.71841-9.06708,6.02249l-8.18829,3.12103c-1.69299.64532-3.6424.27151-4.96619-.95227-1.55249-1.43521-1.94537-3.73444-.95551-5.59137l7.87616-14.77438,8.40466-29.96185.09143.0563c2.28638,1.40796,5.75421,3.52057,6.00146,3.61002,4.35229.15414,7.46796-.94049,9.26147-3.25262,3.12823-4.03296,1.14362-10.47122,1.12317-10.53583l-.01562-.04941.03967-.03397c.91187-.77859,1.87238-1.09015,2.85486-.92603,2.08575.34851,3.57776,2.69144,3.79608,3.05188,1.95728-.08246,7.96686,4.62411,8.45044,5.00552,2.95044-.0079,5.11334.69168,6.42841,2.07965,1.14978,1.21341,1.65033,2.93582,1.48816,5.11938-.19513,2.62711-1.35052,5.17429-3.25336,7.17233l.00006-.00003Z" fill="#090814" strokeWidth="0" /><rect x="521.19769" y="448.74103" width="20.19269" height="19.89465" fill="#ed9da0" strokeWidth="0" /><path d="m537.94391,486.73258h-42.9227c-3.66864,0-7.35544-.82767-10.66183-2.39359l-7.91296-3.74756c-1.63611-.77484-2.6933-2.43121-2.6933-4.2197,0-2.09747,1.43298-3.95303,3.48477-4.51242l16.32486-4.45053,27.9278-14.46289.02087.10419c.52234,2.60611,1.33154,6.5433,1.43445,6.7821,2.86401,3.23251,5.80609,4.72208,8.74469,4.42856,5.12561-.51196,8.53302-6.34332,8.56683-6.40219l.02594-.04501.05231.00525c1.20026.12238,2.08807.5993,2.63885,1.41754,1.16925,1.73706.45593,4.41217.33856,4.81567,1.40033,1.34985,2.02869,8.88806,2.07727,9.49652,2.02472,2.11441,2.98688,4.14713,2.85938,6.04169-.11145,1.65637-1.04376,3.19458-2.77094,4.57214-2.078,1.65744-4.75397,2.57022-7.53485,2.57022Z" fill="#090814" strokeWidth="0" /><polygon points="543.78766 198.18148 472.23505 198.21633 448.38416 347.00736 519.93677 432.05072 543.78766 410.78989 487.24072 347.00736 543.78766 198.18148" fill="#090814" strokeWidth="0" /><polygon points="501.49582 220.11469 543.78766 198.18148 543.78766 453.31156 519.93677 453.96653 501.49582 220.11469" fill="#090814" strokeWidth="0" /><path d="m459.13336,257.84793l.50385-23.22496-13.56027-.29417-.50385,23.22498c-2.53,2.34866-4.20013,5.99799-4.28989,10.13547-.15707,7.23953,4.57251,13.21365,10.56384,13.34363s10.97556-5.63339,11.1326-12.87292c.08975-4.13751-1.42062-7.85583-3.84628-10.31198v-.00003Z" fill="#ed9da0" strokeWidth="0" /><path d="m523.4361,31.03003s19.46515-.04207,12.19354-18.79784-20.81177-10.35779-20.81177-10.35779c0,0-5.70535,3.01366-4.52911,9.73748" fill="#090814" strokeWidth="0" /><path d="m525.38422,40.02662c0-14.38025-11.65747-26.03763-26.03754-26.03763s-26.03772,11.65737-26.03772,26.03763c0,11.6623,7.66782,21.53259,18.23663,24.84743l5.03369,33.26563,25.6604-21.3836s-5.54352-7.06083-8.51636-15.02245c7.02637-4.66298,11.66089-12.64233,11.66089-21.70701Z" fill="#ed9da0" strokeWidth="0" /><path d="m511.85626,62.02208s3.4577-13.25664-2.19604-19.35213c-5.6409-6.0816-6.36957,3.38112-6.36957,3.38112l-4.07028-.88484s.70789-9.20238-7.25571-10.7951l5.13211-10.97207s-19.64838,3.81501-20.18994,1.912c-4.26123-14.97371,36.39041-27.76478,47.62015-4.92047,17.46588,35.53044-12.67062,41.6315-12.67062,41.6315h-.00009Z" fill="#090814" strokeWidth="0" /><path d="m488.858,85.21825h-.00003c-18.90326,3.69375-33.0921,19.43311-34.81262,38.61688l-11.76633,131.19472h20.64801l25.93097-169.81158v-.00002Z" fill="#6c63ff" strokeWidth="0" /><polyline points="469.33435 189.7459 466.11865 226.78904 553.40839 201.11559 542.77228 174.34183 562.57751 128.86313 522.14832 70.91446 489.87314 73.11505 477.40317 89.25265" fill="#6c63ff" strokeWidth="0" /><path d="m540.5188,224.9253l12.17487-19.78447-11.55151-7.10851-12.17487,19.78447c-3.37018.74757-6.65594,3.05208-8.82489,6.57666-3.7951,6.16708-2.73413,13.71249,2.36963,16.85326,5.10376,3.14075,12.31769.68745,16.11273-5.47964,2.16895-3.52458,2.7453-7.49635,1.89398-10.84177h.00006Z" fill="#ed9da0" strokeWidth="0" /><path d="m515.54657,71.64799l7.03845-.29198,12.03333,9.09431c14.25885,2.43159,18.39404,3.11332,22.76288,12.53204,1.83582,3.95777,3.0528,8.17407,3.73322,12.48349l10.18024,64.47481-25.58832,61.6163-16.9563-19.07172,18.12646-48.17314-3.01123-11.52303" fill="#6c63ff" strokeWidth="0" /></svg>
          </div>
        </Col>
      </Row >
      <Row>
        <Col>
          <CustomModal show={show} handleClose={handleClose} handlePresensi={handlePresensi} title={'Capture Photo'} body={<CustomWebcam />} />
        </Col>
      </Row>
    </Container>
  )
}