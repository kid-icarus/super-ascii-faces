var fortune = require('fortune')

var app = fortune({adapter: 'mongodb', db: 'faces'}).resource('face', {
  content: String,
  tags: Array
}).readOnly()

app.resource('tag', {
  name: String
})

app.listen(1337)
