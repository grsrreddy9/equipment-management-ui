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
  {id: 2, label: 'Equipment Used'},
  {id: 3, label: 'Product Name'},
  {id: 4, label: 'Batch No'},
  {id: 5, label: 'Start Date Time'},
  {id: 6, label: 'End Date Time'},
  {id: 7, label: 'Cleaning Type'},
  {id: 8, label: 'Equipment Cleaned By'},
  {id: 9, label: 'Equipment Cleaned On'},
  {id: 10, label: 'Room Cleaned By'},
  {id: 11, label: 'Room Cleaned On'},
  {id: 12, label: 'Cleaning Verified By'},
];

function LogBook({productDetails, users, cleanTypes}) {
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
              {productDetails.map((record) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Button>Approve</Button>
                    </TableCell>
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
                      <Select
                        id="cleanType"
                        name="cleanType"
                        value={''}
                        onChange={() => {}}>
                        {cleanTypes.map((cleanType) => {
                          return (
                            <MenuItem value={cleanType.id}>
                              {cleanType.clean_type}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        id="equipmentCleanedBy"
                        name="equipmentCleanedBy"
                        value={''}
                        onChange={() => {}}>
                        {users.map((user) => {
                          return (
                            <MenuItem value={user.id}>{user.email}</MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>{record.start_time}</TableCell>
                    <TableCell>
                      <Select
                        id="roomCleanedBy"
                        name="roomCleanedBy"
                        value={''}
                        onChange={() => {}}>
                        {users.map((user) => {
                          return (
                            <MenuItem value={user.id}>{user.email}</MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        id="cleaningVerifiedBy"
                        name="cleaningVerifiedBy"
                        value={''}
                        onChange={() => {}}>
                        {users.map((user) => {
                          return (
                            <MenuItem value={user.id}>{user.email}</MenuItem>
                          );
                        })}
                      </Select>
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
  const [cleanTypes, setCleanTypes] = useState([]);
  const [users, setUsers] = useState([]);

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
  }, []);

  return (
    <div>
      <LogBook
        users={users}
        productDetails={productDetails}
        cleanTypes={cleanTypes}
      />
    </div>
  );
}

export default LogBookContainer;
