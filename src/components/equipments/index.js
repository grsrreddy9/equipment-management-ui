import React, {useState} from 'react';
import {Formik, Field, Form, useFormik} from 'formik';
import {
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="id"
          name="id"
          label="Equipment ID"
          value={formik.values.id}
          onChange={formik.handleChange}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
        />
        <TextField
          id="name"
          name="name"
          label="Equipment Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="model"
          name="model"
          label="Equipment Model"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />
        <TextField
          id="capacity"
          name="capacity"
          label="Equipment Capacity"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          error={formik.touched.capacity && Boolean(formik.errors.capacity)}
          helperText={formik.touched.capacity && formik.errors.capacity}
        />
        <TextField
          id="manufacturer"
          name="manufacturer"
          label="Manufacturer"
          value={formik.values.manufacturer}
          onChange={formik.handleChange}
          error={
            formik.touched.manufacturer && Boolean(formik.errors.manufacturer)
          }
          helperText={formik.touched.manufacturer && formik.errors.manufacturer}
        />
        <FormControl className="">
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
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

        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

function EquipmentFormContainer() {
  const [formValues, setFormValues] = useState({equipmentName: ''});
  const onFormSubmit = (values) => {
    setFormValues(values);
  };
  return <EquipmentForm onSubmit={onFormSubmit} />;
}

export default EquipmentFormContainer;
