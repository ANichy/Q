/* global CKEDITOR */


document.addEventListener("DOMContentLoaded", function() {

    var container = document.body;

    var div_open_highed = document.createElement('div');
    div_open_highed.className = "hid";
    div_open_highed.style.width = '130px';
    div_open_highed.style.height = '40px';
    div_open_highed.style.position = 'fixed';
    div_open_highed.style.top = '40%';
    div_open_highed.style.left = '-55px';
    div_open_highed.style.backgroundColor = '#222222';
    div_open_highed.style.backgroundSize = 'cover';
    div_open_highed.style.transform = 'rotateZ(90deg)';
    div_open_highed.style.backgroundImage = 'url("data:image/svg+xml;utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!--%20Generator%3A%20Adobe%20Illustrator%2016.0.3%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200)%20%20--%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Warstwa_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20%20%20%20width%3D%22425.197px%22%20height%3D%22141.732px%22%20viewBox%3D%220%200%20425.197%20141.732%22%20enable-background%3D%22new%200%200%20425.197%20141.732%22%20%20%20%20%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M138.475%2C69.712h-17.02v9.77c0%2C1.037-0.813%2C1.851-1.849%2C1.851c-1.037%2C0-1.85-0.813-1.85-1.851V57.725%20%20%20%20%20%20%20%20c0-1.037%2C0.813-1.852%2C1.85-1.852c1.036%2C0%2C1.849%2C0.813%2C1.849%2C1.852v8.436h17.02v-8.436c0-1.037%2C0.814-1.852%2C1.85-1.852%20%20%20%20%20%20%20%20c1.036%2C0%2C1.85%2C0.813%2C1.85%2C1.852v21.754c0%2C1.037-0.814%2C1.851-1.85%2C1.851c-1.036%2C0-1.85-0.813-1.85-1.851V69.712z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M156.973%2C79.479c0%2C1.037-0.814%2C1.851-1.852%2C1.851s-1.852-0.813-1.852-1.851V57.725%20%20%20%20%20%20%20%20c0-1.037%2C0.814-1.852%2C1.852-1.852s1.852%2C0.813%2C1.852%2C1.852V79.479z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M184.125%2C70.378c0-1.036%2C0.814-1.774%2C1.852-1.774c1.034%2C0%2C1.852%2C0.813%2C1.852%2C1.849v5.847%20%20%20%20%20%20%20%20c0%2C0.444-0.226%2C1.109-0.595%2C1.479c-2.367%2C2.369-5.549%2C3.773-9.176%2C3.773c-7.178%2C0-12.949-5.771-12.949-12.948%20%20%20%20%20%20%20%20c0-7.181%2C5.771-12.949%2C12.949-12.949c3.627%2C0%2C6.809%2C1.405%2C9.176%2C3.771c0.738%2C0.74%2C0.738%2C1.852%2C0%2C2.592%20%20%20%20%20%20%20%20c-0.741%2C0.738-1.922%2C0.813-2.663%2C0.072c-1.702-1.699-3.923-2.736-6.513-2.736c-5.104%2C0-9.249%2C4.144-9.249%2C9.25%20%20%20%20%20%20%20%20c0%2C5.104%2C4.146%2C9.25%2C9.249%2C9.25c2.367%2C0%2C4.441-0.813%2C6.067-2.222V70.378z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M218.162%2C69.712h-17.019v9.77c0%2C1.037-0.817%2C1.851-1.852%2C1.851c-1.037%2C0-1.849-0.813-1.849-1.851V57.725%20%20%20%20%20%20%20%20c0-1.037%2C0.812-1.852%2C1.849-1.852c1.034%2C0%2C1.852%2C0.813%2C1.852%2C1.852v8.436h17.019v-8.436c0-1.037%2C0.813-1.852%2C1.849-1.852%20%20%20%20%20%20%20%20c1.037%2C0%2C1.852%2C0.813%2C1.852%2C1.852v21.754c0%2C1.037-0.813%2C1.851-1.852%2C1.851c-1.033%2C0-1.849-0.813-1.849-1.851V69.712z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M242.948%2C81.552c-7.182%2C0-12.949-5.771-12.949-12.948c0-7.181%2C5.77-12.949%2C12.949-12.949%20%20%20%20%20%20%20%20c3.627%2C0%2C6.809%2C1.405%2C9.176%2C3.771c0.738%2C0.74%2C0.738%2C1.852%2C0%2C2.592c-0.741%2C0.738-1.925%2C0.813-2.666%2C0.072%20%20%20%20%20%20%20%20c-1.699-1.699-3.92-2.736-6.51-2.736c-5.106%2C0-9.249%2C4.144-9.249%2C9.25c0%2C5.104%2C4.143%2C9.25%2C9.249%2C9.25%20%20%20%20%20%20%20%20c2.59%2C0%2C4.884-0.962%2C6.586-2.664c0.74-0.741%2C1.849-0.741%2C2.59%2C0c0.738%2C0.738%2C0.738%2C1.85%2C0%2C2.589%20%20%20%20%20%20%20%20C249.756%2C80.146%2C246.574%2C81.552%2C242.948%2C81.552z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M281.569%2C69.712h-17.02v9.77c0%2C1.037-0.813%2C1.851-1.852%2C1.851c-1.034%2C0-1.85-0.813-1.85-1.851V57.725%20%20%20%20%20%20%20%20c0-1.037%2C0.813-1.852%2C1.85-1.852c1.035%2C0%2C1.852%2C0.813%2C1.852%2C1.852v8.436h17.02v-8.436c0-1.037%2C0.813-1.852%2C1.853-1.852%20%20%20%20%20%20%20%20c1.034%2C0%2C1.849%2C0.813%2C1.849%2C1.852v21.754c0%2C1.037-0.813%2C1.851-1.849%2C1.851c-1.037%2C0-1.853-0.813-1.853-1.851V69.712z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M308.758%2C57.503l10.507%2C20.646c0.223%2C0.443%2C0.445%2C1.036%2C0.445%2C1.554c0%2C1.036-0.668%2C1.628-1.702%2C1.628%20%20%20%20%20%20%20%20c-0.741%2C0-1.481-0.222-2.001-1.258l-3.253-6.438h-13.547l-3.183%2C6.438c-0.517%2C1.036-1.256%2C1.258-1.994%2C1.258%20%20%20%20%20%20%20%20c-1.037%2C0-1.702-0.593-1.702-1.628c0-0.519%2C0.22-1.109%2C0.442-1.554l10.506-20.646c0.668-1.405%2C2.002-1.628%2C2.74-1.628%20%20%20%20%20%20%20%20C306.76%2C55.875%2C308.09%2C56.096%2C308.758%2C57.503z%20M300.985%2C70.083h9.988l-4.957-9.99L300.985%2C70.083z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M340.159%2C56.023c4.441%2C0%2C8.064%2C3.255%2C8.064%2C7.694c0%2C3.923-2.813%2C6.884-6.511%2C7.549l6.731%2C7.104%20%20%20%20%20%20%20%20c0.664%2C0.666%2C0.889%2C1.85%2C0.146%2C2.516c-0.736%2C0.741-2.145%2C0.521-2.886-0.296l-8.729-9.176h-6.511v8.142%20%20%20%20%20%20%20%20c0%2C1.034-0.815%2C1.774-1.854%2C1.774c-1.033%2C0-1.85-0.813-1.85-1.851V57.873c0-1.035%2C0.814-1.85%2C1.85-1.85H340.159z%20M330.468%2C59.575%20%20%20%20%20%20%20%20v8.288h9.691c2.59%2C0%2C4.367-1.776%2C4.367-4.146c0-2.365-1.777-4.144-4.367-4.144L330.468%2C59.575L330.468%2C59.575z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M365.047%2C59.575h-9.249c-1.033%2C0-1.849-0.74-1.849-1.776c0-1.034%2C0.813-1.773%2C1.849-1.773h22.201%20%20%20%20%20%20%20%20c1.037%2C0%2C1.852%2C0.74%2C1.852%2C1.773c0%2C1.037-0.813%2C1.776-1.852%2C1.776h-9.249V79.48c0%2C1.037-0.813%2C1.851-1.849%2C1.851%20%20%20%20%20%20%20%20c-1.037%2C0-1.854-0.813-1.854-1.851V59.575z%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23eeeaea%22%20d%3D%22M388.724%2C66.013c0-9.25%2C5.698-10.359%2C9.99-10.359c1.035%2C0%2C1.85%2C0.813%2C1.85%2C1.85%20%20%20%20%20%20%20%20c0%2C1.036-0.813%2C1.851-1.85%2C1.851c-3.479%2C0-6.29%2C0.738-6.29%2C6.66v5.18c0%2C9.25-5.698%2C10.358-9.989%2C10.358%20%20%20%20%20%20%20%20c-1.035%2C0-1.85-0.813-1.85-1.85s0.814-1.85%2C1.85-1.85c3.479%2C0%2C6.289-0.74%2C6.289-6.66V66.013z%22%2F%3E%3C%2Fg%3E%3Cpolygon%20fill%3D%22%238087E8%22%20points%3D%2267.981%2C30.52%2056.757%2C56.73%2042.009%2C91.171%2076.301%2C76.685%2094.465%2C69.013%20%22%2F%3E%3Cpolygon%20fill%3D%22%2330426B%22%20points%3D%2273.7%2C62.25%2076.302%2C76.685%2094.466%2C69.013%20%22%2F%3E%3Cpolygon%20fill%3D%22%236699A1%22%20points%3D%2267.981%2C30.52%2073.7%2C62.251%2094.465%2C69.013%20%22%2F%3E%3Cpolygon%20fill%3D%22%2378758C%22%20points%3D%2273.7%2C62.25%2094.466%2C69.013%2056.758%2C56.729%2042.009%2C91.171%2076.302%2C76.685%20%22%2F%3E%3Cpolygon%20fill%3D%22%23A3EDBA%22%20points%3D%2242.009%2C91.171%2056.757%2C56.73%2026.442%2C46.855%20%22%2F%3E%3Cpolygon%20fill%3D%22%236699A1%22%20points%3D%2276.302%2C76.685%2079.628%2C95.13%2094.466%2C69.013%20%22%2F%3E%3Cpolygon%20fill%3D%22%238087E8%22%20points%3D%2267.981%2C30.52%2056.757%2C56.73%2073.7%2C62.251%20%22%2F%3E%3C%2Fsvg%3E")';
    div_open_highed.style.zIndex = '99';
    div_open_highed.style.transition = 'all 1s';
    div_open_highed.style.border = '1px solid #222';


    var div_highed = document.createElement('div');
    container.appendChild(div_open_highed);
    container.appendChild(div_highed);

    div_highed.className = "hid";
    div_highed.setAttribute('id', 'highcharts_editor_container');
    div_highed.style.width = '100%';
    div_highed.style.height = '100%';
    div_highed.style.position = 'fixed';
    div_highed.style.top = '0';
    div_highed.style.left = '-150%';
    div_highed.style.zIndex = '99';
    div_highed.style.transition = 'all 1s';
    div_highed.style.border = '1px solid #222';
    div_highed.style.background = 'rgba(0,0,0,0.5)';


    highed.ready(function () {
        highed.DrawerEditor(document.getElementById("highcharts_editor_container"));
    });


    var span = document.createElement('span');
    span.setAttribute('title','Свернуть редактирование графиков');
    span.style.width = '35px';
    span.style.height = '35px';
    span.style.position = 'absolute';
    span.style.background = '#fff';
    span.style.top = '0';
    span.style.left = '50%';
    span.style.zIndex = '99';
    span.style.fontSize = '30px';
    span.style.textAlign = 'center';
    span.classList.add("fa","fa-close");

    div_highed.appendChild(span);


    span.onclick = () =>{
        div_highed.style.left = "-150%"
    };

    div_open_highed.onclick = () =>{
        div_highed.style.left = "0%"
    };
})




;(function() {





//  console.log(div_highed);

  var el = document.getElementById('ckeditor-init-script');
  if (el && !window.CKEDITOR_BASEPATH) {
    window.CKEDITOR_BASEPATH = el.getAttribute('data-ckeditor-basepath');
  }

  // Polyfill from https://developer.mozilla.org/en/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
  }

  function runInitialisers() {
    initialiseCKEditor();
    initialiseCKEditorInInlinedForms();
  }

  if (document.readyState != 'loading') {
    runInitialisers();
  } else {
    document.addEventListener('DOMContentLoaded', runInitialisers);
  }





  function initialiseCKEditor() {
    var textareas = Array.prototype.slice.call(document.querySelectorAll('textarea[data-type=ckeditortype]'));
    for (var i=0; i<textareas.length; ++i) {
      var t = textareas[i];
      if (t.getAttribute('data-processed') == '0' && t.id.indexOf('__prefix__') == -1) {
        t.setAttribute('data-processed', '1');
        var ext = JSON.parse(t.getAttribute('data-external-plugin-resources'));
        for (var j=0; j<ext.length; ++j) {
          CKEDITOR.plugins.addExternal(ext[j][0], ext[j][1], ext[j][2]);
        }
        CKEDITOR.replace(t.id,
        JSON.parse(t.getAttribute('data-config')
        ));


      }
    }
  }

  function initialiseCKEditorInInlinedForms() {
    document.body.addEventListener('click', function(e) {
      if (e.target && (
        e.target.matches('.add-row a') ||
        e.target.matches('.grp-add-handler')
      )) {
        initialiseCKEditor();
      }
    });
  }






}());
