$(function() {
    var trigger = $('.sf-select-trigger');
    var options = $('.sf-select-options .selector-options');

    /**
     * Hide the current selector's options.
     */
    function hideOptions() {
        // Because the tree selector can be injected by a JS
        // template, we need to use the selector directly here,
        // as the element will not exist on DOM ready.
        $('.sf-select-options').hide();
    }

    /**
     * Append the selected filter to the query field.
     * @param {String} selectedFilter - The selected filter.
     */
    function appendFilter(selectedFilter) {
        var queryField = $('#query');
        var value = queryField.val();

        value += ' ' + selectedFilter;
        queryField.val(value);
        queryField[0].focus();
    }

    // Show/Hide the options
    trigger.click(function(event) {
        event.stopPropagation();

        var optionsContainer = $('.sf-select-options');
        var expanded = optionsContainer.attr('aria-expanded');

        optionsContainer.toggle();

        // Update ARIA expanded state
        optionsContainer.attr('aria-expanded', expanded === 'false' ? 'true' : 'false');
        // Move focus to options container if expanded
        if (expanded === 'false') {
            $('.selector-options', optionsContainer)[0].focus();
        }
    });

    options.on('click', 'a', function(event) {
        event.stopPropagation();

        appendFilter($(this).data('value'));

        hideOptions();
    });

    window.addEventListener('click', hideOptions, false);

    onEsc(function() {
        $('.sf-select-options').hide();
    });
});
