Highcharts.setOptions({
    lang: {
        resetZoom: "Сброс зума"
    },
    credits:{
        enable:false,
    },

    plotOptions: {
        series: {
           animation: false
       }
    },

    mapNavigation: {
          enabled: true,
          enableButtons: false,
          enableDoubleClickZoom:true,
    },
});



function remove_duplicates(arr) {
    let s = new Set(arr);
    let i = s.values();
    return Array.from(i);
}




//1 Доля выполненных в срок ====================================================================
function CHART1(data){
  Highcharts.chart('sla1', {
      chart: {
       // zoomType: 'x',
      },

      title: {
          text: 'Доля выполненных в срок'
      },
      xAxis: [{
          categories: data.map(d=>d.week),
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value} %',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      series: [{
          name: 'Доля выполненных в срок',
          color:'#6f349f',
          label:false,
          dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+' %';
            }
          },
          marker: {
            symbol: 'square'
          },
          yAxis: 0,
          cursor:'pointer',
          point: {
              events: {
                  click: function (e) {
                      //console.log(this);
                      hs.htmlExpand(null, {
                          pageOrigin: {
                              x: e.pageX || e.clientX,
                              y: e.pageY || e.clientY
                          },
                          headingText: this.series.name,
                          maincontentText: this.x + ' sessions',            //Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +

                          width: 'auto'
                      });
                  }
              }
          },
          data:data.map(d=>d.part_on_time),
      },
      /*{
          name: 'linear( Доля выполненых в срок )',
          color:'#ccc',
          label:false,
          data:data.map(d=>d.part_on_time_linear),
          marker: {
            enabled: false
          },
          dashStyle: 'dot',
      },*/ {
          name: 'Цель',
          color:'#89d5ac',
          label:false,
          data:data.map(d=>d.target),
          marker: {
            enabled: false
          },
      }, {
          name: 'Запланировано требований',
          yAxis: 1,
          color:'#0d975f',
          label:false,
          data: data.map(d=>d.planned),
          dataLabels: {
            enabled: true
          },
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
// end Доля выполненных в срок
}

 
//2 Доля выполненных в срок (по вводу в эксплуатацию) ====================================================================
function CHART2(data){
  Highcharts.chart('sla2', {
      chart: {
          type: 'column',
          //////zoomType: 'xy',,
      },
      mapNavigation: {
          enabled: true,
          enableButtons: false,
          enableDoubleClickZoom:true,
          duration:false,
      },
      title: {
          text: 'Доля выполненных в срок (по вводу в эксплуатацию)'
      },
      xAxis: [{
          categories: data.map(d=>d.week),
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value} %',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      plotOptions: {
           column: {
               stacking: 'normal',
               dataLabels: {
                   enabled: true,
                   color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
               }
           }
       },
      series: [{
          type:'column',
          stack: 'implement',
          name: 'Реализовано из просроченых',
          color:'#ffbe00',
          dataLabels: {
            enabled: true,
          },
          data:data.map(d=>d.implemented_overdue),
      },
      {
          type:'column',
          stack: 'implement',
          name: 'Реализовано в срок',
          color:'#10ae51',
          data: data.map(d=>d.implemented_on_time),
          dataLabels: {
            enabled: true
          },
      },
      {   type:'line',
          name: '% в срок',
          yAxis: 1,
          label:false,
          color:'#159a65',
          data: data.map(d=>d.on_time),
          dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+' %';
            }
          },
          zIndex:10,
      },],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
//end Доля выполненных в срок (по вводу в эксплуатацию)
}


//3 SLA реализация требований XS ====================================================================
function CHART3(data){
  Highcharts.chart('sla3', {
      chart:{
          //zoomType: 'xy',
      },
      title: {
          text: 'Доля выполненных в срок'
      },
      xAxis: [{
          categories: data.map(d=>d.week),// [{% for item in sla1 %}'{{item.week}}',{% endfor %}],
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value} %',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      
      series: [{
          name: 'Доля выполненных в срок',
          color:'#6f349f',
          label:false,
          dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+' %';
            }
          },
          marker: {
            symbol: 'square'
          },
          yAxis: 0,
          cursor:'pointer',
          point: {
              events: {
                  click: function (e) {
                      //console.log(this)
                      hs.htmlExpand(null, {
                          pageOrigin: {
                              x: e.pageX || e.clientX,
                              y: e.pageY || e.clientY
                          },
                          headingText: this.series.name,
                          maincontentText: this.x + ' sessions',            //Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +

                          width: 'auto'
                      });
                  }
              }
          },
          data:data.map(d=>d.part_on_time),
      },
      {
          name: 'Цель',
          color:'#89d5ac',
          label:false,
          data:data.map(d=>d.target),
          marker: {
            enabled: false
          },
      }, {
          name: 'Запланировано требований',
          yAxis: 1,
          color:'#0d975f',
          label:false,
          data: data.map(d=>d.planned),
          dataLabels: {
            enabled: true
          },
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
}
// end SLA реализация требований XS




//4 SLA преданализ в срок ================================================================
function CHART4(data){
  Highcharts.chart('sla4', {
      chart:{
          //zoomType: 'xy',
      },
      title: {
          text: 'SLA преданализа, %в срок'
      },
      xAxis: [{
          categories: data.map(d=>d.week),
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value} %',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }],
      
      series: [{
          name: 'Доля выполнения норматива',
          color:'#6f349f',
          label:false,
          yAxis: 0,
          dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,0)+' %';
            }
          },
          marker: {
            symbol: 'square'
          },
          cursor:'pointer',
          point: {
              events: {
                  click: function (e) {
                      hs.htmlExpand(null, {
                          pageOrigin: {
                              x: e.pageX || e.clientX,
                              y: e.pageY || e.clientY
                          },
                          headingText: this.series.name,
                          maincontentText: this.x + ' sessions',            //Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +

                          width: 'auto'
                      });
                  }
              }
          },
          data:data.map(d=>d.part_standart),
      },
      {
          name: 'Цель',
          color:'#89d5ac',
          label:false,
          data:data.map(d=>d.target),
          marker: {
            enabled: false
          },
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
}


//5 SLA средняя длительность
function CHART5(data){
  Highcharts.chart('sla5', {
      chart:{
          //zoomType: 'xy',
      },
      title: {
          text: 'Ср. длительность'
      },
      xAxis: [{
          categories: data.map(d=>d.week),
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: null,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      
      series: [{
          name: 'Ср. длительность',
          color:'#6f349f',
          label:false,
          yAxis: 1,
          zIndex:10,
          dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2);
            }
          },
          marker: {
            symbol: 'square'
          },
          cursor:'pointer',
          point: {
              events: {
                  click: function (e) {
                      console.log(this)
                      hs.htmlExpand(null, {
                          pageOrigin: {
                              x: e.pageX || e.clientX,
                              y: e.pageY || e.clientY
                          },
                          headingText: this.series.name,
                          maincontentText: this.x + ' sessions',            //Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +

                          width: 'auto'
                      });
                  }
              }
          },
          data:data.map(d=>d.average_duration),
      },
      {
          name: 'Число RFC',
          color:'#89d5ac',
          label:false,
          yAxis: 0,
          dataLabels: {
            enabled: true,
          },
          data:data.map(d=>d.count_rfc),
      },{
          name: 'Норматив',
          color:'#89d5ac',
          label:false,
          yAxis: 1,
          data:data.map(d=>d.standard),
          marker: {
            enabled: false
          },
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
}



// 6 SLA доступность GF
//(Платежи,Самообслуживание,Тарификация,Управление услугами абонентов,Продажи GF,Макс цель,Сред цель,Мин цель)
function CHART6(data){
    Highcharts.chart('sla6', {
    chart: {
        type: 'spline',
        //zoomType: 'xy',
    },
    title: {
        text: 'SLA доступность GF (Неделя)'
    },
    subtitle: {
        text: '(Платежи,Самообслуживание,Тарификация,Управление услугами абонентов,Продажи GF,Макс цель,Сред цель,Мин цель)'
    },
    xAxis: [{
        categories: data.map(d=>d.week),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value:,.2f} %',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: [
      {
        name: 'Платежи',
        data: data.map(d=>d.payments),
        label:false,
        color:'#333399',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Самообслуживание',
        data: data.map(d=>d.self_service),
        label:false,
        color:'#008000',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Тарификация',
        data: data.map(d=>d.billing),
        label:false,
        color:'#ff9900',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Управление услугами абонентов',
        data: data.map(d=>d.control_services),
        color:'#993300',
        label:false,
        marker: {
          enabled: false
        },
      },
      {
        name: 'Продажи GF',
        data: data.map(d=>d.sales),
        label:false,
        color:'#808080',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Макс. цель',
        data: data.map(d=>d.max_target),
        label:false,
        color:'#99cc00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Сред. цель',
        data: data.map(d=>d.middle_target),
        label:false,
        color:'#ffff00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Мин. цель',
        data: data.map(d=>d.min_target),
        label:false,
        color:'#ff0000',
        marker: {
          enabled: false
        },
      }
  ],
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}





// 7 SLA доступность GF
//(Платежи,Самообслуживание,Тарификация,Управление услугами абонентов,Продажи GF,Макс цель,Сред цель,Мин цель)
function CHART7(data){
    Highcharts.chart('sla7', {
    chart: {
        type: 'spline',
        //zoomType: 'xy',
    },
    title: {
        text: 'SLA доступность GF (Накопительно)'
    },
    subtitle: {
        text: '(Платежи,Самообслуживание,Тарификация,Управление услугами абонентов,Продажи GF,Макс цель,Сред цель,Мин цель)'
    },
    xAxis: [{
        categories: data.map(d=>d.week),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value:,.2f} %',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: [
      {
        name: 'Платежи',
        data: data.map(d=>d.payments),
        label:false,
        color:'#333399',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Самообслуживание',
        data: data.map(d=>d.self_service),
        label:false,
        color:'#008000',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Тарификация',
        data: data.map(d=>d.billing),
        label:false,
        color:'#ff9900',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Управление услугами абонентов',
        data: data.map(d=>d.control_services),
        color:'#993300',
        label:false,
        marker: {
          enabled: false
        },
      },
      {
        name: 'Продажи GF',
        data: data.map(d=>d.sales),
        label:false,
        color:'#808080',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Макс. цель',
        data: data.map(d=>d.max_target),
        label:false,
        color:'#99cc00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Сред. цель',
        data: data.map(d=>d.middle_target),
        label:false,
        color:'#ffff00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Мин. цель',
        data: data.map(d=>d.min_target),
        label:false,
        color:'#ff0000',
        marker: {
          enabled: false
        },
      }
  ],
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}














// 8 SLA доступность GF
//(обслуживание)
function CHART8(data){
  //console.log(data.map(d=>d.week))
    Highcharts.chart('sla8', {
    chart: {
        type: 'spline',
        //zoomType: 'xy',
    },
    title: {
        text: 'SLA доступность GF (Неделя)'
    },
    subtitle: {
        text: 'Обслуживание'
    },
    xAxis: [{
        categories: data.map(d=>d.week),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value:,.2f} %',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: [

      {
        name: 'Обслуживание',
        data: data.map(d=>d.service),
        label:false,
        color:'#008000',
        marker: {
          enabled: false
        },
      },

      {
        name: 'Макс. цель',
        data: data.map(d=>d.max_target),
        label:false,
        color:'#99cc00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Сред. цель',
        data: data.map(d=>d.middle_target),
        label:false,
        color:'#ffff00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Мин. цель',
        data: data.map(d=>d.min_target),
        label:false,
        color:'#ff0000',
        marker: {
          enabled: false
        },
      }
  ],
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}



// 9 SLA доступность GF
//(обслуживание)
function CHART9(data){
    Highcharts.chart('sla9', {
    chart: {
        type: 'spline',
        //zoomType: 'xy',
    },
    title: {
        text: 'SLA доступность GF (Накопительно)'
    },
    subtitle: {
        text: 'Обслуживание'
    },
    xAxis: [{
        categories: data.map(d=>d.week),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value:,.2f} %',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: [

      {
        name: 'Обслуживание',
        data: data.map(d=>d.service),
        label:false,
        color:'#008000',
        marker: {
          enabled: false
        },
      },

      {
        name: 'Макс. цель',
        data: data.map(d=>d.max_target),
        label:false,
        color:'#99cc00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Сред. цель',
        data: data.map(d=>d.middle_target),
        label:false,
        color:'#ffff00',
        marker: {
          enabled: false
        },
      },
      {
        name: 'Мин. цель',
        data: data.map(d=>d.min_target),
        label:false,
        color:'#ff0000',
        marker: {
          enabled: false
        },
      }
  ],
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}





















// 10 SLA Аварии в срок GF A2, A3
//(обслуживание)
function CHART10(data){

  var months = [];
  var sections = [];
  for (a of data.map(d=>d.month)){
      for (i of a){
        months.push(i.month)
      }
  }
  for (a of data.map(d=>d.section)){
      for (i of a){
        sections.push(i.section)
      }
  }

 var series = [];


 for(a of remove_duplicates(sections)){

   var d_m = [];
   for (m of data.map(d=>d.section)){
     var c = m.filter(d_m => d_m.section == a).map(d => d.data)[0];
     d_m.push(c)
   }

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }




 for(a of remove_duplicates(months)){

     var d_m = [];
     for (m of data.map(d=>d.month)){
       var c = m.filter(d_m => d_m.month == a).map(d => d.data)[0];
       var b = m.filter(d_m => d_m.month == a).map(d => d.month);
       d_m.push(c)
     }

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }


 series.push({
     name: 'За год',
     data: data.map(d=>d.year),
     label:false,
     color:'#ff0000',
     dataLabels: {
       enabled: true,
     },
     marker: {
       enabled: true
     },
   },

   {
     name: 'Макс. цель',
     data: data.map(d=>d.max_target),
     label:false,
     color:'#99cc00',
     marker: {
       enabled: false
     },
   },
   {
     name: 'Мин. цель',
     data: data.map(d=>d.min_target),
     label:false,
     color:'#008000',
     marker: {
       enabled: false
     },

 })

    Highcharts.chart('sla10', {
    title: {
        text: 'SLA Аварии в срок GF'
    },
    subtitle: {
        text: 'A2, A3'
    },
    xAxis: [{
        categories: data.map(d=>d.domain),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value}',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: series,
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}












// 11 SLA Аварии в срок GF A4
//(обслуживание)
function CHART11(data){

  var months = []
  var sections = []
  for (a of data.map(d=>d.month)){
      for (i of a){
        months.push(i.month)
      }
  }
  for (a of data.map(d=>d.section)){
      for (i of a){
        sections.push(i.section)
      }
  }

 var series = []

 for(a of remove_duplicates(sections)){

   var d_m = []
   for (m of data.map(d=>d.section)){
     var c = m.filter(d_m => d_m.section == a).map(d => d.data)[0];
     d_m.push(c)
   }
   //console.log(d_m)

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }




 for(a of remove_duplicates(months)){

     var d_m = []
     for (m of data.map(d=>d.month)){
       var c = m.filter(d_m => d_m.month == a).map(d => d.data)[0];
       var b = m.filter(d_m => d_m.month == a).map(d => d.month);
       d_m.push(c)
     }

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }


 series.push({
     name: 'За год',
     data: data.map(d=>d.year),
     label:false,
     color:'#ff0000',
     dataLabels: {
       enabled: true,
     },
     marker: {
       enabled: true
     },
   },

   {
     name: 'Макс. цель',
     data: data.map(d=>d.max_target),
     label:false,
     color:'#99cc00',
     marker: {
       enabled: false
     },
   },
   {
     name: 'Мин. цель',
     data: data.map(d=>d.min_target),
     label:false,
     color:'#008000',
     marker: {
       enabled: false
     },

 })

 //console.log(series)

    Highcharts.chart('sla11', {
    title: {
        text: 'SLA Аварии в срок GF'
    },
    subtitle: {
        text: 'A4'
    },
    xAxis: [{
        categories: data.map(d=>d.domain),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value}',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: series,
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});



}









function CHART12(data){

  var months = [];
  var sections = [];
  for (a of data.map(d=>d.month)){
      for (i of a){
        months.push(i.month)
      }
  }
  for (a of data.map(d=>d.section)){
      for (i of a){
        sections.push(i.section)
      }
  }

 var series = [];

 for(a of remove_duplicates(sections)){

   var d_m = [];
   for (m of data.map(d=>d.section)){
     var c = m.filter(d_m => d_m.section == a).map(d => d.data)[0];
     d_m.push(c)
   }
   //console.log(d_m)

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }




 for(a of remove_duplicates(months)){

     var d_m = []
     for (m of data.map(d=>d.month)){
       var c = m.filter(d_m => d_m.month == a).map(d => d.data)[0];
       var b = m.filter(d_m => d_m.month == a).map(d => d.month);
       d_m.push(c)
     }

     series.push({
       type:'column',
       name: a,
       data:d_m,
       label:false,
       marker: {
         enabled: true
       },
   })

 }


 series.push({
     name: 'За год',
     data: data.map(d=>d.year),
     label:false,
     color:'#ff0000',
     dataLabels: {
       enabled: true,
     },
     marker: {
       enabled: true
     },
   },

   {
     name: 'Макс. цель',
     data: data.map(d=>d.max_target),
     label:false,
     color:'#99cc00',
     marker: {
       enabled: false
     },
   },
   {
     name: 'Мин. цель',
     data: data.map(d=>d.min_target),
     label:false,
     color:'#008000',
     marker: {
       enabled: false
     },

 })

 //console.log(series)

    Highcharts.chart('sla12', {
    title: {
        text: 'SLA Аварии в срок GF'
    },
    subtitle: {
        text: 'A5'
    },
    xAxis: [{
        categories: data.map(d=>d.domain),
        crosshair: true
    }],
    yAxis: [{
        labels: {
            //format: '{value} %',
            format: '{value}',
            tickInterval:0.2,
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: null,
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

    }],
    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        },

    },
    series: series,
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});

}




























