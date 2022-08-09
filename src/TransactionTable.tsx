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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  date: string;
  purpose: string;
  additionalPurpose?: string;
  applicantBin: string;
  applicantIban: string;
  applicantName: string;
  transactionCode: string;
  postingText: string;
  purposeCode: string;
  hash: string;
}

function MemberTable() {
  const [data, setData] = useState<Transaction[]>([]);

  async function update() {
    const response = await fetch('/api/transactions');
    const data = await response.json() as Transaction[];
    setData(data);
  }

  useEffect(() => {
    update();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Betrag</TableCell>
            <TableCell>Währung</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Betreff</TableCell>
            <TableCell>BIC</TableCell>
            <TableCell>IBAN</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Transaction code</TableCell>
            <TableCell>Posting text</TableCell>
            <TableCell>Purpose code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.currency}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.purpose}</TableCell>
              <TableCell>{row.applicantBin}</TableCell>
              <TableCell>{row.applicantIban}</TableCell>
              <TableCell>{row.applicantName}</TableCell>
              <TableCell>{row.transactionCode}</TableCell>
              <TableCell>{row.postingText}</TableCell>
              <TableCell>{row.purposeCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MemberTable;
