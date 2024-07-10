
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './mybook.css';

const MyBook = () => {
    const { user } = useSelector(state => state.user);
    const id = user._id;
    const [bookings, setBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get(`https://projectbe-hqct.onrender.com/Order/myorder/${id}`);
                setBooking(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const downloadPDF = (booking) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Turf_Hub", 80, 10);
        doc.setFontSize(12);

        

        const tableColumn = ["Field", "Details"];
        const tableRows = [
            ["Court Name", booking.courtId.CourtName],
            ["Location", booking.courtId.Location],
            ["Date", formatDate(booking.date)],
            ["Slot", booking.slot.name],
            ["Date of Booking", formatDate(booking.orderId.createdOn)],
            ["Booking Id", booking.orderId._id]
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: {
                font: "helvetica",
                fontSize: 12,
                lineColor: [0, 0, 0],
                lineWidth: 0.5,
                textColor: [0, 0, 0],
                fillColor: [255, 255, 255],
            },
            headStyles: {
                fillColor: [0, 0, 255],
                textColor: [255, 255, 255],
                fontStyle: "bold"
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            }
        });

        doc.save(`booking_${booking._id}.pdf`);
    };

    return (
        <div>
            <h2>Bookings</h2>
            {bookings ?
                <div className='mybook-container'>
                    {bookings.map((item) => (
                        <div key={item._id} className='booking_container'>
                            <h3>{item.courtId.CourtName}</h3>
                            <h4>{item.courtId.Location}</h4>
                            <h5>Date: {formatDate(item.date)}</h5>
                            <h5>Slot: {item.slot.name}</h5>
                            <span>Date of booking: {formatDate(item.orderId.createdOn)}</span>
                            <button onClick={() => downloadPDF(item)}>Download Ticket</button>
                        </div>
                    ))}
                </div>
                : null}
        </div>
    );
};

export default MyBook;
