
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import './mybook.css';
// import { format, parseISO } from 'date-fns';

// const MyBook = () => {
//     const { user } = useSelector(state => state.user);
//     const id = user._id;
//     const [bookings, setBooking] = useState([]);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const { data } = await axios.get(`https://newbackend-176c.onrender.com/Order/myorder/${id}`);
//                 setBooking(data);
//                 console.log(data);
//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//             }
//         };

//         fetchBookings();
//     }, [id]);

//     const formatDate = (dateString) => {
//         console.log(dateString);
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         const date = new Date(dateString);
//         date.setDate(date.getDate() + 1);
//         return date.toLocaleDateString(undefined, options);
//     };

//     const formatDate2 = (dateString) => {
//         const date = parseISO(dateString);
//         return format(date, 'MMMM dd, yyyy');
//     };

//     const downloadPDF = (booking) => {
//         const doc = new jsPDF();
//         doc.setFontSize(18);
//         doc.text("Turf_Hub", 80, 10);
//         doc.setFontSize(12);



//         const tableColumn = ["Field", "Details"];
//         const tableRows = [
//             ["Court Name", booking.courtId.CourtName],
//             ["Location", booking.courtId.Location],
//             ["Date", formatDate(booking.date)],
//             ["Slot", booking.slot.name],
//             ["User Name",booking.bookedBy.firstName+' '+booking.bookedBy.lastName],
//             ["Date of Booking", formatDate2(booking.orderId.createdOn)],
//             ["Booking Id", booking.orderId._id]
//         ];

//         doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//             styles: {
//                 font: "helvetica",
//                 fontSize: 12,
//                 lineColor: [0, 0, 0],
//                 lineWidth: 0.5,
//                 textColor: [0, 0, 0],
//                 fillColor: [255, 255, 255],
//             },
//             headStyles: {
//                 fillColor: [0, 0, 255],
//                 textColor: [255, 255, 255],
//                 fontStyle: "bold"
//             },
//             alternateRowStyles: {
//                 fillColor: [240, 240, 240]
//             }
//         });

//         doc.save(`booking_${booking._id}.pdf`);
//     };

//     return (
//         <div>
//             <h2 className='ms-sm-1'>Bookings</h2>
//             {bookings.length > 0 ?
//                 <div className='mybook-container'>
//                     {bookings.map((item) => (
//                         <div key={item._id} className='booking_container'>
//                             <h3>{item.courtId.CourtName}</h3>
//                             <h4>{item.courtId.Location}</h4>
//                             <h5>Date: {formatDate(item.date)}</h5>
//                             <h5>Slot: {item.slot.name}</h5>
//                             <span>Date of booking: {formatDate2(item.orderId.createdOn)}</span>
//                             <button onClick={() => downloadPDF(item)}>Download Ticket</button>
//                         </div>
//                     ))}
//                 </div>
//                 :
//                 <div className='ps-sm-1'>
//                     You have not made any bookings yet
//                 </div>
//             }
//         </div>
//     );
// };

// export default MyBook;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './mybook.css';
import { format, parseISO } from 'date-fns';

const MyBook = () => {
    const { user } = useSelector(state => state.user);
    const id = user._id;
    const [bookings, setBooking] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get(`https://newbackend-176c.onrender.com/Order/myorder/${id}`);

                // Sort bookings by date in descending order
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBooking(sortedData);

                console.log(sortedData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [id]);

    const formatDate = (dateString) => {
        console.log(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate());
        return date.toLocaleDateString(undefined, options);
    };

    const formatDate2 = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'MMMM dd, yyyy');
    };

    const isFutureBooking = (date) => {
        const bookingDate = new Date(date);
        const today = new Date();
        return bookingDate >= today;
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
            ["User Name", booking.bookedBy.firstName + ' ' + booking.bookedBy.lastName],
            ["Date of Booking", formatDate2(booking.orderId.createdOn)],
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
            <h2 className='ms-sm-1'>Bookings</h2>
            {bookings.length > 0 ?
                <div className='mybook-container'>
                    {bookings.map((item) => (
                        <div key={item._id} className='booking_container'>
                            <h3>{item.courtId.CourtName}</h3>
                            <h4>{item.courtId.Location}</h4>
                            <h5>Date: {formatDate(item.date)}</h5>
                            <h5>Slot: {item.slot.name}</h5>
                            <span>Date of booking: {formatDate2(item.orderId.createdOn)}</span>
                            {isFutureBooking(item.date) && <button onClick={() => downloadPDF(item)}>Download Ticket</button>}
                        </div>
                    ))}
                </div>
                :
                <div className='ps-sm-1'>
                    You have not made any bookings yet
                </div>
            }
        </div>
    );
};

export default MyBook;
