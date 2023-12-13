const http = require("http");
const fs = require("fs");
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let regsitrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html",(err,registration) => {
  if (err) {
    throw err;
  }
  regsitrationContent = registration;
});

// http
//   .createServer((request, response) => {
//     let url = request.url;
//     response.writeHeader(200, { "Content-Type": "text/html" });
//     switch (url) {
//       case "/project":
//         response.write(projectContent);
//         response.end();
//         break;
//       case "/registration":
//         response.write(regsitrationContent);
//         response.end();
//         break;
//       default:
//         response.write(homeContent);
//         response.end();
//         break;
//     }
//   })
// .listen(3000);

const server = http.createServer((request, response) => {
  let url = request.url;
  response.writeHead(200, { "Content-Type": "text/html" });
  switch (url) {
    case "/project":
      response.write(projectContent);
      break;
    case "/registration":
      response.write(registrationContent);
      break;
    default:
      response.write(homeContent);
      break;
  }
  response.end();
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});