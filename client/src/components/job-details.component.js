import React from "react";
import { Nav, Navbar, Container, Row, Col, Button }
    from "react-bootstrap";
import iconLocation from "../assets/desktop/icon-location.svg"
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';


const JobDetails = () => {
    const location = useLocation();
    const { details } = location.state;
    // console.log(details);
    function importAll(r) {
        let images = {};
        r.keys().map(item => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const logo = details.logo;
    // console.log(logo);
    const stringLogo = logo.split("/");
    const stringLogoLength = stringLogo.length;
    const logoName = stringLogo[stringLogoLength - 1];
    const images = importAll(require.context('../assets/logos', false, /\.svg/));
    const requirements_items = details.requirements.items;
    const role_items = details.role.items;
    console.log(requirements_items);
    const ItemList = () => {
    
        return (
            <div className="apply container">
                <ul>{requirements_items.map(name => <li key={name}>{name}</li>)}</ul>
            </div>
        )

    }
    const RoleItems = () => {
        return (
            <div className="apply container">
                <ol>{role_items.map(name => <li key={name}>{name}</li>)}</ol>
            </div>
        )
    }
    return (
        <div className="col">
            <div className="company-info contain container" >
                <div className="company-info-item" style={{ backgroundColor: details.logoBackground }}>
                    <img src={images[logoName].default} alt="logo"/>
                </div>
                <div className="company-info-item">
                    <div className="logo-site">
                        <h2>{details.company}</h2>
                        <h6 className="text-muted lowercase">{details.company}.com</h6>
                    </div>
                    <div className="logo-site">
                        <button className="site-button" href={details.website}>Company Site</button>
                    </div>
                </div>
            </div>
            <div className="job-info container">
                <div className="application-details">
                    <div className="apply">
                        <h5 className="details-body-text">{details.postedAt} . {details.contract}</h5>
                        <h2>{details.position}</h2>
                        <h5 className="country-label">{details.location}</h5>
                    </div>
                    <div className="apply">
                        <button href={details.apply}>Apply Now</button>
                    </div>
                </div>
                <h5 className='details-body-text apply details-body-text-margin' >{details.description}</h5>
                <h4 className="apply">Requirements</h4>
                <h5 className='details-body-text apply'>{details.requirements.content}</h5>
                <ItemList/>
                <h4 className="apply">What You will Do</h4>
                <h5 className='details-body-text apply'>{details.role.content}</h5>
                <RoleItems />
            </div>
            <footer>
                <div className='footer container'>
                    <div className="apply footer-apply">
                        <h2>{details.position}</h2>
                        <h2 className="text-muted">So Digital Inc.</h2>
                    </div>
                    <div className="apply apply-now">
                        <button href={details.apply}>Apply Now</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default JobDetails; 