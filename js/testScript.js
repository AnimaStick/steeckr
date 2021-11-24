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

//Muda o estado do objeto no menu lateral
function changeSize(menuItem) {
    menuItem.classList.toggle("extended");
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