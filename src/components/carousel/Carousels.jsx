// import React from 'react';
// import { Carousel } from 'react-bootstrap';
// import './Carousel.css'

// const Carousels = ({ data }) => {
//     console.log(data.pics);

//     return (
//         data && (
//             <Carousel className='carouselhead' data-bs-theme="dark">
//                 {data.pics.map((pic, index) => (
//                     <Carousel.Item key={index}>
//                         <img
//                             className="d-block w-100 carousel_img"
//                             src={pic}  // Assuming each pic object has a 'url' property
//                             alt={`Slide ${index + 1}`}
//                         />
//                         <Carousel.Caption>
//                             <h5>{data.CourtName || `Slide ${index + 1}`}</h5> 
//                             <p>{data.Location || 'Default caption text'}</p>  
//                         </Carousel.Caption>
//                     </Carousel.Item>
//                 ))}
//             </Carousel>
//         )
//     );
// }

// export default Carousels;


import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

const Carousels = ({ data }) => {
    const [rotations, setRotations] = useState([]);

    useEffect(() => {
        const rotationsArray = data.pics.map(() => '');
        setRotations(rotationsArray);
    }, [data.pics]);

    const handleImageLoad = (e, index) => {
        const { height, width } = e.target;
        let rotationClass = '';

        if (height > width) {
            rotationClass = 'rotate90'; // Example condition to rotate based on height
        }

        setRotations(prevRotations => {
            const newRotations = [...prevRotations];
            newRotations[index] = rotationClass;
            return newRotations;
        });
    };

    return (
        data && (
            <Carousel className='carouselhead' data-bs-theme="dark">
                {data.pics.map((pic, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className={`d-block w-100 carousel_img ${rotations[index]}`}
                            src={pic}  // Assuming each pic object has a 'url' property
                            alt={`Slide ${index + 1}`}
                            onLoad={(e) => handleImageLoad(e, index)}
                        />
                        <Carousel.Caption>
                            <h5>{data.CourtName || `Slide ${index + 1}`}</h5> 
                            <p>{data.Location || 'Default caption text'}</p>  
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    );
};

export default Carousels;

