define([
  'angular',
  'lodash',
  'kbn',
  '../services/opentsdbM/opentsdbMFunc'
],
function (angular, _, kbn, opentsdbMFunc) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OpenTSDBMTargetCtrl', function($scope, $timeout) {

    $scope.init = function() {
      $scope.target.errors = validateTarget($scope.target);
      $scope.aggregators = ['avg', 'sum', 'min', 'max', 'dev', 'zimsum', 'mimmin', 'mimmax'];
      $scope.functions = [];
      $scope.directQueryText = '';
      $scope.func = '';
      $scope.opentsdbFunc = '';

      if (!$scope.target.aggregator) {
        $scope.target.aggregator = 'sum';
      }

      if (!$scope.target.downsampleAggregator) {
        $scope.target.downsampleAggregator = 'sum';
      }

      $scope.$on('typeahead-updated', function() {
        $timeout($scope.targetBlur);
      });
    };

    $scope.targetBlur = function() {
      $scope.target.errors = validateTarget($scope.target);

      // this does not work so good
      if (!_.isEqual($scope.oldTarget, $scope.target) && _.isEmpty($scope.target.errors)) {
        $scope.oldTarget = angular.copy($scope.target);
        $scope.get_data();
      }
    };

    $scope.directQuery = function() {
      $scope.setDirectQuery($scope.directQueryText);
      $scope.get_data();
    };
    
    $scope.suggestMetrics = function(query, callback) {
      $scope.datasource
        .performSuggestQuery(query, 'metrics')
        .then(callback);
    };

    $scope.addOpentsdbFunc = function() {
      $scope.directQueryText = opentsdbMFunc.getFuncExpression($scope.opentsdbFunc);
    };

    function validateTarget(target) {
      var errs = {};

      if (!target.metric) {
        errs.metric = "You must supply a metric name.";
      }

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

      if (target.tags && _.has(target.tags, target.currentTagKey)) {
        errs.tags = "Duplicate tag key '" + target.currentTagKey + "'.";
      }

      return errs;
    }

  });

});
