define([
	'lodash'
],
function(_) {
	'use strict';

	var index = [];

	function addFunctionDef(funcDef) {
		if (funcDef.name) {
			index[funcDef.name] = funcDef;
		}
	}

	addFunctionDef({
		name: 'sum',
	});

	addFunctionDef({
		name: 'difference',
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
		}
	};
});