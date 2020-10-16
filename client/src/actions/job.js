import axios from "axios";
import { GET_JOBS, JOB_ERROR, ADD_JOB } from "./constant";
import { setAlert } from "./alert";

export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/jobs");

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addJob = (formData, history) => async (dispatch) => {
  try {
    // Sending data. Need to set headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/jobs", formData, config);

    dispatch({
      type: ADD_JOB,
      payload: res.data,
    });

    history.push("/jobs");

    dispatch(setAlert("Job Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
