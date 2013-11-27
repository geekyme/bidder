var chargePerBid = 0.89;
var bidIncrement = 0.1;

userId = Cookie.get('user') || function(){
  Cookie.set('user', new Meteor.Collection.ObjectID()._str)
  return Cookie.get('user')
}();

Handlebars.registerHelper('chargePerBid', function(){
  return chargePerBid.toFixed(2);
})

Handlebars.registerHelper('bidIncrement', function(){
  return bidIncrement.toFixed(2);
})

Template.bidsPanel.helpers({
  yourBid: function(){
    if(!Cookie.get('yourBid')){
      // if undefined. set $0
      Cookie.set('yourBid', parseFloat(0).toFixed(2));
    }

    return Cookie.get('yourBid');
  },
  currentBid: function(){
    return (Bids.find().count() * bidIncrement).toFixed(2);
  },
  win: function(){
    var topBid = (Bids.find().count() * bidIncrement).toFixed(2);
    return topBid <= Cookie.get('yourBid')
  },
  numberOfBids: function(){
    return Bids.find().count();
  },
  spendingOnBid: function(){
    return (Bids.find({owner: userId}).count() * chargePerBid).toFixed(2) ;
  },
  earned: function(){
    return (Bids.find().count() * chargePerBid).toFixed(2) ;
  }
})

Template.bidsPanel.events({
  'click button': function(){
    Bids.insert({owner: userId});
    Cookie.set('yourBid', (Bids.find().count()* bidIncrement).toFixed(2));
  }
})