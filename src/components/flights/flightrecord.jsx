import {SlMagnifier} from 'react-icons/sl';
import {Button} from "react-bootstrap";


function Flightrecord({id, date, timeframe, departure, arrival, plane, type, getIdToUpdate}) {
    const giveId = () => {
        getIdToUpdate(id);
    }
  
    return (
        <>
        <tr data-cy="flight">
          <td data-cy="flight_date">{new Date(date).toLocaleDateString()}</td>
          <td data-cy="flight_timeframe">{timeframe}</td>
          <td data-cy="flight_departure">{departure}</td>
          <td data-cy="flight_arrival">{arrival}</td>
          <td data-cy="flight_plane">{plane}</td>
          <td data-cy="flight_type">{type}</td>
          <td><Button variant="primary" onClick={giveId} data-cy="flight_edit"><SlMagnifier/></Button>
        

      </td>
        </tr>
        
      </>
    );
}

export default Flightrecord;