import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
// const Job = (props) => (
//   <tr>
//     <td>{props.job.company}</td>
//     <td>{props.job.position}</td>
//     <td>{props.job.requirements.content}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.job._id}`}>Edit</Link> |
//       <button className="btn btn-link"
//         onClick={() => {
//           props.deleteJob(props.job._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(6);
  var filter = [];

  const [description, setDescription] = useState({ label: "" });
  const [location, setLocation] = useState([]);
  const handleInputChange = (e, v) => {
    setDescription(v);
  };
  const handleCallback = (childData) => {
    setLocation(childData);
    console.log(location);
  }
  const handleLocationChange = (e, v) => {
    setLocation(v);
  };
  console.log(description);
  // console.log(location);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getJobs() {
      const response = await fetch(`https://mern-crud-job-portal-main.herokuapp.com/job/?`);
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

  // This method will delete a record
  async function deleteJob(id) {
    await fetch(`https://mern-crud-job-portal-main.herokuapp.com//${id}`, {
      method: "DELETE"
    });

    const newJobs = jobs.filter((el) => el._id !== id);
    setJobs(newJobs);
  }

  // This method will map out the records on the table
  function JobMapping() {
    return jobs.map((job, i) => {
      if (i < count) {
        return (
          <JobCard obj={job} key={job._id} />
        );
      }
    });
  }
  const onSubmit = (e) => {
    e.preventDefault();

    // jobs.forEach(element => {
    //   location.forEach(e => {
    //     if(element.location === e){
    //       console.log('yess');
    //     }
    //   })
    // });
    location.forEach(element => {
      filter = jobs.filter(e => e.location === element);
    });
    setJobs(filter);
    console.log(filter);
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
        <form action={onSubmit}>
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
              <div><input id="cb" type="checkbox" name="cb" />
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
                <img src={iconFilter} alt='' />
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
  );
}