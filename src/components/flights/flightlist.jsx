import React from "react";
import Table from 'react-bootstrap/Table';
import Flight from "./flightrecord";
import FlightForm from "./flightform";
import { useState, useEffect, useCallback } from 'react';
import useFlights from "../../api/flights";
import {Button} from "react-bootstrap";
import {IoMdAddCircle} from 'react-icons/io';



function FlightTable({
  flights, openForm, getIdToUpdate
}) {
  
 const giveId = (id)=>{
    getIdToUpdate(id);
 }
  if (flights.length === 0) {
    return (
      <div className="alert alert-info">
        There are no flights yet. <br/><Button variant="primary" onClick={openForm} data-cy="add_flight"><IoMdAddCircle /></Button>
      </div>
    );
  }

  return (
    <div>
      <Table striped data-cy="flight_table" className="flightList table-responsive">
      <thead>
        <tr>
          <th>Date</th>
          <th>Timeframe</th>
          <th>Place of Departure</th>
          <th>Place of Arrival</th>
          <th>Plane registration</th>
          <th>Flight type</th>
          <th><Button variant="primary" onClick={openForm} data-cy="add_flight">
          <IoMdAddCircle />
        </Button></th> 
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <Flight {...flight}  key={flight.id} getIdToUpdate={giveId}/>
        ))}
        
      </tbody>
    </Table>
    </div>
  );
}


function FlightList({updateCategoryDivision, pilots, setError}) {
  const flightsApi = useFlights();
  const [update, setUpdate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openForm = async() => {setIsOpen(true);};
  function closeForm () {setIsOpen(false); setUpdate(null)};
  const [flights, setFlights] = useState([]);

  
  const getIdToUpdate = (id) => {
    setUpdate(id);
    openForm();
  }


  const refreshFlights = useCallback(async () => {
    try {
      setUpdate(null);
      const flightlist = await flightsApi.getAllFlights();
      updateCategoryDivision();
      setFlights(flightlist);
    } catch (error) {
      setError(error.message);
    }
      //eslint-disable-next-line
  }, []);

  useEffect(() => {
    refreshFlights();
  }, [refreshFlights]);


  return (
    <> 
      <FlightTable flights={flights} openForm={openForm} getIdToUpdate={getIdToUpdate}/>
      <FlightForm isOpen={isOpen} closeForm={closeForm} updateList={refreshFlights} update={update} pilots={pilots} setError={setError}/>

    </>
  );
}

export default FlightList;