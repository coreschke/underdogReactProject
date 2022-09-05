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
height,
weight,
stats,
}) => {
const style = `thumb-container ${types[0].type.name}`;
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
console.log(stats);
return (
	<div className={style}>	

	<div className="detail-wrapper">
		<h3 onClick={handleShow}>{name.toUpperCase()}</h3>
		<Modal 
		show={show}
		onHide={handleClose}
		size="lg"
		aria-labelledby="contained-modal-title-vcenter"
		centered>
			<Modal.Header closeButton>
				<Modal.Title>{name.toUpperCase()}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Card>
					<Card.Img variant="top" src={image} style={{ width: '16rem' }} class="mx-auto d-block"/>
					<Card.Body>
						<Card.Text class="text-center">
						Weight: {weight} lbs
						</Card.Text>
					</Card.Body>
					
					<ListGroup as="ol" numbered>
					<div className="fw-bold">Pokemon Types</div>
					{types.map((i)=> 
						<ListGroup.Item as="li">{i.type.name}</ListGroup.Item>)
					}
					</ListGroup>
					<ListGroup variant="flush">
					<div className="fw-bold">Pokemon Stats</div>
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
