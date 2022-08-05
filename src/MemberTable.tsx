/**
 *     Autokrat frontend
 *     Copyright (C) 2022  mudbyte e.V.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
}

export interface Address {
    street: string;
    streetNumber?: any;
    zip: string;
    city: string;
}

function MemberTable() {
  const [data, setData] = useState<Member[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);

  async function update() {
    const response = await fetch('/api/members');
    const data = await response.json() as Member[];
    setData(data);
  }

  async function remove(id: number) {
    await fetch(`/api/members/${id}`, {
      method: 'DELETE'
    });

    await update();
  }

  useEffect(() => {
    update();
  }, []);

  const handleClickOpen = (member: Member) => {
    setSelected(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if(selected) {
      remove(selected.id);
    }

    handleClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Vorname</TableCell>
            <TableCell>Nachname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Straße</TableCell>
            <TableCell>Hausnummer</TableCell>
            <TableCell>Postleitzahl</TableCell>
            <TableCell>Stadt</TableCell>
            <TableCell>Aktionen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.address.street}</TableCell>
              <TableCell>{row.address.streetNumber}</TableCell>
              <TableCell>{row.address.zip}</TableCell>
              <TableCell>{row.address.city}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" component={Link} to={`/members/edit/${row.id}`}>
                  <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleClickOpen(row)}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Sind sie sicher, dass sie "${selected?.firstName} ${selected?.lastName}" löschen wollen?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Nein</Button>
          <Button onClick={handleConfirm} autoFocus>Ja</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default MemberTable;
