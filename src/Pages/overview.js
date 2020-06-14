import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Sevice from "../services/api";
import Grid from "@material-ui/core/Grid";
import Code from "../utilities/countryCode.json";
import LegendMaps from "./worldMap/index";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import ViewHeadlineOutlinedIcon from "@material-ui/icons/ViewHeadlineOutlined";
import CardGroup from "./card";
console.log(Code);
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "flag",
  },
  {
    id: "country",
    numeric: false,
    disablePadding: true,
    label: "Country",
  },
  { id: "totalCases", label: "Total", numeric: true, disablePadding: false },
  { id: "activeCases", label: "Active", numeric: true, disablePadding: false },
  {
    id: "totalRecovered",
    label: "Recoverd",
    numeric: true,
    disablePadding: false,
  },
  { id: "totalDeaths", label: "Death", numeric: true, disablePadding: false },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("country");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [worldTable, setWorldTable] = useState([]);
  const [flag, setFlag] = useState([]);
  const [table, setTable] = useState(true);
  const [worldStatus, setWorldStatus] = useState({});

  useEffect(() => {
    world();
    // abb();
  }, []);

  const world = () => {
    Sevice.worldometer()
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        if (body.status === "error" || body.status === "failed") {
        } else {
          for (var i = 0; i < body.regionData.length; i++) {
            if (body.regionData[i].country === "World") {
              setWorldStatus(body.regionData[i]);
            }
          }

          console.log(body.regionData);
          setWorldTable(body.regionData);
        }
      });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, worldTable.length - page * rowsPerPage);

  console.log(worldStatus, "worldStatus");
  return (
    <div className={classes.root} style={{ padding: "25px 0" }}>
      <CardGroup {...props} setParams={{ worldStatus }} />

      <div style={{ padding: "15px 0" }}>
        <span>Map</span>
        <IconButton aria-label="Glob" onClick={() => setTable(false)}>
          <PublicOutlinedIcon />
        </IconButton>
        <IconButton aria-label="Table" onClick={() => setTable(true)}>
          <AppsOutlinedIcon />
        </IconButton>
        <span>Table</span>
      </div>

      {table === true ? (
        <Grid container justify="center" alignItems="center">
          <Grid item lg={8} md={10} sm={12} xs={12}>
            <Paper style={{ paddingTop: "10px" }}>
              <TableContainer>
                <Table
                  size="small"
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={worldTable.length}
                    //   rowHead={worldTable}
                  />
                  <TableBody>
                    {stableSort(worldTable, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        var assignflag;
                        if (
                          row.country !== "World" &&
                          row.country !== "Total:" &&
                          row.country !== "" &&
                          row.country !== "Europe" &&
                          row.country !== "Asia" &&
                          row.country !== "Africa" &&
                          row.country !== "North America" &&
                          row.country !== "South America"
                        ) {
                          for (var i = 0; i < worldTable.length; i++) {
                            if (Code[i].country === row.country) {
                              assignflag = Code[i].abbreviation;
                              console.log(assignflag, Code[i].abbreviation);

                              return (
                                <TableRow hover tabIndex={-1} key={row.country}>
                                  <TableCell style={{ maxWidth: "5px" }}>
                                    <img
                                      src={
                                        "https://www.countryflags.io/" +
                                        assignflag +
                                        "/shiny/32.png"
                                      }
                                      alt={"Flag"}
                                    />
                                  </TableCell>
                                  <TableCell>{row.country}</TableCell>
                                  <TableCell align="center">
                                    {row.totalCases}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.activeCases}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.totalRecovered}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.totalDeaths}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          }
                        }
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={worldTable.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center">
          <Grid item lg={8} md={10} sm={12} xs={12}>
            <LegendMaps />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
