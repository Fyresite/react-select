'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    // Create an ID if none exists for label binding
    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.id = props.id || (0, _v2.default)();

    _this.state = {
      selected: false,
      value: typeof props.value !== 'undefined' ? props.value : ''
    };

    _this.handleClasses = _this.handleClasses.bind(_this);
    return _this;
  }

  // invoked before a mounted component receives new props


  _createClass(Select, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var firstOption = this.props.options[Object.keys(this.props.options)[0]];

      if (nextProps.value && nextProps.value !== firstOption) {
        this.setState({ selected: true });
      } else {
        this.setState({ selected: false });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.select.focus();
    }
  }, {
    key: 'handleClasses',
    value: function handleClasses() {
      var classes = [];

      if (this.state.selected) {
        classes.push('selected');
      }

      if (this.props.value && this.props.value.length > 0 && this.props.valid) {
        classes.push('valid');
      }

      if (this.props.valid === false) {
        classes.push('invalid');
      }

      return classes.join(' ');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var value = e.target.value;

      this.setState(function (prevState, props) {
        return {
          value: value
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'select input-field ' + this.handleClasses() },
        typeof this.props.label !== 'undefined' ? _react2.default.createElement(
          'label',
          { htmlFor: this.id },
          this.props.label
        ) : '',
        _react2.default.createElement(
          'select',
          {
            id: this.id,
            ref: function ref(el) {
              return _this2.select = el;
            },
            disabled: this.props.disabled || false,
            readOnly: this.props.readonly || false,
            value: this.state.value,
            onChange: this.handleChange.bind(this)
          },
          typeof this.props.options !== 'undefined' ? Object.keys(this.props.options).map(function (key) {
            var value = _this2.props.options[key];
            return _react2.default.createElement(
              'option',
              { key: '' + (0, _v2.default)(), value: key },
              value
            );
          }) : ''
        )
      );
    }
  }]);

  return Select;
}(_react.Component);

exports.default = Select;
