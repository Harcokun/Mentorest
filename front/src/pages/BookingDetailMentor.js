import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";
import BookingMentorCard from "../components/BookingMentorCard";
import ena_icon from '../resources/ena_icon.jpg';
import shirayuki_icon from '../resources/shirayuki_icon.jpg';
import slip_test from'../resources/slip_test.jpg';

const BookingDetailMentor = () => {
  const navigate = useNavigate();
  const { Token } = useContext(UserContext);
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    setBookingList([
      {
        id: "123456",
        mentee: {
          id: 1,
          name: "Ena",
          img: ena_icon,
        },
        slip: slip_test,
        date: "2022/11/28",
        time: "12:59",
        link: "zoom url 1",
      },
      {
        id: "987654",
        mentee: {
          id: 2,
          name: "Shirayuki",
          img: shirayuki_icon,
        },
        slip: "",
        date: "2022/11/28",
        time: "12:59",
        link: "zoom url 2",
      },
    ]);
    // try {
    //   axios
    //     .get("", {
    //       headers: {
    //         Authorization: "Bearer " + Token,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setBookingList(res.data);
    //     });
    // } catch (error) {}
  }, []);

  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        รายการคำขอจองเวลา
      </div>
      <div className="flex place-content-center">
        <div className="flex-col border-2 border-[#8157A1] w-[80%] rounded-3xl">
          {bookingList.map((booking, index) => {
            return (
              <div key={index}>
                <BookingMentorCard
                  bookingId={booking.id}
                  menteeName={booking.mentee.name}
                  menteePic={booking.mentee.img}
                  slipUrl={booking.slip}
                  date={booking.date}
                  time={booking.time}
                  link={booking.link}
                  token={Token}
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

export default BookingDetailMentor;
