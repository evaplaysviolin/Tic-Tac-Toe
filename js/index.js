$(document).ready(function() {
  
  var player;
  var spaces = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  var id, index;
  var compTimer;
  var random;
  var returnWin;
  
  $("#tttContainer").hide();
  
  $(".choose").click(function() {
    if ($(this).hasClass("x")) {
      player = "x";
      $("#tttContainer").show(2000);
    } else if ($(this).hasClass("o")) {
      $(".ttt").css("pointer-events", "none");
      player = "o";
      $("#tttContainer").show(2000);
      compTimeout();
    }
    $(".choose").hide(2000);
  });
  
  $(".ttt").click(function() {
    if ($(this).text()) {
      return;
    } else {
      $(".ttt").css("pointer-events", "none");
      xoPlayer(this);
      id = $(this).attr("id");
      index = spaces.indexOf(id);
      spaces.splice(index, 1);
      returnWin = checkWin("X");
      handleWin();
      returnWin = checkWin("O");
      handleWin();
    }
  }).on("mouseup", function() {
    if ($(this).text()) {
      return;
    } else {
      if (spaces.length > 1) {
        compTimeout();
      } else {
        reset();
      }
    }
  });
  
  function xoPlayer(div) {
    if (player == "x") {
      $(div).text("X");
    } else if (player == "o") {
      $(div).text("O");
    }
  }
  function xoComputer(div) {
    if (player == "x") {
      $(div).text("O");
    } else if (player == "o") {
      $(div).text("X");
    }
  }
  
  function getRandom(arrLength) {
    return Math.floor(Math.random() * (arrLength - 1));
  }
  
  function compTimeout() {
    compTimer = setTimeout(function() {
      random = getRandom(spaces.length);
      xoComputer("#" + spaces[random]);
      spaces.splice(random, 1);
      if (spaces.length == 0 && player == "o") {
        reset();
      }
      $(".ttt").css("pointer-events", "auto");
      returnWin = checkWin("X");
      handleWin();
      returnWin = checkWin("O");
      handleWin();
    }, 1000);
  }
  
  function reset() {
    $(".ttt").css("pointer-events", "none");
    setTimeout(function() {
      $("#tttContainer").hide(2000, function() {
        $(".ttt").empty();
        $(".ttt").css("color", "#e4d3ed");
      });
      $(".choose").show(2000);
      spaces = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      $(".ttt").css("pointer-events", "auto");
    }, 2000);
  }
  
  function checkWin(letter) {
    var winCombos = [
      ["#one", "#two", "#three"],
      ["#four", "#five", "#six"],
      ["#seven", "#eight", "#nine"],
      ["#one", "#four", "#seven"],
      ["#two", "#five", "#eight"],
      ["#three", "#six", "#nine"],
      ["#one", "#five", "#nine"],
      ["#three", "#five", "#seven"]
    ];
    for (var set in winCombos) {
      var saveIDs = getWinIDs(winCombos[set], letter);
      if (saveIDs.length != 0) {
        return [true, saveIDs];
      }
    }
    return [false, saveIDs];
  }
  
  function getWinIDs(array, letter) {
    if (array.every(function(id) { return $(id).text() == letter; })) {
      return array;
    }
    return [];
  }
  
  function handleWin() {
    if (!returnWin[0]) {
      return;
    } else if (returnWin[0]) {
      $(".ttt").css("pointer-events", "none");
      clearTimeout(compTimer);
      for (i = 0; i < returnWin[1].length; i++) {
        $(returnWin[1][i]).css("color", "#b20869");
      }
      reset();
    }
  }
  
});