import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Paper,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Formik} from 'formik';
import '../forms.css';

function CleaningForm({onSubmit, cleanTypes, users, productDetails}) {
  return (
    <Formik
      initialValues={{
        product_details: '',
        clean_type: '',
        equipment_cleaned_by: '',
        equipment_cleaned_on: '',
        room_cleaned_by: '',
        room_cleaned_on: '',
      }}
      onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="product-details-label">
                  Product details
                </InputLabel>
                <Select
                  id="product_details"
                  name="product_details"
                  value={props.values.product_details}
                  onChange={props.handleChange}>
                  {productDetails.map((product) => {
                    return (
                      <MenuItem value={product.id}>
                        {`${product.product.product_name} - ${product.batch_number}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="clean-type-label">Clean Type</InputLabel>
                <Select
                  id="clean_type"
                  name="clean_type"
                  value={props.values.clean_type}
                  onChange={props.handleChange}>
                  {cleanTypes.map((cleanType) => {
                    return (
                      <MenuItem value={cleanType.id}>
                        {cleanType.clean_type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="equipment-cleaned-by-label">
                  Equipment Cleaned By
                </InputLabel>
                <Select
                  id="equipment_cleaned_by"
                  name="equipment_cleaned_by"
                  value={props.values.equipment_cleaned_by}
                  onChange={props.handleChange}>
                  {users.map((user) => {
                    return (
                      <MenuItem
                        value={
                          user.id
                        }>{`${user.first_name} ${user.last_name}`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    id="equipment_cleaned_on"
                    name="equipment_cleaned_on"
                    value={props.values.equipment_cleaned_on}
                    onChange={(value) => {
                      const date = moment(Date(value)).toISOString();
                      props.setFieldValue('equipment_cleaned_on', date);
                      props.setTouched({equipment_cleaned_on: true});
                    }}
                    error={
                      props.touched.equipment_cleaned_on &&
                      Boolean(props.errors.equipment_cleaned_on)
                    }
                    helperText={
                      props.touched.equipment_cleaned_on &&
                      props.errors.equipment_cleaned_on
                    }
                    ampm={false}
                    label="Equipment Cleaned On"
                    onError={console.log}
                    minDate={new Date()}
                    format="yyyy-mm-dd hh:mm"
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="room-cleaned-by-label">
                  Room Cleaned By
                </InputLabel>
                <Select
                  id="room_cleaned_by"
                  name="room_cleaned_by"
                  value={props.values.room_cleaned_by}
                  onChange={props.handleChange}>
                  {users.map((user) => {
                    return (
                      <MenuItem
                        value={
                          user.id
                        }>{`${user.first_name} ${user.last_name}`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    id="room_cleaned_on"
                    name="room_cleaned_on"
                    value={props.values.room_cleaned_on}
                    onChange={(value) => {
                      const date = moment(Date(value)).toISOString();
                      props.setFieldValue('room_cleaned_on', date);
                      props.setTouched({room_cleaned_on: true});
                    }}
                    error={
                      props.touched.room_cleaned_on &&
                      Boolean(props.errors.room_cleaned_on)
                    }
                    helperText={
                      props.touched.room_cleaned_on &&
                      props.errors.room_cleaned_on
                    }
                    ampm={false}
                    label="Room Cleaned On"
                    onError={console.log}
                    minDate={new Date()}
                    format="yyyy-mm-dd hh:mm"
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
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

function CleaningFormContainer() {
  const [cleanTypes, setCleanTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const onFormSubmit = (values) => {
    axios
      .post('http://127.0.0.1:8000/logbook/cleaning', values)
      .then((resp) => {
        alert(`Created Successfully!, ${resp}`);
      })
      .catch((err) => {
        alert(`UnSuccessful!, ${err}`);
      });
  };
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/main/users')
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching users, ${err}`);
      });
    axios
      .get('http://127.0.0.1:8000/logbook/clean-types')
      .then((resp) => {
        setCleanTypes(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching clean types, ${err}`);
      });
    axios
      .get('http://127.0.0.1:8000/main/product-details')
      .then((resp) => {
        setProductDetails(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching product details, ${err}`);
      });
  }, []);
  return (
    <Grid
      container
      style={{marginTop: '10%'}}
      justify="center"
      alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper style={{padding: '0 10%'}}>
          <Typography variant="h5" component="h4">
            Cleaning Form
          </Typography>
          <CleaningForm
            cleanTypes={cleanTypes}
            users={users}
            productDetails={productDetails}
            onSubmit={onFormSubmit}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CleaningFormContainer;
