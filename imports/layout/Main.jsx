import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useTracker } from "meteor/react-meteor-data";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import UserCard from "../ui/pages/users/UserCard";
import UsersTable from "../ui/pages/users/UsersTable";
import UserCardDetails from "../ui/pages/users/UserCardDetails";
import CreateUsers from "../ui/pages/users/CreateUsers";
import { Grid, Zoom } from "@material-ui/core";
import LogsTable from "../ui/pages/logs/LogsTable";
import RegisterDataUserTable from "../ui/pages/registerDataUser/RegisterDataUser";
import RegisterConnectionsUser from "../ui/pages/registerConnectionsUser/RegisterConnectionsUser";
import ExportDataToMongoDB from "../ui/pages/exportData/exportDataToMongoDB";
import Chats from "../ui/pages/chats/Chats";
import ChatDetails from "../ui/pages/chats/ChatDetails";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  root: {
    display: "flex",
    flexWrap: "nowrap",
    "& > *": {
      margin: theme.spacing(5),
      // width: 330,
      // height: 323,
    },
  },
  toolbar: theme.mixins.toolbar,
  contents: {
    overflowX: "auto",
    flexGrow: 1,
    padding: 5,
    marginLeft: 0,
    height: "100%",
  },
}));

export default function Main() {
  const classes = useStyles();
  const useractual = useTracker(() => {
    return Meteor.user();
  });
  return (
    <>
      <div className={classes.toolbar} />

      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}

      <Switch>
        {/* <Route path="/dashboard">

          <div style={{ paddingBottom: "7em" }}>
          {useractual &&
              useractual.username == "carlosmbinf" ? (
                <DashboardInit />
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
            
          </div>

          <Footer />
        </Route> */}

        <Route path="/users/:id">
          <div style={{ paddingBottom: "7em" }}>
            <UserCardDetails />
            <Zoom in={true}>
              <>
                <Grid container style={{ textAlign: "center", marginTop: 100 }}>
                  <Grid item>
                    <RegisterDataUserTable />
                  </Grid>
                </Grid>
                {useractual &&
                  useractual.profile &&
                  useractual.profile.role == "admin" && (
                    <Grid
                      container
                      style={{ textAlign: "center", marginTop: 100 }}
                    >
                      <Grid item>
                        <LogsTable />
                        <RegisterConnectionsUser />
                      </Grid>
                    </Grid>
                  )}
              </>
            </Zoom>
          </div>

          <Footer />
        </Route>
        <Route path="/users">
          <div style={{ paddingBottom: "7em" }}>
            {useractual &&
              useractual.profile &&
              useractual.profile.role == "admin" ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.root}>
                  <UserCard withCreate="true" />
                </Grid>
                <Grid item xs={12}>
                  <UserCard />
                  {useractual &&
                    useractual.profile &&
                    useractual.profile.role == "admin" ? (
                    useractual.username == "carlosmbinf" ? <UsersTable /> : <UsersTable selector={{ $or: [{ "bloqueadoDesbloqueadoPor": Meteor.userId() }, { "bloqueadoDesbloqueadoPor": { $exists: false } }, { "bloqueadoDesbloqueadoPor": { $in: [""] } }] }} />
                  ) : (
                    <Zoom in={true}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <h1>SIN ACCESO</h1>
                      </Grid>
                    </Zoom>
                  )}

                </Grid>
              </Grid>
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
          </div>

          <Footer />
        </Route>

        <Route path="/create-user">
          <div style={{ paddingBottom: "7em" }}>
            {useractual &&
              useractual.profile &&
              useractual.profile.role == "admin" ? (
              <CreateUsers />
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
          </div>

          <Footer />
        </Route>

        <Route path="/chat/:id">
          <ChatDetails />
        </Route>
        <Route path="/chat">
          <div style={{ paddingBottom: "7em" }}>
            <Zoom in={true}>
              <Chats />
            </Zoom>
          </div>
          <Footer />
        </Route>
        <Route path="/logs">
          <div style={{ paddingBottom: "7em" }}>
            {useractual &&
              useractual.profile &&
              useractual.profile.role == "admin" ? (
              <Zoom in={true}>
                <LogsTable />
              </Zoom>
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
          </div>

          <Footer />
        </Route>
        <Route path="/connections">
          <div style={{ paddingBottom: "7em" }}>
            {useractual &&
              useractual.profile &&
              useractual.username == "carlosmbinf" ? (
              <Zoom in={true}>
                <RegisterConnectionsUser />
              </Zoom>
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
          </div>

          <Footer />
        </Route>
        <Route path="/exportdata">
          <div style={{ paddingBottom: "7em" }}>
            {useractual &&
              useractual.profile &&
              useractual.profile.role == "admin" ? (
              // <Zoom in={true}>
              <ExportDataToMongoDB />
              // </Zoom>
            ) : (
              <Zoom in={true}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1>SIN ACCESO</h1>
                </Grid>
              </Zoom>
            )}
          </div>

          <Footer />
        </Route>

        <Route path="/">
          <div style={{ paddingBottom: "7em" }}>
            <h1>WELCOME</h1>
          </div>
          <Footer />
        </Route>
      </Switch>
    </>
  );
}
