import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Thumbnail = ({
name,
image,
types,
key,
weight,
stats,
}) => {
const style = `thumb-container ${types[0].type.name}`;
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
return (
	// Style of pokemon "card" is the color of its primary type
	<div className={style}>	
		<div className="detail-wrapper">
			<h3 onClick={handleShow}>{name.toUpperCase()}</h3>
			{/* Upon click of pokemon name, modal pops up with photo and additional information */}
			<Modal 
			show={show}
			onHide={handleClose}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
				<Modal.Header closeButton className = {types[0].type.name}>
					<Modal.Title>{name.toUpperCase()}</Modal.Title>
				</Modal.Header>
				<Modal.Body className = {types[0].type.name}>
					<Card>
						<Card.Img variant="top" src={image} style={{ width: '16rem' }} className="mx-auto d-block"/>
						<Card.Body>
							<Card.Text className="text-center">
							Weight: {weight} lbs
							</Card.Text>
						</Card.Body>
						
						<ListGroup as="ol" numbered>
						<div className="fw-bold">Pokemon Types</div>
						{/* Iterate through types for each pokemon */}
						{types.map((i)=> 
							<ListGroup.Item as="li">{i.type.name}</ListGroup.Item>)
						}
						</ListGroup>
						<ListGroup variant="flush">
						<div className="fw-bold">Pokemon Stats</div>
						{/* Iterate through stats for each pokemon */}
						{stats.map((i)=> 
							<ListGroup.Item>{i.stat.name} is {i.base_stat}</ListGroup.Item>)
						}
						</ListGroup>
					</Card>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	</div>
);
};

export default Thumbnail;

