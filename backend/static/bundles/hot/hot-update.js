webpackHotUpdate(0,{

/***/ 783:
/*!***********************************!*\
  !*** ./reactcomp/chart/chart.jsx ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _MuiThemeProvider = __webpack_require__(/*! material-ui/styles/MuiThemeProvider */ 784);\n\nvar _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);\n\nvar _Card = __webpack_require__(/*! material-ui/Card */ 822);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 384);\n\nvar _reactGoogleCharts = __webpack_require__(/*! react-google-charts */ 751);\n\nvar _jsCookie = __webpack_require__(/*! js-cookie */ 857);\n\nvar _jsCookie2 = _interopRequireDefault(_jsCookie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar React = __webpack_require__(/*! react */ 1);\n// import FlatButton from 'material-ui/FlatButton';\n\nvar Analyse = function (_React$Component) {\n    _inherits(Analyse, _React$Component);\n\n    function Analyse(props) {\n        var _this$state;\n\n        _classCallCheck(this, Analyse);\n\n        var _this = _possibleConstructorReturn(this, (Analyse.__proto__ || Object.getPrototypeOf(Analyse)).call(this, props));\n\n        _this.state = (_this$state = {\n            loading: false,\n            data: [],\n            error: null,\n            refreshing: false,\n            base_url: \"/api/piechartitems/\",\n            dataset_naam: props.dataset_naam,\n            selectedCategorie: props.selectedCategorie\n        }, _defineProperty(_this$state, 'error', null), _defineProperty(_this$state, 'isLoaded', false), _defineProperty(_this$state, 'items', []), _defineProperty(_this$state, 'dataset', 'Current Dataset'), _defineProperty(_this$state, 'title', 'Analyse'), _defineProperty(_this$state, 'legendPosition', { position: 'labeled' }), _defineProperty(_this$state, 'options', { title: 'Agenda Categorieën',\n            pieHole: 0.4,\n            legend: { position: 'labeled', textStyle: { fontSize: 12 } },\n            pieSliceTextStyle: { fontSize: 12 },\n            pieSliceText: 'value'\n        }), _defineProperty(_this$state, 'chart_events', [{\n            eventName: 'select',\n            callback: function callback(Chart) {\n                var selectedItem = Chart.chart.getSelection()[0];\n                if (selectedItem) {\n                    _this.props.onChange(_this.state.data[selectedItem.row + 1][0]);\n                } else {\n                    // Er is geklikt, maar er is blijkbaar geen item om mee te werken!\n                    console.log(\"Chart\", Chart);\n                }\n            }\n        }]), _this$state);\n        return _this;\n    }\n\n    _createClass(Analyse, [{\n        key: 'render',\n        value: function render() {\n            var _state = this.state,\n                error = _state.error,\n                isLoaded = _state.isLoaded,\n                data = _state.data;\n\n            if (error) {\n                return React.createElement(\n                    'div',\n                    null,\n                    'Error: ',\n                    error.message\n                );\n            }\n            return React.createElement(\n                _MuiThemeProvider2.default,\n                null,\n                React.createElement(\n                    _Card.Card,\n                    null,\n                    React.createElement(_Card.CardTitle, { title: this.state.title, subtitle: this.state.dataset_naam }),\n                    React.createElement(\n                        _Card.CardText,\n                        null,\n                        React.createElement(_reactGoogleCharts.Chart, {\n                            chartType: 'PieChart',\n                            options: this.state.options,\n                            data: this.state.data,\n                            width: '90vw',\n                            height: '50vh',\n                            chartEvents: this.state.chart_events\n                        })\n                    )\n                )\n            );\n        }\n\n        // Als component geladen wordt, haal de data op uit de DRF API    \n\n    }, {\n        key: 'componentWillMount',\n        value: function componentWillMount() {\n            this.fetchDataFromApi();\n        }\n\n        // Voer de API call uit\n\n    }, {\n        key: 'fetchDataFromApi',\n        value: function fetchDataFromApi() {\n            var _this2 = this;\n\n            var url = \"/api/piechartitems/\";\n\n            this.setState({ isLoaded: false });\n            fetch(url).then(function (res) {\n                return res.json();\n            }).then(function (res) {\n                _this2.setState({\n                    data: _this2.setJsonToArray(res),\n                    error: null,\n                    isLoaded: true,\n                    refreshing: false\n                });\n            }).catch(function (error) {\n                _this2.setState({ error: error, isLoaded: false });\n            });\n        }\n    }, {\n        key: 'setJsonToArray',\n\n\n        // Zet Json object om naar array van objecten \n        value: function setJsonToArray(json_object) {\n            var return_array = [];\n            return_array.push(['Categorie', 'Totaal']);\n            json_object.map(function (item) {\n                return_array.push([item.categorie, Number(item.sum_categorie)]);\n            });\n            return return_array;\n        }\n    }]);\n\n    return Analyse;\n}(React.Component);\n\nexports.default = Analyse;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzgzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3JlYWN0Y29tcC9jaGFydC9jaGFydC5qc3g/YjcwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbmltcG9ydCBNdWlUaGVtZVByb3ZpZGVyIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9NdWlUaGVtZVByb3ZpZGVyJztcclxuaW1wb3J0IHtDYXJkLCBDYXJkQWN0aW9ucywgQ2FyZEhlYWRlciwgQ2FyZE1lZGlhLCBDYXJkVGl0bGUsIENhcmRUZXh0fSBmcm9tICdtYXRlcmlhbC11aS9DYXJkJztcclxuLy8gaW1wb3J0IEZsYXRCdXR0b24gZnJvbSAnbWF0ZXJpYWwtdWkvRmxhdEJ1dHRvbic7XHJcbmltcG9ydCB7IERpbW1lciwgTG9hZGVyLCBJbWFnZSwgU2VnbWVudCB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xyXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJ3JlYWN0LWdvb2dsZS1jaGFydHMnO1xyXG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5hbHlzZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgXHJcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgICAgIHJlZnJlc2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBiYXNlX3VybDogXCIvYXBpL3BpZWNoYXJ0aXRlbXMvXCIsXHJcbiAgICAgICAgICAgIGRhdGFzZXRfbmFhbTogcHJvcHMuZGF0YXNldF9uYWFtLFxyXG4gICAgICAgICAgICBzZWxlY3RlZENhdGVnb3JpZTogcHJvcHMuc2VsZWN0ZWRDYXRlZ29yaWUsXHJcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgZGF0YXNldDogJ0N1cnJlbnQgRGF0YXNldCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQW5hbHlzZScsXHJcbiAgICAgICAgICAgIGxlZ2VuZFBvc2l0aW9uOiB7IHBvc2l0aW9uOiAnbGFiZWxlZCd9LFxyXG4gICAgICAgICAgICBvcHRpb25zOiAgICB7dGl0bGU6ICdBZ2VuZGEgQ2F0ZWdvcmllw6tuJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWVIb2xlOiAwLjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogJ2xhYmVsZWQnICwgdGV4dFN0eWxlOiB7Zm9udFNpemU6MTJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZVNsaWNlVGV4dFN0eWxlOiB7IGZvbnRTaXplOjEyfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZVNsaWNlVGV4dDogJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hhcnRfZXZlbnRzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lIDogJ3NlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgIDogKENoYXJ0KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRJdGVtID0gQ2hhcnQuY2hhcnQuZ2V0U2VsZWN0aW9uKClbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS5kYXRhW3NlbGVjdGVkSXRlbS5yb3cgKyAxXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFciBpcyBnZWtsaWt0LCBtYWFyIGVyIGlzIGJsaWprYmFhciBnZWVuIGl0ZW0gb20gbWVlIHRlIHdlcmtlbiFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhcnRcIiwgQ2hhcnQpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGVycm9yLCBpc0xvYWRlZCwgZGF0YSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXY+RXJyb3I6IHtlcnJvci5tZXNzYWdlfTwvZGl2PjtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNdWlUaGVtZVByb3ZpZGVyPlxyXG4gICAgICAgICAgICAgICAgPENhcmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPENhcmRUaXRsZSB0aXRsZT17dGhpcy5zdGF0ZS50aXRsZX0gc3VidGl0bGU9e3RoaXMuc3RhdGUuZGF0YXNldF9uYWFtfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPENhcmRUZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hhcnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFydFR5cGU9J1BpZUNoYXJ0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5kYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCI5MHZ3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjUwdmhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnRFdmVudHM9e3RoaXMuc3RhdGUuY2hhcnRfZXZlbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NhcmRUZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbHMgY29tcG9uZW50IGdlbGFkZW4gd29yZHQsIGhhYWwgZGUgZGF0YSBvcCB1aXQgZGUgRFJGIEFQSSAgICBcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmZldGNoRGF0YUZyb21BcGkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWb2VyIGRlIEFQSSBjYWxsIHVpdFxyXG4gICAgZmV0Y2hEYXRhRnJvbUFwaSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBcIi9hcGkvcGllY2hhcnRpdGVtcy9cIjtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRlZDogZmFsc2UgfSk7IFxyXG4gICAgICAgIGZldGNoKHVybClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2V0SnNvblRvQXJyYXkocmVzKSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3IsIGlzTG9hZGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFpldCBKc29uIG9iamVjdCBvbSBuYWFyIGFycmF5IHZhbiBvYmplY3RlbiBcclxuICAgIHNldEpzb25Ub0FycmF5KGpzb25fb2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIHJldHVybl9hcnJheT0gW107XHJcbiAgICAgICAgcmV0dXJuX2FycmF5LnB1c2goIFsnQ2F0ZWdvcmllJywgJ1RvdGFhbCddICk7XHJcbiAgICAgICAganNvbl9vYmplY3QubWFwKGl0ZW0gPT4geyBcclxuICAgICAgICAgICAgcmV0dXJuX2FycmF5LnB1c2goW2l0ZW0uY2F0ZWdvcmllLCBOdW1iZXIoaXRlbS5zdW1fY2F0ZWdvcmllKV0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJldHVybl9hcnJheTtcclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlYWN0Y29tcC9jaGFydC9jaGFydC5qc3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQVBBO0FBR0E7QUFDQTtBQUlBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBeEJBO0FBc0NBO0FBQ0E7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFEQTtBQUZBO0FBREE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBbEdBO0FBQ0E7QUFEQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///783\n");

/***/ })

})