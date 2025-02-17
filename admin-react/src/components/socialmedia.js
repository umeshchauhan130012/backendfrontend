import React, { useEffect, useState } from 'react';
import { socialUpdats } from '../api/api';
import Div from './div';

const Socialmedia = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await socialUpdats('/social');
           setData(response);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <>
        {data && data.map((data, ind) => (
        <Div className="custom-col-12" key={ind}>
            <Div className="custom-social-body">
                <span className="custom-social-light">{data.name}</span>
                <Div className="custom-social-views">
                    <span>{data.follow} <sub>{data.followtype}</sub></span>
                    <span className={`custom-social-warning ${data.increment ? 'positivecol' : 'negativecol'}`}><i className={data.increment ? 'fa fa-level-up' : 'fa fa-level-down'} aria-hidden="true"></i><span>{data.grouth}%</span></span>
                </Div>
                <Div className={` custom-social-bg ${data.name}`}>
                <i className={`fa fa-${data.name}`} aria-hidden="true"></i> 
                </Div>
            </Div>
        </Div>
        ))}
        </>
    );
}

export default Socialmedia;
