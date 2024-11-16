import React, { useEffect, useState } from 'react';
import { Link  } from "react-router-dom";
import { getAllTags } from '../api/api';

const TagsCards = (props) => {

    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllTags('/tags');
           setData(response);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      fetchData();
    }, []); 
    

    return (
        <div className="custom-card-body">
            <div className="custom-card-body-item">
                <div className="custom-card-body-top">
                    <p className="custom-text-truncate">{props.title}</p>
                </div>
                <div className="custom-card-body-lft">
                    <div className="custom-text-success">
                        <i className="fa fa-level-up" aria-hidden="true"></i> +16.24 %
                    </div>
                </div>
            </div>
            <div className="custom-card-body-item2">
                <div className="custom-card-body-item2in">
                    <h4 className="custom-ff-secondary"><span className="custom-counter-value" data-target="40">{data.length}</span> - {props.cardType}</h4>
                    <Link to="/dashboard/tag-list" className='custom-text-muted'>View all Articles</Link>
                </div>
                <div className="custom-card-body-iteminn">
                    <span className="custom-success-subtle">
                        <svg className="circle-progress" width="50" height="50" viewBox="0 0 160 160">
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" strokeWidth="6px"></circle>
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#60e6a8" strokeWidth="12px" strokeDasharray="439.6px" strokeDashoffset="calc(440 - (440 * 90) / 100)"></circle>
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#60e6a8" fontWeight="bold" fontSize="3em">90<tspan>%</tspan></text>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TagsCards;

