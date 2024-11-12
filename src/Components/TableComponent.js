import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import "./TableComponent.css";

function TableComponent({ columns, data, marginBottom="auto" }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        marginLeft: '20px',
        marginRight: 2,
        width: "128%",
        maxHeight: 440,
        overflow: 'auto',
        marginBottom: {marginBottom}
      }}
    >
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} className="stickyHeader">{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={`${column.id}-${row.id}`}>
                  {column.id === 'action' ? row.actions : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
