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
		expression: 'sum:(SERIOUS_1,SERIOUS_2)'
	});

	addFunctionDef({
		name: 'difference',
		expression: 'difference:(SERIOUS_1,SERIOUS_2)'
	});

	addFunctionDef({
		name: 'multiply',
		expression: 'multiply:(SERIOUS_1,SERIOUS_2)'
	});

	addFunctionDef({
		name: 'divide',
		expression: 'divide:(SERIOUS_1,SERIOUS_2)'
	});

	addFunctionDef({
		name: 'movingAverage',
		expression: 'movingAverage:(SERIOUS_1,(POINT_NUM|MIN_NUM)'
	});

	addFunctionDef({
		name: 'highestCurrent',
		expression: 'highestCurrent:(SERIOUS_1,TOP_NUM)'
	});

	addFunctionDef({
		name: 'highestMax',
		expression: 'highestMax:(SERIOUS_1,TOP_NUM)'
	});

	addFunctionDef({
		name: 'scale',
		expression: 'scale:(SERIOUS_1,MULTIPLIER)'
	});

	addFunctionDef({
		name: 'alias',
		expression: 'alias:(SERIOUS_1,\'alias_example\')'
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
		}
	};
});