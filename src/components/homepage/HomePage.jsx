import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const HomePage = () => {
    return (
        <div className='p-2'>
            {/* cards */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/djnxobzrq/image/upload/v1716304847/xligsiicb4yrlpwshra0.webp" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/djnxobzrq/image/upload/v1716304847/xligsiicb4yrlpwshra0.webp" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>

    )
}

export default HomePage