var MatchGame = {};
var matchCards = 0;

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
	$game.data('flipped', []);
	var colors = ['hsl(25,85%,65%)','hsl(55,85%,65%)','hsl(90,85%,65%)','hsl(160,85%,65%)','hsl(220,85%,65%)','hsl(265,85%,65%)','hsl(310,85%,65%)','hsl(360,85%,65%)'];

	for(var k=0;k<cardValues.length;k++){
		var $card = $('<div class="col-xs-3 card"></div>');
		$card.data('value',cardValues[k]);
		$card.data('isFlipped',false);
		$card.data('color',colors[cardValues[k]-1]);
		$game.append($card);
	}

	$('.card').on('click',function(){
		MatchGame.flipCard($(this), $game);
	});
	$('#button').on('click', function(){
		$('#win').css('display','none');
		$('#button').css('display','none');
		var $game = $('#game');
 		var values = MatchGame.generateCardValues();
  		MatchGame.renderCards(values, $game);
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	if ($card.data('isFlipped')==false){
		playclip();
		$card.data('isFlipped', true);
		$card.text($card.data('value'));
		$card.css("background-color", $card.data('color'));

		var flippedCards = $game.data('flipped');
		flippedCards.push($card);

		if (flippedCards.length===2){
			if (flippedCards[0].data('value')===flippedCards[1].data('value')){
				var matchCss = {
			        backgroundColor: 'rgb(153, 153, 153)',
			        color: 'rgb(204, 204, 204)'
      			};
      			flippedCards[0].css(matchCss);
      			flippedCards[1].css(matchCss);
      			matchCards++;
      			if (matchCards==8){ 
      				$('#win').css('display', 'block'); 
      				$('#button').css('display','block');
      				console.log('Hai vinto!');
      			}
			} else {
				window.setTimeout(function() {
				flippedCards[0].css('background-color', 'rgb(32,64,86)');
				flippedCards[0].text('');
				flippedCards[0].data('isFlipped', false);	
				flippedCards[1].css('background-color', 'rgb(32,64,86)');
				flippedCards[1].text('');
				flippedCards[1].data('isFlipped', false);	
				}, 350);
			}
			$game.data('flipped',[]);
		}
	} else { return; }


};