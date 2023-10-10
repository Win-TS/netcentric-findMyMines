import { useState, useEffect } from 'react';
import axios from 'axios';

export const Game = () => {

  const [randomArray, setRandomArray] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/game/easy', { crossdomain: true });
        setRandomArray(response.data.grid);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const PrettyJson = () => {
    return <pre>{JSON.stringify(randomArray, null, 0)}</pre>;
  };

  return (
    <div>
      <h1>Game Component</h1>
      <PrettyJson />
    </div>
  );

};