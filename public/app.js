var app = angular.module('flashCards', []);

app.factory('FlashCardsFactory', function($http){
    return {
        getFlashCards: function (category) {
           var queryParams = {};

            if (category) {
                queryParams.category = category;
            }

            return $http.get('/cards', {
                params: queryParams
            }).then(function (response) {
                return response.data;
            });
        }
    };
})

app.factory('ScoreFactory', function () {

    return {
        correct: 0,
        incorrect: 0
    };

});

app.directive('loader', function () {
    return {
        restrict: 'E',
        template: '<img src="https://fjc.ru/wp-content/themes/fjc/img/ajax-loader-event-list.gif" />'
    };
});

app.directive('borderOnHover', function () {
    return {
        restrict: 'A',
        link: function (scope,element,attr) {
            element.on('mouseenter', function () {
                element.css({"border-color":"#85c222"});
            });
        }
    };
});

app.directive('flashCards', function (FlashCardsFactory, ScoreFactory) {
    return {
        restrict: 'E',
        templateUrl: '/flashcard.html',
        link: function (scope, elem, attrs) {
            FlashCardsFactory.getFlashCards().then(function (flashCards) {
                scope.flashCards = flashCards;
            });

            scope.answerQuestion = function (answer, flashCard) {
                if (!flashCard.answered) {
                    flashCard.answered = true;
                    flashCard.answeredCorrectly = answer.correct;
                    if (flashCard.answeredCorrectly) {
                        ScoreFactory.correct++
                    } else ScoreFactory.incorrect++
                }
            }

            scope.getCategoryCards = function (category) {
                FlashCardsFactory.getFlashCards(category)
                .then(function (flashCards) {
                    scope.flashCards = flashCards
                    scope.currentCat = category
                });
            }

            scope.reset = function () {
                FlashCardsFactory.getFlashCards().then(function (flashCards) {
                    scope.flashCards = flashCards
                    scope.currentCat = null;
                });
            }
        }
    };
});


