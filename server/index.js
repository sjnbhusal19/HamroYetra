const express = require('express')
const app = express()
const port = 4000

app.get('/me', (req, res) => {
  res.send({
    name:"sujan",
    message:"Hello World"
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
