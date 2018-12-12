
const Content = document.getElementById('content');
const Url = new URL(window.location.href);




//Создание get параметров для урл
const SET_URL_PARAMS = (url,param,value) => {
 if(url.searchParams.get(param) === null ){
     url.searchParams.append(param, value);
  }else{
    if(param === 'slide'){
      url.searchParams.set(param, value);
    }
  }
  history.pushState(null, null, url);
};




const UPDATE_PROGRESS = (elem,value) =>{
    elem.setAttribute('value',value)
};





//подгрузка графиков в слайды
const LOAD_STAT = (param) => {
  AJAX('/presentation/api/get-chart'+param+'/report/'+Idreport+'/?format=json','json')
  .then(result => window[('CHART'+param)](result))
};









const NEXT_SLIDE = (id) => {
       let Content = document.getElementById('next_slide_prewiew');


      for (i of document.getElementsByClassName('menu__link--current')) {
          var slide = parseInt(i.dataset.slide);
          if (slide+1 >= document.getElementsByClassName('slide_loader').length) {
              return false;
          }
      }
       AJAX('/presentation/api/get-slide/'+id+'/','text').then( result => {
       Content.innerHTML = result;
        //load custom charts
       try {
            let node = document.createRange().createContextualFragment(result);
            for (i of node.getElementById('slide_'+id).getElementsByTagName('script')){
                eval(i.textContent);
            }

       }catch(e){
            console.log('custom charts not found')
       }
        //load charts
       try {
            let charts = Content.getElementsByClassName('load_chart');
            for (i of charts) {
                LOAD_STAT(i.dataset.init)
            }
       }catch (e) {
            console.log('charts not found')
       }

   });
};




//подгрузка слайдов
const GET_SLIDE = (id,elem,report,serial_number) => {
    let slide = elem.dataset.sorting;
    EDIT_SLIDE(id);
    console.log(slide);
    let progress = document.getElementById('progress_slides');
    UPDATE_PROGRESS(progress,parseInt(slide));
    for (i of document.getElementsByClassName('slide_loader')){
        if(parseInt(i.dataset.slide) === (serial_number+1)){
          var id_next_slide = i.dataset.id;
          NEXT_SLIDE(id_next_slide);
        }
    }
    //progress bar

    CLEAR_PREWIEW();

    let el = document.getElementById("control_autoplay");
    el.innerHTML = '<svg class="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    el.setAttribute("onclick","AUTO_PLAY('1','"+3000+"','"+report+"')");


    IO_EMIT('slide',{"slide":slide,"report":report})

    if(document.getElementById('edit-slide')!=null){
     document.getElementById('edit-slide').setAttribute('href', '/admin/slides/slide/'+id+'/change/');
    }

    SET_URL_PARAMS(Url,'slide',id);

    AJAX('/presentation/api/get-slide/'+id+'/','text').then( result => {
       Content.innerHTML = result;
       wheelzoom(document.querySelectorAll('img'));
        //load custom charts
       try {
            let node = document.createRange().createContextualFragment(result);
            for (i of node.getElementById('slide_'+id).getElementsByTagName('script')){
                eval(i.textContent);
            }

       }catch(e){
            console.log('custom charts not found')
       }
        //load charts
       try {
            let charts = Content.getElementsByClassName('load_chart');
            for (i of charts) {
                LOAD_STAT(i.dataset.init)
            }
       }catch (e) {
            console.log('charts not found')
       }

           //scroll action
        let slide_html = document.getElementById("slide_"+id);
        slide_html.addEventListener("scroll",function (e) {
            console.log(e.target.scrollTop)
            IO_EMIT('scroll_slide',{"slide":id,"scrolling":e.target.scrollTop});
        });


   });


};


const CLEAR_PREWIEW = () =>{
 let content = document.getElementById("prewiew_slide");
 content.innerHTML = '';
 content.style.display = "none"
};






const GET_PREWIEW = (event,slide) =>{
    let content = document.getElementById("prewiew_slide");
    event.addEventListener("mouseenter", function (e) {
        let posY = (e.clientY);
        let posX = (e.clientX);
        content.style.top = e.clientY-450;
        content.style.display = "block"
    });


   AJAX('/presentation/api/get-slide/'+slide+'/','text').then( result => {
       content.innerHTML = result;
       try {
            let node = document.createRange().createContextualFragment(result);
            for (i of node.getElementById('slide_'+slide).getElementsByTagName('script')){
                eval(i.textContent);
            }

       }catch(e){
            console.log('custom charts not found')
       }

       try {
            let charts = content.getElementsByClassName('load_chart');
            for (i of charts) {
                LOAD_STAT(i.dataset.init)
            }
       }catch (e) {
            console.log('charts not found')
       }
    });


};




const AUTO_PLAY = (param,delay,report) => {
    let el = document.getElementById('control_autoplay');
        if(param === '1'){
        el.innerHTML = '<svg class="feather feather-pause sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="861"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        el.setAttribute("onclick","AUTO_PLAY('0','"+delay+"','"+report+"')");
    }else{

        el.innerHTML = '<svg class="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        el.setAttribute("onclick","AUTO_PLAY('1','"+delay+"','"+report+"')");
    }


     IO_EMIT("autoplay",{"param":parseInt(param),"delay":parseInt(delay),'report':parseInt(report)})
};




const IO_EMIT = (arg,data) => {

    let admin_mode = document.getElementById('admin_mode');
    if(admin_mode.checked === false){
           IO.emit(arg,data);
    }

};


// GET запросы к APi графиков
const AJAX = (url,type) => {
  return fetch(url, {cache: "no-cache"})
  .then(function(res){
    if (type === 'json') return res.json();
    if (type === 'text') return res.text();
  })
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
};




const ARROW_RIGHT = () =>{

    for (i of document.getElementsByClassName('menu__link--current')){
        let slide = parseInt(i.dataset.slide);
           for (c of document.getElementsByClassName('slide_loader')){

            if(slide+1===parseInt(c.dataset.slide)){
                if(slide+1>document.getElementsByClassName('slide_loader').length){
                 return false
                }else {
                    c.click()
                }
              }
        }
    }


};



const ARROW_LEFT = () =>{

    for (i of document.getElementsByClassName('menu__link--current')){
        var slide = parseInt(i.dataset.slide);
           for (c of document.getElementsByClassName('slide_loader')){

            if((slide-1)===parseInt(c.dataset.slide)){
                if((slide-1) === 0){
                 return false
                }else {
                    c.click()
                }
              }
        }
    }


};





const keydown_report = (evt) => {
    if (evt.keyCode === 39) {
        ARROW_RIGHT()
    }

    if (evt.keyCode === 37) {
        ARROW_LEFT()
    }
};




const ADD_SLIDE_TO = (sorting,report) => {
    alert(sorting)
};







/* позволяет делать тайминги при вызове ф-ций */
const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


const SET_PROGRESS = () => {
   let progress = document.getElementById('progress_slides');
   progress.setAttribute('max', document.getElementsByClassName('show_slide').length);
};




const RECHECK_SORT = () => {
    for(i in document.getElementsByClassName('hidden_slide_counter')){
        document.getElementsByClassName('hidden_slide_counter')[i].innerHTML = ' '
    }
    for(i in document.getElementsByClassName('show_slide_counter')){
        //console.log(document.getElementsByClassName('show_slide_counter')[i].parentElement.dataset);
        document.getElementsByClassName('show_slide_counter')[i].parentElement.dataset.sorting = parseInt(i)+1;
        document.getElementsByClassName('show_slide_counter')[i].parentElement.dataset.slide = parseInt(i)+1;
        document.getElementsByClassName('show_slide_counter')[i].innerHTML = parseInt(i)+1;
    }


    SET_PROGRESS()
};




const EDIT_SLIDE_OPEN = (id) =>{

    for(i of document.getElementsByClassName('slide_loader')){
        if(parseInt(i.dataset.id) === parseInt(id)){
            i.click()
        }
    }

    let form_box = document.getElementById('form-editor');

    localStorage.setItem('menu-editor', 'open');
    form_box.className = '';

    /*
    if(form_box.classList.contains('menu-editor-close') === true){
          localStorage.setItem('menu-editor', 'open');
          form_box.className = '';
    }else{
          localStorage.setItem('menu-editor', 'close');
          form_box.className = 'menu-editor-close';
    }
    */
};




const  UPDATE = (arg,noty) => {
    const REQ = (url,data,type) =>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {//Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                if(noty === true) {
                    new Noty({
                        type: 'success',
                        text: 'Успешно сохранено ' + type,
                        timeout: 3000,
                        layout:'bottomCenter',
                    }).show();
                }
                return true;
            }
        };
        xhr.send(data);
    };

    if (arg === 'content') {
        let id_report = document.getElementById('editor_id_report').value;
        let id_slide = document.getElementById('editor_id').value;
        let content = CKEDITOR.instances.id_content.getData();
        let csrftoken = Cookies.get('csrftoken');
        let data = 'report=' + id_report + '&id=' + id_slide + '&content=' + encodeURIComponent(content) + '&csrfmiddlewaretoken=' + csrftoken;
        REQ('/presentation/update-slide/?update=content',data, "Контент");
    }


    if (arg === 'title') {
        let id_report = document.getElementById('editor_id_report').value;
        let id_slide = document.getElementById('editor_id').value;
        let title = document.getElementById('editor_title').value;
        let csrftoken = Cookies.get('csrftoken');
        let data = 'report=' + id_report + '&id=' + id_slide + '&title=' + encodeURIComponent(title) + '&csrfmiddlewaretoken=' + csrftoken;
        REQ('/presentation/update-slide/?update=title',data,"Заголовок");

        for(i of document.getElementsByClassName('slide_loader')){
            if(parseInt(i.dataset.id) === parseInt(id_slide)){
                let count = i.getElementsByClassName('counter_slide_show')[0].innerText;
                i.innerHTML =`<div class="counter_slide_show">${count}</div>${title}`
            }
        }
    }


    if (arg === 'delete') {
        let id_report = document.getElementById('editor_id_report').value;
        let id_slide = document.getElementById('editor_id').value;
        let csrftoken = Cookies.get('csrftoken');
        let data = 'report=' + id_report + '&id=' + id_slide + '&delete=' + id_slide + '&csrfmiddlewaretoken=' + csrftoken;
        REQ('/presentation/update-slide/?update=delete',data);

        for(i of document.getElementsByClassName('menu__item ')){
            if(parseInt(i.dataset.id) === parseInt(id_slide)){
                i.remove();
                document.getElementById('close_editor_panel').click()
            }
        }
    }

    if (arg === 'hidden') {
        let id_report = document.getElementById('editor_id_report').value;
        let id_slide = document.getElementById('editor_id').value;
        let csrftoken = Cookies.get('csrftoken');
        if (document.getElementById('hidden_slide_checkbox').checked === true){
            var hidden = 1
        }else{
            var hidden = 0
        }
        let data = 'report=' + id_report + '&id=' + id_slide + '&hidden=' + hidden + '&csrfmiddlewaretoken=' + csrftoken;
        REQ('/presentation/update-slide/?update=hidden',data,'скрыть слайд');

        for(i of document.getElementsByClassName('menu__link')){
            if(parseInt(i.dataset.id) === parseInt(id_slide)){

                if(hidden === 1) {
                    i.style.textDecoration = "line-through";
                    i.style.color = "#af7575";
                    i.children[0].classList = "counter_slide_show hidden_slide_counter";
                    i.parentElement.classList = "menu__item hidden_slide ui-sortable-handle";

                }else{
                    i.style.textDecoration = "none";
                    i.style.color = "#bdbdbd";
                    i.children[0].classList = "counter_slide_show show_slide_counter";
                    i.parentElement.classList = "menu__item show_slide ui-sortable-handle";
                }
            }
        }
          RECHECK_SORT()

    }





};













const EDIT_SLIDE = (slide) => {
    let editor = CKEDITOR.instances.id_content;
    let editor_delete = document.getElementById('editor_delete');
    AJAX('/presentation/api/get-slide-editor/'+slide+'/','json').then( result => {

        let id_report = document.getElementById('editor_id_report');
        let id_slide = document.getElementById('editor_id');
        let hidden_slide = document.getElementById('hidden_slide_checkbox');
        let title = document.getElementById('editor_title').value = result.title;
        let sorting = document.getElementById('editor_sorting').value = result.sorting;
        editor_delete.value = result.id;
        hidden_slide.checked = result.hidden;
        hidden_slide.value = result.hidden;


        id_report.value = result.report;
        id_slide.value = result.id;
        title.value = result.title;
        editor.setData(result.content);
            //editor_sorting
            //editor_color
    });


    /*CKEDITOR.instances.id_content.on('change', function (event) {
        event.stop();
        event.cancel();
        UPDATE('content',false)
    });
    */
    document.getElementById('editor_title').oninput = () =>{
        UPDATE('title',false)
    };


    document.getElementById('hidden_slide_checkbox').onchange = () => {
      UPDATE('hidden',true)
    };

    editor_delete.onclick = () => {
        if(confirm("Удалить слайд?") === true){
            UPDATE('delete',false)
        }

    }


};

const ADMIN_MODE = (admin_mode) => {
    if (admin_mode.checked === false) {
        for (i of document.getElementsByClassName('editable_action')) {
            i.style.display = "none"
        }
        for (i of document.getElementsByClassName('hidden_slide')) {
            i.style.display = "none"
        }
        for (i of document.getElementsByClassName('hid')) {
            i.style.display = "none"
        }
        document.getElementById('add_slide').style.display = "none";
        document.getElementById('form-editor').classList = "menu-editor-close";



        $( "#sortable" ).sortable( "disable" );



    }else{
        for (i of document.getElementsByClassName('editable_action')) {
            i.style.display = ""
        }
        for (i of document.getElementsByClassName('hidden_slide')) {
            i.style.display = ""
        }
        for (i of document.getElementsByClassName('hid')) {
            i.style.display = ""
        }
        document.getElementById('add_slide').style.display = "";
        $( "#sortable" ).sortable( "enable" );
        document.getElementById('form-editor').classList = "";
    }
};


document.addEventListener("DOMContentLoaded", function() {

    try {
        document.getElementById('arrow_right').onclick = () => {
            ARROW_RIGHT()
        };
        document.getElementById('arrow_left').onclick = () => {
            ARROW_LEFT()
        };

        let admin_mode = document.getElementById('admin_mode');

        admin_mode.onchange = () => {
            ADMIN_MODE(admin_mode);
        };
        ADMIN_MODE(admin_mode);

        document.getElementById('editor_save_all').onclick = () => {
            UPDATE('title',true);
            UPDATE('content',true);
        };



        SET_PROGRESS();
        RECHECK_SORT();


    }catch (e) {
        console.log(e)
    }
});