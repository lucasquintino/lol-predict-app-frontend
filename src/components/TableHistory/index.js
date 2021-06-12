import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useHistory} from 'react-router-dom'
// core components
import styles from "./tableStyle.js";
import { Month, Week } from "./utils";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const history = useHistory()
  const { tableHead, tableData, tableHeaderColor, team } = props;

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
                        <span style={{color: cell.result ? '#0b5c04' : 'rgb(216, 34, 52)'}}>{cell.result ? 'Win' : 'Loss'}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className={classes.tableCellTeams}>
                    <div className="divMatch">
                      <div className="divTeam">
                        <h1 className="teamName">{team?.teamId}</h1>
                        <img
                          className="imgTeam"
                          src={`https://oracleselixir-team-logos.s3-us-west-2.amazonaws.com/${team?.logo}`}
                          alt=""
                        />
                      </div>
                      <h1 className="vs">vs</h1>
                      <div className="divTeam2">
                        <img
                          className="imgTeam"
                          onClick={() => history.push(`/history/${cell.opponentTeamId}`)}
                          src={`https://oracleselixir-team-logos.s3-us-west-2.amazonaws.com/${cell.opponentLogo}`}
                          alt=""
                        />
                        <h1 className="teamName">{cell.opponentTeam}</h1>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.tableCellTime}>
                    <div class="EventTime">
                      <div class="time">
                        <span class="hour">
                          {" "}
                          {("0" + new Date(cell.gameCreation).getDate()).slice(
                            -2
                          )}
                        </span>
                        <span class="minute">
                          {Month[new Date(cell.gameCreation).getMonth()]}
                        </span>
                      </div>
                    </div>
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
