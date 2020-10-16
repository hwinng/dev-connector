import React from "react";
import PropTypes from "prop-types";

// @Todo: UI
const JobItem = ({
  job: {
    user,
    name,
    avatar,
    seniority,
    term,
    position,
    skills,
    description,
    location,
    salary,
    benefits,
    companyName,
    contactName,
    contactInfo,
    availability,
  },
}) => {
  return (
    <div className='jobs bg-white p-1 my-1'>
      <div>
        <h2>{position}</h2>
        <p>
          <strong>{companyName}</strong> - {location}
        </p>
        <p>Still available? {availability ? "Yes" : "No"}</p>
        <p>Seniority Level: {seniority}</p>
        <p>Term: {term}</p>
        {salary && <p>Compensation: {salary}</p>}
        {benefits && <p>Benefits Offered: {benefits}</p>}
        <p>Skills required: {skills}</p>
        <p>Posted by {name.split(" ")[0]}</p>
        <p>Contact: {contactName}</p>
        <p>Contact Information: {contactInfo}</p>
      </div>
      <p>{description}</p>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItem;
