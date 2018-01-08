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
      value: typeof props.value !== 'undefined' ? props.value : '',
      valid: ''
    };

    _this.getClasses = _this.getClasses.bind(_this);
    _this.validate = _this.validate.bind(_this);
    return _this;
  }

  _createClass(Select, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value !== this.props.value) {
        var state = Object.assign({}, this.state);

        state.value = this.props.value;
        state.valid = typeof this.props.validator === 'function' ? this.props.validator() : state.valid;

        this.setState(function (prevState, props) {
          return state;
        });
      }
    }
  }, {
    key: 'getClasses',
    value: function getClasses() {
      var classes = ['select', 'input-field'];

      if (this.state.selected) {
        classes.push('selected');
      }

      if (this.props.value && this.props.value.length > 0 && this.props.valid) {
        classes.push('valid');
      }

      if (this.props.valid === false) {
        classes.push('invalid');
      }

      if (typeof this.props.className !== 'undefined') {
        classes.push(this.props.className);
      }

      return classes.join(' ');
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.select.focus();
    }
  }, {
    key: 'validate',
    value: function validate() {
      var valid = '';

      if (typeof this.props.validator === 'function') {
        valid = this.props.validator(this.state.value);
      }

      this.setState(function (state, props) {
        return { valid: valid };
      });

      return valid;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this2 = this;

      var value = e.target.value;

      this.setState(function (prevState, props) {
        var valid = prevState.valid;

        // There is probably a missed case somewhere in here
        // Probably need to rethink the structure of this code
        // in the future.

        if (typeof _this2.props.validator === 'function') {
          // If the input has a validator function set, we
          // run the function and assign it's returned value
          // to valid so we can update the state.
          valid = _this2.props.validator(value);
        } else {
          // Since the value of the placeholder is null, e.target.value returns 
          if (typeof _this2.props.placeholder !== 'undefined' && value === _this2.props.placeholder) {
            value = '';
            valid = '';
          } else {
            valid = true;
          }
        }

        // Since the value of the placeholder is null, e.target.value returns 
        if (typeof _this2.props.placeholder !== 'undefined' && value === _this2.props.placeholder) {
          value = '';
        }

        return {
          value: value,
          valid: valid
        };
      }, function () {
        if (typeof _this2.props.onChange === 'function') {
          _this2.props.onChange(e, _this2.state);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var selectClasses = [];

      if (typeof this.props.selectClassName !== 'undefined') {
        selectClasses.push(this.props.selectClassName);
      }

      return _react2.default.createElement(
        'div',
        { className: this.getClasses() },
        typeof this.props.label !== 'undefined' ? _react2.default.createElement(
          'label',
          { htmlFor: this.id },
          this.props.label
        ) : '',
        _react2.default.createElement(
          'select',
          {
            className: selectClasses.join(' '),
            id: this.id,
            ref: function ref(el) {
              return _this3.select = el;
            },
            disabled: this.props.disabled || false,
            readOnly: this.props.readonly || false,
            value: this.state.value,
            onChange: this.handleChange.bind(this) },
          typeof this.props.placeholder !== 'undefined' ? _react2.default.createElement(
            'option',
            { key: (0, _v2.default)(), value: null },
            this.props.placeholder
          ) : '',
          typeof this.props.options !== 'undefined' ? Object.keys(this.props.options).map(function (key) {
            var value = _this3.props.options[key];

            return _react2.default.createElement(
              'option',
              { key: (0, _v2.default)(), value: key },
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
