app.controller('MainController', function ($scope, FlashCardsFactory, $timeout, ScoreFactory) {
	
	$scope.categories = [
	    'MongoDB',
	    'Express',
	    'Angular',
	    'Node'
	];

	$scope.currentCat;

});

app.filter('cheat',function () {
	return function (answers) {
		return answers.filter(function (answer) {
			return answer.correct
		})
	}
})

app.controller('StatsController', function($scope, ScoreFactory){
	$scope.scores = ScoreFactory;
})