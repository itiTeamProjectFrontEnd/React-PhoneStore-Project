import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function ProductTable({ Products, deleteProduct }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="bg-info ">
            <TableCell className="fw-bold fs-4">ID</TableCell>
            <TableCell className="fw-bold fs-4">Phone Name</TableCell>
            <TableCell className="fw-bold fs-4"> Price</TableCell>
            <TableCell className="fw-bold fs-4">Discount</TableCell>
            <TableCell className="fw-bold fs-4">Stock</TableCell>
            <TableCell className="fw-bold fs-4">Brand</TableCell>
            <TableCell className="fw-bold fs-4">Image</TableCell>
            <TableCell className="fw-bold fs-4">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.discount}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.brand}</TableCell>
              <TableCell>
                <div>
                  <img width="100" src={p.thumbnail} alt={p.name} />
                </div>
              </TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-12 col-lg-5">
                    <Link to={`/edit/${p.id}`}>
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <div className="col-12 mt-1 mt-lg-0 col-lg-5">
                    <Button
                      onClick={() => deleteProduct(p.id)}
                      variant="contained"
                      p
                      color="warning"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
