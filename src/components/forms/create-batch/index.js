import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Paper,
  Grid,
  FormControl,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Formik} from 'formik';
import '../forms.css';

const DATE_FORMAT = 'yyyy-mm-dd hh:mm';

function BatchForm({onSubmit, rooms, equipments, products}) {
  return (
    <Formik
      initialValues={{
        room: '',
        equipment: [],
        product: '',
        batch_number: '',
        start_time: '',
        isNewBatch: false,
      }}
      onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="room-label">Room</InputLabel>
                <Select
                  id="room"
                  name="room"
                  value={props.values.room}
                  error={props.touched.room && Boolean(props.errors.room)}
                  helperText={props.touched.room && props.errors.room}
                  onChange={props.handleChange}>
                  {rooms.map((roomObj) => {
                    return (
                      <MenuItem value={roomObj.id}>{roomObj.number}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="equipment-label">Equipment</InputLabel>
                <Select
                  id="equipment"
                  name="equipment"
                  multiple
                  value={props.values.equipment}
                  error={
                    props.touched.equipment && Boolean(props.errors.equipment)
                  }
                  helperText={props.touched.equipment && props.errors.equipment}
                  onChange={props.handleChange}>
                  {equipments.map((equipmentObj) => {
                    return (
                      <MenuItem value={equipmentObj.id}>
                        {equipmentObj.equipment_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  id="product"
                  name="product"
                  value={props.values.product}
                  error={props.touched.product && Boolean(props.errors.product)}
                  helperText={props.touched.product && props.errors.product}
                  onChange={props.handleChange}>
                  {products.map((productObj) => {
                    return (
                      <MenuItem value={productObj.id}>
                        {productObj.product_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="batch_number"
                name="batch_number"
                className="form-field"
                label="Batch Number"
                value={props.values.batch_number}
                onChange={props.handleChange}
                error={
                  props.touched.batch_number &&
                  Boolean(props.errors.batch_number)
                }
                helperText={
                  props.touched.batch_number && props.errors.batch_number
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    id="start_time"
                    name="start_time"
                    value={props.values.start_time}
                    onChange={(value) => {
                      const date = moment(Date(value)).toISOString();
                      props.setFieldValue('start_time', date);
                      props.setTouched({start_time: true});
                    }}
                    error={
                      props.touched.start_time &&
                      Boolean(props.errors.start_time)
                    }
                    helperText={
                      props.touched.start_time && props.errors.start_time
                    }
                    ampm={false}
                    label="Start time"
                    onError={console.log}
                    minDate={new Date()}
                    format={DATE_FORMAT}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.values.isNewBatch}
                      id="isNewBatch"
                      name="isNewBatch"
                      color="primary"
                      onChange={props.handleChange}
                      error={
                        props.touched.isNewBatch &&
                        Boolean(props.errors.isNewBatch)
                      }
                      helperText={
                        props.touched.isNewBatch && props.errors.isNewBatch
                      }
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
                  }
                  labelPlacement="start"
                  label="Is new batch?"
                />
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

function BatchFormContainer() {
  const [rooms, setRooms] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [products, setProducts] = useState([]);
  const onFormSubmit = (values) => {
    axios
      .post('http://127.0.0.1:8000/main/product-details', values)
      .then((resp) => {
        alert(`Created Successfully!, ${resp}`);
      })
      .catch((err) => {
        alert(`UnSuccessfull!, ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/main/products')
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => {
        alert('Error fetching products');
      });

    axios
      .get('http://127.0.0.1:8000/main/equipments')
      .then((resp) => {
        setEquipments(resp.data);
      })
      .catch((err) => {
        alert('Error fetching equipments');
      });

    axios
      .get('http://127.0.0.1:8000/main/rooms')
      .then((resp) => {
        setRooms(resp.data);
      })
      .catch((err) => {
        alert('Error fetching rooms');
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
            Create a batch
          </Typography>
          <BatchForm
            onSubmit={onFormSubmit}
            rooms={rooms}
            equipments={equipments}
            products={products}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default BatchFormContainer;
