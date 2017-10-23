var MatchGame = {};

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var ordArray = [];
	var cardValues = [];
	for (var i=1;i<9;i++){
		ordArray.push(i);
		ordArray.push(i);
	} 
	while (ordArray.length>0){
		var rndIndex = Math.floor(Math.random() * 8);
		if (ordArray[rndIndex]!=undefined){
			cardValues.push(ordArray[rndIndex]);
			ordArray.splice(rndIndex,1);
		}
	}
	return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	$game.empty();
	var colors = ['hsl(25,85%,65%)','hsl(55,85%,65%)','hsl(90,85%,65%)','hsl(160,85%,65%)','hsl(220,85%,65%)','hsl(265,85%,65%)','hsl(310,85%,65%)','hsl(360,85%,65%)'];

	for(var k=0;k<cardValues.length;k++){
		var $card = $('<div class="col-xs-3 card"></div>');
		$card.data('num',cardValues[k]);
		$card.data('flipped',false);
		$card.data('color',colors[cardValues[k]-1]);
		$game.append($card);
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};