import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import { Container } from 'react-grid-system';
import iconSearch from "../assets/desktop/icon-search.svg";
import iconLocation from "../assets/desktop/icon-location.svg";
import iconFilter from "../assets/mobile/icon-filter.svg";
import mobileIconSearch from "../assets/mobile/icon-search-white.svg";
import InputSystem from './f.component';
import JobCard from "./JobCard";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(6);
  const [filter, setFilter] = useState({});
  useEffect(() => {
    async function getJobs() {
      const response = await fetch(`http://localhost:5000/job/`);
      console.log('nnnn');
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const jobs = await response.json();
      setJobs(jobs);
    }
    getJobs();

    return;
  }, [jobs.length]);
  // let location = useLocation();
  // console.log(location);
  function JobMapping() {
    return jobs.map((job, i) => {
      if (i < count) {
        return (
          <JobCard obj={job} key={job._id} />
        );
      }
    });
  }
  return (
  
    <JobMapping />
  )
}
