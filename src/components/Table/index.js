import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useHistory } from "react-router-dom";
// core components
import styles from "./tableStyle.js";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(styles);
const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    background: "#0f1519",
    color: "#ddd",
    padding: 10,
    fontSize: 14,
  },
}))(Tooltip);

export default function CustomTable(props) {
  const classes = useStyles();
  const history = useHistory();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((cell) => (
            <>
              <TableRow
                className={classes.tableBodyRow}
                className="tableBodyRow2"
              >
                <div>
                  <TableCell className={classes.tableCellTime}>
                    <div class="EventTime">
                      <div class="time">
                        <span class="hour"> {("0" + cell[0]).slice(-2)}</span>
                        <span class="minute">00</span>
                        <span class="approx">APROX.</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className={classes.tableCellTeams}>
                    <div className="divMatch">
                      <div className="divTeam">
                        <h1 className="teamName">{cell[1][0].name}</h1>
                        <CustomTooltip
                          title={
                            <React.Fragment>
                              <p color="inherit">Ver Histórico</p>
                            </React.Fragment>
                          }
                        >
                          <img
                            onClick={() =>
                              history.push(`/history/${cell[1][0].name}`)
                            }
                            className="imgTeam"
                            src={cell[1][0].image}
                            alt=""
                          />
                        </CustomTooltip>
                      </div>
                      <h1 className="vs">vs</h1>
                      <div className="divTeam2">
                        <CustomTooltip
                          title={
                            <React.Fragment>
                              <p color="inherit">Ver Histórico</p>
                            </React.Fragment>
                          }
                        >
                          <img
                            onClick={() =>
                              history.push(`/history/${cell[1][1].name}`)
                            }
                            className="imgTeam"
                            src={cell[1][1].image}
                            alt=""
                          />
                        </CustomTooltip>

                        <h1 className="teamName">{cell[1][1].name}</h1>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className={classes.tableCellLeague}>
                    {cell[2].split(" ")[0]}
                  </TableCell>
                </div>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
