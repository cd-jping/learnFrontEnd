$(function () {
    'use strict'
    window.Validator = function (val, rule) {
        this.is_valid = function (new_val) {
            var key;
            if (new_val !== undefined)
            val = new_val;
            // 如果不是必填项且val值为空返回true
            if (!rule.required && !val)
                return true;

            for (key in rule) {
                // 防止重复验证
                if (key === 'required')
                    continue;
                var r = this['validate_' + key]();
                if (!r) return false;
            }
            return true;
        }

        this.validate_max = function () {
            pre_max_min();
            return val <= rule.max;
        }

        this.validate_min = function () {
            pre_max_min();
            return val >= rule.min;
        }

        this.validate_maxlength = function () {
            pre_length();
            return val.length <= rule.maxlength;
        }

        this.validate_minlength = function () {
            pre_length();
            return val.length >= rule.minlength;
        }

        this.validate_numeric = function () {
            return $.isNumeric(val);
        }

        this.validate_required = function () {
            // jquery 里面的trim 用于修建val 值前后的空格
            var real = $.trim(val);
            if (!real && real !== 0) return false;
            return true;
        }

        this.validate_pattern = function () {
            // 利用正则验证 val值
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        }
        /* 用于完成this this.validate_max或this.validate_min的前置工作*/
        function pre_max_min() {
            val = parseFloat(val);
        }

        /* 用于完成this this.validate_maxlength或this.validate_minlength的前置工作*/
        function pre_length() {
            val = val.toString();
        }
    }
})