const link = require('linkinator')
var excel = require('excel4node')
const express = require('express')
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({extended: true})


const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: true}))
const publicDirectoryPath = __dirname
app.use(express.static(publicDirectoryPath))

app.post('/submit', urlencodedParser, function(req,res){

  input = req.body.textField
  
  async function simple() {
    
    const results = await link.check({
      path: input
    })
  
console.log(`Passed: ${results.passed}`)
    
var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('Sheet 1')

  
var n = 1
var m = 1

for(var i = 0; i < results.links.length; i++){
  console.log('url: ' + results.links[i].url + ' => status: ' + results.links[i].status)
  if(results.links[i].status === 404) {
  worksheet.cell(n,m).link(results.links[i].url).style({font: {color: '#FF0000'}})
  } else {
    worksheet.cell(n,m).link(results.links[i].url)
  }
  m++ 
  if(results.links[i].status !== undefined) {
    if(results.links[i].status === 404) {
  worksheet.cell(n,m).number(results.links[i].status).style({font: {color: '#FF0000'}})
  } else {
    worksheet.cell(n,m).number(results.links[i].status)
  }
  n++
  m = 1
  } else {
    continue
  }
} 

workbook.write('Excel.xlsx')
setTimeout(function(){res.download('Excel.xlsx') }, 5000);
}

simple()
})






app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
