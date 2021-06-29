import React, {useState, useEffect} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  Button,
  FormControl,
} from '@material-ui/core';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

const headCells = [
  {id: 1, label: 'Approval by QA'},
  {id: 2, label: 'Room Number'},
  {id: 3, label: 'Equipment Used'},
  {id: 4, label: 'Product Name'},
  {id: 5, label: 'Batch No'},
  {id: 6, label: 'Start Date Time'},
  {id: 7, label: 'End Date Time'},
  {id: 8, label: 'Cleaning Type'},
  {id: 9, label: 'Equipment Cleaned By'},
  {id: 10, label: 'Equipment Cleaned On'},
  {id: 11, label: 'Room Cleaned By'},
  {id: 12, label: 'Room Cleaned On'},
  {id: 13, label: 'Cleaning Verified By'},
];

const DATE_FORMAT = 'yyyy-mm-dd hh:mm';

const mergeProductAndCleaningDetails = (productDetails, cleaningDetails) => {
  const cleaningMap = {};
  const records = [];
  if (cleaningDetails.length) {
    cleaningDetails.forEach((cleaningDetail) => {
      if (!cleaningMap[cleaningDetail.product_details]) {
        cleaningMap[cleaningDetail.product_details] = cleaningDetail;
      }
    });
  }
  if (productDetails.length) {
    productDetails.forEach((product) => {
      const productDetail = {...product};
      if (cleaningMap[product.id]) {
        productDetail['cleaning'] = cleaningMap[product.id];
      }
      records.push(productDetail);
    });
  }
  return records;
};

function LogBook({logbookRecords}) {
  const [v, updateV] = useState('');
  const updateDateTime = (data) => {
    axios
      .post('http://127.0.0.1:8000/main/end-batch', data)
      .then((resp) => {
        logbookRecords.forEach((record) => {
          if (record.id === data.id) {
            record.end_time = data.end_time;
          }
        });
        updateV('v');
        alert('End time updated successfully!');
        console.log(logbookRecords);
      })
      .catch((err) => {
        alert(`Error updating end date time, ${err}`);
      });
  };

  return (
    <div className="logbook-form-container">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {logbookRecords.map((record) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Button>Approve</Button>
                    </TableCell>
                    <TableCell>{record.room.number}</TableCell>
                    <TableCell>
                      {record.equipment && record.equipment.length
                        ? record.equipment
                            .map((equipment) => equipment.equipment_id)
                            .join(',')
                        : ''}
                    </TableCell>
                    <TableCell>{record.product.product_name}</TableCell>
                    <TableCell>{record.batch_number}</TableCell>
                    <TableCell>{record.start_time}</TableCell>
                    <TableCell>
                      {record.end_time ? (
                        record.end_time
                      ) : (
                        <FormControl style={{width: '90%'}}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              id="end_time"
                              name="end_time"
                              // disabled={endDateTime ? true : false}
                              value={record.end_time}
                              onChange={(value) => {
                                const date = moment(Date(value)).toISOString();
                                updateDateTime({
                                  id: record.id,
                                  end_time: date,
                                });
                              }}
                              error={false}
                              helperText=""
                              ampm={false}
                              label="End time"
                              onError={console.log('Error')}
                              minDate={new Date()}
                              format={DATE_FORMAT}
                            />
                          </MuiPickersUtilsProvider>
                        </FormControl>
                        // <Button>Complete</Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.cleaning && record.cleaning.clean_type.clean_type}
                    </TableCell>
                    <TableCell>
                      {record.cleaning &&
                        `${record.cleaning.equipment_cleaned_by.first_name} ${record.cleaning.equipment_cleaned_by.last_name}`}
                    </TableCell>
                    <TableCell>
                      {record.cleaning && record.cleaning.equipment_cleaned_on}
                    </TableCell>
                    <TableCell>
                      {record.cleaning &&
                        `${record.cleaning.room_cleaned_by.first_name} ${record.cleaning.room_cleaned_by.last_name}`}
                    </TableCell>
                    <TableCell>
                      {record.cleaning && record.cleaning.room_cleaned_on}
                    </TableCell>
                    <TableCell>
                      <Button>Approve</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

function LogBookContainer() {
  const [productDetails, setProductDetails] = useState([]);
  const [cleaningDetails, setCleaningDetails] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/main/product-details')
      .then((resp) => {
        setProductDetails(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching product details, ${err}`);
      });
    axios
      .get('http://127.0.0.1:8000/logbook/cleaning')
      .then((resp) => {
        setCleaningDetails(resp.data);
      })
      .catch((err) => {
        alert(`Error fetching cleaning detail, ${err}`);
      });
  }, []);
  const logbookRecords = mergeProductAndCleaningDetails(
    productDetails,
    cleaningDetails,
  );

  return (
    <div>
      <LogBook logbookRecords={logbookRecords} />
    </div>
  );
}

export default LogBookContainer;
