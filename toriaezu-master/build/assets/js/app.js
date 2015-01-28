App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
    {menu_name: 'Menu #1', restaurant_name: 'Restaurant #1', img: '//placehold.it/80/35495f/ffffff', tags: ['tag #1', 'tag #2']},
    {menu_name: 'Menu #2', restaurant_name: 'Restaurant #2', img: '//placehold.it/80/35495f/ffffff', tags: []},
    {menu_name: 'Menu #3', restaurant_name: 'Restaurant #3', img: '//placehold.it/80/35495f/ffffff', tags: []}
    ];
  }
});
