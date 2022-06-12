import React from "react";
import {  Col  } from "react-bootstrap";
import {
	Card, CardImg,  CardBody,
	CardTitle, CardSubtitle,
  } from 'reactstrap';
import { Link } from "react-router-dom";

const JobCard = (props) => {
const { _id, company, logo, logoBackground,position,postedAt,contract,location,website,apply,description,requirements,role } = props.obj;
const details = {logo,postedAt,position,contract,company,location,logoBackground,website,apply,description,requirements,role};


function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}
const stringLogo = logo.split("/");
const stringLogoLength = stringLogo.length;
const logoName = stringLogo[stringLogoLength-1];
const images = importAll(require.context('../assets/logos', false, /\.svg/));
const link = '/job-details/' + _id;
return (
	<Link to={link} state={{details:details}} className="link-style">
		<Col>
	<Card>
		<Card className="logoCard" style={{backgroundColor:logoBackground}}>
		<CardImg top width="10%" src={images[logoName]} alt="Company logo"/>
		</Card>
		<CardBody>
			<CardSubtitle tag="h6" className="mb-2 text-muted timeElapsed">{postedAt} <span className="dot">.</span> </CardSubtitle>
			<CardSubtitle tag="h6" className="mb-2 text-muted"> {contract}</CardSubtitle>
			<CardTitle tag="h5" className="title">{position}</CardTitle>
			<CardSubtitle tag="h6" className="mb-2 text-muted">{company}</CardSubtitle>
		  	<CardSubtitle tag="h6" className="mb-2 text-muted country-label country-margin">{location}</CardSubtitle>
		</CardBody>
	</Card>
	</Col></Link>

);
};

export default JobCard;