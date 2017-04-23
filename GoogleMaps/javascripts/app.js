/**
* SETUP
**/
var app = app || {};


/**
* MODELS
**/
app.Message = Backbone.Model.extend({
    url: function() {
         return 'http://192.168.1.104/1/weather';
    },
    id: null,
    defaults: {
        success: false,
        errfor: {},
        lat: 25.048467,
        lon: 121.553963,
        value: 0
    }
});

/**
* VIEWS
**/
app.ContentView = Backbone.View.extend({
    el: '#map',
    events: {
    },
    // constructor
    initialize: function() {
        this.model = new app.Message();
        this.model.bind('change', this.render, this);

        this.model.fetch({
            success: function(model, response, options) {
            }
        });
    },
    render: function() {
        var coord = {
	    lat: this.model.get('lat'),
	    lon: this.model.get('lon'),
	};
        var myLatLng = {lat: coord.lat, lng: coord.lon};

        var value = this.model.get('value');

        var map = new google.maps.Map(this.el, {
          zoom: 16,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Value: ' + value
        });
    }
});

$(document).ready(function(){
    app.contentView = new app.ContentView();
});
