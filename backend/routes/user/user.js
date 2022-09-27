const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const cryptoJS = require(`crypto-js`);
const jwt = require(`jsonwebtoken`);
const config = require(`../../config`);
const { MD5 } = require("crypto-js");

const router = express.Router();

router.post("/signup", (request, response) => {
  const { name, emailId, mobileNo, password } = request.body;
  console.log(request.body);
  const encryptedPassword = String(cryptoJS.MD5(password));
  const statement = `insert into user (name,  emailId , mobileNo, password) values(?,?,?,?)`;

  db.pool.query(
    statement,
    [name, emailId, mobileNo, password],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.post("/login", (request, response) => {
  const { mobileNo, password } = request.body;
  const encryptedPassword = String(cryptoJS.MD5(password));
  const statement = `select userId , name , emailId from user
                  where  mobileNo = ? and password = ?`;
  console.log(request.body);
  db.pool.query(statement, [mobileNo, password], (error, users) => {
    //console.log(users[0].admin_id);
    const result = {};
    if (error) {
      result[`status`] = `error`;
      result[`error`] = error;
    } else {
      if (users.length == 0) {
        result[`status`] = `error`;
        result[`error`] = "admin does not exist";
      } else {
        const user = users[0];
        result.status = "success";
        const token = jwt.sign({ id: user.userId }, config.secret);

        result.data = {
          name: user.name,

          token,
        };
      }
    }
    response.send(result);
  });
});

module.exports = router;
