import FlightList from './flights/flightlist';
import useFlights from '../api/flights';
import usePilots from '../api/pilots';
import DoughnutChart from './charts/categoryDivision';
import {useState, useEffect, useCallback} from 'react';
import LicenseList from './charts/licenseChart'
import Statistic from './statistics/statistic';


function Dashboard({setError}) {
    const flightsApi = useFlights();
    const pilotsApi = usePilots();
    const [amount, setAmount] = useState([0,0,0]);
    const [pilots, setPilots] = useState([]);
    const [stats, setStats] = useState([0,0,0]);


    const refreshAmount = useCallback(async () => {
        try{
          const stats = await flightsApi.getStats();
          setStats(stats);
          const amountPerCategory = await flightsApi.getFlightCategoriesInfo();
          setAmount(amountPerCategory);
          const pilots = await pilotsApi.getAllPilots();
          pilots.unshift({id: null, label: "Choose..."});
          setPilots(pilots);
        } catch (error) {
          setError(error.message)
        }
        //eslint-disable-next-line
      }, []);



      

      
    
      useEffect(() => {
        refreshAmount();
        
      }, [refreshAmount]);
    return (
        <div className="dashboard">
          <div className="statistics">
            {stats.map((stat, index) => <Statistic stat={stat} index={index} key={index}/>)}
          </div>
            <br/>
          <div className="charts">
            <div className='chartChild'>
            <DoughnutChart amount={amount}/>
            </div>
            <div className='chartChild'>
            <LicenseList setError={setError}/>
          </div>
          </div>
            <br/>
            <FlightList updateCategoryDivision={refreshAmount} setError={setError} pilots={pilots}/>
            
        </div>
    );
}

export default Dashboard;