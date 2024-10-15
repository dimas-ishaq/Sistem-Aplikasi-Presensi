import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getPresensiHistoryThunk } from "../../redux/api";

export default function ShowPhoto() {
  const dispatch = useDispatch();
  const presensiHistory = useSelector((state) => state.presensiHistory);
  const location = useLocation();
  const urlPart = location.pathname.split("/");
  const presensi_id = urlPart.pop();
  const type = urlPart.pop();

  useEffect(() => {
    dispatch(getPresensiHistoryThunk());
  }, [dispatch]);

  const presensiPhoto = presensiHistory.find(
    (presensi) => presensi.id === presensi_id
  );

  const photo = useMemo(() => {
    if (!presensiPhoto) return null;
    return type === "checkin" ? presensiPhoto.foto_checkin : presensiPhoto.foto_checkout;
  }, [presensiPhoto, type]);

  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
      {photo ? (
        <img src={photo} alt={`${type} photo`} />
      ) : (
        <p>Tidak ada foto tersedia.</p>
      )}
    </div>
  );
}
