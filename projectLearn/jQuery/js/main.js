$(function() {
    'use strict'
    /* 选中页面中所有的input[data-rule] */
    var $inputs = $('[data-rule]'),
        $form = $('#signup'),
        inputs = [];

    $inputs.each(function(index, node) {
        inputs.push(new Input(node));
    })

    $form.on('submit', function(e) {
        e.preventDefault();
        $inputs.trigger('blur');

        for (var i = 0; i < inputs.length; i++) {
            var item = inputs[i];
            var r = item.validator.is_valid();
            if (!r) {
                alert('invalid');
                return;
            }
        }
        alert('valid');
    })
})