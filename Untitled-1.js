for(var i = 0; i < results.links.length; i++){
  console.log('url: ' + results.links[i].url + ' => status: ' + results.links[i].status)
  if(results.links[i].status === 404) {
  worksheet.cell(n,m).link(results.links[i].url).style(style)
  } else {
    worksheet.cell(n,m).link(results.links[i].url)
  }
  m++ 
  if(results.links[i].status !== undefined) {
    if(results.links[i].status === 404) {
  worksheet.cell(n,m).number(results.links[i].status).style(style)
  } else {
    worksheet.cell(n,m).number(results.links[i].status)
  }
  n++
  m = 1
  } else {
    continue
  }
} 



for(var i = 0; i < results.links.length; i++){
    console.log('url: ' + results.links[i].url + ' => status: ' + results.links[i].status)
    worksheet.cell(n,m).link(results.links[i].url)
    m++
    if(results.links[i].status !== undefined){
    worksheet.cell(n,m).number(results.links[i].status)
    n++
    m = 1
    } else {
      continue
    }
  } 