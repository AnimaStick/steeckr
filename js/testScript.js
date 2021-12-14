//Muda o estado do menu lateral
$(document).ready(function(){
    $(".search_button").click(function(){
       $(".search_bar_div").toggleClass("m");
    });
    $(".top_navbar .top_menu .search_bar_div a").click(function(){
        $(".search_bar_div").toggleClass("m");
    });
    $('.menu_item').click(function(){
        $('.menu_item').removeClass('active_item');
        $(this).addClass('active_item');
    });
});

$(document).scroll(function() {
    try {
        var y = $(this).scrollTop();
        const form_popup = document.getElementsByClassName('form_popup')[0]
        const imgLog = document.getElementById('imgForm')
        let sizeY = $(window).height();
        let sizeX = $(window).width();
        // resizeStuff()
        if (y > 200) {
            if(sizeX < 800){
                imgLog.style.display = "none"
            }
            else{
                imgLog.style.display = "block"
            }
            form_popup.style.display = "block"
        } else {
            form_popup.style.display = "none"
        }
        if (form_popup.style.display == "block") {
                $('.top_navbar').addClass("blur")
                $('.sidebar').addClass("blur")
                $('.main_container').addClass("blur")
            
        } else {
                $('.top_navbar').removeClass("blur")
                $('.sidebar').removeClass("blur")
                $('.main_container').removeClass("blur")
        }
    } catch (err) {
        console.log("oie");
    }
});

// window.addEventListener('resize', function(event){
//     resizeStuff()
// });

// function resizeStuff() {
//     var w = window.innerWidth
//     var h = window.innerHeight

//     fp = document.getElementsByClassName('form_popup')[0]

//     fp.style.paddingLeft = `${(w - 700)/2}px`
//     fp.style.height = `${h - 60}px`
// }

//Muda o estado do objeto no menu lateral
function changeSize(menuItem) {
    menuItem.classList.toggle("extended");
}

function showMenu() {
    e = document.getElementsByClassName("dropdown-content")[0]
    if (e.style.visibility == `collapse`) e.style.visibility = `visible`
    else e.style.visibility = `collapse`
}

function seePassword(){
    let senha = document.getElementById("password")
    let icon = document.getElementById("togglePassword")
    console.log(icon.classList)
    if(senha.getAttribute("type") == "password"){
        senha.type = "text"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
    }
    else{
        senha.type = "password"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
    }
}

//Muda o conteudo da pagina
function showContent (elmnt) {

    //Parte para escolher qual conteudo sera exibido e qual sera removido
    var cl = elmnt.getAttribute("class").split(" ")
    cl = cl[1] + "Content.html"
    

    //Parte que remove o anterior
    try {
        document.getElementById("include_wrapper").remove()
        document.getElementById("include_style").remove()
        document.getElementsByTagName("script")[3].remove()
    } catch(npe){
        console.log("alou")
    }

    //Parte onde a magica acontece
    function a(a, b) {
        var c = /^(?:file):/,
        d = new XMLHttpRequest,
        e = 0;
        d.onreadystatechange = function() {
            4 == d.readyState && (e = d.status),
            c.test(location.href) && d.responseText && (e = 200),
            4 == d.readyState && 200 == e && (a.outerHTML = d.responseText)
        };
        try {
            d.open("GET", b, !0),
            d.send() 
        } catch(f) {}
    }
    var b,
    c = document.getElementsByTagName("*");
    for(b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && c[b].getAttribute("data-include") == cl && a(c[b], c[b].getAttribute("data-include"))
};