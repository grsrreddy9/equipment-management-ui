import React, {useState, useEffect} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';

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

const mergeProductAndCleaningDetails = (productDetails, cleaningDetails) => {
  const cleaningMap = {};
  const records = [];
  if (productDetails.length && cleaningDetails.length) {
    cleaningDetails.forEach((cleaningDetail) => {
      if (!cleaningMap[cleaningDetail.product_details]) {
        cleaningMap[cleaningDetail.product_details] = cleaningDetail;
      }
    });
    productDetails.forEach((product) => {
      records.push({
        ...product,
        cleaning: cleaningMap[product.id],
      });
    });
  }
  return records;
};

function LogBook({logbookRecords}) {
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
                    <TableCell>{record.end_time}</TableCell>
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
