let minus = document.getElementById('minus');
minus.onclick = function(){
  let count = document.getElementById('countTables').textContent;
  if(Number(count)>0)
    document.getElementById('countTables').innerHTML = Number(count)-1;
}

let plus = document.getElementById('plus');
plus.onclick = function(){
  let count = document.getElementById('countTables').textContent;
  if(Number(count)<20)
    document.getElementById('countTables').innerHTML = Number(count)+1;
}
