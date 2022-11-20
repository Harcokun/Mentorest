import axios from "axios";
import { useEffect, useState } from "react";

const BookingMenteeCard = ({
  bookingId,
  mentorName,
  mentorPic,
  slipUrl,
  date,
  time,
  link,
  token,
}) => {
  const [meetingLinkUrl, setMeetingLinkUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(meetingLinkUrl);
    axios
      .put(
        process.env.REACT_APP_REST_API + "/booking/" + bookingId,
        { link: meetingLinkUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  useEffect((link) => {
    setMeetingLinkUrl(link);
  }, []);

  if (slipUrl === "" || slipUrl === undefined) {
    return (
      <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl mx-auto my-4 p-2">
        <p className="font-bold text-center mt-2">ผู้ให้คำปรึกษา</p>
        <table className="font-sans w-5/6 mx-auto text-s">
          <tbody>
            <tr className="py-2">
              <td className="grid place-content-center text-center w-36">
                <img src={mentorPic} className="w-20 rounded-full" />
              </td>
              <td className="text-left font-bold w-20">{mentorName}</td>
              <td className="text-center">สลิปการโอนเงิน</td>
            </tr>
            <tr className="py-2">
              <td className="text-left w-36">
                วันที่: {date}
                <p className="m-5" />
                เวลา: {time}
              </td>
              <td className="text-left w-20"></td>
              <td className="text-center font-bold">ไม่มีข้อมูลสลิป</td>
            </tr>
          </tbody>
        </table>
        <p className="ml-20 mt-5">Zoom link: {link}</p>
      </div>
    );
  }
  return (
    <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl mx-auto my-4 p-2">
      <p className="font-bold text-center mt-2">ผู้ให้คำปรึกษา</p>
      <table className="font-sans w-5/6 mx-auto text-s">
        <tbody>
          <tr className="py-2">
            <td className="grid place-content-center text-center w-36">
              <img src={mentorPic} className="w-20 rounded-full" />
            </td>
            <td className="text-left font-bold w-20">{mentorName}</td>
            <td className="text-center">สลิปการโอนเงิน</td>
          </tr>
          <tr className="py-2">
            <td className="text-left w-36">
              วันที่: {date}
              <p className="m-5" />
              เวลา: {time}
            </td>
            <td className="text-left w-20"></td>
            <td className="grid place-content-center text-center font-bold">
              <img src={slipUrl} className="w-56 rounded-sm" />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="ml-20 mt-5">Zoom link: {link}</p>
    </div>
  );
};

export default BookingMenteeCard;
