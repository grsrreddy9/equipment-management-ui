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

function ProductForm({onSubmit}) {
  return (
    <Formik initialValues={{product_name: '', product_code: '', product_strength: ''}} onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="product_name"
                name="product_name"
                className="form-field"
                label="Product Name"
                value={props.values.product_name}
                onChange={props.handleChange}
                error={props.touched.product_name && Boolean(props.errors.product_name)}
                helperText={props.touched.product_name && props.errors.product_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="product_code"
                name="product_code"
                className="form-field"
                label="Product Code"
                value={props.values.product_code}
                onChange={props.handleChange}
                error={props.touched.product_code && Boolean(props.errors.product_code)}
                helperText={props.touched.product_code && props.errors.product_code}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="product_strength"
                name="product_strength"
                className="form-field"
                label="Product Strength"
                value={props.values.product_strength}
                onChange={props.handleChange}
                error={props.touched.product_strength && Boolean(props.errors.product_strength)}
                helperText={props.touched.product_strength && props.errors.product_strength}
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

function ProductFormContainer() {
  const onFormSubmit = (values) => {
    axios
      .post('http://127.0.0.1:8000/main/product',values)
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
          <ProductForm onSubmit={onFormSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductFormContainer;