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
import {Box, Button, TextField} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";

export interface Member {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  streetNumber: any;
  zip: string;
  city: string;
}

function MemberForm() {
  const navigate = useNavigate();
  let {id} = useParams();

  const [data, setData] = useState<Member>({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
    }
  });

  useEffect(() => {
    async function load() {
      if(id) {
        const response = await fetch(`/api/members/${id}`);
        const data = await response.json() as Member;
        setData(data);
      }
    }

    load();
  },[id]);

  async function submit() {
    if(id) {
      await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } else {
      await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }

    navigate('/members');
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField required id="firstName" label="Vorname" variant="standard"
          value={data.firstName}
          onChange={(e) => setData({...data, firstName: e.target.value})}
        />
        <TextField required id="lastName" label="Nachname" variant="standard"
          value={data.lastName}
          onChange={(e) => setData({...data, lastName: e.target.value})}
        />
        <TextField required id="email" label="Email" variant="standard"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
        />
      </div>
      <div>
        <TextField required id="street" label="Straße" variant="standard"
          value={data.address.street}
          onChange={(e) => setData({...data, address: {...data.address, street: e.target.value}})}
        />
        <TextField required id="streetNumber" label="Hausnummer" variant="standard"
          value={data.address.streetNumber}
          onChange={(e) => setData({...data, address: {...data.address, streetNumber: e.target.value}})}
        />
        <TextField required id="zip" label="Postleitzahl" variant="standard"
          value={data.address.zip}
          onChange={(e) => setData({...data, address: {...data.address, zip: e.target.value}})}
        />
        <TextField required id="city" label="Stadt" variant="standard"
          value={data.address.city}
          onChange={(e) => setData({...data, address: {...data.address, city: e.target.value}})}
        />
      </div>
      <Button variant="contained" onClick={submit}>{id ? 'Speichern' : 'Anlegen'}</Button>
    </Box>
  );
}

export default MemberForm;
