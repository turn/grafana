define([
  'angular',
  'lodash',
  'kbn',
  './opentsdbMFunc'
],
function (angular, _, kbn, opentsdbMFunc) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OpenTSDBMTargetCtrl', function($scope, $timeout) {

    $scope.init = function() {
      $scope.target.errors = validateTarget($scope.target);
      $scope.aggregators = ['avg', 'sum', 'min', 'max', 'dev', 'zimsum', 'mimmin', 'mimmax'];
      $scope.functions = opentsdbMFunc.getFuncList();
      //$scope.directQueryText = '';
      $scope.func = '';

      $scope.opentsdbFunc = 'sum';
      $scope.definitionText = opentsdbMFunc.getFuncDefinition($scope.opentsdbFunc);
      $scope.exampleText = opentsdbMFunc.getFuncExample($scope.opentsdbFunc);

      // TEMPORARILY REMOVED FOR SIMPLER OpenTSDBM Query`
      // $scope.target.shouldDownsample = true;
      // $scope.target.downsampleInterval = '1m';
      // $scope.target.downsampleAggregator = 'avg';

      $scope.$on('typeahead-updated', function() {
        $timeout($scope.targetBlur);
      });
    };

    $scope.targetBlur = function() {
      $scope.target.errors = validateTarget($scope.target);

      // // this does not work so good
      // if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
      //   $scope.oldTarget = angular.copy($scope.target);
      //   $scope.get_data();
      // }
      //$scope.setDirectQuery($scope.target.directQueryText);
      if (!$scope.panel.directQueries) {
        $scope.panel.directQueries = [];
      } else {
        $scope.panel.directQueries.push($scope.target.directQueryText);
      }

      $scope.get_data();
    };

    $scope.duplicate = function() {
      var clone = angular.copy($scope.target);
      $scope.panel.targets.push(clone);
    };

    $scope.$watch('target.directQueryText', function(newVal, oldVal) {
      if(newVal !== oldVal) {
        $scope.targetBlur();
      }
    });

    $scope.directQuery = function() {
      $scope.targetBlur();
    };

    $scope.addOpentsdbFunc = function() {
      //$scope.target.directQueryText = opentsdbMFunc.getFuncExpression($scope.opentsdbFunc);
      $scope.definitionText = opentsdbMFunc.getFuncDefinition($scope.opentsdbFunc);
      $scope.exampleText = opentsdbMFunc.getFuncExample($scope.opentsdbFunc);
    };

    function validateTarget(target) {
      var errs = {};

      // if (!target.metric) {
      //   errs.metric = "You must supply a metric name.";
      // }

      if (target.shouldDownsample) {
        try {
          if (target.downsampleInterval) {
            kbn.describe_interval(target.downsampleInterval);
          } else {
            errs.downsampleInterval = "You must supply a downsample interval (e.g. '1m' or '1h').";
          }
        } catch(err) {
          errs.downsampleInterval = err.message;
        }
      }

      // if (target.tags && _.has(target.tags, target.currentTagKey)) {
      //   errs.tags = "Duplicate tag key '" + target.currentTagKey + "'.";
      // }

      return errs;
    }

  });

});
