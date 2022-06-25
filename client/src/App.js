import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Link } from "react-router-dom";

// Import Images
import iconSun from "./assets/desktop/icon-sun.svg"
import iconMoon from "./assets/desktop/icon-moon.svg"

//import toggleswitch
import ToggleSwitch from "./ToggleSwitch";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import JobList from "./components/jobList";
import JobSearch from "./components/searchPage";
import Edit from "./components/edit";
import Create from "./components/create";
import NoResult from "./components/no-results";
// Import Custom CSS
import "./App.css";

import JobDetails from "../src/components/job-details.component";


const App = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <header className="App-header">
        <div className="navbar navbar-light navbar-expand nav">
          <div className="header-title container">
            <div>
              <Link to={"/add-jobs"}
                className="nav-link">
                <h2>devjobs</h2>
              </Link>
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <div>
            <Link to={"/job-list"}
            className="nav-link">
            <div>
              <img src={iconSun} alt=''/>
            </div>
          </Link>
            </div>
            <div>
            <React.Fragment>
						<ToggleSwitch label="m"/>
					</React.Fragment>
            </div>
            <div>
            <Link to={"/job-details"}
					className="nav-link">
						<div>
						<img src={iconMoon} alt=''/>
						</div>
				</Link>
            </div>
            </div>
         
          </div>
          <div>
          </div>
        </div>

      </header>


      <div>
        <Routes>
          <Route exact path="/" element={<JobList />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/search" element={<JobSearch />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/no-results" element={<NoResult />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
