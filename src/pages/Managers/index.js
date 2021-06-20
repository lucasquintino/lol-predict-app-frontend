import React, { useState, useEffect, useMemo } from "react";
import { useStyles, Container, Header, Body } from "./styles";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import "../../assets/extra.css?v=1.9.0";
import "../../assets/lol.css?v=1.9.0";
import axios from "axios";

import { Month, Week } from "./utils";
import api from "../../api";

const Managers = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  const [gamesLists, setGames] = useState([]);
  const [eventsList, setEvents] = useState([]);
  // var games = [];
  // var Games = [];
  // var matchess = [];
  // var tour = [];
  // var tourna = [];
  // var tournaments = [];
  // var events = [];
  // var results = [];
  // var test = [];
  // var result;
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await api.get("/getTournamentsForLeague?hl=pt-BR", {
  //       headers: {
  //         "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //       },
  //     });

  //     let promiseTour = res.data.data.leagues.map((tournament) => {
  //       tour = [...tour, tournament];
  //     });
  //     Promise.all(promiseTour)
  //       .then(function (resultsArray) {
  //         console.log(tour);
  //         console.log("ok1");
  //         let promiseTourna = tour.map((tournament) => {
  //           tourna = [...tourna, tournament.tournaments];
  //         });
  //         Promise.all(promiseTourna)
  //           .then(function (resultsArray) {
  //             console.log(tourna);
  //             console.log("ok2");
  //             let promiseTournaments = tourna.map((event) => {
  //               event.map((match) => {
  //                 tournaments = [...tournaments, match.id];
  //               });
  //             });
  //             Promise.all(promiseTournaments)
  //               .then(function (resultsArray) {
  //                 console.log(tournaments);
  //                 console.log("ok3");
  //                 let promiseEvents = tournaments.map(async (item) => {
  //                   const res2 = await api.get(
  //                     `/getCompletedEvents?hl=pt-BR&tournamentId=${item}`,
  //                     {
  //                       headers: {
  //                         "x-api-key":
  //                           "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //                       },
  //                     }
  //                   );
  //                   events = [...events, res2.data.data.schedule.events];
  //                 });

  //                 Promise.all(promiseEvents)
  //                   .then(function (resultsArray) {
  //                     console.log(events);
  //                     console.log("events");

  //                     let promiseMatches = events.map((matchesList) => {
  //                       matchesList.map((match) => {
  //                         matchess = [...matchess, match.games];
  //                       });
  //                     });
  //                     Promise.all(promiseMatches)
  //                       .then(function (resultsArray) {
  //                         console.log(matchess);
  //                         console.log("matches");
  //                         matchess = matchess.filter(
  //                           (match) => match.length === 1
  //                         );
  //                         console.log(matchess);
  //                         let promiseGames = matchess.map((gamesList) => {
  //                           gamesList.map((game) => {
  //                             games = [...games, game.id];
  //                           });
  //                         });
  //                         Promise.all(promiseMatches)
  //                           .then(function (resultsArray) {
  //                             console.log(games);
  //                             console.log("games");
  //                             let promiseArr = games.map(async (game) => {
  //                               await axios
  //                                 .get(
  //                                   `https:feed.lolesports.com/livestats/v1/window/${game}`
  //                                 )
  //                                 .then(async (res2) => {
  //                                   if (
  //                                     typeof res2.data.frames !== "undefined"
  //                                   ) {
  //                                     var date = new Date(
  //                                       res2.data.frames[0].rfc460Timestamp
  //                                     );

  //                                     date.setMilliseconds(0);
  //                                     var minutes = date.getMinutes() + 15;
  //                                     date.setSeconds(0);
  //                                     date.setMinutes(minutes);

  //                                     var dateResult = new Date(
  //                                       res2.data.frames[0].rfc460Timestamp
  //                                     );
  //                                     console.log(res2);

  //                                     dateResult.setMilliseconds(0);
  //                                     var minutes =
  //                                       dateResult.getMinutes() + 90;
  //                                     dateResult.setSeconds(0);
  //                                     dateResult.setMinutes(minutes);

  //                                     const res3 = await axios.get(
  //                                       `https:feed.lolesports.com/livestats/v1/window/${
  //                                         res2.data.esportsGameId
  //                                       }?startingTime=${date.toISOString()}`
  //                                     );

  //                                     var btotalXp = 0;
  //                                     var btotalCs = 0;
  //                                     var rtotalXp = 0;
  //                                     var rtotalCs = 0;

  //                                     var bdragonO = 0;
  //                                     var bdragonC = 0;
  //                                     var bdragonF = 0;
  //                                     var bdragonM = 0;

  //                                     res3.data.frames[0].blueTeam.dragons.map(
  //                                       (dragon) => {
  //                                         if (dragon === "ocean") bdragonO = 1;
  //                                         if (dragon === "cloud") bdragonC = 1;
  //                                         if (dragon === "mountain")
  //                                           bdragonM = 1;
  //                                         if (dragon === "infernal")
  //                                           bdragonF = 1;
  //                                       }
  //                                     );
  //                                     var rdragonO = 0;
  //                                     var rdragonC = 0;
  //                                     var rdragonF = 0;
  //                                     var rdragonM = 0;

  //                                     res3.data.frames[0].redTeam.dragons.map(
  //                                       (dragon) => {
  //                                         if (dragon === "ocean") rdragonO = 1;
  //                                         if (dragon === "cloud") rdragonC = 1;
  //                                         if (dragon === "mountain")
  //                                           rdragonM = 1;
  //                                         if (dragon === "infernal")
  //                                           rdragonF = 1;
  //                                       }
  //                                     );

  //                                     res3.data.frames[0].blueTeam.participants.map(
  //                                       (participant) => {
  //                                         btotalXp =
  //                                           btotalXp + participant.level;
  //                                         btotalCs =
  //                                           btotalCs + participant.creepScore;
  //                                       }
  //                                     );
  //                                     res3.data.frames[0].redTeam.participants.map(
  //                                       (participant) => {
  //                                         rtotalXp =
  //                                           rtotalXp + participant.level;
  //                                         rtotalCs =
  //                                           rtotalCs + participant.creepScore;
  //                                       }
  //                                     );
  //                                     const res4 = await api.get(
  //                                       `/getEventDetails?hl=pt-BR&id=${res2.data.esportsMatchId}`,
  //                                       {
  //                                         headers: {
  //                                           "x-api-key":
  //                                             "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //                                         },
  //                                       }
  //                                     );
  //                                     if (
  //                                       res4.data.data.event.match.teams[0].result
  //                                         .gameWins === 1
  //                                     ) {
  //                                       result = 1;
  //                                     } else result = 0;
                                      
  //                                     var match = {
  //                                       goldat15:
  //                                         res3.data.frames[0].blueTeam
  //                                           .totalGold,
  //                                       xpat15: btotalXp,
  //                                       csat15: btotalCs,
  //                                       towerat15:
  //                                         res3.data.frames[0].blueTeam.towers,
  //                                       inibat15:
  //                                         res3.data.frames[0].blueTeam
  //                                           .inhibitors,
  //                                       killsat15:
  //                                         res3.data.frames[0].blueTeam
  //                                           .totalKills,
  //                                       bdragonOat15: bdragonO,
  //                                       bdragonCat15: bdragonC,
  //                                       bdragonMat15: bdragonM,
  //                                       bdragonFat15: bdragonF,
  //                                       opp_goldat15:
  //                                         res3.data.frames[0].redTeam.totalGold,
  //                                       opp_xpat15: rtotalXp,
  //                                       opp_csat15: rtotalCs,
  //                                       opp_towerat15:
  //                                         res3.data.frames[0].redTeam.towers,
  //                                       opp_inibat15:
  //                                         res3.data.frames[0].redTeam
  //                                           .inhibitors,
  //                                       opp_killsat15:
  //                                         res3.data.frames[0].redTeam
  //                                           .totalKills,
  //                                       rdragonOat15: rdragonO,
  //                                       rdragonCat15: rdragonC,
  //                                       rdragonMat15: rdragonM,
  //                                       rdragonFat15: rdragonF,
  //                                       result: result,
  //                                     };

  //                                     console.log(res3.data);
  //                                     console.log(res4.data);

  //                                     console.log(match);
  //                                     Games = [...Games, match];
  //                                     console.dir(Games);
  //                                   }
  //                                 });
  //                             });

  //                             Promise.all(promiseArr)
  //                               .then(function (resultsArray) {
  //                                 console.log(Games);
  //                                 games = games.filter((game) => {
  //                                   return typeof game !== "undefined";
  //                                 });

  //                                 console.log(games);
  //                                 axios
  //                                   .post(
  //                                     "http:127.0.0.1:5000/predict",
  //                                     games,
  //                                     {
  //                                       headers: {
  //                                         "Access-Control-Allow-Origin": "*",
  //                                         "Content-Type": "application/json",
  //                                       },
  //                                     }
  //                                   )
  //                                   .then((res) => {
  //                                     console.log(res.data.prediction);
  //                                     console.log(results);
  //                                     var count = 0;
  //                                     for (var i = 0; i < results.length; i++) {
  //                                       if (
  //                                         results[i] === 1 &&
  //                                         res.data.prediction[i] === 1
  //                                       )
  //                                         count = count + 1;
  //                                     }
  //                                     results = results.filter((x) => x === 1);
  //                                     console.log(count / results.length);
  //                                   });

  //                                 setGames(games);
  //                               })
  //                               .catch(function (err) {});
  //                           })
  //                           .catch(function (err) {});
  //                       })
  //                       .catch(function (err) {});
  //                   })
  //                   .catch(function (err) {});
  //               })
  //               .catch(function (err) {});
  //           })
  //           .catch(function (err) {});
  //       })
  //       .catch(function (err) {});
  //   }

  //   fetchData();
  // }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getSchedule?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events.filter((event) => {
        return event.state === "unstarted";
      });
      data.map((event) => {
        event.time = new Date(event.startTime).getHours();
        event.day = new Date(event.startTime).getDate();
        event.week = new Date(event.startTime).getDay();
        event.month = new Date(event.startTime).getMonth();
      });
      Array.prototype.groupBy = function (k) {
        return this.reduce(
          (acc, item) => (
            (acc[item[k]] = [...(acc[item[k]] || []), item]), acc
          ),
          []
        );
      };
      data = data.groupBy("day");
      setMatches(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Layout />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            {matches.map((item) => (
              <div style={{ marginBottom: "75px" }}>
                <Header color="rose">
                  <h1 className={classes.cardTitleWhite}>
                    {Week[item[0].week]}
                  </h1>
                  <h3 className={classes.cardCategoryWhite}>
                    {item[0].day} de {Month[item[0].month]}
                  </h3>
                </Header>
                <Body>
                  <Table
                    tableHeaderColor="primary"
                    tableData={item.map((match) => [
                      match.time,
                      match.match.teams,
                      match.league.name,
                    ])}
                  />
                </Body>
              </div>
            ))}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Managers;
