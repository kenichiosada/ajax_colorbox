
// sample api returning json data
// by Open Weather Map
var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';

// Define them here so sub functions of module have access to it
var output = '';
var col;
var tblHeight = 200;
var tblWidth = 200;

// set table headers
var ColObj = {
  dateTime: { text:'Date', style:'column1' },
  tempMin: { text:'Tempereture Low', style:'column2' },
  tempMax: { text:'Tempereture Hight', style:'column3' },
  weather: { text:'Weather', style:'column4' },
};

// define objects for creating table
var createTableObj = {
  init: function(col) {
    this.addRow(col);
  },

  addRow: function(col) {
    output += '<ul>';
    for (var key in col) {
      if (col.hasOwnProperty(key)) {
         output += '<li class="' + col[key].style + '">' + col[key].text + '</li>'; 
      } 
    } 
    output += '</ul>';
  },

};

// get weather data
var weatherDataObj = {
  init: function(local) {
    this.getData(local);
  },

  getData: function(local) {
    $.ajax({
      type: 'GET',
      url: url + local,
      dataType: 'jsonp',
      context: this,
      success: function(data) {
        this.parseData(data);
        this.appendTable();
      }
    });
  },

  parseData: function(data) {
    for (var i=0; i < data.list.length; i++) {
      var newColObj = ColObj;
      newColObj.dateTime.text = data.list[i].dt;
      newColObj.tempMin.text = data.list[i].temp.min;
      newColObj.tempMax.text = data.list[i].temp.max;
      newColObj.weather.text = data.list[i].weather[0].description;
      createTableObj.addRow(newColObj);
      newColObj = null;
    }
  },

  appendTable: function() {
    $('#table').append(output); 
    $('#cboxLoadingGraphic').hide();
    tblHeight = $('#table').height();
    tblWidth = $('#table').width();
    appended =1;
    console.log('pos2');
    console.log(tblHeight);
    console.log(tblWidth);
    console.log(appended);
  }
}

// get json 
function getJsonData(local) {
  var appended;

  // open colorbox
  // later contents will be inserted
  $.colorbox({
    html:'<div id="table"></div>',
    scrolling: true,
    height: tblHeight,
    width: tblWidth,
    onComplete: function() {
      $('#cboxLoadingGraphic').show(); 
      createTableObj.init(ColObj);
      weatherDataObj.init(local);
    }
  });

//  createTableObj.init(ColObj);
//  weatherDataObj.init(local);

  console.log('pos1');
  console.log(tblHeight);
  console.log(tblWidth);
  console.log(appended);

  $.colorbox.resize({
    innerHeight: tblHeight,
    innerWidth:tblWidth 
  });
}

// todo 
// - add caching mechanism
// - format data to display
// - error handling
// - colorbox resize issue
