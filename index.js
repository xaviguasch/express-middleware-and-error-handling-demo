const express = require('express')
const app = express()
const morgan = require('morgan')

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
  throw new Error('Password required!')
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

app.use((req, res) => {
  res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => {
  console.log('***********************')
  console.log('********ERROR***********')
  console.log('***********************')
  // res.status(500).send('WE GOT AN ERROR!')
  next(err)
})

app.listen(3001, () => {
  console.log('App is running on localhost:3000')
})
