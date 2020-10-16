import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import JobItem from "./JobItem";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getJobs } from "../../actions/job";

const Jobs = ({ job: { jobs, loading }, getJobs }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Job Board</h1>
      <p className='lead'>
        <i className='far fa-list-alt' /> Browse and see our list of
        opportunities
      </p>
      <Link
        className='btn btn-dark'
        to='/jobs/add-job'
        style={{ marginBottom: "20px" }}
      >
        Post New Listing
      </Link>
      {jobs.map((job) => (
        <JobItem key={job._id} job={job} />
      ))}
    </Fragment>
  );
};

Jobs.propTypes = {
  job: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
