function validate(form, inputs) {
    if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')
    if (!Array.isArray(inputs) || inputs.length < 1) throw Error('array is not valid')

    var result = 1;
    for (var i in inputs) {
        var input = form.querySelector('input[name="' + inputs[i] + '"]');
        if (!input.value) {
            input.classList.add('is-invalid');
            result = 0;
        } else {
            input.classList.remove('is-invalid');
        }
    }

    return result;
}
