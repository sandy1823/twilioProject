var { Client } = require('pg')

var Dbclient = new Client({
    port: '5432',
    host: 'localhost',
    user: 'postgres',
    password: 'santhosh',
    database: 'smartusers'
})


Dbclient.connect().then((res) => {
    console.log("resss", res);
}).catch((err) => console.log(err, "err"))


module.exports={
    Dbclient
}


// async function verifyOTP(req, res) {
//     const { mobileNumber, otp } = req.body;
//     let status;
//     client.verify.v2.services(verfiyServiceSID)
//         .verificationChecks
//         .create({ to: `+91${mobileNumber}`, code: '011140' })
//         .then(verification_check => {
//             status = verification_check.status
//             console.log(verification_check)
//         }).catch((err) => {
//             console.log("errr", err);
//         })
//         console.log("stausssssss",status);
//     if (status) {
//         res.send(status)
//     }
// }