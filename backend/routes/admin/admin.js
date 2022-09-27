const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const cryptoJS = require(`crypto-js`);
const jwt = require(`jsonwebtoken`);
const config = require(`../../config`);
const { MD5 } = require("crypto-js");

const router = express.Router();

router.post("/login", (request, response) => {
  const { mobileNo, password } = request.body;
  const encryptedPassword = String(cryptoJS.MD5(password));
  const statement = `select adminId , name , emailId from admin
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
        const token = jwt.sign({ id: user.adminId }, config.secret);

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
