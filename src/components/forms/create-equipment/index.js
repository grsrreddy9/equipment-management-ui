import React, {useState} from 'react';
import {Formik, Field, Form, useFormik} from 'formik';
import {
  Paper,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import './create-equipment-form.css';

function EquipmentForm({onSubmit}) {
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      model: '',
      capacity: '',
      department: '',
      manufacturer: '',
    },
    validationSchema: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="id"
            name="id"
            className="form-field"
            label="Equipment ID"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            className="form-field"
            label="Equipment Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="model"
            name="model"
            className="form-field"
            label="Equipment Model"
            value={formik.values.model}
            onChange={formik.handleChange}
            error={formik.touched.model && Boolean(formik.errors.model)}
            helperText={formik.touched.model && formik.errors.model}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="capacity"
            name="capacity"
            className="form-field"
            label="Equipment Capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
            helperText={formik.touched.capacity && formik.errors.capacity}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="manufacturer"
            name="manufacturer"
            className="form-field"
            label="Manufacturer"
            value={formik.values.manufacturer}
            onChange={formik.handleChange}
            error={
              formik.touched.manufacturer && Boolean(formik.errors.manufacturer)
            }
            helperText={
              formik.touched.manufacturer && formik.errors.manufacturer
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className="form-field">
            <Select
              id="department"
              name="department"
              value={formik.values.department}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              helperText={formik.touched.department && formik.errors.department}
              onChange={formik.handleChange}>
              <MenuItem value={10}>Department 1</MenuItem>
              <MenuItem value={20}>Department 2</MenuItem>
              <MenuItem value={30}>Department 3</MenuItem>
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
  );
}

//  <Formik
//    initialValues={{
//      id: '',
//      name: '',
//      model: '',
//      capacity: '',
//      manufacturer: '',
//      department: '',
//    }}
//    onSubmit={async (values) => {
//      await new Promise((r) => setTimeout(r, 500));
//      alert(JSON.stringify(values, null, 2));
//    }}>
//    <Form>
//      <Grid container spacing={3}>
//        <Grid item xs={12}>
//          <Field
//            id="id"
//            name="id"
//            placeholder="Equipment ID"
//            component={TextField}
//          />
//        </Grid>
//        <Grid item xs={12}>
//          <Field
//            id="name"
//            name="name"
//            placeholder="Equipment Name"
//            component={TextField}
//          />
//        </Grid>
//        <Grid item xs={12}>
//          <Field
//            id="model"
//            name="model"
//            placeholder="Equipment Model"
//            component={TextField}
//          />
//        </Grid>
//        <Grid item xs={12}>
//          <Field
//            id="capacity"
//            name="capacity"
//            placeholder="Capacity"
//            component={TextField}
//          />
//        </Grid>
//        <Grid item xs={12}>
//          <Field
//            id="manufacturer"
//            name="manufacturer"
//            placeholder="Manufacturer"
//            component={TextField}
//          />
//        </Grid>
//        <Grid item xs={12}>
//          <Select
//            id="department"
//            name="department"
//            value={formik.values.department}
//            error={
//              formik.touched.department && Boolean(formik.errors.department)
//            }
//            helperText={formik.touched.department && formik.errors.department}
//            onChange={formik.handleChange}>
//            <MenuItem value={10}>Department 1</MenuItem>
//            <MenuItem value={20}>Department 2</MenuItem>
//            <MenuItem value={30}>Department 3</MenuItem>
//          </Select>
//        </Grid>
//      </Grid>
//    </Form>
//  </Formik>;

function EquipmentFormContainer() {
  const [formValues, setFormValues] = useState({equipmentName: ''});
  const onFormSubmit = (values) => {
    setFormValues(values);
  };
  return (
    <Grid
      container
      style={{marginTop: '10%'}}
      justify="center"
      alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper style={{padding: '0 20%'}}>
          <EquipmentForm />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EquipmentFormContainer;
