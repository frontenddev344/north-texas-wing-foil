(function () {
  var triggers = document.querySelectorAll('.accordion__trigger');
  if (!triggers.length) return;

  var DURATION = 350;

  function setPanelHeight(panel, height) {
    panel.style.height = height + 'px';
  }

  function openPanel(trigger, panel) {
    panel.hidden = false;
    panel.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    setPanelHeight(panel, 0);
    panel.offsetHeight;
    var content = panel.querySelector('.accordion__content');
    var h = content ? content.scrollHeight : 0;
    setPanelHeight(panel, h);
  }

  function closePanel(trigger, panel) {
    var content = panel.querySelector('.accordion__content');
    var startHeight = content ? content.offsetHeight : 0;
    setPanelHeight(panel, startHeight);
    panel.offsetHeight;
    setPanelHeight(panel, 0);
    trigger.setAttribute('aria-expanded', 'false');
    setTimeout(function () {
      panel.hidden = true;
      panel.classList.remove('is-open');
      panel.style.height = '';
    }, DURATION);
  }

  triggers.forEach(function (trigger) {
    var panelId = trigger.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;
    if (panel) {
      panel.style.transitionDuration = (DURATION / 1000) + 's';
      if (panel.hidden) {
        setPanelHeight(panel, 0);
      }
    }

    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var p = panelId ? document.getElementById(panelId) : null;
      if (!p) return;

      if (expanded) {
        closePanel(this, p);
      } else {
        openPanel(this, p);
      }
    });
  });
})();
