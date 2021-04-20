import React, {useState} from 'react';
import axios from 'axios';
import {
  Paper,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import {Formik, Field, Form, useFormik} from 'formik';

function DepartmentForm({onSubmit}) {
  return (
    <Formik initialValues={{name: ''}} onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                className="form-field"
                label="Department Name"
                value={props.values.name}
                onChange={props.handleChange}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

function DepartmentFormContainer() {
  const onFormSubmit = (values) => {
    axios
      .post('http://127.0.0.1:8000/main/department',values)
      .then((resp) => {alert( ` Created Successfully!, ${resp}`)})
      .catch((err) => {alert( `  UnSuccessfull!, ${err}`)});
  };
  return (
    <Grid
      container
      style={{marginTop: '10%'}}
      justify="center"
      alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper style={{padding: '0 20%'}}>
          <DepartmentForm onSubmit={onFormSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DepartmentFormContainer;
