import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Modal } from "react-bootstrap";
import {CloseButton} from "react-bootstrap";
import { useState } from 'react';
import useFlights from '../../api/flights';
import Select from 'react-select';
import { useEffect } from "react";


function FlightForm(props) {
  const flightsApi = useFlights();
  const id = props.update;
  
  const [flightId, setFlightId] = useState('');
  const [type, setType] = useState('Local'); 
  const [date, setDate] = useState(''); 
  const [depTime, setDepTime] = useState(''); 
  const [arrTime, setArrTime] = useState(''); 
  const [plane, setPlane] = useState('');
  const [PIC, setPIC] = useState('');
  const [COPIC, setCOPIC] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(() => {
    if(id!==null){
      setFlightId(id);
      fillForm();
    }
      //eslint-disable-next-line
  }, [id]);


  const onSaveFlight = async(flight) => {
    if(!type || !date || !depTime || !arrTime || !plane || (!PIC && !COPIC) || !departure || !arrival){
      throw new Error("Please fill in all fields");
    }
    const timeFrame = flight.depTime + ' - ' + flight.arrTime;
    flight.timeframe = timeFrame;

    await flightsApi.createFlight(flight);
    await props.updateList(); 
  }


  const onUpdateFlight = async() => {
    if(!type || !date || !depTime || !arrTime || !plane || (!PIC && !COPIC) || !departure || !arrival){
      throw new Error("Please fill in all fields");
    }
    const timeFrame = depTime + ' - ' + arrTime;
    const flight = {
      id: flightId,
      type: type,
      date: new Date(date),
      timeframe: timeFrame,
      plane: plane,
      PIC: PIC,
      CoPilot: COPIC,
      departure: departure,
      arrival: arrival
    }
    await flightsApi.updateFlight(flight);
    await props.updateList();
  }

  const close = () => {
    setFlightId(null);
    setType('Local');
    setDate('');
    setDepTime('');
    setArrTime('');
    setPlane('');
    setPIC('');
    setCOPIC('');
    setDeparture('');
    setArrival('');
    props.closeForm();
  }

  const fillForm = async() => {
    const flight = await flightsApi.getFlightById(id);
    const date = new Date(flight.date);
    date.setDate(date.getDate() + 1);
    const depTime = flight.timeframe.split(' - ')[0];
    const arrTime = flight.timeframe.split(' - ')[1];
    setType(flight.type);
    setDate(date.toISOString().split('T')[0]);
    setDepTime(depTime);
    setArrTime(arrTime);
    setPlane(flight.plane);
    setPIC(flight.PIC);
    setCOPIC(flight.CoPilot);
    setDeparture(flight.departure);
    setArrival(flight.arrival);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    if(flightId){
      await onUpdateFlight();
    }
    else{
      await onSaveFlight({type,date,depTime,arrTime,plane,PIC,COPIC,departure,arrival});
    }
    await props.updateList;
    close();
  }
  catch(error){
    props.setError("Please check all fields again. Make sure you are selected as one of the pilots");
  }
  };


  function handleSelectPIC(data){
    setPIC(data.value)
  }

  function handleSelectCOPIC(data){
    setCOPIC(data.value);
  }

  return (
    <>
    <Modal size="lg" centered show={props.isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>{id?"Edit":"Book"} flight {id}</Modal.Title>
            <CloseButton onClick={close}>x</CloseButton>
        </Modal.Header>
        <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group  controlId="formGridState">
          
          <Form.Select onChange={(e) => setType(e.target.value)} value={type} required data-cy="type_input">
            <option  disabled>Type</option>
            <option >Local</option>
            <option>Training</option>
            <option>Navigation</option>
          </Form.Select>
        </Form.Group>



      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDate" >
          <Form.Label>Flight Date</Form.Label>
          <Form.Control type="date" name="flightdate" placeholder="Date of flight" onChange={(e) => setDate(e.target.value)} value={date} required data-cy="date_input"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDepTime">
          <Form.Label>Departure time</Form.Label>
          <Form.Control type="time" onChange={(e) => setDepTime(e.target.value)} value={depTime} required data-cy="deptime_input"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridArrTime">
          <Form.Label>Arrival time</Form.Label>
          <Form.Control type="time" onChange={(e) => setArrTime(e.target.value)} value={arrTime} required data-cy="arrtime_input"/>
        </Form.Group>
      </Row>

      <Form.Group controlId="formGridPlane">
            <Form.Label>Plane Registration</Form.Label>
            <Form.Control type="text" placeholder="OO-VMX" onChange={(e) => setPlane(e.target.value.toUpperCase())} value={plane} required data-cy="plane_input"/>
        </Form.Group>
        
        <Form.Group controlId="formGridPIC">
            <Form.Label>PIC</Form.Label>
            <div data-cy="PIC_input"><Select options={props.pilots} id="pic" placeholder="Select PIC" onChange={handleSelectPIC} value={props.pilots.filter(pilot=>pilot.value===PIC)} required /></div>
        </Form.Group>

        <Form.Group controlId="formGridCoPilot">
            <Form.Label>Co-Pilot</Form.Label>
            <div data-cy="COPIC_input"><Select options={props.pilots} placeholder="Select CoPilot" onChange={handleSelectCOPIC} value={props.pilots.filter(pilot=>pilot.value===COPIC)} /></div>
        </Form.Group>

        

        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDep">
            <Form.Label>Departure</Form.Label>
            <Form.Control type="text" maxLength="4" placeholder="Departure" onChange={(e) => setDeparture(e.target.value.toUpperCase())} value={departure} required data-cy="departure_input"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridArr">
            <Form.Label>Arrival</Form.Label>
            <Form.Control type="text" maxLength="4" placeholder="Arrival" onChange={(e) => setArrival(e.target.value.toUpperCase())}  value={arrival} required data-cy="arrival_input"/>
        </Form.Group>
        </Row>

        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={close} data-cy="flight_cancel">
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}  data-cy="flight_submit">
        {id? 'Update' : 'Save'}
      </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}


export default FlightForm;