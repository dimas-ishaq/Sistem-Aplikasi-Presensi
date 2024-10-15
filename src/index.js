const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 3000
const staffRouter = require('./routes/staffRoutes');
const cookieParser = require('cookie-parser');
dotenv.config()

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());

app.use('/api', staffRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})