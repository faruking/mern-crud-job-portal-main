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

var jobFilter = [];
var contract = '';
export default function JobSearch() {
  const [description, setDescription] = useState([]);
  const locationState = useLocation();
  const [location,setLocation] = useState([]);
  const [jobs, setJobs] = useState(locationState.state.jobs);
  const [count, setCount] = useState(6);
  const [filter, setFilter] = useState([]);
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
  const searchLocation = locationState.search;
  console.log(locationState);
  console.log(searchLocation);

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
    const handleInputChange = (e, v) => {
    setDescription(v);
  };
  const handleCheck = (e) => {
    if(e.target.checked){
      contract = 'Full Time';
      console.log('true');
    }
    else{
      console.log('false');
    }
  }
  const handleLocationChange = (e, v) => {
    setLocation(v);
  };
  let navigate = useNavigate();
  let temp = [];
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(location);
      console.log(description);
      if(Array.isArray(location) && location.length > 0){
        temp.push(...location);
      }
      if(Array.isArray(description) && description.length > 0){
        temp.push(...description);
      }
      console.log(temp);
      console.log(filter);
      if(temp.length>0){
        jobFilter = jobs.filter(e => temp.includes(e.position) || temp.includes(e.company) || temp.includes(e.location));
        console.log(jobFilter);
        if(contract === 'Full Time'){
          const anotherFilter = jobFilter.filter(e => e.contract === contract);
          setJobs(anotherFilter);
        }
        else{
          setJobs(jobFilter);
        }
      }
      else{
        if(contract === 'Full Time'){
          const filter = jobs.filter(e => e.contract === contract);
          setJobs(filter); 
        }
        else{
          if(location.length === 0 && description.length === 0){
            alert('Please enter a valid search term');
          }
          else{
            navigate('/no-results');
          }
        }
      }
    }
    const companySuggest = [];
    const titleSuggest = [];
    const locationSuggestions = [];
    for (let i = 0; i < jobs.length; i++) {
      if (!companySuggest.includes(jobs[i].company)) {
        companySuggest.push(jobs[i].company);
      }
    }
    for (let i = 0; i < jobs.length; i++) {
      if (!titleSuggest.includes(jobs[i].position)) {
        titleSuggest.push(jobs[i].position);
      }
    }
    for (let i = 0; i < jobs.length; i++) {
      if (!locationSuggestions.includes(jobs[i].location)) {
        locationSuggestions.push(jobs[i].location);
      }
  
    }
    const allSuggestions = companySuggest.concat(titleSuggest);
    // console.log(companySuggest);
    // submit search
  
    // This following section will display the table with the records of individuals.
  return (
    <Container>
       <div className="col-md-12">
        <form  onSubmit={handleSubmit} action='/search'>
          <div className="search-area">
            <div className="sa-item">
              <div className="search-input">
                <img src={iconSearch} alt='icon search' />
              </div>
              <div className="search-input" id="search-box" >
                <InputSystem suggestions={allSuggestions} handleChange={handleInputChange} selectedValue placeholder={"Filter by title,companies,expertise..."} />
              </div>
            </div>
            <div className="sa-item">
              <div className="search-input">
                <img src={iconLocation} alt='icon location' />
              </div>
              <InputSystem suggestions={locationSuggestions} handleChange={handleLocationChange} placeholder={'Filter by Location'} />
            </div>
            <div className="sa-item">
              <div><input id="cb" type="checkbox" name="cb" onChange={handleCheck}/>
                <label htmlFor="cb"><strong className="label-text"></strong></label>
              </div>
              <div>
                <button>Search</button>
              </div>
            </div>

            <div className="sa-item">

              <div className="search-input" id="search-box" >
                <input placeholder="Filter by location..." />
              </div>
              <div className="search-input">
                {/* <img src={iconFilter} alt='' /> */}
              </div>
              <div className="search-input" id='mobile-icon-search'>
                <img src={mobileIconSearch} alt='' />
              </div>
            </div>
          </div>
        </form>
      </div>
 <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
    <JobMapping />
  </div>
  <button className="load-more-btn" onClick={() => setCount(count + 6)}>Load More</button>
    </Container>
  )
}
