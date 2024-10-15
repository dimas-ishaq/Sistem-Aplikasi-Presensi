import Webcam from "react-webcam";
import { Container, Row, Button, Col } from "react-bootstrap";
import { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPhoto, resetPhoto } from "../../redux/slices/photoSlice";
export default function CustomWebcam() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [mirrored, setMirrored] = useState(false);
  const dispatch = useDispatch();

  const retake = () => {
    setImgSrc(null);
    dispatch(resetPhoto());
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    dispatch(setPhoto(imageSrc));
  }, [webcamRef]);
  return (
    <Container>
      <Row>
        <div className="d-flex flex-column">
          <Col>
            {imgSrc ? (
              <img src={imgSrc} alt="webcam" />
            ) : (
              <Webcam height={400} width={440} ref={webcamRef} mirrored={mirrored} />
            )}
          </Col>
          <Col>
            <div className="mt-2">
              <p className="text-center fs-6">Jika kamera tidak muncul, mohon aktifkan permission camera. Terimakasih</p>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column">
                <input
                  type="checkbox"
                  checked={mirrored}
                  onChange={(e) => setMirrored(e.target.checked)}
                />
                <label>Mirror</label>
              </div>
              {imgSrc ? (
                <Button variant="warning" onClick={retake}>Retake photo</Button>
              ) : (
                <Button variant="primary" onClick={capture}>Capture photo</Button>
              )}
            </div>
          </Col>
        </div>
      </Row>
    </Container >
  )
}