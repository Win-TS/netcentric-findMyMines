import { useState, useEffect } from 'react';
import axios from 'axios';

export const Leaderboard = () => {

    const [leaderboards, setLeaderboards] = useState("")

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:9000/score/leaderboards', { crossdomain: true });
            setLeaderboards(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    
      }, []);

      const PrettyJson = () => {
        return <pre>{JSON.stringify(leaderboards, null, 1)}</pre>;
      };

    return (
        <div>
            <h1>Leaderboard:</h1>
            <PrettyJson />
        </div>
    );
}