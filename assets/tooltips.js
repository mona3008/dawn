function init(config) {
  var tooltips = getTooltips(config);
  var triggers = pluck(tooltips, 'trigger');

  triggers.map(function(element) {
    element.addEventListener('mouseenter', function triggerMouseenter() {
      expand(tooltip);
    });
    element.addEventListener('mouseleave', function triggerMouseleave() {
      collapse(tooltip);
    });
  });
}
