import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import WatchLater from "@material-ui/icons/WatchLater";
import Collapse from "@material-ui/core/Collapse";
import { toast, ToastContainer } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "react-toastify/dist/ReactToastify.min.css";
import Tooltip from "@material-ui/core/Tooltip";

import SkeletonMatch from "../SkeletonMatch";

// core components

import axios from "axios";
import api from "../../api";
import { getOdd } from "./utils";
import styles from "./tableStyle.js";

const api2 = axios.create({
  baseURL: "https://feed.lolesports.com/livestats/v1/window",
});

const useStyles = makeStyles(styles);

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    background: "#0f1519",
    color: "#ddd",
    padding: 10,
    fontSize: 14,
  },
}))(Tooltip);

var LvlToXp = new Array();
LvlToXp[1] = 0;
LvlToXp[2] = 280;
LvlToXp[3] = 660;
LvlToXp[4] = 1140;
LvlToXp[5] = 1720;
LvlToXp[6] = 2400;
LvlToXp[7] = 3180;
LvlToXp[8] = 4060;
LvlToXp[9] = 5040;
LvlToXp[10] = 6120;
LvlToXp[11] = 7300;
LvlToXp[12] = 8580;
LvlToXp[13] = 9960;
LvlToXp[14] = 11440;
LvlToXp[15] = 13020;
LvlToXp[16] = 14700;
LvlToXp[17] = 16480;
LvlToXp[18] = 18360;

var interval;
var interval2;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function CustomTable(props) {
  const classes = useStyles();
  const [reverse, setReverse] = useState(false);
  const [odds, setOdds] = useState([]);
  const [open, setOpen] = React.useState(-1);
  const [match, setMatch] = useState();
  const [diff, setDiff] = useState([]);
  const [blue, setBlue] = useState();
  const [red, setRed] = useState();
  const [predict, setPredict] = useState(-1);
  const [predict10, setPredict10] = useState(-1);
  const [predictAt, setPredictAt] = useState(-1);
  const [allowPredict, setAllowPredict] = useState();

  useEffect(() => {
    const predictMatch = async () => {
      if (predict === -1) {


        if (Number(allowPredict?.diff.split(":")[0]) > 15) {
          allowPredict?.time.setMilliseconds(0);
          var minutes = allowPredict?.time.getMinutes() + 10;
          allowPredict?.time.setSeconds(0);
          allowPredict?.time.setMinutes(minutes);
          const res10 = await api2.get(
            `/${
              allowPredict?.res.data.esportsGameId
            }?startingTime=${allowPredict?.time.toISOString()}`
          );

          var minutes = allowPredict?.time.getMinutes() + 5;

          allowPredict?.time.setMinutes(minutes);

          const res15 = await api2.get(
            `/${
              allowPredict?.res.data.esportsGameId
            }?startingTime=${allowPredict?.time.toISOString()}`
          );

          var btotalXp = 0;
          var btotalCs = 0;
          var rtotalXp = 0;
          var rtotalCs = 0;
          var btotal15Xp = 0;
          var btotal15Cs = 0;
          var rtotal15Xp = 0;
          var rtotal15Cs = 0;

          if (typeof res10.data.frames !== "undefined") {
            res10.data.frames[9].blueTeam.participants.map((participant) => {
              btotalXp = btotalXp + LvlToXp[participant.level];
              btotalCs = btotalCs + participant.creepScore;
            });
            res10.data.frames[9].redTeam.participants.map((participant) => {
              rtotalXp = rtotalXp + LvlToXp[participant.level];
              rtotalCs = rtotalCs + participant.creepScore;
            });

            var match10 = {
              goldat10: res10.data.frames[9].blueTeam.totalGold,
              xpat10: btotalXp,
              csat10: btotalCs,
              opp_goldat10: res10.data.frames[9].redTeam.totalGold,
              opp_xpat10: rtotalXp,
              opp_csat10: rtotalCs,
              killsat10: res10.data.frames[9].blueTeam.totalKills,
              opp_killsat10: res10.data.frames[9].redTeam.totalKills,
            };
          }

          if (typeof res15.data.frames !== "undefined") {
            res15.data.frames[9].blueTeam.participants.map((participant) => {
              btotal15Xp = btotal15Xp + LvlToXp[participant.level];
              btotal15Cs = btotal15Cs + participant.creepScore;
            });
            res15.data.frames[9].redTeam.participants.map((participant) => {
              rtotal15Xp = rtotal15Xp + LvlToXp[participant.level];
              rtotal15Cs = rtotal15Cs + participant.creepScore;
            });

            var match15 = {
              goldat15: res15.data.frames[9].blueTeam.totalGold,
              xpat15: btotal15Xp,
              csat15: btotal15Cs,
              opp_goldat15: res15.data.frames[9].redTeam.totalGold,
              opp_xpat15: rtotal15Xp,
              opp_csat15: rtotal15Cs,
              killsat15: res15.data.frames[9].blueTeam.totalKills,
              opp_killsat15: res15.data.frames[9].redTeam.totalKills,
            };

            var match = { ...match15, ...match10 };

            axios
              .post("https://api-lol-predict.herokuapp.com/predictAt15", [
                match,
              ])
              .then((res) => {
                setPredict(res.data.prediction[0]);
                setPredictAt(1);
              });
          }
        } else if (Number(allowPredict?.diff.split(":")[0]) > 10) {

          setPredictAt(0);
        }
      }
    };
    predictMatch();
  }, [allowPredict]);

  useEffect(() => {
    const predictMatch = async () => {
      if (predict10 === -1 && predictAt === 0) {

        if (Number(allowPredict?.diff.split(":")[0]) > 10) {
          allowPredict?.time.setMilliseconds(0);
          var minutes = allowPredict?.time.getMinutes() + 10;
          allowPredict?.time.setSeconds(0);
          allowPredict?.time.setMinutes(minutes);

          const res10 = await api2.get(
            `/${
              allowPredict?.res.data.esportsGameId
            }?startingTime=${allowPredict?.time.toISOString()}`
          );

          var btotalXp = 0;
          var btotalCs = 0;
          var rtotalXp = 0;
          var rtotalCs = 0;

          if (typeof res10.data.frames !== "undefined") {
            res10.data.frames[9].blueTeam.participants.map((participant) => {
              btotalXp = btotalXp + LvlToXp[participant.level];
              btotalCs = btotalCs + participant.creepScore;
            });
            res10.data.frames[9].redTeam.participants.map((participant) => {
              rtotalXp = rtotalXp + LvlToXp[participant.level];
              rtotalCs = rtotalCs + participant.creepScore;
            });

            var match10 = {
              goldat10: res10.data.frames[9].blueTeam.totalGold,
              xpat10: btotalXp,
              csat10: btotalCs,
              opp_goldat10: res10.data.frames[9].redTeam.totalGold,
              opp_xpat10: rtotalXp,
              opp_csat10: rtotalCs,
              killsat10: res10.data.frames[9].blueTeam.totalKills,
              opp_killsat10: res10.data.frames[9].redTeam.totalKills,
            };

            axios
              .post("https://api-lol-predict.herokuapp.com/predictAt10", [
                match10,
              ])
              .then((res) => {
                setPredict10(res.data.prediction[0]);
              });
          }
        }
      }
    };
    predictMatch();
  }, [allowPredict]);


  const getMatch = (index, gameId) => {
    async function getGame() {
      setMatch({
        gold: 0,
        kills: 0,
        towers: 0,
        inhibitors: 0,
        dragons: 0,
        barons: 0,
        xp: 0,
        cs: 0,
        opp_gold: 0,
        opp_kills: 0,
        opp_towers: 0,
        opp_inhibitors: 0,
        opp_dragons: 0,
        opp_barons: 0,
        opp_xp: 0,
        opp_cs: 0,
      });
      setPredict(-1);
      setDiff(0);
      setBlue();
      setRed();

      const id = Number(tableData[index].id) + 1;

      if (gameId) {
        const result = await api2.get(`/${gameId}`);
        if (result?.data) {
          var blueTeam =
            result?.data.gameMetadata.blueTeamMetadata.esportsTeamId;
          var redTeam = result?.data.gameMetadata.redTeamMetadata.esportsTeamId;

          const blue = await api.get(`/getTeams?hl=pt-BR&id=${blueTeam}`, {
            headers: {
              "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
            },
          });
          const red = await api.get(`/getTeams?hl=pt-BR&id=${redTeam}`, {
            headers: {
              "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
            },
          });
          setMatch({
            gold: 0,
            kills: 0,
            towers: 0,
            inhibitors: 0,
            dragons: 0,
            barons: 0,
            xp: 0,
            cs: 0,
            opp_gold: 0,
            opp_kills: 0,
            opp_towers: 0,
            opp_inhibitors: 0,
            opp_dragons: 0,
            opp_barons: 0,
            opp_xp: 0,
            opp_cs: 0,
          });

          return { result, blue, red };
        } else
          toast.error("A partida selecionada está indisponivel no sdmomento");
      } else
        toast.error("A partida selecionada está indisponivsadasel no momento");
    }

    async function fetchData(result, blue, red) {
      if (result.status === 200) {
        var time =
          result.data.frames[result.data.frames.length - 1].rfc460Timestamp;

        time = new Date(time);
        var now = new Date(Date.now());
        var secondsNow = now.getSeconds() - 60;
        now.setSeconds(secondsNow);
        var diff = millisToMinutesAndSeconds(now - time);
        var date = new Date(Date.now());

        date.setMilliseconds(0);
        var seconds = date.getSeconds() - 60;
        date.setSeconds(Math.round(seconds / 10) * 10);

        var btotalXp = 0;
        var btotalCs = 0;
        var rtotalXp = 0;
        var rtotalCs = 0;

        const res = await api2.get(
          `/${gameId}?startingTime=${date.toISOString()}`
        );

        if (typeof res.data.frames === "undefined")
          window.location.reload(false);

        var aux =
          result.data.gameMetadata.blueTeamMetadata.participantMetadata[0].summonerName.split(
            " "
          )[0];

        if (typeof blue.data.data.teams !== "undefined") {
          if (blue.data.data.teams[0].code !== aux) {
            setBlue(red.data.data.teams[0]);
            setRed(blue.data.data.teams[0]);
            setReverse(true);
          } else {
            setBlue(blue.data.data.teams[0]);
            setRed(red.data.data.teams[0]);
          }
        }
        if (typeof res.data.frames !== "undefined") {
          setAllowPredict({ time, res, diff });

          typeof res.data.frames[res.data.frames.length - 1] !== "undefined" &&
            res.data.frames[
              res.data.frames.length - 1
            ].blueTeam.participants.map((participant) => {
              btotalXp = btotalXp + LvlToXp[participant.level];
              btotalCs = btotalCs + participant.creepScore;
            });
          typeof res.data.frames[res.data.frames.length - 1] !== "undefined" &&
            res.data.frames[
              res.data.frames.length - 1
            ].redTeam.participants.map((participant) => {
              rtotalXp = rtotalXp + LvlToXp[participant.level];
              rtotalCs = rtotalCs + participant.creepScore;
            });

          if (typeof res.data.frames !== "undefined") {
            if (
              typeof res.data.frames[res.data.frames.length - 1] !==
                "undefined" &&
              res.data.frames[res.data.frames.length - 1].gameState ===
                "finished"
            ) {
              var timeOver =
                res.data.frames[res.data.frames.length - 1].rfc460Timestamp;

              timeOver = new Date(timeOver);

              diff = millisToMinutesAndSeconds(timeOver - time);
            }
          } else window.location.reload(false);

          setDiff(diff);
          if (
            typeof res.data.frames[res.data.frames.length - 1] !== "undefined"
          ) {
            var match = {
              gold: res.data.frames[res.data.frames.length - 1].blueTeam
                .totalGold,
              kills:
                res.data.frames[res.data.frames.length - 1].blueTeam.totalKills,
              towers:
                res.data.frames[res.data.frames.length - 1].blueTeam.towers,
              inhibitors:
                res.data.frames[res.data.frames.length - 1].blueTeam.inhibitors,
              dragons:
                res.data.frames[res.data.frames.length - 1].blueTeam.dragons
                  .length,
              barons:
                res.data.frames[res.data.frames.length - 1].blueTeam.barons,
              xp: btotalXp,
              cs: btotalCs,
              opp_gold:
                res.data.frames[res.data.frames.length - 1].redTeam.totalGold,
              opp_kills:
                res.data.frames[res.data.frames.length - 1].redTeam.totalKills,
              opp_towers:
                res.data.frames[res.data.frames.length - 1].redTeam.towers,
              opp_inhibitors:
                res.data.frames[res.data.frames.length - 1].redTeam.inhibitors,
              opp_dragons:
                res.data.frames[res.data.frames.length - 1].redTeam.dragons
                  .length,
              opp_barons:
                res.data.frames[res.data.frames.length - 1].redTeam.barons,
              opp_xp: rtotalXp,
              opp_cs: rtotalCs,
            };
            setMatch(match);
          }
        } else window.location.reload(false);
      } else {
        setMatch({
          gold: 0,
          kills: 0,
          towers: 0,
          inhibitors: 0,
          dragons: 0,
          barons: 0,
          xp: 0,
          cs: 0,
          opp_gold: 0,
          opp_kills: 0,
          opp_towers: 0,
          opp_inhibitors: 0,
          opp_dragons: 0,
          opp_barons: 0,
          opp_xp: 0,
          opp_cs: 0,
        });
        setDiff(0);
        setBlue(0);
        setRed(0);
      }
    }
    if (open !== -1) {
      setOpen(-1);
      clearInterval(interval);
    } else
      getGame().then((res) => {
        if (res) {
          const { result, blue, red } = res;

          setOpen(index);
          interval = window.setInterval(function () {
            fetchData(result, blue, red);
          }, 1000);
        }
      });
  };

  useEffect(() => {
    const getOdds = async (blue, red) => {

      const teamOdds = await axios.get(
        "https://api-lol-predict.herokuapp.com/odds"
      );

      const arrayOdds = getOdd(teamOdds.data, blue, red);

      setOdds(arrayOdds);
    };

    if (blue && red && open !== -1) {
      interval2 = window.setInterval(function () {
        getOdds(blue, red);
      }, 1000);
    } else clearInterval(interval2);
  }, [blue, red, open]);

  const { tableHead, tableData, tableHeaderColor } = props;

  return (
    <div className={classes.tableResponsive}>
      <ToastContainer style={{ fontSize: 18 }} />
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
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
          {typeof tableData !== "undefined" ? (
            tableData.map((cell, index) => (
              <>
                <TableRow
                  data-value="parent"
                  className={
                    (open === index && "selecteD") || "tableBodyRowHover"
                  }
                >
                  <div
                    onClick={() => getMatch(index, cell.gameId)}
                    className={(open === index && "selectedDiv") || ""}
                  >
                    <TableCell className={classes.tableCellTime}>
                      <div class="EventTime">
                        <div class="time">
                          <span class="hour">
                            {("0" + new Date(cell.startTime).getHours()).slice(
                              -2
                            )}
                          </span>
                          <span class="minute">00</span>
                          <span class="approx">APROX.</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className={classes.tableCellTeams}>
                      <div className="divMatch">
                        <div className="divTeam">
                          <div className="divName">
                            <h1 className="teamName">
                              {cell.match.teams[0].name.length < 20
                                ? cell.match.teams[0].name
                                : cell.match.teams[0].code}
                            </h1>
                            <h3
                              className={reverse ? `teamOddRed` : `teamOddBlue`}
                            >
                              {!!odds.length && open === index ? odds[0] : ""}
                            </h3>
                          </div>

                          <CustomTooltip
                            title={
                              <React.Fragment>
                                <p color="inherit">Ver Histórico</p>
                              </React.Fragment>
                            }
                          >
                            <img
                              data-value="child"
                              onClick={(e) => {
                                e.stopPropagation();
                                const win = window.open(
                                  `https://lucasquintino.github.io/lol-predict-app-frontend/#/history/${cell.match.teams[0].name}`,
                                  "_blank"
                                );
                                win.focus();
                              }}
                              className="imgTeam"
                              src={cell.match.teams[0].image}
                              alt=""
                            />
                          </CustomTooltip>
                        </div>
                        <div className="vsDiv">
                          <h1 className="vs">vs</h1>
                          <a
                            onClick={(e) => e.stopPropagation()}
                            href={`https://lolesports.com/live/${cell?.league?.slug}`}
                            target="_blank"
                          >
                            <CustomTooltip
                              title={
                                <React.Fragment>
                                  <p color="inherit">Assistir Partida</p>
                                </React.Fragment>
                              }
                            >
                              <VisibilityIcon className="viewIcon" />
                            </CustomTooltip>
                          </a>
                        </div>

                        <div className="divTeam2">
                          <CustomTooltip
                            title={
                              <React.Fragment>
                                <p color="inherit">Ver Histórico</p>
                              </React.Fragment>
                            }
                          >
                            <img
                              onClick={(e) => {
                                e.stopPropagation();
                                const win = window.open(
                                  `https://lucasquintino.github.io/lol-predict-app-frontend/#/history/${cell.match.teams[1].name}`,
                                  "_blank"
                                );
                                win.focus();
                              }}
                              className="imgTeam"
                              src={cell.match.teams[1].image}
                              alt=""
                            />
                          </CustomTooltip>

                          <div className="divName">
                            <h1 className="teamName">
                              {cell.match.teams[1].name.length < 20
                                ? cell.match.teams[1].name
                                : cell.match.teams[1].code}
                            </h1>
                            <h3
                              className={reverse ? `teamOddBlue` : `teamOddRed`}
                            >
                              {!!odds.length && open === index ? odds[1] : ""}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className={classes.tableCellLeague}>
                      <div class="league">
                        <div class="name">{cell.league.name.split(" ")[0]}</div>
                        <div class="strategy">
                          melhor de {cell.match.strategy.count}
                        </div>
                      </div>
                    </TableCell>
                  </div>
                  <Collapse in={open == index} timeout="auto" unmountOnExit>
                    <>
                      <main class="">
                        <main class="Watch">
                          <div class="center-pane">
                            <div class="lower">
                              <div class="overview-pane">
                                <div class="VodsGameSelector active-selection">
                                  <div class="games">
                                    <span class="label">PREDIÇÕES</span>
                                    <h3 class="game game1 selected watch-annotated">
                                      {predictAt === 1 ? "15" : "10"}
                                    </h3>
                                  </div>
                                </div>
                                <div class="VodsGameSelector active-selection tab title stats selected">
                                  <div class="type"></div>
                                  <div
                                    class="type"
                                    style={{ background: "#03719C" }}
                                  >
                                    BLUE
                                  </div>
                     
                                  <div
                                    class="type"
                                    style={{ background: "#EE2737" }}
                                  >
                                    RED
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">VENCEDOR</div>
                                  <div
                                    className={
                                      predictAt === 1
                                        ? predict === 1
                                          ? "team1 predicted"
                                          : "team1"
                                        : predict10 === 1
                                        ? "team1 predicted"
                                        : "team1"
                                    }
                                  >
                                    <img
                                      className="imgTeam"
                                      src={blue?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue?.code}</h1>
                                  </div>
                                  <div
                                    className={
                                      predictAt === 1
                                        ? predict === 0
                                          ? "team2 predicted"
                                          : "team2"
                                        : predict10 === 0
                                        ? "team2 predicted"
                                        : "team2"
                                    }
                                  >
                                    <img
                                      className="imgTeam"
                                      src={red?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red?.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">TORRE</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue?.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red?.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">BARÃO</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue?.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red?.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">DRAGÃO</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue?.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red?.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">OVER</div>
                                  <div className="team1 ">
                                    <img
                                      className="imgTeam"
                                      src={blue?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue?.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red?.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red?.code}</h1>
                                  </div>
                                </div>
                              </div>
                              <div class="nav-details">
                                <div class="nav">
                                  <div class="StatsMatchup">
                                    <div class="VodsGameSelector active-selection tab title stats selected">
                                      <div class="games">
                                        <span
                                          class="label"
                                          style={{ color: "white" }}
                                        >
                                          ESTATISTICAS
                                        </span>
                                      </div>
                                    </div>
                                    <div class="VodsGameSelector active-selection tab title stats selected">
                                      <div class="games games2">
                                        <div class="matchNumber">
                                          <span class="label">PARTIDA</span>
                                          <h3 class="game game1 selected watch-annotated">
                                            {cell.count}
                                          </h3>
                                        </div>
                                        <div class="matchNumber">
                                          <span class="label" style={{color: 'rgb(3, 113, 156)'}}>
                                            {blue?.code}
                                          </span>
                                        </div>
                                        <div class="matchNumber">
                                          <span class="label"  style={{color: '#EE2737'}} >{red?.code}</span>
                                        </div>

                                        <div class="matchTime">
                                          <WatchLater
                                            style={{
                                              color: "#EE2737",
                                              height: "1.92857143rem",
                                              fontSize: "2.92857143rem",
                                              lineHeight: "1.92857143rem",
                                              marginRight: "16px",
                                              marginBottom: "0.1rem",
                                            }}
                                          />

                                          <div class="label">{diff}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="info">
                                      <div class="stats">
                                        <div class="StatsMatchupPerformance">
                                          <div class="player primary">
                                            <div class="stat kda">
                                              <div class="value">
                                                <span class="kills ">
                                                  {typeof match !== "undefined"
                                                    ? match.kills
                                                    : 0}
                                                </span>
                                              </div>
                                              <div class="title">Abates</div>
                                            </div>
                                            <div class="stat goldEarned">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.gold
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Ouro recebido
                                              </div>
                                            </div>
                                            <div class="stat minionKills">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.cs
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Tropas abatidas
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.xp
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                XP Recebido
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.barons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                barons realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsPlaced">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.dragons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                dragões realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.towers
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Torres destruídas
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.inhibitors
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Inibidores destruídos
                                              </div>
                                            </div>
                                          </div>
                                          <div class="player secondary">
                                            <div class="stat kda">
                                              <div class="value">
                                                <span class="kills ">
                                                  {typeof match !== "undefined"
                                                    ? match.opp_kills
                                                    : 0}
                                                </span>
                                              </div>
                                              <div class="title">Abates</div>
                                            </div>
                                            <div class="stat goldEarned">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_gold
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Ouro recebido
                                              </div>
                                            </div>
                                            <div class="stat minionKills">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_cs
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Tropas abatidas
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_xp
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                XP Recebido
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_barons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                barons realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsPlaced">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_dragons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                dragões realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_towers
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Torres destruídas
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_inhibitors
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Inibidores destruídos
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </main>
                      </main>
                    </>
                  </Collapse>
                </TableRow>
              </>
            ))
          ) : (
            <SkeletonMatch />
          )}
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
