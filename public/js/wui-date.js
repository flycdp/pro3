angular.module('wui.date',[]).directive('wuiDate', function() {
	return {
		// Restrict to elements and attributes
		restrict: 'EA',

		// Assign the angular link function
		compile: fieldCompile,

		// Assign the angular directive template HTML
		template: fieldTemplate,
		// templateUrl: "pageTemplate.html",

		// Assign the angular scope attribute formatting
		scope: {
			id: '@?', 
			name: '@?', 
			format: '@?', 
			interval: '@?',
			placeholder: '@?', 
			position: '@?', 
			ngModel: '=',
			btns: '@', 
			dateClass: '@?', 
			width: '@?',
			size: '@?' 
		}

	};

	function fieldCompile(scope, element, attr) {
		return {
			pre: function(scope, element, attr) {

				scope.id = scope.id || 'date' + scope.$id; 
				var position = scope.position || 'left', 
					iptWidth = parseInt(scope.width); 
					iptWidthU = scope.width?scope.width.search('%') == -1 ? 'px' : '%':null,
					size = scope.size != 'large' && scope.size != 'l' && scope.size != 'L' ? 'small' : null;
				angular.element(element).find('.wui-date').addClass('wui-date-' + scope.id);
				if(scope.name != '' && typeof scope.name != 'undefined') {
					angular.element(element).find('.wui-date input').attr('name', scope.name);
				}
				if(size) {
					angular.element(element).find('.wui-date').addClass(size); 
				}
				angular.element(element).find('.wui-date .wui-date-picker').addClass(position); 
				scope.dateClass ? angular.element(element).find('.wui-date').addClass(scope.dateClass) : null; 
				iptWidth ? angular.element(element).find('.wui-date').css('width', iptWidth + iptWidthU) : null; 
			},
			post: function(scope, element, attr) {
				fieldLink(scope, element, attr);
			}
		}
	}

	function fieldLink(scope, element, attr) {
		var GMTDate, 
			format = (scope.format || 'yyyy-mm-dd').toLowerCase(), 
			interval = parseInt(scope.interval) || 30, 
			interval = (60 % interval === 0 || interval % 60 === 0) && interval <= 12 * 60 ? interval : 30,
			placeholder = scope.placeholder || "请输入时间",
			maxYear = parseInt(new Date().getFullYear()) + 100, 
			minYear = 1900, 
			SPECIAL_DATE_RULES = ['鑷充�?'],
			DATE_RULES = ['yyyy-mm-dd hh:mm:ss', 'yyyy-mm-dd hh:mm', 'yyyy-mm-dd', 'yyyy-mm']; 

		scope.date = {
			year: '0000',
			month: '00',
			date: '00',
			hours: '00',
			minutes: '00',
			seconds: '00',
			dateList: [],
			timeList: [],
			yearList: {},
			showPicker: false,
			showTimePicker: false,
			showTimeList: true,
			showClearIcon: false,
			selector: 1,
			btns: scope.btns ? JSON.parse(scope.btns.replace(/'/g, '"')) : {}, 
			showBtn: false,
		};

		function GMTDateInit(date) {
			date = dateFormat(date);
			if(date) {
				if(!SPECIAL_DATE_RULES.includes(date)) {
					GMTDate = StrDateToGMT(date);
				} else {
					GMTDate = new Date();
				}
			} else {
				GMTDate = new Date();
			}
		}

		function domBootstrap(format) {
			if(Object.keys(scope.date.btns).length) {
				scope.date.showBtn = true;
			}
			switch(format) {
				case 'yyyy-mm-dd hh:mm:ss':
				case 'yyyy-mm-dd hh:mm':
					scope.date.showTimePicker = true;
					scope.date.selector = 1;
					angular.element(element).find('.wui-date .wui-date-picker').removeClass('no_timer');
					break;
				case 'yyyy-mm-dd':
					scope.date.showTimePicker = false;
					angular.element(element).find('.wui-date .wui-date-picker').addClass('no_timer');
					scope.date.selector = 1;
					break;
				case 'yyyy-mm':
					scope.date.showTimePicker = false;
					scope.date.selector = 2;
					angular.element(element).find('.wui-date .wui-date-picker').addClass('no_timer');
					break;
				default:
					break;
			}
		}

		function dateFormat(date) {
			if(!date) {
				return null;
			}
			if(SPECIAL_DATE_RULES.includes(date)) { 
				return date;
			}
			date = date.toString().replace(/[\D]/g, ""); 
			var len = format.replace(/\W/g, "").length;
			var str = date.length >= len ? date.slice(0, len) : '';
			if(date && str) {
				switch(format) {
					case 'yyyy-mm-dd hh:mm:ss':
						date = str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6");
						break;
					case 'yyyy-mm-dd hh:mm':
						date = str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5");
						break;
					case 'yyyy-mm-dd':
						date = str.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
						break;
					case 'yyyy-mm':
						date = str.replace(/(\d{4})(\d{2})/, "$1-$2");
						break;
					default:
						break;
				}
				return str !== date ? date : null; 
			}
			return null;
		}
		function StrDateToGMT(date) {
			if(date && new Date(date) != 'Invalid Date') {
				return new Date(date);
			}
			return null;
		}
		function GMTToStrDate(date) {
			date = new Date(date);
			if(date && toString.call(date) == '[object Date]') {
				return date.getFullYear() + '/' + getDoubleDigit(date.getMonth() + 1) + '/' + getDoubleDigit(date.getDate()) + ' ' + getDoubleDigit(date.getHours()) + ':' + getDoubleDigit(date.getMinutes()) + ':' + getDoubleDigit(date.getSeconds());
			}
			return null;
		}
		function getDoubleDigit(num) {
			num = '0' + num;
			return num.slice(-2);
		}

		function getAllDate() {
			scope.date.year = GMTDate.getFullYear(); 
			scope.date.month = getDoubleDigit(GMTDate.getMonth() + 1);
			scope.date.day = getDoubleDigit(GMTDate.getDate()); 
			scope.date.hours = getDoubleDigit(GMTDate.getHours()); 
			scope.date.minutes = getDoubleDigit(GMTDate.getMinutes()); 
			scope.date.seconds = getDoubleDigit(GMTDate.getSeconds()); 
		}
		function getDateList(date) {
			date = date || new Date();
			if(date.getFullYear() <= maxYear && date.getFullYear() >= minYear) {
				var dateList = [], 
					weekOfFirstDay, 
					endDayOfMonth, 
					endDayOfLastMonth,
					modelDate = StrDateToGMT(scope.ngModel);

				getAllDate();

				weekOfFirstDay = new Date(scope.date.year, scope.date.month - 1, 1).getDay();
				endDayOfMonth = new Date(scope.date.year, scope.date.month, 0).getDate();
				endDayOfLastMonth = new Date(scope.date.year, scope.date.month - 1, 0).getDate();

				for(var i = 1; i <= endDayOfMonth; i++) {
					if(modelDate) {
						var condition1 = modelDate.getFullYear() == scope.date.year && (modelDate.getMonth() + 1) == scope.date.month && modelDate.getDate() == i;
					}
					var condition2 = new Date().getFullYear() == GMTDate.getFullYear() && new Date().getMonth() == GMTDate.getMonth() && new Date().getDate() == i;
					var dateObj = {
						'type': 2,
						'date': i
					};
					if(condition1) {
						dateObj.current = true; // currently picked
					}
					if(condition2) {
						dateObj.today = true; // today
					}
					dateList.push(dateObj);
				}

				var prevLen = 0; // the length of prev month day
				prevLen = weekOfFirstDay || 7;
				for(var j = 0; j < prevLen; j++) {
					dateList.unshift({
						'type': 1,
						'date': endDayOfLastMonth--
					});
				}

				var nextLen = 42 - prevLen - endDayOfMonth;
				for(var k = 1; k <= nextLen; k++) {
					dateList.push({
						'type': 3,
						'date': k
					});
				}

				var count = 0,
					arr = [],
					resList = [];
				for(var l = 0; l < dateList.length; l++) {
					count++;
					arr.push(dateList[l]);
					if(count >= 7) {
						resList.push(arr);
						count = 0;
						arr = [];
					}
				}
				return resList;
			}
		}

		function createTimeList() {
			var h = 8,
				m = 0,
				resList = [{
					'time': '08:00'
				}];
			// fill time list
			for(var i = 1; i < 24 * 60 / interval; i++) {
				m = m + interval;
				if(m >= 60) {
					h = h + (m / 60);
					m = 0;
				}
				if(h >= 24) {
					h = h - 24;
				}
				var timeObj = {
					'time': getDoubleDigit(h) + ":" + getDoubleDigit(m)
				};
				resList.push(timeObj);
			}
			return resList;
		}

		function createYearList(year) {
			year = parseInt(year) || GMTDate.getFullYear();
			if(year) {
				var yearList = {};
				yearList.startYear = year;
				yearList.endYear = yearList.startYear + 10;
				yearList.y1 = [];
				yearList.y2 = [];
				yearList.y3 = [];

				for(var i = 0; i < 4; i++) {
					yearList.y1.push(year + i);
					yearList.y2.push(year + i + 4);
					if(yearList.y3.length <= 2) {
						yearList.y3.push(year + i + 8);
					}
				}
				return yearList;
			}
			return null;
		}

		function outputDate() {
			scope.ngModel = dateFormat(GMTToStrDate(GMTDate));
		}

		var DATE_PICK_CLOSE = (format == DATE_RULES[2]);

		// Pick Date
		scope.pickDate = function(item, e) {
			if(item.type == 2) {
				GMTDate.setDate(item.date);
				if(DATE_PICK_CLOSE) {
					scope.date.showPicker = false;
				}
			} else if(item.type == 1) {
				GMTDate.setDate(item.date);
				GMTDate.setMonth(scope.date.month - 2);
			} else if(item.type == 3) {
				GMTDate.setDate(item.date);
				GMTDate.setMonth(scope.date.month);
			}
			outputDate();
			scope.date.dateList = getDateList(GMTDate);
		}

		// Pick Time
		scope.pickTime = function(time) {
			GMTDate.setHours(time.slice(0, 2));
			GMTDate.setMinutes(time.slice(3, 5));
			outputDate();
			getAllDate();
		}

		// Prev Year
		scope.prevYear = function() {
			var y = scope.date.year - 1;
			if(y >= minYear) {
				GMTDate.setFullYear(y);
				scope.date.dateList = getDateList(GMTDate); 
			}
		}

		// Next Year
		scope.nextYear = function() {
			var y = scope.date.year + 1;
			if(y <= maxYear) {
				GMTDate.setFullYear(y);
				scope.date.dateList = getDateList(GMTDate); 
			}
		}

		// Prev Year
		scope.prevYearByMonth = function() {
			var y = scope.date.year - 1;
			if(y >= minYear) {
				GMTDate.setFullYear(y);
				getAllDate();
			}
		}

		// Next Year
		scope.nextYearByMonth = function() {
			var y = scope.date.year + 1;
			if(y <= maxYear) {
				GMTDate.setFullYear(y);
				getAllDate();
			}
		}

		// Prev Month
		scope.prevMonth = function() {
			var m = scope.date.month - 2;
			GMTDate.setMonth(m);
			scope.date.dateList = getDateList(GMTDate); 
		}

		// Next Month
		scope.nextMonth = function() {
			var m = scope.date.month;
			GMTDate.setMonth(m);
			scope.date.dateList = getDateList(GMTDate); 
		}

		scope.openYearPicker = function(year) {
			scope.date.selector = 3;
			scope.date.yearList = createYearList(year);
		}

		// Pick Year
		scope.selectYear = function(year) {
			GMTDate.setFullYear(year);
			scope.date.selector = 2;
			getAllDate();
			outputDate();
		}

		scope.pickPrevYear = function() {
			var year = scope.date.yearList.startYear - 11;
			if(year >= minYear) {
				scope.openYearPicker(year);
			}
		}

		scope.pickNextYear = function() {
			var year = scope.date.yearList.startYear + 11;
			if(year <= maxYear) {
				scope.openYearPicker(year);
			}
		}

		scope.openMonthPicker = function() {
			scope.date.selector = 2;
		}

		var MONTH_PICK_CLOSE = (format == DATE_RULES[3]);

		// Select Month
		scope.selectMonth = function(m) {
			GMTDate.setMonth(m - 1);
			scope.date.dateList = getDateList(GMTDate); 
			scope.date.selector = 1;
			outputDate();
			if(MONTH_PICK_CLOSE) {
				scope.date.showPicker = false;
			}
		}

		scope.hitherto = function() {
			scope.ngModel = '鑷充�?';
			scope.date.showPicker = false;
		}

		// Picker open
		scope.openPicker = function() {
			domBootstrap(format); 
			angular.element(".wui-date .wui-date-picker").hide();
			angular.element(".wui-date-" + scope.id + " .wui-date-picker").show();
			GMTDateInit(scope.ngModel);
			scope.date.dateList = getDateList(GMTDate); 
			scope.date.showPicker = true;
		}

		scope.confirm = function() {
			outputDate();
			scope.date.showPicker = false;
		}

		scope.moment = function() {
			GMTDate = new Date();
			outputDate();
			scope.date.showPicker = false;
		}

		scope.checkDateFormat = function() {
			scope.ngModel = dateFormat(scope.ngModel);
		}

		// date init
		scope.dateInit = function() {
			domBootstrap(format);
			GMTDateInit(scope.ngModel);
			scope.date.dateList = getDateList(GMTDate);
			scope.date.timeList = createTimeList();
		}

		scope.$watch('date.showPicker', function() {
			if(scope.date.showPicker) {
				scope.dateInit();
			}
		});

		// Close by click blank
		element.on('click', function(e) {
			e.stopPropagation();
		});

		angular.element('body').on('click', ':not(.wui-date)', function() {
			angular.element(element).find('.wui-date-picker').hide();
		});

	}

	function fieldTemplate(scope, element, attr) {
		return(
			'<div class="wui-date wui-date" ng-app="wui.date">' +
			'<div class="wui-date-editor" ng-click="openPicker()">' +
			'<input class="wui-input wui-input-block wui-date-input" id="choseDate" type="text" placeholder="{{placeholder}}" ng-model="ngModel" autocomplete="off" ng-blur=checkDateFormat()>' +
			'<i class="iconfont icon1" style="text-algin:right">&#xe627;</i>' +
			'</div>' +
			'<br/>' +
			'<div class="wui-date-picker" ng-show="date.showPicker">' +
			'<div class="wui-date-picker_body">' +
			'<div class="wui-date-picker_panel" ng-show="date.selector == 1">' +
			'<div class="wui-date-panel_header">' +
			'<i class="iconfont" ng-click="prevYear()"> < </i>' +
			'<i class="iconfont" ng-click="prevMonth()"> < </i>' +
			'<span class="title">' +
			'<span class="txt" ng-click="openYearPicker()"><span>{{date.year}}</span>年  </span>' +
			'<span class="txt" ng-click="openMonthPicker()"><span>{{date.month}}</span>月</span>' +
			'</span>' +
			'<i class="iconfont" ng-click="nextMonth()"> > </i>' +
			'<i class="iconfont" ng-click="nextYear()"> > </i>' +
			'</div>' +
			'<div class="wui-date-picker_content">' +
			'<table class="wui-data-table">' +
			'<tr>' +
			'<th>日</th>' +
			'<th>一</th>' +
			'<th>二</th>' +
			'<th>三</th>' +
			'<th>四</th>' +
			'<th>五</th>' +
			'<th>六</th>' +
			'</tr>' +
			'<tr ng-repeat="item in date.dateList track by $index">' +
			'<td ng-repeat="subItem in date.dateList[$index]"><div ng-class="{&apos;prev-date&apos;:subItem.type==1,&apos;date&apos;:subItem.type==2,&apos;next-date&apos;:subItem.type==3}"><span ng-click="pickDate(subItem,$event)" ng-class="{&apos;today&apos;:subItem.today,&apos;current&apos;:subItem.current}">{{subItem.date}}</span></div></td>' +
			'</tr>' +
			'</table>' +
			'</div>' +
			'</div>' +
			'<div class="wui-date-picker_panel month_panel" ng-show="date.selector == 2">' +
			'<div class="wui-date-panel_header">' +
			'<i class="iconfont" ng-click="prevYearByMonth()">《 </i>' +
			'<span class="title">' +
			'<span class="txt" ng-click="openYearPicker()"><span>{{date.year}}</span>年</span>' +
			'</span>' +
			'<i class="iconfont" ng-click="nextYearByMonth()">》</i>' +
			'</div>	' +
			'<div class="wui-date-picker_content">' +
			'<table class="wui-data-table">' +
			'<tr>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(1)">一月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(2)">二月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(3)">三月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(4)">四月</a>' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(5)">五月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(6)">六月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(7)">七月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(8)">八月</a>' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(9)">九月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(10)">十月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(11)">十一月</a>' +
			'</td>' +
			'<td>' +
			'<a class="cell" ng-click="selectMonth(12)">十二月</a>' +
			'</td>' +
			'</tr>' +
			'</table>' +
			'</div>	' +
			'</div>' +
			'<div class="wui-date-picker_panel year_panel" ng-show="date.selector == 3 ">' +
			'<div class="wui-date-panel_header">' +
			'<i class="iconfont" ng-click="pickPrevYear()">《</i>' +
			'<span class="title">' +
			'<span class="txt"><span>{{date.yearList.startYear}}</span> 年 - <span>{{date.yearList.endYear}}</span>年</span>' +
			'</span>' +
			'<i class="iconfont" ng-click="pickNextYear()">》</i>' +
			'</div>' +
			'<div class="wui-date-picker_content">' +
			'<table class="wui-data-table">' +
			'<tr>' +
			'<td ng-repeat="item in date.yearList.y1 track by $index">' +
			'<a class="cell" ng-click="selectYear(item)">{{item}}</a>' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td ng-repeat="item in date.yearList.y2 track by $index">' +
			'<a class="cell" ng-click="selectYear(item)">{{item}}</a>' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td ng-repeat="item in date.yearList.y3 track by $index">' +
			'<a class="cell" ng-click="selectYear(item)">{{item}}</a>' +
			'</td>' +
			'</tr>' +
			'</table>' +
			'</div>' +
			'</div>' +
			'<div class="wui-date-picker_aside" ng-show="date.showTimePicker">' +
			'<div class="wui-date-aside_header">' +
			'<div class="wui-select wui-select-block time-select" id="time">' +
			'<div class="wui-select-selection time-selection">' +
			'<input type="hidden" name="" value="" >' +
			'<span class="wui-select-icon iconfont time-icon">&#xe661;</span>' +
			'<span class="wui-select-placeholder placeholder">{{date.hours}}:{{date.minutes}}</span>' +
			'<span class="wui-select-selected-value value"></span>' +
			'</div>' +
			'<div class="wui-select-menu time-menu" ng-show="date.showTimeList">' +
			'<ul>' +
			'<li class="wui-select-item time-menu-item" ng-repeat="item in date.timeList" ng-click="pickTime(item.time)">{{item.time}}</li>' +
			'</ul>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="wui-date-picker_footer" ng-show="date.showBtn">' +
			'<button type="button" class="wui-btn wui-btn-white wui-btn-xsmall" ng-click="moment()" ng-if="date.btns.now">{{date.btns.now}}</button>' +
			'<button type="button" class="wui-btn wui-btn-primary wui-btn-xsmall" ng-click="confirm()" ng-if="date.btns.ok">{{date.btns.ok}}</button>' +
			'<button type="button" class="wui-btn wui-btn-white wui-btn-xsmall" ng-click="hitherto()" ng-if="date.btns.hitherto">未定</button>' +
			'</div>' +
			'</div>' +
			'</div>'
		);
	}

});