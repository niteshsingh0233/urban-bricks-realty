const utils = require(`./utils`);
const jwt = require("jsonwebtoken");
const config = require(`./config`);

const client = (request, response, next) => {
  console.log("request.url -: ", request.url);
  if (request.url === `/api/` || request.url === "/api/admin/login" ||
  || request.url === "/api/user/login") {
    next();
  } else {
    const token = request.headers.token;
    if (!token || token.length === 0) {
      response.send(utils.createResult("missing token"));
    } else {
      try {
        const payload = jwt.verify(token, config.secret);
        request.id = payload.id;

        next();
      } catch (ex) {
        response.send(utils.createResult(`invalid token`));
      }
    }
  }
};

module.exports = { client };
