import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/job";

const AddJob = ({ auth, addJob, history }) => {
  const [formData, setFormData] = useState({
    seniority: "",
    term: "",
    position: "",
    skills: "",
    description: "",
    location: "",
    salary: "",
    benefits: "",
    companyName: "",
    contactName: "",
    contactInfo: "",
    availability: true,
  });

  const {
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
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData["role"] = auth.user.role;
    if (auth.user.role === "recruiter") {
      addJob(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add A New Job Posting</h1>
      <p className='lead'>
        <i className='far fa-list-alt' /> Share interesting opportunities with
        our community of developers!
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='position'
            value={position}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='companyName'
            value={companyName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Seniority Level'
            name='seniority'
            value={seniority}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Term'
            name='term'
            value={term}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Salary'
            name='salary'
            value={salary}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Benefits'
            name='benefits'
            value={benefits}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Contact Name'
            name='contactName'
            value={contactName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Contact Information'
            name='contactInfo'
            value={contactInfo}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='* Job Description'
            value={description}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/jobs'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addJob })(withRouter(AddJob));
