/**
 * when user click button confirm we check are his input date and time correct
 * if he ordered on past date we would inform him that it is impossible
 */
function isCorrectDate(){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date_now = new Date().toLocaleDateString();
  let date_set = new Date(document.getElementById('date').value).toLocaleDateString();
  // Compare date, does user order correct date
  if(date_set > date_now)
   return true;
   else if (date_set == date_now){

    //format date and compare hours and then minutes
    //  let time_now = new Date().toLocaleString().split(',')[1].split(':');
    //  let time_set = document.getElementById('time').value.split(':');
    //  if(Number(time_now[0])<Number(time_set[0])){
    //     return true;
    //  } else if(Number(time_now[0])==Number(time_set[0]) 
    //     && Number(time_now[1])<Number(time_set[1])){
    //    return true;
    //  }

    /**
     * toLocaleString - dd.mm.year, hour:minutes:sec
     * split(,) - [dd.mm.year] , [hour:minutes:sec]
     * split(',')[1] - [hour:minutes:sec]
     * split(':') - hour,minutes,sec
     * join('') - hourminutessec
     * For instance now 14:40 and we order at 15:00
     * 1440<1500 so time is correct
     * we add 00 to set time, bc time now is 144000, seconds
     */
    let time_now = new Date().toLocaleString().split(',')[1].split(':').join('');
    let time_set = document.getElementById('time').value.split(':').join('') + "00";
    if(Number(time_now) > Number(time_set))
      throw "You can not choose past date! " + "Today is " + 
       new Date().toLocaleDateString('en-US', options);
   }
}

function isCorrectTime(){
  let time = Number(document.getElementById('time').value.split(":")[0]);
  if(time>=23 || time<10) {
    throw "Closed! Restaurant is open from 10:00 till 23:00";
  }
}

/**
 * If user does not choose date or time or amount of tables he can not confirm order
 * after he choose at least one of above parametre he can confirm
 */
function visibleConfirmbtn(){
  let btn = document.getElementsByClassName('confirm')[0];
  btn.disabled = false;
  btn.style.opacity = 0.9;
  btn.style.width = "300px";
  btn.style.height = "70px";
}

function correctTime(){
  let correctTime = Math.round(Number(document.getElementById('time').value.split(':')[1])/10);
  let time;
  correctTime+="0";
  if(correctTime==="60") {
    time = document.getElementById('time').value.split(':')[0];
    time = time.charAt(0) + String(Number(time.charAt(time.length-1))+1);
    time += ":00";
  } else {
    time = document.getElementById('time').value.split(':')[0] + ":" + correctTime;  
  }
  return time;
}

function saveOrder(){
  let time = correctTime();
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  localStorage.setItem('date', document.getElementById('date').value);
  localStorage.setItem('time', time);
  document.getElementById('time').value = time;
  localStorage.setItem('countTables', document.getElementById('countTables').textContent);
  alert("You reserved: " + document.getElementById('countTables').textContent +
  " table(s) on "+ document.getElementById('time').value + " " 
  + new Date(document.getElementById('date').value).toLocaleDateString('en-US', options));
}

let minus = document.getElementById('minus');
minus.onclick = function(){
  //when we change amount of tables btn confrim is active then
  visibleConfirmbtn();
  let count = document.getElementById('countTables').textContent;
  if(Number(count)>0)
    document.getElementById('countTables').innerHTML = Number(count)-1;
}

let plus = document.getElementById('plus');
plus.onclick = function(){
  //when we change amount of tables btn confrim is active then
  visibleConfirmbtn();
  let count = document.getElementById('countTables').textContent;
  if(Number(count)<20)
    document.getElementById('countTables').innerHTML = Number(count)+1;
}

let reset = document.getElementsByClassName('arrow')[0];
reset.onclick = function(){
  localStorage.clear();
  document.getElementById('date').valueAsDate = new Date();
  document.getElementById('countTables').innerHTML = "2";
  document.getElementById('time').value = 
    new Date().toLocaleString().split(',')[1].split(':').splice(0,2).join(":").trim();
}

if(localStorage.getItem('date') && localStorage.getItem('time')){
  document.getElementById('date').value = localStorage.getItem('date');
  document.getElementById('time').value = localStorage.getItem('time');
  document.getElementById('countTables').innerHTML = localStorage.getItem('countTables');
  } else { 
    document.getElementById('date').valueAsDate = new Date();
}

let buttonConfirm = document.getElementsByClassName('confirm')[0];
buttonConfirm.onclick = function(){
  try{
    isCorrectDate();
    isCorrectTime();
    saveOrder();
  } catch(err){
    alert(err);
  }
  // if(isCorrectDate()){
  //   saveOrder();
  //   localStorage.setItem('date', document.getElementById('date').value);
  //   localStorage.setItem('time', document.getElementById('time').value);
  //   localStorage.setItem('countTables', document.getElementById('countTables').textContent);
  //   alert("You reserved: " + document.getElementById('countTables').textContent +
  //   " table(s) on "+ document.getElementById('time').value + " " 
  //   + new Date(document.getElementById('date').value).toLocaleDateString('en-US', options));
  // } else {
  //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   alert("You can not choose past date! " + "Today is " + 
  //   new Date().toLocaleDateString('en-US', options));
  // }
}

document.getElementById('date').onchange = visibleConfirmbtn;
document.getElementById('time').onchange = visibleConfirmbtn;