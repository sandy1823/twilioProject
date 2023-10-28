const { Dbclient } = require('./dbConnect');

const ACCOUNT_SID = 'AC2e734dc5c438a57e1db30b7ec441d1cf'
const AUTH_TOKEN = 'f13aa91158ec5e767d3984ba8d36ef35'
const verfiyServiceSID = 'VA7c14832ff8a8fc0860714ced99e9c20f'
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

async function sendOTP(req, res) {
    console.log("reqqqqqqqq", req.query.number);
    let mobileNumber = req.query.number;
    let status = commonSendOtpService(mobileNumber);
    console.log("Statusssssssss", status);
    if (status) {
        console.log("Statusssssssss", status);
        res.send(status)
    }
}

async function verifyOTP(req, res) {
    const { mobileNumber, otp } = req.body;
    let status;
    await client.verify.v2.services(verfiyServiceSID)
        .verificationChecks
        .create({ to: `+91${mobileNumber}`, code: otp })
        .then(verification_check => {
            status = verification_check.status
            console.log(verification_check)
        }).catch((err) => {
            console.log("errr", err);
            res.send({
                code: 607,
                message: 'The request was not found try next time'
            });
            // throw err;
        })
    console.log("stausssssss ver", status);
    if (status == 'approved') {
        let updateQuery = `update userDetails set status = $1 where mobileNumber = $2 RETURNING *`
        const result = await Dbclient.query(updateQuery, ['ACTIVE', mobileNumber]);
        console.log(result.rows);
        if (result.rows.length !== 0) {
            console.log("Statusssssssss", status);
            res.setHeader('X-Custom-Header', 'some-value');
            res.send({
                code: 600,
                message: 'successfully verfied'
            }); // You may want to update this message
        }else{
            res.send({
                code: 601,
                message: 'OTP mismatch'
            });
        }

    }
}


async function commonSendOtpService(mobileNumber) {
    return await client.verify.v2.services(verfiyServiceSID)
        .verifications
        .create({ to: `+91${mobileNumber}`, channel: 'sms' })
        .then(verification => {
            console.log(verification, "verification****");
            console.log(verification.status)
            return verification.status
        }).catch((err) => {
            console.log("ERRR", err);
        })
}


async function commonVerfiTwilioNumber(mobileNumber) {

    return client.lookups.v2.phoneNumbers(`+91${mobileNumber}`)
        .fetch()
        .then(phone_number => {
            console.log(phone_number.phoneNumber)
            return phone_number
        }
        ).catch(err => console.log("err", err))
}
module.exports = { sendOTP, verifyOTP, commonSendOtpService, commonVerfiTwilioNumber }