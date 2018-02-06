
var initBudgetData = {
	inc: [
		{ description: 'Web dev Butcher Project ', value: 500 },
		{ description: 'Backend Project for Spotify ', value: 2500 },
		{ description: 'Sold U2 ticket ', value: 500 },
		{ description: 'Salary ', value: 8000 },
		{ description: 'Freelance toptal VueJS for geolocation ', value: 1245.20 },
	],
	exp: [
		{ description: 'Daycare', value: 2200 },
		{ description: 'Clothes', value: 200.21 },
		{ description: 'Bills', value: 625.00 },
		{ description: 'Friday 13 Happy hour', value: 125.70 }
	]
}

var budgetController = (function () {

	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentages = function (totInc) {
		if (totInc > 0.0) {
			this.percentage = Math.round(this.value / totInc * 100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function () {
		return this.percentage;
	}

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	var initializeBudgetData = function () {
		data = {
			allItems: {
				exp: [],
				inc: []
			},
			totals: {
				exp: 0,
				inc: 0
			},
			budget: 0,
			percentage: -1
		};
	};

	var calculateTotal = function (type) {
		var sum = 0.0;
		data.allItems[type].forEach(function (v) {
			sum += v.value;
		});
		data.totals[type] = sum;
	};

	return {
		addItem: function (type, desc, val) {
			var newItem, ID;

			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			if (type === 'exp') {
				newItem = new Expense(ID, desc, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, desc, val);
			}

			data.allItems[type].push(newItem);
			return newItem;
		},
		deleteItem: function (type, ID) {
			var itemDelete = data.allItems[type].find(function (el, i) {
				if (el.id === ID) {
					return i;
				}
			});
			if (itemDelete) {
				data.allItems[type].splice(itemDelete.id, 1);
			}
		},
		calculateBudget: function () {
			// Calculate total income and expenses
			calculateTotal('inc');
			calculateTotal('exp');

			// Calculate the budget: income - expenses
			data.budget = data.totals['inc'] - data.totals['exp'];

			// Calculate the percentage of income that we spent
			if (data.totals.inc > 0.0) {
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100.0);
			} else {
				data.percentage = -1;
			}
		},

		calculatePercentages: function () {
			data.allItems['exp'].forEach(function (cur) {
				cur.calcPercentages(data.totals.inc);
			})
		},

		getPercentages: function (params) {
			var allPerc = data.allItems.exp.map(function (cur) {
				return cur.getPercentage();
			});
			return allPerc;
		},

		getBudget: function () {
			return {
				budget: data.budget,
				percentage: data.percentage,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp
			};
		},
		resetInternalData: function () {
			initializeBudgetData();
		},
		getAllDataItems: function (params) {
			return data.allItems;
		},
		testing: function () {
			return data;
		}
	}
})();

var UIController = (function () {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercentages: '.item__percentage',
		dateLabel: '.budget__title--month',
		loadBtn: '.load__btn',
		saveBtn: '.save__btn',
		chartsBtn: '.charts__btn',
		chartInc: '#chart-inc',
		chartExp: '#chart-exp',
		chartDiv: '.charts',
		item: '.item'
	}

	var $addType = document.querySelector(DOMstrings.inputType);
	var $addDescription = document.querySelector(DOMstrings.inputDescription);
	var $addValue = document.querySelector(DOMstrings.inputValue);

	var nodeListForEach = function (list, callback) {
		for (var i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	};

	var treatDataForPieChart = function (dataList) {
		var labels = dataList.map(function (cur) {
			return cur.description;
		});
		var values = dataList.map(function (cur) {
			return cur.value;
		});
		return [{
			type: 'pie',
			values: values,
			labels: labels
		}];
	}

	var formatNumber = function (num, tipo) {
		num = Math.abs(num);
		num = num.toFixed(2);
		var numSplit = num.split('.');
		var int = numSplit[0];
		var dec = numSplit[1];
		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
		};
		tipo === 'exp' ? sign = '-' : sign = '+';

		return sign + ' ' + int + '.' + dec;
	};

	return {
		addValueSettings: function () {
			var selectedType = $addType.options[$addType.selectedIndex].value;
			return {
				value: parseFloat($addValue.value),
				description: $addDescription.value,
				type: selectedType,
			}
		},
		addListItem: function (obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
				element = DOMstrings.incomeContainer;
			} else if (type === 'exp') {
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
				element = DOMstrings.expensesContainer;
			}

			// replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
			newHtml = newHtml.replace('%description%', obj.description);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},
		getDOMStrings: function () {
			return DOMstrings
		},

		deleteListItem: function (selectorID) {
			document.getElementById(selectorID).remove();
		},

		clearFields: function () {
			var fields, fieldsArray;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArray = Array.prototype.slice.call(fields);

			fieldsArray.forEach(function (cur, i, array) {
				cur.value = '';
			});

			fieldsArray[0].focus();
		},

		resetAllItems: function (params) {
			var allItemsElements = document.querySelectorAll(DOMstrings.item);
			nodeListForEach(allItemsElements, function (cur, idx) {
				cur.remove();
			});
		},

		displayPercentages: function (percentages) {
			var percEle = document.querySelectorAll(DOMstrings.expensesPercentages);

			nodeListForEach(percEle, function (cur, i) {
				cur.textContent = percentages[i] > 0.0 ? percentages[i] + '%' : '---';
			});
		},

		displayBudget: function (obj) {
			var typeAdd;
			obj.budget > "=" ? typeAdd = 'inc' : typeAdd = 'exp';
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, typeAdd);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

			if (obj.percentage >= 0.0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '--';
			}
		},

		displayMonth: function () {
			var now = new Date();
			var monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			var month = now.getMonth();
			var year = now.getFullYear();
			document.querySelector(DOMstrings.dateLabel).textContent = monthNames[month] + '/' + year;
		},

		changedType: function () {
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDescription + ',' +
				DOMstrings.inputValue
			);
			nodeListForEach(fields, function (cur) {
				cur.classList.add('red-focus');
			});
			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
		},

		generateChart: function (dataAllItems) {
			var itemsInc = dataAllItems.inc;
			var itemsExp = dataAllItems.exp;
			var layout = {
				height: 400,
				width: 700
			};
			if (itemsInc.length > 0) {
				var dataInc = treatDataForPieChart(itemsInc);
				Plotly.newPlot(DOMstrings.chartInc.slice(1), dataInc, layout);
			} else {
				console.log('No data to show in chart.');
			}
			if (itemsExp.length > 0) {
				var dataExp = treatDataForPieChart(itemsExp);
				Plotly.newPlot(DOMstrings.chartExp.slice(1), dataExp, layout);
			} else {
				console.log('No data to show in chart.');
			}
		}
	}
})();

var controller = (function (budgetCtrl, UICtrl) {

	var DOMstings;

	var setupEventListeners = function () {
		DOMstrings = UICtrl.getDOMStrings();

		document.querySelector(DOMstrings.inputBtn).addEventListener('click', addValueButton);
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				addValueButton();
			}

		});

		document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);

		document.querySelector(DOMstrings.inputType).addEventListener('change', UICtrl.changedType)

		document.querySelector(DOMstrings.loadBtn).addEventListener('click', clickLoadData);

		document.querySelector(DOMstrings.chartsBtn).addEventListener('click', clickShowCharts);
	};

	var validateAddValues = function (addedSettings) {
		var isValid = true;
		var description = addedSettings.description;
		if (description.trim() === '' || description === undefined || description === null) {
			isValid = false;
		}
		if (isNaN(addedSettings.value) || addedSettings.value <= 0) {
			isValid = false;
		}
		return isValid;
	};

	var updateBudget = function () {

		// - Calculate the budget
		budgetCtrl.calculateBudget();

		// - Return the budget
		var budget = budgetCtrl.getBudget();

		// - Display the budget on the UI
		UIController.displayBudget(budget);
	};

	var addItemProcedure = function (addedSettings) {
		// - Validate the values
		if (!validateAddValues(addedSettings)) {
			return;
		}

		// - Add item to the budge controller
		newItem = budgetCtrl.addItem(addedSettings.type,
			addedSettings.description, addedSettings.value);

		// - Update the UI
		UICtrl.addListItem(newItem, addedSettings.type)
		UICtrl.clearFields();

		// - Calculate and update budget
		updateBudget();

		// - Calculate percentages
		updatePercentages();
	};

	var addValueButton = function () {
		var newItem;

		// - Get the input data fields 
		var addedSettings = UICtrl.addValueSettings();

		addItemProcedure(addedSettings);
	};

	var updatePercentages = function () {
		// Calc percentages
		budgetCtrl.calculatePercentages();

		// Read Percentages from budget controller
		var allPerc = budgetCtrl.getPercentages();

		// Update the UI with the percentages
		UICtrl.displayPercentages(allPerc);
	};

	var ctrlDeleteItem = function (e) {
		var itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
		if (itemID) {
			var splitID = itemID.split('-');
			var type = splitID[0];
			var ID = parseInt(splitID[1]);

			// - Delete item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// - Delete item from UI
			UICtrl.deleteListItem(itemID);

			// - Update and show new budget
			budgetCtrl.calculateBudget();
			UICtrl.displayBudget(budgetCtrl.getBudget());

			updatePercentages();
		}
	};

	var retrieveLoadedData = function () {
		return initBudgetData;
	};

	var ctrlLoadBudgetData = function () {
		budgetCtrl.ctrlLoadBudgetData();
	}

	var clickLoadData = function () {

		// Reset Internal Data
		budgetCtrl.resetInternalData();

		// Reset Itens from UI:
		UICtrl.resetAllItems();


		var budgetData = retrieveLoadedData();
		var auxItem = {
			description: '', value: 0.0, type: 'inc'
		};
		budgetData.inc.forEach(function (cur) {
			auxItem.description = cur.description;
			auxItem.value = cur.value;
			addItemProcedure(auxItem);
		});
		auxItem.type = 'exp';
		budgetData.exp.forEach(function (cur) {
			auxItem.description = cur.description;
			auxItem.value = cur.value;
			addItemProcedure(auxItem);
		});
	}

	var clickShowCharts = function () {

		// Show Charts
		var eleChart = document.querySelector(DOMstrings.chartDiv);
		console.log(eleChart.style.display);
		eleChart.style.display = eleChart.style.display === 'block' ? 'none' : 'block';
		console.log('after', eleChart.style.display);
		// parei aqui testar chart toggle

		// Auto-scroll to chart div

		// Get data from Budget Controller
		var dataAllItems = budgetCtrl.getAllDataItems();

		// Plot Charts
		UICtrl.generateChart(dataAllItems);
	};

	return {
		init: function () {
			console.log('Application has started.');
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				percentage: 0,
				totalInc: 0,
				totalExp: 0
			});
			setupEventListeners();
		}
	}
})(budgetController, UIController);

controller.init();