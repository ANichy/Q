// GET запросы к APi графики
var AJAX = (url,type) => {
  return fetch(url)
  .then(function(res){
    if (type == 'json') return res.json()
    if (type == 'text') return res.text()
  })
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
}



//подгрузка графиков в слайды
var LOAD_STAT = (param) => {
  //SET_URL_PARAMS(Url,'charts',param)
  AJAX('/api/get-chart'+param+'/report/165/?format=json','json')
  .then(result => window[('CHART'+param)](result))
}




  document.getElementById('sla6').onclick = function() {
    LOAD_STAT(6)
    alert(1)
  }

/*
  document.getElementById('sla1').onclick = () => {
    LOAD_STAT(1)
  }


  document.getElementById('sla2').onclick = () => {
    LOAD_STAT(2)
  }


  document.getElementById('sla3').onclick = () => {
    LOAD_STAT(3)
  }


  document.getElementById('sla4').onclick = () => {
    LOAD_STAT(4)
  }


  document.getElementById('sla5').onclick = () => {
    LOAD_STAT(5)
  }





  document.getElementById('sla7').onclick = () => {
    LOAD_STAT(7)
  }


  document.getElementById('sla8').onclick = () => {
    LOAD_STAT(8)
  }



  document.getElementById('sla9').onclick = () => {
    LOAD_STAT(9)
  }


  */
