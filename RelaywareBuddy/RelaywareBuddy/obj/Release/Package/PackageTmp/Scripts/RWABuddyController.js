var RWBuddyController = angular.module("RWBuddyController", []);


RWBuddyController.controller('timerController', ['$scope', '$interval', '$compile', function ($scope, $interval, $compile) {
    
    $scope.tasksList = {};

    var latestNumber = 0;

    $scope.addTask = function () {
        var currentDate = new Date();

        var taskGeneratedId = (currentDate.getFullYear() + "" + (currentDate.getMonth() + 1) + "" + currentDate.getDate() + "" + latestNumber).toString();

        $scope.tasksList[taskGeneratedId] = { timerObjectId: taskGeneratedId, hours: 0, minutes: 0, seconds: 0, task: "Task " + latestNumber , description: "", timerIsRunning: 0, timer: null }

        var toAppend = $compile("<div id=\"" + taskGeneratedId + "\" class=\"row task-box\"><div class=\"col-md-2 add-bottom-margin\"><p class=\"middle-align-13\"><strong>For:</strong></p></div><div class=\"col-md-10 add-bottom-margin\"><input ng-bind=\"tasksList[" + taskGeneratedId + "].task\" id=\"for-box\" class=\"form-control middle-align-9\"><a ng-click=\"showDescription(" + taskGeneratedId + ")\"><span class=\"inline-display\"><i class=\"glyphicon glyphicon-resize-full\"></i></span></a></div><div class=\"col-md-2 add-bottom-margin block-display task\"><p class=\"middle-align-13\"><strong>Task:</strong></p></div><div class=\"col-md-10 add-bottom-margin block-display task\"><textarea class=\"form-control\" rows=\"3\"></textarea></div><p id=\"timer-paragraph-" + taskGeneratedId + "\" class=\"text-center middle-align-13\"><strong>Time Passed: </strong><span ng-bind=\"tasksList['" + taskGeneratedId + "'].hours\"></span> : <span ng-bind=\"tasksList['" + taskGeneratedId + "'].minutes\"></span> : <span ng-bind=\"tasksList[\'" + taskGeneratedId + "\'].seconds \"></span><a id=\"start" + taskGeneratedId + "\" ng-click=\"startTimer(" + taskGeneratedId + ")\"><span class=\"inline-display\"><i class=\"glyphicon start-timer glyphicon-play\"></i></span></a></p>")($scope);

        $(toAppend).appendTo($('#timer-list'))

        latestNumber += 1;
    }

    $scope.startTimer = function (taskGeneratedId) {

        if ($scope.tasksList[taskGeneratedId].timerIsRunning === 0) {

            $scope.tasksList[taskGeneratedId].timer = $interval(function () {

                $scope.tasksList[taskGeneratedId].seconds += 1;

                if ($scope.tasksList[taskGeneratedId].seconds === 60) {
                    $scope.tasksList[taskGeneratedId].seconds = 0;
                    $scope.tasksList[taskGeneratedId].minutes += 1;
                }

                if ($scope.tasksList[taskGeneratedId].minutes === 60) {
                    $scope.tasksList[taskGeneratedId].hours += 1;
                    $scope.tasksList[taskGeneratedId].minutes = 0;
                }
            }, 1000);

            $scope.tasksList[taskGeneratedId].timerIsRunning = 1;

            $('#start' + taskGeneratedId).remove();

            var toAppend = $compile("<a id=\"pause" + taskGeneratedId + "\" ng-click=\"pauseTimer(" + taskGeneratedId + ")\")\"><span class=\"inline-display\"><i class=\"glyphicon pause-timer glyphicon-pause\"></i></span></a>")($scope);

            $(toAppend).appendTo($('#timer-paragraph-' + taskGeneratedId))

        }

    }

    $scope.showDescription = function (taskGeneratedId) {

        var descExpandGlyphIcons = $('#' + taskGeneratedId + ' > div > a > span > i');

        $('#' + taskGeneratedId + ' > .task').slideToggle("slow");

        if (descExpandGlyphIcons.hasClass('glyphicon-resize-full')) {
            descExpandGlyphIcons.removeClass('glyphicon-resize-full');
            descExpandGlyphIcons.addClass('glyphicon-resize-small');

        } else if (descExpandGlyphIcons.hasClass('glyphicon-resize-small')) {
            descExpandGlyphIcons.removeClass('glyphicon-resize-small');
            descExpandGlyphIcons.addClass('glyphicon-resize-full');
        }

    }

    $scope.pauseTimer = function (taskGeneratedId) {
        if (angular.isDefined($scope.tasksList[taskGeneratedId].timer)) {
            $interval.cancel($scope.tasksList[taskGeneratedId].timer);

            $scope.tasksList[taskGeneratedId].timerIsRunning = 0;

            $('#pause' + taskGeneratedId).remove();

            var toAppend = $compile("<a id=\"start" + taskGeneratedId + "\" ng-click=\"startTimer(" + taskGeneratedId + ")\"><span class=\"inline-display\"><i class=\"glyphicon start-timer glyphicon-play\"></i></span></a>")($scope);

            $(toAppend).appendTo($('#timer-paragraph-' + taskGeneratedId))
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
