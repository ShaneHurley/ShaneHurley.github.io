$(function () {
  $(".navbar-brand").text("Javascript Expert Project"); 

  if (typeof PUBNUB !== 'undefined')
  {
    window.gamesub = PUBNUB.init({
        publish_key: 'pub-c-f8615354-2b9b-468c-b724-9f682fb8fd9d',
        subscribe_key: 'sub-c-2cbc1b2a-016c-11e5-a8ef-0619f8945a4f'
    });
    
  }
})
