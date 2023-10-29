var { Client } = require('pg')

var clientUrl = `PGPASSWORD=nZdtFL9UumjIfGmnjMFFBuEUOy0cUBuH psql -h dpg-ckv1bmjamefc73d96cm0-a.singapore-postgres.render.com -U smartusers_user smartusers`

// var Dbclient = new Client({
//     port: '5432',
    
//     host: 'dpg-ckv1bmjamefc73d96cm0-a',
//     user: 'smartusers_user',
//     password: 'nZdtFL9UumjIfGmnjMFFBuEUOy0cUBuH',
//     database: 'smartusers'
// })

var Dbclient = new Client({
    connectionString:'postgres://smartusers_user:nZdtFL9UumjIfGmnjMFFBuEUOy0cUBuH@dpg-ckv1bmjamefc73d96cm0-a/smartusers'
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