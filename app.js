$(document).ready(function() {
  var rolodexItems = [
    "freecodecamp",
    "esl_sc2",
    "dennys",
    "ogamingsc2",
    "cretetion",
    "robotcaleb",
    "noobs2ninjas",
    "storbeck",
    "habathcx"
  ];

  var twitchDiv = $("#online");
  var rolodex = $("#rolodex");
  var userInput = $("#userInput");
  var addButton = $("#addButton");
  var fccDiv = $("#FreeCodeCamp");

  twitchy(rolodexItems);

  function makeCard(data) {
    twitchDiv.append(`
<div class="ui card roloCard" id="${data.display_name}">
  <div class="image">
    <img src="${data.logo}">
  </div>
  <div class="content">
    <a class="header" href="${data.url}" target="#">${data.display_name}</a>
    <div class="description">
      Status:
    </div>
  <div class="meta">
      <span class="status">${data.status}</span>
    </div>
  </div>
</div>`);
    $.ajax({
      url: `https://wind-bow.glitch.me/twitch-api/streams/${data.display_name}`,
      async: false,
      success: activityTab
    });
    removeListener();
  }

  function activityTab(data1) {
    thisID = data1._links.self.replace(
      "https://api.twitch.tv/kraken/streams/",
      ""
    );
    thisDiv = $(document.getElementById(thisID));
    if (data1.stream !== null) {
      thisDiv.append(`<div class="extra content">
  <i class="play icon green"></i>
  <a href="${data1.stream.channel.url}" target="#">Online</a>
</div>
`);
    } else {
      thisDiv.append(`<div class="extra content">
  <i class="stop icon red"></i>
  Offline
</div>
`);
    }
  }

  addButton.click(function() {
    var username = userInput
      .val()
      .toLowerCase()
      .replace(" ", "_");

    if ($.inArray(username, rolodexItems) !== -1) {
      alert(`${username} is already in your rolodex!`);
    } else {
      $.ajax({
        url: `https://wind-bow.glitch.me/twitch-api/channels/${username}`,
        async: false,
        success: function(data2) {
          if (data2.status === 404) {
            alert(`${username} does not exist.`);
          } else {
            twitchDiv.html("");
            rolodexItems.unshift(data2.display_name.toLowerCase());
            console.log(rolodexItems);
            twitchy(rolodexItems);
          }
        }
      });
    }
    userInput.val("");
  });
  
  function removeListener (){
        $("div.roloCard").dblclick(function() {
    $(this).remove();
  });
  };

  function twitchy(array) {
    for (i = 0; i < array.length; i++) {
      $.ajax({
        url: `https://wind-bow.glitch.me/twitch-api/channels/${array[i]}`,
        async: false,
        success: makeCard
      });
    }
  }


});

