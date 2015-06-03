define([
	],
function() {
	'use strict';

	var index = [];

	function addFunctionDef(funcDef) {
		if (funcDef.name) {
			index[funcDef.name] = funcDef;
		}
	}

	addFunctionDef({
		name: 'sum',
		expression: 'sum(sum:proc.stat.cpu.percpu{cpu=1}',
		definition: 'Takes two or more series and sum their points (constants may not be used)',
		example: 'sum(sum:proc.stat.cpu.percpu{cpu=1},sum:proc.stat.cpu.percpu{cpu=2})'
	});

	addFunctionDef({
		name: 'difference',
		expression: 'difference(sum:proc.stat.cpu.percpu{cpu=1})',
		definition: 'Takes two and subtract the second one &nbsp; from the first (constants may not be used)',
		example: 'difference(sum:proc.stat.cpu.percpu{cpu=1},sum:proc.stat.cpu.percpu{cpu=2})'
	});

	addFunctionDef({
		name: 'multiply',
		expression: 'multiply(sum:proc.stat.cpu.percpu{cpu=1})',
		definition: 'Takes two or more series and multiplies their points (constants may not be used)',
		example: 'multiply(sum:proc.stat.cpu.percpu{cpu=1},sum:proc.stat.cpu.percpu{cpu=2})'
	});

	addFunctionDef({
		name: 'divide',
		expression: 'divide(sum:proc.stat.cpu.percpu{cpu=1})',
		definition: 'Takes two series and divide the first one with the second (constants may not be used)',
		example: 'divide(sum:proc.stat.cpu.percpu{cpu=1},sum:proc.stat.cpu.percpu{cpu=2})'
	});

	addFunctionDef({
		name: 'movingAverage',
		expression: 'movingAverage(sum:proc.stat.cpu.percpu{cpu=1}, 10)',
		definition: 'the moving average of a metric over a fixed number of past points, or a time interval.',
		example: 'movingAverage(sum:proc.stat.cpu.percpu{cpu=1}, 10), '
					+ 'movingAverage(sum:proc.stat.cpu.percpu{cpu=1}, \'1min\')'
	});

	addFunctionDef({
		name: 'highestCurrent',
		expression: 'highestCurrent(sum:proc.stat.cpu.percpu{cpu=1|2|3|4}, 2)',
		definition: 'Takes one metric or a wildcard seriesList followed by an integer N. Out of all metrics passed, '
					+ 'return only the N metrics with the highest value at the end of the time period specified.',
		example: 'highestCurrent(sum:proc.stat.cpu.percpu{cpu=1|2|3|4}, 2) // find the top two metrics '
					+ 'which the highest values at the end of the time period specified.'
	});

	addFunctionDef({
		name: 'highestMax',
		expression: 'highestMax(sum:proc.stat.cpu.percpu{cpu=1|2|3|4}, 2)',
		definition: 'Takes one metric or a wildcard seriesList followed by an integer N. Out of all metrics passed, '
					+ 'return only the N metrics with the highest maximum value in the time period specified.',
		example: 'highestMax(sum:proc.stat.cpu.percpu{cpu=1|2|3|4}, 2) // find the top two metrics '
					+ 'which the highest maximum anywhere in the end of the time period specified.'
	});

	addFunctionDef({
		name: 'scale',
		expression: 'scale(avg:proc.stat.cpu.percpu{cpu=1},10)',
		definition: 'Takes one metric or a wildcard seriesList followed by a constant, and multiplies the datapoint '
					+ 'by the constant provided at each point.',
		example: 'scale(avg:proc.stat.cpu.percpu{cpu=1},10), '
					+ 'scale(avg:proc.stat.cpu.percpu{cpu=1},0.0001)'
	});

	addFunctionDef({
		name: 'alias',
		expression: 'alias(avg:proc.stat.cpu.percpu{cpu=1},\'cpu_1_utlization\')',
		definition: 'Takes one metric or a wildcard seriesList and a string in quotes. Returns the string instead of '
					+ 'the metric name in the legend.',
		example: 'alias(avg:proc.stat.cpu.percpu{cpu=1},\'cpu_1_utlization\')'
	});


	function FunctionInstance(funcDef, options) {
		this.def = funcDef;
		this.param = options;
	}

	return {
		createFuncInstance: function(funcDef, options) {
			return new FunctionInstance(funcDef, options);
		},

		getFuncDef: function(name) {
			return index[name];
		},

		getFuncExpression: function(name) {
			return index[name].expression;
		},

		getFuncDefinition: function(name) {
			return index[name].definition;
		},

		getFuncExample: function(name) {
			return index[name].example;
		},

		getFuncList: function() {
			var funcList = [];
			for (var obj in index) {
				funcList.push(obj);
			}
			return funcList;
		}
	};
});