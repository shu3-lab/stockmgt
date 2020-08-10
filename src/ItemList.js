import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import { listItems } from './graphql/queries'

const useStyles = makeStyles({
    root: {
      width: '100%',
      marginLeft: '49px'
    },
  });

const columns = [
    { id: 'number', label: '#', minWidth: 80 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'threshold', label: 'Threshold', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 150 },
  ];
  

function createData(number, name, threshold, description) {
  return { number, name, threshold, description};
}

const rows = createRows(getItemList);

function createRows(items) {
    let num = 1;
    let rows = [];
    if(items) {
        items.forEach(item => {
            rows.push(createData(num, item.name, item.threshold, item.description));
            num ++;
        });
    }else {
        rows.push(createData('','','',''));
    }
    return rows;
}; 

var getItemList = async () => {
    try {
      let allItemData = await API.graphql(graphqlOperation(listItems));
      console.log('items: ', item);
      return allItemData.data.listItems.items;
    } catch (e) {
      console.log(e);
    }
};

export default function ItemList() {
  const classes = useStyles();

  return (
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="items list">
        <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.number}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  );
}