function Smiley(){
  this.tags = []
}

Smiley.prototype.render = function() {
  if (this.tags.length < 1) {
    return
  }

  this.tags.forEach(function(tag) {
    window.console.log(tag)
    var listItem = document.createElement("li")
    var link = document.createElement("a")
    link.innerText = tag.name
    link.href = '#'

    listItem.appendChild(link)

    link.addEventListener('click', function(e) {
      e.preventDefault()
    })

    var menu = document.getElementById('menu')
    menu.appendChild(listItem)
  })
}


Smiley.prototype.getTags = function() {
  var req = new XMLHttpRequest()
  var self = this

  req.open('GET', 'http://localhost:1337/tags')

  req.onload = function() {
    if(req.status === 200) {
      data = JSON.parse(req.responseText)
      self.tags = data.tags
      self.render()
    }
  }

  req.send()
}

module.exports = new Smiley()
