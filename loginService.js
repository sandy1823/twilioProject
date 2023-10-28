const { Dbclient } = require('./dbConnect');
const { commonSendOtpService, commonVerfiTwilioNumber } = require('./mobileNumService');

const ACCOUNT_SID = 'AC2e734dc5c438a57e1db30b7ec441d1cf'
const AUTH_TOKEN = 'f13aa91158ec5e767d3984ba8d36ef35'

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);



async function signUpFunc(req, res) {
  const { name, email, mobileNumber } = req.body;
  console.log(`+91${mobileNumber}`, "getData", req.body);

  const insertQuery = `INSERT INTO userdetails(name, email, mobilenumber,status,password) VALUES ($1, $2, $3,$4,$5) RETURNING *`;
  const existingUser = `select * from userdetails where email=$1 and mobilenumber=$2`
  try {
    let result;
    const existingUserCheck = await Dbclient.query(existingUser, [email, mobileNumber])
    if (existingUserCheck.rows.length !== 0) {
      result = existingUserCheck
    } else {
      result = await Dbclient.query(insertQuery, [name, email, mobileNumber, 'INACTIVE', '123456789']);
    }

    console.log(result.rows);

    let verfiedNumber = await commonVerfiTwilioNumber(mobileNumber)
    console.log("aaaaaaaaaa", verfiedNumber);
    if (verfiedNumber.valid) {
      let getVerfiedNumber = [];
      await client.outgoingCallerIds.list((err, data) => {
        if (!err) {
          data.map((e, i) => {
            if (e.phoneNumber == `+91${mobileNumber}`) {
              getVerfiedNumber.push(e)
            }
          })
          // getVerfiedNumber.push(getNUmber)
          // console.log(getNUmber, "List of MobileNUmbers", data);
        } else {
          console.log("errrr", err);
        }
      })
      console.log(getVerfiedNumber, "getAllMobileNUmber", getVerfiedNumber.length);
      if (getVerfiedNumber.length !== 0) {
        const status = await commonSendOtpService(mobileNumber);
        if (status) {
          console.log("Statusssssssss", status);
          res.setHeader('X-Custom-Header', 'some-value');
          res.send({
            code: 600,
            data: result.rows[0],
            message: 'data saved successfully check your mobile number'
          }) // You may want to update this message
        }
      } else {
        res.send({
          code: 601,
          message: 'please add your number twilio account'
        })
      }
    }
  } catch (error) {
    console.log("errr", error);
    res.status(500).send('An error occurred while processing your request.');
  }

  // Your original code to send SMS is commented out, and you can include it here if needed.
  // However, ensure it's placed properly and handles asynchronous operations appropriately.
}

async function loginFunc(req, res) {
  const { email, password } = req.body;
  const selectQuery = `select * from userDetails where email=$1 and password=$2 and status=$3`;
  try {
    const result = await Dbclient.query(selectQuery, [email, password, 'ACTIVE']);
    console.log(result.rows.length);
    if (result.rows.length > 0) {
      res.setHeader('X-Custom-Header', 'some-value');
      res.send(result.rows);
    } else {
      res.send("Unauthorized user");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllUser(req, res) {
  const selectQuery = `select * from userDetails`;
  try {
    const result = await Dbclient.query(selectQuery, []);
    console.log(result.rows);
    if (result.rows.length !== 0) {
      res.setHeader('X-Custom-Header', 'some-value');
      res.send(result.rows);
    } else {
      res.send("Unauthorized user");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signUpFunc,
  loginFunc,
  getAllUser
}