import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate,useSearchParams } from "react-router-dom";
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
export default function JobSearch() {
  const locate = useLocation();
  const [jobs, setJobs] = useState(locate.state.jobs);
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
    // getJobs()
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
 
  const location = locate.search;
  console.log(locate);
  console.log(location);

  const JobCard = (props) => {
    const { _id, company, logo, logoBackground, position, postedAt, contract, location, website, apply, description, requirements, role } = props.obj;
    const details = { logo, postedAt, position, contract, company, location, logoBackground, website, apply, description, requirements, role };
  
    function importAll(r) {
      let images = {};
      r.keys().forEach(element => {
        images[element.replace('./', '')] = r(element);
      });
      return images;
    }
    const stringLogo = logo.split("/");
    const stringLogoLength = stringLogo.length;
    const logoName = stringLogo[stringLogoLength - 1];
    const images = importAll(require.context('../assets/logos', false, /\.svg/));
    // console.log(images);
    // console.log(logoName);
    // console.log(images[logoName]);
    const link = '/job-details/' + _id;
    return (
  
      <div className="col">
        <Link to={link} state={{ details: details }} className="link-style">
          <Card>
            <Card className="logoCard" style={{ backgroundColor: logoBackground }}>
              <CardImg top width="10%" src={images[logoName].default} alt="Company logo" />
            </Card>
            <CardBody>
              <CardSubtitle tag="h6" className="mb-2 text-muted timeElapsed">{postedAt} <span className="dot">.</span> </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted"> {contract}</CardSubtitle>
              <CardTitle tag="h5" className="title">{position}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{company}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted country-label country-margin">{location}</CardSubtitle>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  };

  return (
    <Container>
 <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
    <JobMapping />
  </div>
  <button className="load-more-btn" onClick={() => setCount(count + 6)}>Load More</button>
    </Container>
  )
}
