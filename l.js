
var submit = $('#ewok-submit-div').clone('withDataAndEvents')
submit.css('margin', '4px')
var rightBlock = $('#ewok-buds-display-block-right-0')
if (rightBlock.length > 0) {
  rightBlock.parent().after (submit)
}
else {
  $('h2:contains("For context only")').parent().before(submit)  
}

// Store it in the local storage
if (!localStorage.tasksMade) {
  localStorage.tasksMade = 0
  localStorage.estimatedTime = 0
  var date = new Date()
  localStorage.setItem("startTime", date.getTime());

}
else {
  alert ('čus')
  localStorage.tasksMade ++
  localStorage.estimatedTime = eval (localStorage.estimatedTime + '+' + GetEstimatedTime() )
  var now = new Date();
  var secondsSince = eval ("(" + now.getTime() + "-" + localStorage.startTime + ")/1000" )
  var minutesSince = Math.floor(secondsSince/60)
  var secSince = Math.floor(secondsSince%60)
  var minDiff = minutesSince + ":" + secSince.toString().padStart(2, "0")
}

function GetEstimatedTime () {
  return parseInt ( $('.ewok-estimated-task-weight').html().match(/[0-9]+/)[0] )
}

function getBoxDiv (){
 var div = `<div id="ukazatelTasks" style="position:absolute; right:0; background-color: yellow; margin: 5px">tasks made:<br>`
 div += "<h1>" + localStorage.tasksMade + "</h1>"
 div += "<br>average estimated time:<br>" 
 div += "<h1>" + localStorage.estimatedTime
 if (localStorage.estimatedTime !== "1") {
   div += "&nbsp;minutes</h1>"
 }
 else {
   div += "&nbsp;minute</h1>"
 }
 div += "<br>real time:<br>" 
 div += "<h1>" + minDiff +" minutes</h1>"
 div += `<a href="#" id="vynulovat">vynulovat</a>`
 div += "</div>"
 
 return div
}

$('.ewok-buds-card').first().before(getBoxDiv() )
$('#ewok-rater-header').after(getBoxDiv() )

$('#vynulovat').on('click', function() {
  localStorage.tasksMade = 0
  localStorage.estimatedTime = 0
  var date = new Date()
  localStorage.setItem("startTime", date.getTime())
  minDiff = 0
  $('#ukazatelTasks').html(getBoxDiv())
})
