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

import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from "./TransactionTable";

test('renders transaction table', () => {
  render(<TransactionTable />);
  const headers = ['Id','Betrag','Währung','Datum','Betreff','BIC','IBAN','Name','Transaction code','Posting text','Purpose code'];

  for(const header of headers) {
    const headerElement = screen.getByText(new RegExp(header));
    expect(headerElement).toBeInTheDocument();
  }
});
