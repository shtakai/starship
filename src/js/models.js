
var StarShipModel = Backbone.Model.extend({
  defaults: {
    name: null,
    manufacturer: null,
    cost_in_credits: null,
    crew: null
  }
});

var StarShipCollection = Backbone.Collection.extend({
  model: StarShipModel,
  url: 'http://swapi.co/api/starships/',
  parse: function (data) {
    return data.results;
  },
  falconChecker: function () {
    _.each(this.models, function (ship) {
      if(ship.get('name') == 'Millennium Falcon'){
        ship.set({ cost_in_credits: 'priceless' });
      }
      //console
    });
  }


});


var starShips = new StarShipCollection();
starShips.fetch().then(function () {
  starShips.falconChecker();
  _.each(starShips.models, function (ship) {
    console.log(ship.get('cost_in_credits'));
  });
  var x = starShips.findWhere({ cost_in_credits: 'priceless' });
  console.log(x.get('name'));
  console.log(x.changed);
});
