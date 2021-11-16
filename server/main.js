import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import {
  OnlineCollection,
  MensajesCollection,
} from "../imports/ui/pages/collections/collections";
import { LogsCollection } from "../imports/ui/pages/collections/collections";
import { WebApp } from "meteor/webapp";
import bodyParser from "body-parser";
import router from "router";
import fs from "fs";

var cron = require("node-cron");
const endpoint = router();

function insertLink({ title, url }) {
  ArchivoCollection.insert({ title, url, createdAt: new Date() });
}


if (Meteor.isServer) {

  Meteor.startup(() => {
    
    console.log("ROOT_URL: " + process.env.ROOT_URL);
    console.log("MONGO_URL: " + process.env.MONGO_URL);

    OnlineCollection.remove({});
   // OnlineCollection.remove({address: `127.0.0.1`});

    ServiceConfiguration.configurations.remove({
      service: "facebook",
    });

    ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: "581482823014129",
      secret: "aeeca3e355143de86008e194c31fb691",
    });
    if (Meteor.users.find({ "profile.role": "admin" }).count() == 0) {
      console.log("CREANDO USER ADMIN");
      const user = {
        email: "carlosmbinf@nauta.cu",
        password: "lastunas123",
        firstName: "Carlos",
        lastName: "Medina",
        role: "admin",
        creadoPor: "Server",
        edad: 26,
      };
      try {
        Accounts.createUser(user);
        console.log("ADD OK");
      } catch (error) {
        console.log("NO SE PUDO CREAR EL USER ADMIN");
      }
    }
    console.log("YA HAY UN USER ADMIN");
    // const youtubedl = require('youtube-dl')
    // const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
    // youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
    //   if (err) throw err
    //   // console.log(output.join('\n'))
    // })
  });

  
  // console.log(` la fecha inicial es mayor q la segunda ` + (new Date() > new Date()));
  // const send = require('gmail-send')({
  //   user: 'carlosmbinf@gmail.com',
  //   pass: 'Lastunas@123',
  //   to:   'carlosmbinf9405@icloud.com',
  //   subject: 'VidKar Reporte',
  // });
  // try {
  //   cron
  //     .schedule(
  //       "1 0 1 1-12 *",
  //       async () => {
  //         console.log(new Date())
  //         let users = await Meteor.users.find({});
  //         // await console.log("Count " + users.count());
  //         // await console.log("running every minute to 1 from 5");

  //         await users.fetch().map((user) => {
  //           user.megasGastadosinBytes > 0 &&
  //             //   console.log({
  //             //   userId: user._id,
  //             //   megasGastadosinBytes: user.megasGastadosinBytes,
  //             //   megasGastadosinBytesGeneral: user.megasGastadosinBytesGeneral,
  //             // }),
  //             RegisterDataUsersCollection.insert({
  //               userId: user._id,
  //               megasGastadosinBytes: user.megasGastadosinBytes,
  //               megasGastadosinBytesGeneral: user.megasGastadosinBytesGeneral
  //             })
  //             user.profile.role == 'admin' &&
  //               Meteor.users.update(user._id, {
  //                 $set: {
  //                   megasGastadosinBytes: 0,
  //                   megasGastadosinBytesGeneral: 0,
  //                 },
  //               })
  //             user.baneado == false && user.profile.role !== 'admin' &&
  //               (Meteor.users.update(user._id, {
  //                 $set: {
  //                   megasGastadosinBytes: 0,
  //                   megasGastadosinBytesGeneral: 0,
  //                   baneado: true,
  //                 },
  //               }),
  //               LogsCollection.insert({
  //                 type: "Bloqueado",
  //                 userAfectado: user._id,
  //                 userAdmin: "server",
  //                 message:
  //                   "El server " +
  //                   process.env.ROOT_URL +
  //                   " Bloqueo automaticamente el proxy por ser dia Primero de cada Mes",
  //               }),
  //         });
  //       },
  //       {
  //         scheduled: true,
  //         timezone: "America/Havana",
  //       }
  //     )
  //     .start();

  // } catch (error) {
  //   console.log(error);
  // }

  endpoint.post("/createuser", (req, res) => {
    // console.log(req)
    // console.log(req.body)
    try {
      Accounts.createUser(req.body);
      console.log("Usuario Creado" + JSON.stringify(req.body));

      res.writeHead(200, {
        message: "Usuario Creado",
      });
    } catch (error) {
      console.log("error.error :> " + error.error);
      console.log("error.reason :> " + error.reason);
      console.log("error.message :> " + error.message);
      console.log("error.errorType :> " + error.errorType);
      console.log("--------------------------------------");

      res.writeHead(error.error, {
        error: error.error,
        reason: error.reason,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.end();
  });
  endpoint.post("/userpass", (req, res) => {
    // console.log(req)
    // console.log(req.body)
    try {
      req.body.username && Accounts.setUsername(req.body.id, req.body.username);
      req.body.password && Accounts.setPassword(req.body.id, req.body.password);
      console.log(
        "Usuario actualizado" + req.body.id + " " + req.body.username + " "
      );

      res.writeHead(200, {
        message: "Usuario actualizado",
      });
    } catch (error) {
      console.log("error.error :> " + error.error);
      console.log("error.reason :> " + error.reason);
      console.log("error.message :> " + error.message);
      console.log("error.errorType :> " + error.errorType);
      console.log("--------------------------------------");

      res.writeHead(error.error, {
        error: error.error,
        reason: error.reason,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.end();
  });
  
 
  WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }));
  WebApp.connectHandlers.use(endpoint);

  // ServiceConfiguration.configurations.remove({
  //   service: "google"
  // });
  // ServiceConfiguration.configurations.insert({
  //   service: "google",
  //   clientId: "????????????????.apps.googleusercontent.com",
  //   secret: "????????????????"
  // });
  Meteor.publish("logs", function () {
    return LogsCollection.find({});
  });
  Meteor.publish("logsId", function (id) {
    return LogsCollection.find({ userAfectado: id });
  });
  Meteor.publish("user", function (selector) {
    return Meteor.users.find(selector?selector:{});
  });
  Meteor.publish("userID", function (id) {
    return Meteor.users.find({ _id: id });
  });
  Meteor.publish("userRole", function (role) {
    return Meteor.users.find({ "profile.role": role });
  });
  Meteor.publish("conexionesUser", function (id) {
    return OnlineCollection.find({ userId: id });
  });
  Meteor.publish("conexiones", function () {
    return OnlineCollection.find({});
  });
  Meteor.publish("mensajes", function (selector) {
    return MensajesCollection.find(selector?selector:{});
  });
  Meteor.onConnection(function (connection) {
    OnlineCollection.insert({
      _id: connection.id,
      address: connection.clientAddress,
    });

    connection.onClose(function () {
      OnlineCollection.remove(connection.id);
    });
  });

  Accounts.onLogin(function (info) {
    var connectionId = info.connection.id;
    var user = info.user;
    var userId = user._id;

    OnlineCollection.update(connectionId, {
      $set: {
        userId: userId,
        loginAt: new Date(),
      },
    });
    Meteor.users.update(userId, {
      $set: {
        online: true,
      },
    });
  });

  Accounts.onLogout(function (info) {
    var connectionId = info.connection.id;
    OnlineCollection.update(connectionId, {
      $set: {
        userId: "",
      },
    });
    Meteor.users.update(info.user._id, {
      $set: {
        online: false,
      },
    });
  });
}

var appRoot = require("app-root-path");
//   try{
//     SSLProxy({
//         port: 8080, //or 443 (normal port/requires sudo)
//         ssl : {
//           key: fs.readFileSync(appRoot.path + '/server/conf/key.pem'),
//           cert: fs.readFileSync(appRoot.path + '/server/conf/cert.pem')

//             //Optional CA
//             //Assets.getText("ca.pem")
//         }
//     });
//   }catch(error){
//     console.error(error)
//   }

var PATH_TO_KEY =
  appRoot.path + "/server/conf/28459803_srv5119-206152.vps.etecsa.cu.key";
var PATH_TO_CERT =
  appRoot.path + "/server/conf/28459803_srv5119-206152.vps.etecsa.cu.cert";
var httpProxy = require("http-proxy");
var options = {
  ssl: {
    key: fs.readFileSync(PATH_TO_KEY, "utf8"),
    cert: fs.readFileSync(PATH_TO_CERT, "utf8"),
  },
  target: "http://localhost:3000",
  ws: true,
  xfwd: true,
};
var server = httpProxy.createProxyServer(options).listen(5000);
console.log("httpProxy running with target at " + options.target);

// -------------------Este Proxy Funciona al FULLLLLLLLL-----------
// const proxy = require('@ucipass/proxy')
// const proxyPort = 3002
// proxy(proxyPort)
//   .then(() => {
//     // Use it for a while....
//   })
//   .then((server) => {
//     // console.log(server);
//     // server.stop()
//   })



// var httpProxy = require('http-proxy');
// const http = require("http");
// const basicAuth = require("basic-auth");
//   const port = 3003;
//   const target = "https://www.google.es";
//   const auth = "krly:lastunas123";

//   if (!(target && port && auth)) {
//     console.log("Usage: basic-auth-proxy-server <port> <backend> <auth>");
//     console.log(" - port       : port for proxy server e.g. 8000");
//     console.log(" - backend    : proxy target address e.g. http://localhost:3000");
//     console.log(" - auth       : {user}:{password} e.g. tom:12341234");
//     process.exit(1);
//   }

//   const proxy2 = httpProxy.createProxyServer();

//   http
//     .createServer(
//       {
//         ssl: {
//           key: fs.readFileSync(PATH_TO_KEY, "utf8"),
//           cert: fs.readFileSync(PATH_TO_CERT, "utf8"),
//         },
//       },
//       (req, res) => {
//         const [name, password] = auth.split(":");
//         const credential = basicAuth(req);
//         console.log(credential);

//         if (
//           !(
//             credential &&
//             credential.name === name &&
//             credential.pass === password
//           )
//         ) {
//           res.writeHead(401, {
//             "WWW-Authenticate": 'Basic realm="secret zone"',
//           });
//           res.end("Access denied");
//         } else {
//           //  console.log(req)
//           console.log(req.url);
//           // console.log(req.hostname)
//           var option = {
//             ssl: {
//               key: fs.readFileSync(PATH_TO_KEY, "utf8"),
//               cert: fs.readFileSync(PATH_TO_CERT, "utf8"),
//             },
//             ws: true,
//             xfwd: true,
//             // secure:true,
//             followRedirects: true,
//             hostRewrite: true,
//             autoRewrite: true,
//             changeOrigin: true,
//             ignorePath: true,
//             // selfHandleResponse:true,

//             target: req.url,
//           };
//           try {
//             proxy2.web(req, res, option);
//           } catch (error) {
//             console.log(error);
//           }
//           // console.log(req)
//         }
//       }
//     )
//     .listen(port);

// If the Links collection is empty, add some data.

// Meteor.users.allow({
//   instert() { return true; }
// });
Accounts.onCreateUser(function (options, user) {
  // console.log("options > " + JSON.stringify(options))
  // console.log("user > " + JSON.stringify(user))

    const profile = {
      firstName: options.firstName,
      lastName: options.lastName,
      role: options.role,
    };

    // user.username = options.firstName + options.lastName
    user.profile = profile;
    user.creadoPor = options.creadoPor;
    options.creadoPor == 'Server' || (user.bloqueadoDesbloqueadoPor = options.creadoPor);
    user.edad = options.edad;
    user.online = false;
    user.baneado = true;

    return user;

});
