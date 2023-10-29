const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const LoginRoute = require('./loginRouter')
const mobilNumRoute = require('./mobileNumRouter')

app.use('/loginRoute', LoginRoute)
app.use('/mobileNum', mobilNumRoute)



process.on('uncaughtException', function (err) {
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
	console.error(err.stack)
	process.exit(1)
  });
  
  process.on('unhandledRejection', function (err) {
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
	console.error(err.stack)
	process.exit(1)
  });
app.listen(4000, () => {
    console.log('post listen 4000');
})