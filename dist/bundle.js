/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grayscale_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grayscale_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__grayscale_js__);
// Imports:



// #####################################################
// #####################################################
// DUMMY DATA
// #####################################################
// #####################################################

var initBudgetData = {
	inc: [
		{ description: 'Web dev Butcher Project ', value: 500, date: '02/01/2018' },
		{ description: 'Backend Project for Spotify ', value: 2500, date: '02/01/2018' },
		{ description: 'Sold U2 ticket ', value: 500, date: '02/01/2018' },
		{ description: 'Salary ', value: 8000, date: '02/01/2018' },
		{ description: 'Freelance toptal VueJS for geolocation ', value: 1245.20, date: '02/01/2018' },
	],
	exp: [
		{ description: 'Daycare', value: 2200, date: '02/01/2018' },
		{ description: 'Clothes', value: 200.21, date: '02/01/2018' },
		{ description: 'Bills', value: 625.00, date: '02/01/2018' },
		{ description: 'Friday 13 Happy hour', value: 125.70, date: '02/01/2018' }
	]
}

// #####################################################
// #####################################################
// MODEL
// #####################################################
// #####################################################

var budgetController = (function () {

	var Expense = function (id, description, value, date) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
		this.date = date;
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

	var Income = function (id, description, value, date) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.date = date;
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

		addItem: function (type, desc, val, date) {
			var newItem, ID;

			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			if (type === 'exp') {
				newItem = new Expense(ID, desc, val, date);
			} else if (type === 'inc') {
				newItem = new Income(ID, desc, val, date);
			}

			data.allItems[type].push(newItem);
			return newItem;
		},

		deleteItem: function (type, ID) {
			var itemDelete = data.allItems[type].findIndex(function (el, i) {
				return el.id === ID;
			});
			if (itemDelete !== null || itemDelete !== undefined) {
				data.allItems[type].splice(itemDelete, 1);
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

		getPercentages: function () {
			var allPerc = data.allItems.exp.map(function (cur) {
				return cur.getPercentage();
			});
			return allPerc;
		},

		loadDataLocalStorage: function (loadInfo, actionWhenDataIsLoaded, actionWhenError) {
			var dataLoaded;
			try {
				var dataLoaded = JSON.parse(localStorage.getItem(loadInfo.key));
				actionWhenDataIsLoaded(dataLoaded);
			} catch (error) {
				actionWhenError(error);
			}
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
		getAllDataItems: function () {
			return data.allItems;
		},
		data2SimpleScheme: function () {
			return data.allItems;
		},
		testing: function () {
			return data;
		}
	}
})();

// #####################################################
// #####################################################
// VIEW
// #####################################################
// #####################################################

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
		listItems: '.list-items',
		expensesPercentages: '.item__percentage',
		dateLabel: '.budget__title--month',
		loadBtn: '.load__btn',
		saveBtn: '.save__btn',
		chartDiv: '.charts',
		item: '.item',
		selectLocalStg: '#selectLocalStg',
		tabLoad: '.tab-load',
		okLoadBtn: '.ok-load-btn',
		loadTabCnt: '#tabLoadContent',
		localStorageTabContent: 'load-local-stg',
		fileSysTabContent: '#load-file-sys',
		loadModal: '#loadModal',
		inputSaveKey: '#inputSaveKey',
		okSaveBtn: '.ok-save-btn',
		tabSaveContent: '#tabSaveContent',
		saveLocalStgTabCnt: 'save-local-stg',
		tabChart: '#tabChart',
		chartIncTab: '#chart-inc-tab',
		chartExpTab: '#chart-exp-tab',
		chartInc: '#chart-inc-content',
		chartExp: '#chart-exp-content',
		saveModal: '#saveModal',
		datePicker: '#datepicker',
		// datePickerLoad: '.date-range-load',
		calendarTabContent: 'load-google-cal',
	}

	var DOMElements = {
		incTable: $('#inc-table'),
		expTable: $('#exp-table'),
		removeTableRowBtnInc: $('#removeBtn-table-inc'),
		removeTableRowBtnExp: $('#removeBtn-table-exp'),
		authGoogle: $('.auth-google'),
		signoutGoogle: $('.signout-google'),
		selectCal: $('#selectCal'),
		datePickerLoad: $('.date-range-load input'),
		datePickerLoadIni: $('#datePickerLoadIni'),
		datePickerLoadEnd: $('#datePickerLoadEnd')
	};

	var $addType = document.querySelector(DOMstrings.inputType);
	var $addDescription = document.querySelector(DOMstrings.inputDescription);
	var $addValue = document.querySelector(DOMstrings.inputValue);
	var $addDate = document.querySelector(DOMstrings.datePicker);

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
	};

	var formatNumber = function (num, tipo) {
		var sign;
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

	var getActiveTabContent = function (tabContentString) {
		var elActiveContent = $(tabContentString + ' div.active');
		var retEl = elActiveContent.length > 0 ? elActiveContent[0] : elActiveContent
		return retEl
	};

	var convertDate = function (inputFormat) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(inputFormat);
		return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
	};

	var initializeDatePicker = function () {
		var today = convertDate(Date.now());
		document.getElementById(DOMstrings.datePicker.slice(1)).value = today;
		$('#datepicker').datepicker({ autoclose: true});
		$('.date-range-load').each(function (cur) {
			$(this).datepicker('clearDates'); // 'clearDates'
		});
		DOMElements.datePickerLoad.each(function (cur) {
			$(this)[0].value = today;
		});
	};


	var dateTableFormatter = function (value) {
		return '<span style="font-size: 12px;"><em>' + value + '</em></span>';
	};

	var getColumnsTableSettings = function () {
		var columns = [
			{
				"field": "id",
				"title": "",
				"visible": false
			},
			{
				"field": "state",
				"title": "",
				"checkbox": true,
			},
			{
				"field": "date",
				"title": "Date",
				"align": "center",
				"class": "col-xs-4",
				"sortable": true,
				"formatter": dateTableFormatter
			},
			{
				"field": "description",
				"title": "Description",
				"align": "center",
				"class": "col-xs-4",
				"sortable": true
			},
			{
				"field": "value",
				"title": "Value",
				"align": "center",
				"class": "col-xs-4",
				"sortable": true
			}
		]
		return columns;
	};

	var initializeModule = function (params) {
		initializeDatePicker();
		initializeTables();
	};

	var initializeTables = function () {
		DOMElements.incTable.hide();
		DOMElements.expTable.hide();
		// DOMElements.incTable.find('th[data-field="date"]').
		// attr('data-formatter', 'dateTableFormatter');
		DOMElements.incTable.bootstrapTable({ data: [], columns: getColumnsTableSettings() });
		DOMElements.expTable.bootstrapTable({ data: [], columns: getColumnsTableSettings() });
	};

	return {
		addValueSettings: function () {
			var selectedType = $addType.options[$addType.selectedIndex].value;
			return {
				value: parseFloat($addValue.value),
				description: $addDescription.value,
				type: selectedType,
				date: $addDate.value
			}
		},
		addListItem: function (obj, type) {
			var html, newHtml, element;
			var $tableEl;
			if (type === 'inc') {
				$tableEl = DOMElements.incTable;
			} else if (type === 'exp') {
				$tableEl = DOMElements.expTable;
			}

			$tableEl.bootstrapTable('append', {
				id: obj.id,
				description: obj.description,
				value: formatNumber(obj.value, type),
				date: obj.date
			});

		},

		getDOMStrings: function () {
			return DOMstrings
		},

		getDOMElements: function () {
			return DOMElements;
		},

		deleteListItem: function (selectorID) {
			document.getElementById(selectorID).remove();
			this.alertButton('Item deleted.');
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

		resetAllItems: function (params) { //BUG HERE USING OLDER ITEM
			// var allItemsElements = document.querySelectorAll(DOMstrings.item);
			// nodeListForEach(allItemsElements, function (cur, idx) {
			// 	cur.remove();
			// });
			DOMElements.incTable.bootstrapTable('removeAll');
			DOMElements.expTable.bootstrapTable('removeAll');
		},

		displayPercentages: function (percentages) {
			var percEle = document.querySelectorAll(DOMstrings.expensesPercentages);

			nodeListForEach(percEle, function (cur, i) {
				cur.textContent = percentages[i] > 0.0 ? percentages[i] + '%' : '---';
			});
		},

		displayBudget: function (obj) {
			var typeAdd;
			obj.budget >= "0" ? typeAdd = 'inc' : typeAdd = 'exp';
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

		generateChart: function (dataChart, destElString) {
			var layout = {
				height: 400,
				width: 700,
				paper_bgcolor: 'rgba(0,0,0,0)',
				plot_bgcolor: 'rgba(0,0,0,0)',
				legend: {
					font: { size: 14, color: 'white' }
				},
				xaxis: {
					tickcolor: '#fff'
				},
			};

			var textfont = {
				family: 'Lato',
				color: 'white',
				size: 14
			}

			if (dataChart.length > 0) {
				var dataInc = treatDataForPieChart(dataChart);
				dataInc[0].textfont = textfont;
				Plotly.newPlot(destElString, dataInc, layout);
			} else {
				console.log('No data to show in chart.');
			}
		},

		getLoadDateRange () {
			DOMElements.datePickerLoad.value;
			const valIni = (new Date(DOMElements.datePickerLoadIni[0].value)).toISOString();
			const valEnd = (new Date(DOMElements.datePickerLoadEnd[0].value)).toISOString();
			return {initial: valIni, final: valEnd}
		},

		getLoadInfo: function () {
			// Find whith local type is active:
			var loadInfo;
			// var elActiveContent = $(DOMstrings.loadTabCnt + ' div.active');
			var activeCnt = getActiveTabContent(DOMstrings.loadTabCnt);
			if (activeCnt.id === DOMstrings.localStorageTabContent) {
				var selectOpt = document.querySelector(DOMstrings.selectLocalStg);
				var dataKey = selectOpt.options[selectOpt.selectedIndex].value;
				loadInfo = { key: dataKey, type: 'localStorage' };
			} else if (activeCnt.id === DOMstrings.calendarTabContent) {
				var calSelected = DOMElements.selectCal[0].options[DOMElements.selectCal[0].selectedIndex].value;
				const loadedRange = this.getLoadDateRange();
				loadInfo = { calendar: calSelected, type: 'GCalendar', dateRange: loadedRange };
			}
			return loadInfo;
		},

		getSaveDataInfo: function () {
			var saveInfo;
			// var elActiveContent = $(DOMstrings.tabSaveContent + ' div.active');
			var activeCnt = getActiveTabContent(DOMstrings.tabSaveContent);
			if (activeCnt.id === DOMstrings.saveLocalStgTabCnt) {
				var keySave = document.querySelector(DOMstrings.inputSaveKey).value;
				saveInfo = { key: keySave, type: 'localStorage' };
			}
			return saveInfo;
		},

		helperFillCalendarList: function (isSignedIn, promiseCalList) {
			if (isSignedIn) {
				promiseCalList.then(function (resp) {
					var calIdSummary = resp.result.items.map(function (cur) {
						return {
							id: cur.id, summary: cur.summary
						}
					});
					Array.from(DOMElements.selectCal[0].options).forEach((cur, idx) => {
						if (idx != 0) {
							cur.remove();
						}
					})
					calIdSummary.forEach(function (cur) {
						DOMElements.selectCal[0].options.add(new Option(cur.summary, cur.id));
					});
				})
			} else {
				Array.from(DOMElements.selectCal[0].options).forEach((cur, idx) => {
					if (idx != 0) {
						cur.remove();
					}
				})
			}
		},

		alertButton: function (msg) {
			$(".myAlert-bottom").show();
			$(".myAlert-bottom strong").text(msg);
			setTimeout(function () {
				$(".myAlert-bottom").hide();
			}, 2000);
		},

		onSignInChange: function (isSignedIn) {
			// helperFillCalendarList(isSignedIn);
			if (isSignedIn) {
				DOMElements.signoutGoogle.show();
				DOMElements.authGoogle.hide();
			} else {
				DOMElements.signoutGoogle.hide();
				DOMElements.authGoogle.show();
			}
		},

		init: function (params) {
			initializeModule();
		}
	}
})();

// #####################################################
// #####################################################
// GOOGLE API
// #####################################################
// #####################################################

var googleAPIController = (function () {

	var CLIENT_ID = '292585574072-b8cv3s6m1eqt8iq403r7bl0huvtdaht2.apps.googleusercontent.com';
	var API_KEY = 'AIzaSyCOEpOC7Tu4j4Xao67GhrLagnJfOAf9hmA';
	var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
	var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
	var authorizeButton = document.getElementById('authorize-button');
	var signoutButton = document.getElementById('signout-button');

	// Interface Properties:
	var actionAuthChange;

	// PAREI AQUI COLOCAR UMA ACTION QUANDO MUDAR AUTH (LOAD BUTTONS ETC)

	// function onSuccess(googleUser) {
	// 	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
	// }
	// function onFailure(error) {
	// 	console.log(error);
	// }

	// function handleClientLoad() {
	// 	gapi.load('client:auth2', this.initClient);
	// }

	function updateSigninStatus(isSignedIn) {
		if (isSignedIn) {
			authorizeButton.style.display = 'none';
			signoutButton.style.display = 'block';
			listingToCalendarEvents();
		} else {
			authorizeButton.style.display = 'block';
			signoutButton.style.display = 'none';
		}
	}

	function calendarEventToData(events) {
		var dataLoaded = { inc: [], exp: [] };
		events.forEach(function (cur) {
			var summary = cur.summary;
			var when = !!cur.start.dateTime ? cur.start.dateTime : cur.start.date;
			var splt = summary.split('$')
			var description = splt.slice(0, splt.length - 1).join().trim();
			var value = parseFloat(splt[splt.length - 1]);
			var type = value >= 0.0 ? 'inc' : 'exp';
			dataLoaded[type].push({ description: description, value: value, date: when})
		});
		return dataLoaded;
	}

	function obtainDataFromCalendar(loadInfo, actionWhenDataIsLoaded, actionWhenError) {
		var dataLoaded;
		// if (!this.isSignedIn()) {
		// 	return
		// }
		var promise = gapi.client.calendar.events.list({
			'calendarId': loadInfo.calendar,
			// 'timeMin': (new Date()).toISOString(),
			'timeMin': loadInfo.dateRange.initial,
			'timeMax': loadInfo.dateRange.final,
			'showDeleted': false,
			'singleEvents': true,
			// 'maxResults': 10,
			'orderBy': 'startTime'
		})
		// return promise;
		promise.then(function (response) {
			var events = response.result.items;
			// console.log('Upcoming events:');
			// if (events.length > 0) {
			// 	for (var i = 0; i < events.length; i++) {
			// 		var event = events[i];
			// 		var when = event.start.dateTime;
			// 		if (!when) {
			// 			when = event.start.date;
			// 		}
			// 		console.log(event.summary + ' (' + when + ')')
			// 	}
			// } else {
			// 	console.log('No upcoming events found.');
			// }
			var dataLoaded = calendarEventToData(events);
			actionWhenDataIsLoaded(dataLoaded);
		})
		.catch(function (err) {
			actionWhenError(err);
			// console.log(err);
		})
	}

	function handleAuthClick(event) {
		gapi.auth2.getAuthInstance().signIn();
	}

	function handleSignoutClick(event) {
		gapi.auth2.getAuthInstance().signOut();
	}

	function getListOfCalendarsPromise() {
		var calIdSummary;
		var p1 = gapi.client.calendar.calendarList.list({})
		return p1;
	}

	function listingToCalendarEvents() {
		// gapi.client.calendar.events.list({
		// 	'calendarId': 'dsk4ugi0eesl9u3nosvmhetpn8@group.calendar.google.com',
		// 	'timeMin': (new Date()).toISOString(),
		// 	'showDeleted': false,
		// 	'singleEvents': true,
		// 	'maxResults': 10,
		// 	'orderBy': 'startTime'
		// }).then(function (response) {
		// 	var events = response.result.items;
		// 	console.log('Upcoming events:');

		// 	if (events.length > 0) {
		// 		for (i = 0; i < events.length; i++) {
		// 			var event = events[i];
		// 			var when = event.start.dateTime;
		// 			if (!when) {
		// 				when = event.start.date;
		// 			}
		// 			console.log(event.summary + ' (' + when + ')')
		// 		}
		// 	} else {
		// 		console.log('No upcoming events found.');
		// 	}
		// });
		var calIdSummary = getListOfCalendarsPromise();
	}
	return {

		init: function (actionAuthChange_) {
			actionAuthChange = actionAuthChange_;
			// Hack to put in the global scope:
			// window.renderGoogleSignAPI = renderGoogleSignAPI;
			// initClient();
			// handleClientLoad();
		},

		initClient: function () {
			gapi.client.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES
			}).then(function () {
				// Listen for sign-in state changes.
				gapi.auth2.getAuthInstance().isSignedIn.listen(actionAuthChange);

				// Handle the initial sign-in state.
				actionAuthChange(gapi.auth2.getAuthInstance().isSignedIn.get());
				// authorizeButton.onclick = handleAuthClick;
				// signoutButton.onclick = handleSignoutClick;
			});
		},

		signOut: handleSignoutClick,

		signIn: handleAuthClick,

		isSignedIn: function () {
			return gapi.auth2.getAuthInstance().isSignedIn.get();
		},

		getListOfCalendarsPromise: getListOfCalendarsPromise,

		obtainDataFromCalendar: obtainDataFromCalendar
	}
})();
function handleClientLoad() {
	gapi.load('client:auth2', googleAPIController.initClient);
}

// #####################################################
// #####################################################
// CONTROLLER
// #####################################################
// #####################################################

var controller = (function (budgetCtrl, UICtrl, gApiCtrl) {

	var DOMstrings, DOMElements;
	var loadSettings;

	var setupEventListeners = function () {
		DOMstrings = UICtrl.getDOMStrings();
		DOMElements = UICtrl.getDOMElements();

		document.querySelector(DOMstrings.inputBtn).addEventListener('click', addValueButton);
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				addValueButton();
			}

		});

		document.querySelector(DOMstrings.inputType).addEventListener('change', UICtrl.changedType)

		// Load events:
		$(DOMstrings.tabLoad).on('shown.bs.tab', activeLoadTab);
		document.querySelector(DOMstrings.okLoadBtn).addEventListener('click', clickLoadData);

		document.querySelector(DOMstrings.okSaveBtn).addEventListener('click', clickSaveData);

		$(DOMstrings.tabChart).on('shown.bs.tab', activeChartTab);

		DOMElements.removeTableRowBtnInc.on('click', clickRemoveTableRowBtnInc);
		DOMElements.removeTableRowBtnExp.on('click', clickRemoveTableRowBtnExp);

		DOMElements.authGoogle.on('click', gApiCtrl.signIn)
		DOMElements.signoutGoogle.on('click', gApiCtrl.signOut)
	};

	var clickRemoveTableRowBtnInc = function (e) {
		var ids = $.map(DOMElements.incTable.bootstrapTable('getSelections'), function (row) {
			return row.id;
		});
		DOMElements.incTable.bootstrapTable('remove', {
			field: 'id',
			values: ids
		});

		// Remove from data:
		ids.forEach(function (id) {
			budgetCtrl.deleteItem('inc', id);
		});

		// Update Total Budget:
		updateBudget();

		UICtrl.alertButton('Item deleted.');
	};

	var clickRemoveTableRowBtnExp = function (e) {
		var ids = $.map(DOMElements.expTable.bootstrapTable('getSelections'), function (row) {
			return row.id;
		});
		DOMElements.expTable.bootstrapTable('remove', {
			field: 'id',
			values: ids
		});

		// Remove from data:
		ids.forEach(function (id) {
			budgetCtrl.deleteItem('exp', id);
		});

		// Update Total Budget:
		updateBudget();

		UICtrl.alertButton('Item deleted.');
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
		const newItem = budgetCtrl.addItem(addedSettings.type,
			addedSettings.description,
			addedSettings.value,
			addedSettings.date);

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
		var itemID = e.target.parentNode.parentNode.parentNode.id;
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

	var retrieveLoadedDataCases = function (actionWhenDataIsLoaded, actionWhenError) {
		// var dataLoaded = { inc: [], exp: [] };
		var loadInfo = UICtrl.getLoadInfo();

		if (loadInfo.type === 'localStorage') {
			// dataLoaded = JSON.parse(localStorage.getItem(loadInfo.key));
			budgetCtrl.loadDataLocalStorage(loadInfo, actionWhenDataIsLoaded, actionWhenError);
		}
		// else if (loadInfo.type === 'test') {
		// 	dataLoaded = initBudgetData;
		// }
		else if (loadInfo.type === 'GCalendar') { // loadInfo: cal, dateRange
			gApiCtrl.obtainDataFromCalendar(loadInfo, actionWhenDataIsLoaded, actionWhenError);
		}
	};

	var ctrlLoadBudgetData = function () {
		budgetCtrl.ctrlLoadBudgetData();
	}

	var loadDataAdjustUIFromObject = function (budgetData) {

		// Reset Internal Data
		budgetCtrl.resetInternalData();

		// Reset Itens from UI:
		UICtrl.resetAllItems();

		// Show table
		DOMElements.incTable.show();
		DOMElements.expTable.show();

		// Get Data and Add
		var auxItem = {
			description: '', value: 0.0, type: 'inc'
		};
		budgetData.inc.forEach(function (cur) {
			auxItem.description = cur.description;
			auxItem.value = cur.value;
			auxItem.date = cur.date;
			addItemProcedure(auxItem);
		});
		auxItem.type = 'exp';
		budgetData.exp.forEach(function (cur) {
			auxItem.description = cur.description;
			auxItem.value = Math.abs(cur.value);
			addItemProcedure(auxItem);
		});
	}

	var actionWhenDataIsLoaded = function (params) {
		var budgetData = params;

		loadDataAdjustUIFromObject(budgetData);

		$(DOMstrings.loadModal).modal('hide');
	}

	var actionWhenError = function (err) {
		console.log(err);
		UICtrl.alertButton('Error loading.');
		$(DOMstrings.loadModal).modal('hide');
	}	

	var clickLoadData = function (e) {

		// var budgetData = retrieveLoadedDataCases();
		retrieveLoadedDataCases(actionWhenDataIsLoaded, actionWhenError);
		// loadDataAdjustUIFromObject(budgetData);

		// // Close Modal
		// $(DOMstrings.loadModal).modal('hide');
	};

	// var helperFillCalendarList = function () { //Should be in VIEWER LAYER!
	// 	gApiCtrl.getListOfCalendarsPromise().then(function (resp) {
	// 		var calIdSummary = resp.result.items.map(function (cur) {
	// 			return {
	// 				id: cur.id, summary: cur.summary
	// 			}
	// 		});
	// 		calIdSummary.forEach(function (cur) {
	// 			DOMElements.selectCal[0].options.add(new Option(cur.summary, cur.id));
	// 		});
	// 	})
	// }

	var activeLoadTab = function (e) {
		var selecEl;
		var el = e.target;
		if (el.id === 'nav-tab-load-stg') {
			selecEl = document.querySelector(DOMstrings.selectLocalStg);
			var localKeys = Object.keys(localStorage);
			var lenOpts = selecEl.options.length;
			if (lenOpts > 1) {
				for (var i = 1; i < lenOpts; i++) {
					selecEl.options.remove(1);
				}
			}
			localKeys.forEach(function (key) {
				selecEl.options.add(new Option(key, key));
			});
		} else if (el.id === 'nav-tab-load-cal') {
			var promiseCalList = gApiCtrl.getListOfCalendarsPromise();
			UICtrl.helperFillCalendarList(gApiCtrl.isSignedIn(), promiseCalList);
			// if (gApiCtrl.isSignedIn()) {
				// Load all calendars  and create a select input
				// UICtrl.helperFillCalendarList(true, promiseCalList);
			// }
		}
	}

	var saveDataLocalStorage = function (dataJson, saveInfo) {
		localStorage.setItem(saveInfo.key, dataJson);
	}

	var saveData = function (dataJson, saveInfo, callback) {
		callback(dataJson, saveInfo);
	};

	var clickSaveData = function () {

		// Adjust data budget a simpler representation:
		var descripAndVals = budgetCtrl.data2SimpleScheme();

		// Transform to JSON
		var jsonIncExp = JSON.stringify(descripAndVals);

		var saveInfo = UICtrl.getSaveDataInfo();

		if (saveInfo.type === 'localStorage') {
			saveData(jsonIncExp, saveInfo, saveDataLocalStorage);
		} else {
			console.log('saving error');
		}

		$(DOMstrings.saveModal).modal('hide');
	};

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

	var activeChartTab = function (e) {
		var dataToShow;
		var el = e.target;
		var dataAllItems = budgetCtrl.getAllDataItems();
		if (el.id === DOMstrings.chartIncTab.slice(1)) {
			dataToShow = dataAllItems.inc;
			UICtrl.generateChart(dataToShow, DOMstrings.chartInc.slice(1));
		} else if (el.id === DOMstrings.chartExpTab.slice(1)) {
			dataToShow = dataAllItems.exp;
			UICtrl.generateChart(dataToShow, DOMstrings.chartExp.slice(1));
		}
	}

	function onSignInChange(isSignedIn) {
		// if (isSignedIn) {
		// 	// authorizeButton.style.display = 'none';
		// 	// signoutButton.style.display = 'block';
		// 	// listingToCalendarEvents();

		// } else {
		// 	// authorizeButton.style.display = 'block';
		// 	// signoutButton.style.display = 'none';
		// }
		UICtrl.onSignInChange(isSignedIn);
		var promiseCalList = gApiCtrl.getListOfCalendarsPromise();
		UICtrl.helperFillCalendarList(isSignedIn, promiseCalList);
	}

	return {
		init: function () {
			console.log('Application has started.');
			UICtrl.init();
			gApiCtrl.init(onSignInChange);
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				percentage: 0,
				totalInc: 0,
				totalExp: 0
			});
			setupEventListeners();

			// Ease debug:
			var loadTestData = initBudgetData;
			loadDataAdjustUIFromObject(loadTestData);
		}
	}
})(budgetController, UIController, googleAPIController);

controller.init();

// GOOGLE API TO CONNECT WITH CALENDAR

function onSuccess(googleUser) {
	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
	console.log(error);
}

function renderButton() {
	gapi.signin2.render('my-signin2', {
		'scope': 'profile email',
		'width': 240,
		'height': 50,
		'longtitle': true,
		'theme': 'dark',
		'onsuccess': onSuccess,
		'onfailure': onFailure
	});
}
function listingToCalendarEvents() {
	gapi.client.calendar.events.list({
		'calendarId': 'dsk4ugi0eesl9u3nosvmhetpn8@group.calendar.google.com',
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': 10,
		'orderBy': 'startTime'
	}).then(function (response) {
		var events = response.result.items;
		appendPre('Upcoming events:');

		if (events.length > 0) {
			for (i = 0; i < events.length; i++) {
				var event = events[i];
				var when = event.start.dateTime;
				if (!when) {
					when = event.start.date;
				}
				appendPre(event.summary + ' (' + when + ')')
			}
		} else {
			appendPre('No upcoming events found.');
		}
	});
}

// API FIXING ERROR:
window.onload = function (e) {
	this.onload = function () { }; handleClientLoad()
}
window.onreadystatechange = function (e) {
	if (this.readyState === 'complete') this.onload()
}

/* ------ BUGS -------------
- After save > Back to Load Storage > Select is not rendering the localStorage keys
*/

/* --------- TODO ---------------
- Date range selection for calendar budget loading
- Enter on Load/ Save Modal to press OK
- Close Date picker after chosen a date
- Probably change the home page focus to the calendar ?
*/

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

// // Google Maps Scripts
// var map = null;
// // When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// google.maps.event.addDomListener(window, 'resize', function() {
//   map.setCenter(new google.maps.LatLng(40.6700, -73.9400));
// });

// function init() {
//   // Basic options for a simple Google Map
//   // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
//   var mapOptions = {
//     // How zoomed in you want the map to start at (always required)
//     zoom: 15,

//     // The latitude and longitude to center the map (always required)
//     center: new google.maps.LatLng(40.6700, -73.9400), // New York

//     // Disables the default Google Maps UI components
//     disableDefaultUI: true,
//     scrollwheel: false,
//     draggable: false,

//     // How you would like to style the map.
//     // This is where you would paste any style found on Snazzy Maps.
//     styles: [{
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }, {
//       "featureType": "landscape",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 29
//       }, {
//         "weight": 0.2
//       }]
//     }, {
//       "featureType": "road.arterial",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 18
//       }]
//     }, {
//       "featureType": "road.local",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "featureType": "poi",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 21
//       }]
//     }, {
//       "elementType": "labels.text.stroke",
//       "stylers": [{
//         "visibility": "on"
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "elementType": "labels.text.fill",
//       "stylers": [{
//         "saturation": 36
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 40
//       }]
//     }, {
//       "elementType": "labels.icon",
//       "stylers": [{
//         "visibility": "off"
//       }]
//     }, {
//       "featureType": "transit",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 19
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }, {
//         "weight": 1.2
//       }]
//     }]
//   };

//   // Get the HTML DOM element that will contain your map
//   // We are using a div with id="map" seen below in the <body>
//   var mapElement = document.getElementById('map');

//   // Create the Google Map using out element and options defined above
//   map = new google.maps.Map(mapElement, mapOptions);

//   // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
//   var image = 'img/map-marker.svg';
//   var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
//   var beachMarker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     icon: image
//   });
// }


/***/ })
/******/ ]);