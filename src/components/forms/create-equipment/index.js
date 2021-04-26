import React, {useEffect, useState} from 'react';
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
import {Formik} from 'formik';

function EquipmentForm({onSubmit, departments}) {
  return (
    <Formik
      initialValues={{
        equipment_id: '',
        equipment_name: '',
        equipment_capacity: '',
        equipment_model: '',
        department: '',
        manufacturer: '',
      }}
      onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="equipment_id"
                name="equipment_id"
                className="form-field"
                label="Equipment ID"
                value={props.values.equipment_id}
                onChange={props.handleChange}
                error={
                  props.touched.equipment_id &&
                  Boolean(props.errors.equipment_id)
                }
                helperText={
                  props.touched.equipment_id && props.errors.equipment_id
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="equipment_name"
                name="equipment_name"
                className="form-field"
                label="Equipment Name"
                value={props.values.equipment_name}
                onChange={props.handleChange}
                error={
                  props.touched.equipment_name &&
                  Boolean(props.errors.equipment_name)
                }
                helperText={
                  props.touched.equipment_name && props.errors.equipment_name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="equipment_model"
                name="equipment_model"
                className="form-field"
                label="Equipment Model"
                value={props.values.equipment_model}
                onChange={props.handleChange}
                error={
                  props.touched.equipment_model &&
                  Boolean(props.errors.equipment_model)
                }
                helperText={
                  props.touched.equipment_model && props.errors.equipment_model
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="equipment_capacity"
                name="equipment_capacity"
                className="form-field"
                label="Equipment Capacity"
                type="number"
                value={props.values.equipment_capacity}
                onChange={props.handleChange}
                error={
                  props.touched.equipment_capacity &&
                  Boolean(props.errors.equipment_capacity)
                }
                helperText={
                  props.touched.equipment_capacity &&
                  props.errors.equipment_capacity
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="manufacturer"
                name="manufacturer"
                className="form-field"
                label="Manufacturer"
                value={props.values.manufacturer}
                onChange={props.handleChange}
                error={
                  props.touched.manufacturer &&
                  Boolean(props.errors.manufacturer)
                }
                helperText={
                  props.touched.manufacturer && props.errors.manufacturer
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className="form-field">
                <Select
                  id="department"
                  name="department"
                  value={props.values.department}
                  error={
                    props.touched.department && Boolean(props.errors.department)
                  }
                  helperText={
                    props.touched.department && props.errors.department
                  }
                  onChange={props.handleChange}>
                  {departments.map((department) => {
                    return (
                      <MenuItem value={department.id}>
                        {department.name}
                      </MenuItem>
                    );
                  })}
                </Select>
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

function EquipmentFormContainer() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/main/department')
      .then((resp) => {
        setDepartments(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching departments, ${err}`);
      });
  }, []);
  const onFormSubmit = (values) => {
    axios
      .post('http://127.0.0.1:8000/main/equipment', values)
      .then((resp) => {
        alert(`Created Successfully!, ${resp}`);
      })
      .catch((err) => {
        alert(`UnSuccessfull!, ${err}`);
      });
  };
  return (
    <Grid
      container
      style={{marginTop: '10%'}}
      justify="center"
      alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper style={{padding: '0 20%'}}>
          <EquipmentForm onSubmit={onFormSubmit} departments={departments} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EquipmentFormContainer;
