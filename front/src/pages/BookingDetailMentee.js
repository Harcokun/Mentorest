import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";
import BookingMenteeCard from "../components/BookingMenteeCard";
import ena_icon from '../resources/ena_icon.jpg';
import shirayuki_icon from '../resources/shirayuki_icon.jpg';
import slip_test from'../resources/slip_test.jpg';
import Loading from "../components/Loading";

const BookingDetailMentee = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [bookingList, setBookingList] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // setBookingList([
    //   {
    //     id: "123456",
    //     mentor: {
    //       id: 1,
    //       name: "Ena",
    //       img: ena_icon,
    //     },
    //     slip: slip_test,
    //     date: "2022/11/28",
    //     time: "12:59",
    //     link: "zoom url 1",
    //   },
    //   {
    //     id: "987654",
    //     mentor: {
    //       id: 2,
    //       name: "Shirayuki",
    //       img: shirayuki_icon,
    //     },
    //     slip: "",
    //     date: "2022/11/28",
    //     time: "12:59",
    //     link: "zoom url 2",
    //   },
    // ]);
    try {
      axios({
        method: "get",
        url: process.env.REACT_APP_REST_API + "/user/booking",
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        console.log(res);
        setBookingList(res.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if(isLoading) return <Loading/>
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        รายการการจองเวลา
      </div>
      <div className="flex place-content-center">
        <div className="flex-col border-2 border-[#8157A1] w-[80%] rounded-3xl">
          {bookingList.map((booking, index) => {
            return (
              <div key={index}>
                <BookingMenteeCard
                  bookingId={booking.id}
                  mentorName={booking.mentor_booking.name}
                  mentorSurname={booking.mentor_booking.surname}
                  mentorPic={booking.mentor_booking.profile_image}
                  slipUrl={booking.payment_img}
                  date={booking.date_booking}
                  time={booking.time_booking}
                  link={booking.url_conference}
                  token={token}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
          className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-10 my-5 mx-24 p-2 rounded-md"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          ย้อนกลับ
        </button>
    </div>
  );
};

export default BookingDetailMentee;
