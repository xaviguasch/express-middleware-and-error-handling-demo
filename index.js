const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const AppError = require('./AppError')

app.use(cors())
app.use(morgan('tiny'))

app.use((req, res, next) => {
  req.requestTime = Date.now()
  console.log(req.method, req.path)
  next()
})

app.use('/dogs', (req, res, next) => {
  console.log('I LOVE DOGS!!')
  next()
})

const verifyPassword = (req, res, next) => {
  const { password } = req.query
  if (password === 'chickennugget') {
    next()
  }
  // res.send('YOU NEED A PASSWORD!')
  throw new AppError('Password required', 401)
}

app.get('/', (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`)
  res.send('HOME PAGE!')
})

app.get('/error', (req, res) => {
  chicken.fly()
})

app.get('/dogs', (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`)
  res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => {
  res.send(
    'MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone'
  )
})

app.get('/admin', (req, res) => {
  throw new AppError('You are not an Admin!', 403)
})

app.use((req, res) => {
  res.status(404).send('NOT FOUND!')
})

// app.use((err, req, res, next) => {
//   console.log('***********************')
//   console.log('********ERROR***********')
//   console.log('***********************')
//   // res.status(500).send('WE GOT AN ERROR!')
//   next(err)
// })

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err
  res.status(status).send(message)
})

app.listen(3001, () => {
  console.log('App is running on localhost:3000')
})
