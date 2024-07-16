
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './courtdetail.css';
import Football from '../../assets/football.svg';
import Cricket from '../../assets/cricket.svg';
import Tennis from '../../assets/tennis.svg';
import Badminton from '../../assets/badminton.svg';
import Hockey from '../../assets/hockey.svg';
import Basketball from '../../assets/basketball.svg';
import chekk from '../../assets/chekk.svg';
import Bookmodal from '../../components/bookingmodal/Bookmodal';
import axios from 'axios';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from '@chakra-ui/react'

const CourtDetail = () => {
  const location = useLocation();
  const { court } = location.state || {};
  const { CourtName, Location, pics, AvailableSports, Amenities } = court || {};
  const sportImages = { Football, Cricket, Tennis, Badminton, Hockey, Basketball };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [price, setPrice] = useState(null);
  const [alertbox, setAlertbox] = useState(null)

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots([]);
      setSelectedSlots([]);
      setPrice(null);
      fetchSlotData();
    }
  }, [selectedDate]);

  const fetchSlotData = async () => {
    const Id = court._id;
    try {
      const response = await axios.get('https://newbackend-176c.onrender.com/Slot/', {
        params: {
          date: selectedDate,
          id: Id
        }
      });
      setAvailableSlots(response.data || []);
    } catch (error) {
      console.error('Error fetching slot data:', error);
      setAvailableSlots([]);
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlots([...selectedSlots, slot]);
    setAvailableSlots(availableSlots.filter((ele) => ele.slot.id !== slot.slot.id));
  };

  const handleRemoveSlot = (slot) => {
    setSelectedSlots(selectedSlots.filter((item) => item.slot.id !== slot.slot.id));
    setAvailableSlots([...availableSlots, slot]);
  };

  useEffect(() => {
    setPrice(selectedSlots.length * court.Price);
  }, [selectedSlots, court.Price]);

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => resolve(true);
  //     script.onerror = () => resolve(false);
  //     document.body.appendChild(script);
  //   });
  // };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        console.log("Razorpay SDK loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.log("Razorpay SDK failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  
  const booknowFunction = () => {
    setModalOpen(true)
    setSelectedSlots([])
    setAvailableSlots([])
  }

  // const handleBooking = async () => {
  //   if (selectedSlots.length > 0) {
  //     const token = sessionStorage.getItem('token');
  //     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  //     if (!res) {
  //       alert("Razorpay SDK failed to load. Are you online?");
  //       return;
  //     }

  //     const slotIds = selectedSlots.map((ele) => ele._id);
  //     const orderResponse = await axios.post('https://newbackend-176c.onrender.com/Order', {
  //       amount: price,
  //       currency: 'INR',
  //       slotId: slotIds,
  //       courtId: court._id
  //     }, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     });

  //     if (!orderResponse) {
  //       alert("Server error. Are you online?");
  //       return;
  //     }
  //     console.log(orderResponse.data);
  //     const { amount, id: order_id, currency, receipt } = orderResponse.data;
  //     const key = import.meta.env.VITE_RP_KEY_ID;
  //     const options = {
  //       key,
  //       amount: amount.toString(),
  //       currency,
  //       name: "Turf_hub Pvt.Ltd",
  //       description: "Booking Payment",
  //       order_id,
  //       handler: async (response) => {
  //         const data = {
  //           orderCreationId: order_id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //           receipt,
  //           slotIds,
  //           courtId: court._id,
  //           date: selectedDate
  //         };
  //         try {
  //           const result = await axios.post('https://newbackend-176c.onrender.com/Order/verify', data, {
  //             headers: {
  //               "Authorization": `Bearer ${token}`
  //             }
  //           });
  //           console.log(result);
  //           setAlertbox({
  //             status: 'success',
  //             title: 'Success!',
  //             description: result.data.msg
  //           });


  //           setTimeout(() => {
  //             setAlertbox(null)

  //           }, 5000);



  //         } catch (error) {
  //           console.error("Error verifying payment:", error);
  //         }

  //         setModalOpen(false);

  //       },

  //       prefill: {
  //         name: "Soumya Dey",
  //         email: "SoumyaDey@example.com",
  //         contact: "9999999999",
  //       },
  //       notes: {
  //         address: "Soumya Dey Corporate Office",
  //       },
  //       theme: {
  //         color: "#61dafb",
  //       },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   }
  //   else {
  //     alert('Please select Slot')
  //   }
  // };

  const handleBooking = async () => {
    if (selectedSlots.length > 0) {
      const token = sessionStorage.getItem('token');
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      const slotIds = selectedSlots.map((ele) => ele._id);
      try {
        const orderResponse = await axios.post('https://newbackend-176c.onrender.com/Order', {
          amount: price,
          currency: 'INR',
          slotId: slotIds,
          courtId: court._id
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!orderResponse) {
          alert("Server error. Are you online?");
          return;
        }
  
        console.log(orderResponse.data);
        const { amount, id: order_id, currency, receipt } = orderResponse.data;
        const key = import.meta.env.VITE_RP_KEY_ID;
  
        const options = {
          key,
          amount: amount.toString(),
          currency,
          name: "Turf_hub Pvt.Ltd",
          description: "Booking Payment",
          order_id,
          handler: async (response) => {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              receipt,
              slotIds,
              courtId: court._id,
              date: selectedDate
            };
            try {
              const result = await axios.post('https://newbackend-176c.onrender.com/Order/verify', data, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });
              console.log(result);
              setAlertbox({
                status: 'success',
                title: 'Success!',
                description: result.data.msg
              });
  
              setTimeout(() => {
                setAlertbox(null)
              }, 5000);
            } catch (error) {
              console.error("Error verifying payment:", error);
            }
  
            setModalOpen(false);
          },
          prefill: {
            name: "LICHIN.C",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Soumya Dey Corporate Office",
          },
          theme: {
            color: "#61dafb",
          },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      alert('Please select Slot');
    }
  };
  


  if (!court) {
    return <div>Court data is not available</div>;
  }

  return (
    <div className="courtdetails">
      {alertbox && (
        <Stack spacing={3} mb={4}>
          <Alert status={alertbox.status} variant='subtle'>
            <AlertIcon />
            <AlertTitle>{alertbox.title}</AlertTitle>
            <AlertDescription>{alertbox.description}</AlertDescription>
          </Alert>
        </Stack>
      )}
      <h1 className="text-capitalize mt-1">{CourtName}</h1>
      <div className="first-box row">
        <div className="img-place col-lg-8">
          <h4>{Location}</h4>
          <div className="court-pic">
            <img src={pics[0]} alt={`${CourtName} court`} />
          </div>
          <div className="sports">
            <h5 className="text-capitalize mt-1">Sports Available</h5>
            <div className="sports-available">
              {AvailableSports.map((sport, index) => (
                <div className="sports-img-box" key={index}>
                  <img src={sportImages[sport]} alt={sport} />
                  <small>{sport}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="court-amenities">
            <h5 className="text-capitalize mt-1">Amenities</h5>
            <div className='amenities-available'>
              {Amenities.map((item, index) => (
                <div className='court-amenities-box' key={index}>
                  <img src={chekk} alt="check" />
                  <small>{item}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="court-book col-lg-4">
          <button className="text-capitalize" onClick={() => booknowFunction()}>Book Now</button>
          <div className='border rounded-2 mt-2 px-3'>
            <h5 className='mt-2'>Price:</h5>
            <p className='fw-bold'>{court.Price}<small>/Hour</small></p>
          </div>
          <div className='border rounded-2 mt-2 px-3'>
            <h5>Court Type</h5>
            <p>{court.CourtType}</p>
          </div>
          <div className='border rounded-2 mt-2 px-3'>
            <h5>Address</h5>
            <p>{court.AddressLine1}</p>
            <p>{court.AddressLine2}</p>
            <p>{court.AddressLine3}</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Bookmodal CloseModal={() => setModalOpen(false)} heading={`${court.CourtName}`}>
          <div className='d-flex flex-column justify-content-center w-100 p-2'>
            <label className='text-black' htmlFor="selectDate">Select Date</label>
            <input
              type="date"
              id="selectDate"
              className='calender-input px-2 border rounded-1'
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className='p-2'>
            <label className='text-black' htmlFor="availableSlot">Available Slots</label>
            <div id="availableSlot">
              {availableSlots.length > 0 ? availableSlots.map((slot, index) => (
                <span className='point' key={index} onClick={() => handleSelectSlot(slot)}>{slot.slot.name}</span>
              )) : <span className='bg-danger-subtle text-black'>No slots available for the selected date.</span>}
            </div>
            <div className='border border-2 mt-2 rounded'>
              <label className='text-black' htmlFor="">Selected Slots</label>
              <div className='slotselected'>
                {selectedSlots.length > 0 ? selectedSlots.map((slot, index) => (
                  <span className='point' key={index} onClick={() => handleRemoveSlot(slot)}>{slot.slot.name}</span>
                )) : <span className='bg-danger-subtle text-black'>Not yet selected</span>}
              </div>
            </div>
            {selectedSlots.length > 0 && (
              <div className='d-flex flex-column'>
                <label className='text-black' htmlFor="">Price:</label>
                <span className='fw-bold'>{price}/-</span>
              </div>
            )}
          </div>
          <div className='p-1 d-flex justify-content-center flex-wrap'>
            <button className='btn btn-info mx-2 text-white' onClick={handleBooking}>Pay Now</button>
            <button className='btn btn-secondary' onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </Bookmodal>
      )}
    </div>
  );
};

export default CourtDetail;
