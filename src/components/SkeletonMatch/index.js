import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import styles from "../TableLive/tableStyle";

const useStyles = makeStyles(styles);

export default function SkeletonMatch() {
  const classes = useStyles();
  return (
    <div>
      <TableCell className={classes.tableCellTime}>
        <div class="EventTime">
          <div class="time">
            <span class="hour">
              <Skeleton
                animation="wave"
                variant="text"
                width={80}
                height={40}
              />
            </span>

            <span class="approx">
              {" "}
              <Skeleton
                animation="wave"
                variant="text"
                width={40}
                height={20}
              />
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className={classes.tableCellTeams}>
        <div className="divMatch">
          <div className="divTeam">
            <h1 className="teamName"> <Skeleton
                animation="wave"
                variant="text"
                width={80}
                height={40}
              /></h1>
            <Skeleton
              animation="wave"
              variant="circle"
              width={60}
              height={60}
            />
          </div>
          <h1 className="vs"> <Skeleton
                animation="wave"
                variant="text"
                width={40}
                height={40}
              /></h1>
          <div className="divTeam2">
            <Skeleton
              animation="wave"
              variant="circle"
              width={60}
              height={60}
            />
            <h1 className="teamName"> <Skeleton
                animation="wave"
                variant="text"
                width={80}
                height={40}
              /></h1>
          </div>
        </div>
      </TableCell>

      <TableCell className={classes.tableCellLeague}>
        <div class="league">
          <div class="name"> <Skeleton
                animation="wave"
                variant="text"
                width={80}
                height={40}
              /></div>
          <div class="strategy"> <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              /></div>
        </div>
      </TableCell>
    </div>
  );
}
