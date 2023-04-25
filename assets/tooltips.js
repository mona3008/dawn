{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: calc({{ section.settings.padding_top }}px * 0.75);
    padding-bottom: calc({{ section.settings.padding_bottom }}px  * 0.75);
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}


<div class="color-{{ section.settings.color_scheme }} gradient">
  <div class="section-{{ section.id }}-padding">
    {{ section.settings.custom_liquid }}
  </div>
</div>

{%- assign button_width_small = 28 -%}
{%- assign button_width_large = 32 -%}
{%- assign tooltip_max_width = 320 -%}
{%- assign image_aspect_ratio = section.settings.image.aspect_ratio | default: 1 -%}
{%- assign section_selector = '[data-tooltips="' | append: section.id | append: '"]'-%}

<style>
  .tooltips-section {
    position: relative;
  }
  
  .tooltips-figure {
    margin: 0;
  }
  
  .tooltips-img {
    display: block;
    width: 100%;
  }
  
  .tooltips-list {
    padding: 0 0 0 32px;
    list-style: decimal;
  }
  
  .tooltip-item {
    box-sizing: border-box;
    padding: 8px 12px;
  }
  
  .tooltip-button {
    background: transparent;
    width: 100%;
    border: 0;
    padding: 0;
    text-align: left;
    z-index: 1;
  }

  .tooltip-button:focus {
    outline: none;
  }
  
  .tooltip-index {
    border-radius: 50%;
    text-align: center;
    position: absolute;
    padding: 0;
    font-size: 14px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    line-height: {{ button_width_small }}px;
    width: {{ button_width_small }}px;
  }

  .tooltip-overlay {
    background: #fff;
    opacity: 1;
    overflow: hidden;
    will-change: height;
  }
  
  .tooltip-header {
    display: none;
  }
  
  {{ section_selector }} .tooltip-button:focus .tooltip-index,
  {{ section_selector }} .tooltip-button[aria-expanded="true"] .tooltip-index {
    box-shadow: 0 0 0 2px {{ section.settings.tooltip_focus_color }};
  }
  
  {{ section_selector }} .tooltip-index {
    background-color: {{ section.settings.tooltip_background_color }};
    color: {{ section.settings.tooltip_color }};
  }
  
  {%- for block in section.blocks -%}
  {{ section_selector }} .tooltip-item:nth-child({{ forloop.index }}) .tooltip-index {
    top: 0px;
    margin-top: {{ block.settings.top | divided_by: image_aspect_ratio }}%;
    left: {{ block.settings.left }}%;
  }
  {%- endfor -%}
  
  .tooltip-item .tooltip-overlay:empty {
    animation: none;
  }
  
  [aria-expanded="true"] ~ .tooltip-overlay {
    animation: tooltip-expand 200ms both cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  [aria-expanded="false"] ~ .tooltip-overlay {
    animation: tooltip-collapse 180ms both cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes tooltip-expand {
    0% { height: var(--start-h) }
    100% { height: var(--end-h) }
  }
  
  @keyframes tooltip-collapse {
    0% { height: var(--start-h) }
    100% { height: var(--end-h) }
  }

  @media (prefers-reduced-motion: reduce) {
    .tooltip-overlay {
      animation-duration: 0s!important;
    }
  }
  
  @media (min-width: {{ section.settings.breakpoint }}px) {
    .tooltips-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .tooltip-button .tooltip-index {
      font-size: 16px;
      position: static;
      transform: translate(0, 0);
      line-height: {{ button_width_large }}px;
      width: {{ button_width_large }}px;
    }
    
    .tooltip-button {
      position: absolute;
      padding: 0;
      font-size: 16px;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: {{ button_width_large }}px;
      height: {{ button_width_large }}px;
    }
    
    .tooltip-title {
      display: none;
    }
    
    .tooltip-item {
      max-width: {{ tooltip_max_width }}px;
      padding: 0;
    }
    
    [aria-expanded="true"] ~ .tooltip-overlay {
      margin-left: -{{ button_width_large }}px;
      z-index: 3;
    }
    
    [aria-expanded="true"].tooltip-button {
      z-index: 4;
    }

    .tooltip-overlay:empty {
      padding: 0;
      opacity: 0;
      transform: scale(0, 0);
    }
    
    .tooltip-overlay {
      max-width: 320px;
      padding: 16px 16px 16px 64px;
      margin-left: -32px;
      border-radius: 2px;
      box-shadow: 0 17px 50px 0 rgba(0,0,0,0.19);
      transform-origin: top left;
      position: absolute;
      will-change: opacity, transform;
    }
    
    .tooltip-header {
      display: block;
    }
    
    [aria-expanded="true"] ~ .tooltip-overlay {
      animation: tooltip-expand-large 200ms both cubic-bezier(0.4, 0, 0.2, 1);
    }

    [aria-expanded="false"] ~ .tooltip-overlay {
      animation: tooltip-collapse-large 180ms both cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes tooltip-expand-large {
      0% { opacity: 0; transform: scale(.2, .2); }
      100% { opacity: 1; transform: scale(1, 1); }
    }
    
    @keyframes tooltip-collapse-large {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    {%- for block in section.blocks -%}
      {%- assign y = block.settings.top | divided_by: image_aspect_ratio -%}
      {%- assign tooltip_selector = '#tooltip-' | append: block.id -%}

      {{ tooltip_selector }} .tooltip-button {
        top: 0px;
        margin-top: {{ y }}%;
        left: {{ block.settings.left }}%;
      }

      {{ tooltip_selector }} .tooltip-overlay {
        top: -{{ button_width_large }}px;
        margin-top: {{ y }}%;
        left: {{ block.settings.left }}%;
      }

      {{ tooltip_selector }} .tooltip-button .tooltip-index {
        margin-top: 0;
      }
    {%- endfor -%}
 
  }
</style>


{%- comment -%} ---------------- THE NO-JS ------------------- {%- endcomment -%}

<noscript>
  <style>
    .tooltips-section .tooltips-list {
      list-style: decimal;
      padding: 24px;
    }

    .tooltip-item {
      position: static;
      padding: 16px;
      max-width: none;
    }
  </style>
</noscript>


{%- comment -%} ---------------- THE MARKUP ------------------ {%- endcomment -%}

<div class="tooltips-section" data-tooltips="{{ section.id }}">
  
  <figure class="tooltips-figure">
    {%- if section.settings.image == blank -%}
      {{ 'image' | placeholder_svg_tag: 'tooltips-picture' }}
    {%- else -%}
    <picture class="tooltips-picture">
      <source srcset="{{ section.settings.image | img_url: '320x' }} 1x,
                      {{ section.settings.image | img_url: '320x', scale: 2 }} 2x" media="(max-width: 320px)">
      <source srcset="{{ section.settings.image | img_url: '420x' }} 1x,
                      {{ section.settings.image | img_url: '420x', scale: 2 }} 2x" media="(max-width: 420px)">
      <source srcset="{{ section.settings.image | img_url: '768x' }} 1x,
                      {{ section.settings.image | img_url: '768x', scale: 2 }} 2x" media="(max-width: 768px)">
      <source srcset="{{ section.settings.image | img_url: '1240x' }} 1x,
                      {{ section.settings.image | img_url: '1240x', scale: 2 }} 2x" media="(max-width: 1240px)">
      <source srcset="{{ section.settings.image | img_url: '1440x' }} 1x,
                      {{ section.settings.image | img_url: '1440x', scale: 2 }} 2x" media="(max-width: 1440px)">
      <source srcset="{{ section.settings.image | img_url: '1660x' }} 1x,
                      {{ section.settings.image | img_url: '1660x', scale: 2 }} 2x" media="(max-width: 1660px)">
      <source srcset="{{ section.settings.image | img_url: '2048x' }} 1x,
                      {{ section.settings.image | img_url: '2048x', scale: 2 }} 2x" media="(min-width: 1661px)">
      <img class="tooltips-img" src="{{ section.settings.image | img_url: '2048x' }}" alt="{{ section.settings.image.alt }}">
    </picture>
    {%- endif -%}
  </figure>
  
  <ol class="tooltips-list" aria-label="{{ section.settings.title }}">
    {%- for block in section.blocks -%}
    <li class="tooltip-item" id="tooltip-{{ block.id }}">
      <button class="tooltip-button"
              type="button" 
              value="{{ block.id }}"
              aria-describedby="tooltip-overlay-{{ block.id }}" 
              aria-label="{{ forloop.index }}, {{ block.settings.title }}" 
              aria-expanded="false" 
              data-tooltip-trigger
              {{ block.shopify_attributes }} >
        <div class="tooltip-index" role="none">{{ forloop.index }}</div>
        <strong class="tooltip-title" role="none">{{ block.settings.title }}</strong>
      </button>
      <aside class="tooltip-overlay" id="tooltip-overlay-{{ block.id }}" data-tooltip-overlay></aside>
      <noscript data-tooltip-markup>
        <strong class="tooltip-header">{{ block.settings.title }}</strong>
        {{ block.settings.content }}
      </noscript>
    </li>
    {%- endfor -%}
  </ol>
  
  
{%- comment -%} ---------------- THE CONFIG ------------------ {%- endcomment -%}
  
  <script data-tooltips-config type="application/json">
   {
     "breakpoint": {{ section.settings.breakpoint }},
     "sectionId": {{ section.id | json }},
     "blocksId": {{ section.blocks | map: 'id' | json }}
   }
  </script>

</div>


{%- comment -%} ------------------ THE JS -------------------- {%- endcomment -%}

<script src="{{ 'tooltips.js' | asset_url }}" defer="defer"></script>


{%- comment -%} --------------- THEME EDITOR ----------------- {%- endcomment -%}

{%- if section.blocks.last.shopify_attributes != blank -%}
<script>
  (function ThemeEditor(SD){
    var sectionId = {{ section.id | json }};
    if (SD.ThemeEditor[sectionId]) return;
    
    SD.ThemeEditor[sectionId] = 'init';
    initEvents(sectionId);
    
    document.addEventListener('shopify:section:load', function(evt) {
      if (evt.detail.sectionId !== sectionId) return;
      
      var section = SD[sectionId];
      section.init(section.config);
      initEvents(sectionId);
    });

    function initEvents(sectionId) {
      var sectionHost = document.querySelector('[data-tooltips="' + sectionId + '"]');

      sectionHost.addEventListener('shopify:block:select', toggleSelect);
      sectionHost.addEventListener('shopify:block:deselect', toggleSelect); 
    }
    
    function toggleSelect(evt) {
      var sectionId = evt.detail.sectionId;
      var blockId = evt.detail.blockId;
      var section = SD[sectionId];
      
      evt.type === 'shopify:block:select'
      ? section.select(blockId)
      : section.deselect(blockId)
      
      updateBlocks(section, blockId);
    }
    
    function updateBlocks(section, blockId) {
      if (section.config.blocksId.indexOf(blockId) === -1) {
        section.config.blocksId.push(blockId);
      }
    }
 
  })(window.SectionsDesign = window.SectionsDesign || {ThemeEditor: []});
</script>
{%- endif -%}

{%- comment -%} ---------------- THE SETTINGS ---------------- {%- endcomment -%}

{% schema %}
{
  "name": "Tooltips",
  "class": "sd-tooltips",
  "settings": [
    {
      "type": "paragraph",
      "content": "Tooltips by Sections.design"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Main image"
    },
    {
      "type": "color",
      "id": "tooltip_color",
      "label": "Tooltip text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "tooltip_background_color",
      "label": "Tooltip background color",
      "default": "#64cbdf"
    },
    {
      "type": "color",
      "id": "tooltip_focus_color",
      "label": "Tooltip focus color",
      "default": "#ff0000"
    },
    {
      "type": "text",
      "id": "breakpoint",
      "label": "Media query breakpoint",
      "default": "768"
    }
  ],
  "blocks": [
    {
      "type": "Tooltip",
      "name": "Tooltip",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Tooltip",
          "default": "Tooltip title"
        },
        {
          "type": "html",
          "id": "content",
          "label": "Tooltip HTML content",
          "default": "I am a tooltip, I provide additional explanatory content and showcase product features."
        },
        {
          "type": "range",
          "id": "top",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "%",
          "label": "Top position",
          "default": 50
        },
        {
          "type": "range",
          "id": "left",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "%",
          "label": "Left position",
          "default": 50
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Tooltips",
      "category": "Tooltips by Sections.design",
      "blocks": [
        {
          "type": "Tooltip"
        }
      ]
    }
  ]
}
{% endschema %}
/*! tooltips.js
    v0.1 (c) Mircea Piturca
    MIT License
*/
(function Tooltips(SD){
  'use strict';
  
  var support = getSupport();
  var instances = nodeList('[data-tooltips-config]');

  instances.map(function(instance){
    var config = Object.freeze(getConfig(instance));

    var publicAPI = {
      tooltips: function() { return getTooltips(config) },
      tooltip: getTooltip,
      select: select,
      deselect: deselect,
      config: config,
      init: init
    }

    if (!SD[config.sectionId]) init(config);    
    SD[config.sectionId] = publicAPI;
    
    return publicAPI;
  })


  // ******************************

  function init(config) {
    var tooltips = getTooltips(config);
    var triggers = pluck(tooltips, 'trigger');

    triggers.map(function(element) {
      element.addEventListener('click', function triggerClick() {
        tooltipClick(tooltips, element.value);
      });
    });
  }

  function getConfig(instance) {
    return JSON.parse(instance.innerHTML);
  }

  function getTooltips(config) {
    return config.blocksId.map(getTooltip);
  }

  function getTooltip(id) {
    var host = document.getElementById('tooltip-' + id);

    return {
      id: id,
      trigger: host.querySelector('[data-tooltip-trigger]'),
      overlay: host.querySelector('[data-tooltip-overlay]'),
      markup: host.querySelector('[data-tooltip-markup]'),
      get collapsed() { return isCollapsed(this) }
    }
  }

  function tooltipClick(tooltips, id) {
    var isSelected = partial(idMatch, id);
    tooltips.filter(isSelected).map(toggle);
    tooltips.filter(not(isSelected)).filter(not(isCollapsed)).map(collapse);
  }
  
  function toggle(tooltip) {
    tooltip.collapsed ? expand(tooltip) : collapse(tooltip);
  }

  function expand(tooltip) {
    tooltip.overlay.innerHTML = tooltip.markup.textContent;
    tooltip.overlay.style.setProperty('--end-h', height(tooltip));
    tooltip.overlay.style.setProperty('--start-h', '0px');
    tooltip.trigger.setAttribute('aria-expanded', true);

     tooltip.overlay.addEventListener('animationend', function animationEndFn() {
      animationReset(tooltip.overlay, animationEndFn);
    });

    return tooltip;
  }

  function collapse(tooltip) {
    tooltip.overlay.style.setProperty('--start-h',  height(tooltip));
    tooltip.overlay.style.setProperty('--end-h', '0px');
    tooltip.trigger.setAttribute('aria-expanded', false);
    
    if (!support.customProperties) tooltip.overlay.innerHTML = '';

    tooltip.overlay.addEventListener('animationend', function animationEndFn() {
      animationReset(tooltip.overlay, animationEndFn);
      tooltip.overlay.innerHTML = '';
    });

    return tooltip;
  }

  function animationReset(element, callback) {
    element.removeAttribute('style');
    element.removeEventListener('animationend', callback);
  }

  function idMatch(id, tooltip) {
    return tooltip.id === id;
  }

  function isCollapsed(tooltip) {
    return attr('aria-expanded', tooltip.trigger) === 'false';
  }

  function height(tooltip) {
    return px(tooltip.overlay.offsetHeight.toString());
  }

  function px(n) {
    return n + 'px';
  }

  /* DOM */
  function attr(str, element) {
    return element.getAttribute(str);
  }

  function nodeList(str, root) {
    if (!root) root = document;
    var nodeList = root.querySelectorAll(str);
    return Array.prototype.slice.call(nodeList);
  }

  /* Fn */
  function not(predicate) {
    return function negated() {
      return !predicate.apply(undefined, arguments);
    };
  }

  function pluck(array, key) {
    return array.map(function(obj) {
      return obj[key];
    });
  }

  function partial(fn) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
      return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }

  /* Support */
  function getSupport() {
    return {
      customProperties: window.CSS && CSS.supports('color', 'var(--primary)'),
    }
  }

  /* Theme editor */
  function select(blockId) {
    return expand(getTooltip(blockId));
  }

  function deselect(blockId) {
    return collapse(getTooltip(blockId));
  }
  
})(window.SectionsDesign = window.SectionsDesign || {});
