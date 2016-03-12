var RWBuddyController = angular.module("RWBuddyController", []);


RWBuddyController.controller('timerController', ['$scope', '$http', '$interval', '$compile', function ($scope, $http, $interval, $compile) {

    $scope.tasksList = [];
    $scope.timeTypes = [{ type: "Hour" }, { type: "Minutes" }];
    $scope.possibleTimeTravel = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 5 }, { value: 10 }, { value: 15 }, { value: 30 }, { value: 45 }, { value: 60 }];

    var latestTask = 0;
    var currentRunningTimer = "";
    
    function timerObject(_timerObjectId, _hours, _minutes, _seconds, _task , _description, _timerIsRunning, _timeTravel, _timeTravelTypes,  _timer) {
        this.timerObjectId = _timerObjectId;
        this.hours = _hours;
        this.minutes = _minutes;
        this.seconds = _seconds;
        this.task = _task;
        this.description = _description;
        this.timerIsRunning = _timerIsRunning;
        this.timeTravel = _timeTravel;
        this.timeTravelTypes = _timeTravelTypes;
        this.timer = _timer;
    }

    $scope.addTask = function () {
        $.post("Home/AddTimer", { "id": latestTask },
            function (response) {
                var newTimer = new timerObject(response.timerObjectId, response.hours, response.minutes, response.seconds, response.task, response.description, response.timerIsRunning, { value: 10 }, { type: "Minutes" }, null);

                $scope.tasksList.push(newTimer);

                latestTask += 1;

                window.latestTaskCopy += 1;

                $scope.$apply(); // Apply changes immediately to the ng-repeat
            });

        $('#timer-controls').removeClass('no-display');
        $('#timer-controls').addClass('block-display');

    }

    $scope.startTimer = function (_timerObjectId) {

        var selectedTaskIndex = $scope.getObjectIndex(_timerObjectId);

        if (currentRunningTimer !== "") {
            $scope.pauseTimer(currentRunningTimer);
        }

        if($scope.tasksList[selectedTaskIndex].timerIsRunning === 0) {

            $scope.tasksList[selectedTaskIndex].timer = $interval(function () {

                $scope.tasksList[selectedTaskIndex].seconds += 1;

                if ($scope.tasksList[selectedTaskIndex].seconds === 60) {
                    $scope.tasksList[selectedTaskIndex].seconds = 0;
                    $scope.tasksList[selectedTaskIndex].minutes += 1;
                }

                if ($scope.tasksList[selectedTaskIndex].minutes === 60) {
                    $scope.tasksList[selectedTaskIndex].hours += 1;
                    $scope.tasksList[selectedTaskIndex].minutes = 0;
                }
            }, 1000);

            $scope.tasksList[selectedTaskIndex].timerIsRunning = 1;

            $('#start' + _timerObjectId).addClass('no-display');
            $('#pause' + _timerObjectId).removeClass('no-display')

            currentRunningTimer = _timerObjectId;
        }
    }

    $scope.pauseTimer = function (_timerObjectId) {

        var selectedTaskIndex = $scope.getObjectIndex(_timerObjectId);

        currentRunningTimer = "";

        if (angular.isDefined($scope.tasksList[selectedTaskIndex].timer)) {
            $interval.cancel($scope.tasksList[selectedTaskIndex].timer);

            $scope.tasksList[selectedTaskIndex].timerIsRunning = 0;
            $('#start' + _timerObjectId).removeClass('no-display');
            $('#pause' + _timerObjectId).addClass('no-display');
        }
    }

    $scope.showMoreInfo = function (_timerObjectId) {

        var descExpandGlyphIcons = $('#' + _timerObjectId + ' > div > a > span > i');

        $('#' + _timerObjectId + ' > .more-info').slideToggle("slow");

        if (descExpandGlyphIcons.hasClass('glyphicon-resize-full')) {
            descExpandGlyphIcons.removeClass('glyphicon-resize-full');
            descExpandGlyphIcons.addClass('glyphicon-resize-small');

        } else if (descExpandGlyphIcons.hasClass('glyphicon-resize-small')) {
            descExpandGlyphIcons.removeClass('glyphicon-resize-small');
            descExpandGlyphIcons.addClass('glyphicon-resize-full');
        }

    }

    $scope.timeTravel = function(direction, _timerObjectId)
    {
        var selectedTaskIndex = $scope.getObjectIndex(_timerObjectId);

        if (direction === 0) { // revert time
            if ($scope.tasksList[selectedTaskIndex].timeTravelTypes.type === "Minutes") {
                var minutesDifferenceResult = $scope.tasksList[selectedTaskIndex].minutes - $scope.tasksList[selectedTaskIndex].timeTravel.value;

                if (minutesDifferenceResult < 0) {
                    var hoursDiffercenceResult = $scope.tasksList[selectedTaskIndex].hours - 1;

                    if (hoursDiffercenceResult >= 0) {
                        $scope.tasksList[selectedTaskIndex].hours -= 1;
                        $scope.tasksList[selectedTaskIndex].minutes = 60 + minutesDifferenceResult;
                    } else if (hoursDiffercenceResult < 0) {
                        alert("Subtraction not possible.");
                    }
                } else {
                    $scope.tasksList[selectedTaskIndex].minutes -= $scope.tasksList[selectedTaskIndex].timeTravel.value;
                }
            }


            if ($scope.tasksList[selectedTaskIndex].timeTravelTypes.type === "Hour") {
                var hoursDiffercenceResult = $scope.tasksList[selectedTaskIndex].hours - $scope.tasksList[selectedTaskIndex].timeTravel.value;

                if (hoursDiffercenceResult < 0) {
                    alert("Subtraction not possible.");
                } else {
                    $scope.tasksList[selectedTaskIndex].hours -= $scope.tasksList[selectedTaskIndex].timeTravel.value;
                }
            }
        } else if (direction === 1) { // Fast forward
            if ($scope.tasksList[selectedTaskIndex].timeTravelTypes.type === "Minutes") {
                var additionResult = $scope.tasksList[selectedTaskIndex].minutes + $scope.tasksList[selectedTaskIndex].timeTravel.value;

                if (additionResult >= 60) {
                    $scope.tasksList[selectedTaskIndex].minutes = additionResult - 60;
                    $scope.tasksList[selectedTaskIndex].hours += 1;
                } else {
                    $scope.tasksList[selectedTaskIndex].minutes += $scope.tasksList[selectedTaskIndex].timeTravel.value;
                }
            }

            if ($scope.tasksList[selectedTaskIndex].timeTravelTypes.type === "Hour") {
                var additionResult = $scope.tasksList[selectedTaskIndex].hours += $scope.tasksList[selectedTaskIndex].timeTravel.value;
            }
        } 

    }

    $scope.showAllTicketInformation = function () {
        $('.more-info').show("slow");
    }

    $scope.hideAllTicketInformation = function () {
        $('.more-info').hide("slow");
    }

    $scope.getObjectIndex = function (_timerObjectId) {
        for(var i = 0; i < $scope.tasksList.length; i++){
            if ($scope.tasksList[i].timerObjectId === _timerObjectId) {
                return i;
            }
        }
    }


}]);

RWBuddyController.controller('createCustomerAccessViewController', ['$scope', '$compile', function ($scope, $compile) {

    $scope.displayForm = function () {

        var createCAForm = $('#createCAForm');

        if (createCAForm.hasClass('no-display')) {
            createCAForm.removeClass('no-display');
            createCAForm.addClass('block-display');
        }
        else {
            createCAForm.removeClass('block-display');
            createCAForm.addClass('no-display');
        }

    }

}]);
