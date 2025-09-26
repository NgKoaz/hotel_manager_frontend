import React, { useEffect, useState } from "react";
import { myApi, MyBookingsResponse } from "@/api/my.api";
import BookingCard from "./BookingCard";


const BookingHistoryCard: React.FC = ({}) => {
  const [bookingRes, setBookingRes] = useState<MyBookingsResponse>();
  console.log(bookingRes?.bookings);

  const loadBookings = () => {
    myApi.getBookings()
      .then(setBookingRes)
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadBookings();

  }, []);

  const bookings = bookingRes?.bookings;

  return (
    <>
      {bookings && bookings.reverse().map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          bookingRes={bookingRes}
          loadBookings={loadBookings}
        />)
      )}
    </>
  );
};

export default BookingHistoryCard;
