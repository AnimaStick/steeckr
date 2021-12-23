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

window.addEventListener('resize', function(event){
    resizeStuff()
});

function resizeStuff() {
    var w = window.innerWidth
    var h = window.innerHeight

    let formsign = document.getElementById('divSignIn')
    let logosign = document.getElementById('logoSignIn')
    //Tira logo
    if(w< 770){
        logosign.classList.remove("d-block")
        logosign.classList.add("d-none")
    }
    else{
        logosign.classList.remove("d-none")
        logosign.classList.add("d-block")
    }

    //Aumenta a div
    if(w < 370){
        formsign.classList.remove("w-25")
        formsign.classList.remove("w-75")
        formsign.classList.remove("w-50")
        
    }
    else if(w < 560){
        formsign.classList.remove("w-25")
        formsign.classList.remove("w-50")
        formsign.classList.add("w-75")
    }
    else if(w < 1280){
        formsign.classList.remove("w-75")
        formsign.classList.remove("w-25")
        formsign.classList.add("w-50")
    }
    else{
        formsign.classList.remove("w-75")
        formsign.classList.remove("w-50")
        formsign.classList.add("w-25")
    }
   
}

//Muda o estado do objeto no menu lateral
function changeSize(menuItem) {
    menuItem.classList.toggle("extended");
}

function showMenu() {
    e = document.getElementsByClassName("dropdown-content")[0]
    if (e.style.visibility == `collapse`) e.style.visibility = `visible`
    else e.style.visibility = `collapse`
}

function signUpValidation(){
    let signinForm = document.getElementById("formSignUp")

    let email = document.getElementById("emailSignUp")
    let username = document.getElementById("usernameSignUp")
    let password = document.getElementById("passwordSignUp")
    let confirmPass = document.getElementById("confirmPassSignUp")

    let errorEmail = document.getElementById("errorEmailSignUp")
    let errorUser = document.getElementById("errorUsernameSignUp")
    let errorPass = document.getElementById("errorPasswordSignUp")
    let errorConfirmPass = document.getElementById("errorConfirmPassSignUp")

    // console.log(validateEmail(email.value))

    // if(validateEmail(email.value)){

    // }

    if(username.value != "admin"){
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        errorUser.classList.add("d-none")
    }
    else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        errorUser.classList.remove("d-none")
    }

    if(password.value.length > 8){
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        errorPass.classList.add("d-none")
    }
    else{
        password.classList.remove("is-valid")
        password.classList.add("is-invalid")
        errorPass.classList.remove("d-none")
    }

    if(confirmPass.value != password.value){
        confirmPass.classList.remove("is-invalid")
        confirmPass.classList.add("is-valid")
        errorConfirmPass.classList.remove("d-none")
    }
    else{
        confirmPass.classList.remove("is-valid")
        confirmPass.classList.add("is-invalid")
        errorConfirmPass.classList.add("d-none")
    }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function signInValidation(){
    let signinForm = document.getElementById("formSignIn")
    let username = document.getElementById("usernameSignIn")
    let password = document.getElementById("passwordSignIn")
    let errorUser = document.getElementById("errorUsernameSignIn")
    let errorPass = document.getElementById("errorPasswordSignIn")


    if(username.value == "admin"){
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        errorUser.classList.add("d-none")
    }
    else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        errorUser.classList.remove("d-none")
    }

    if(password.value == "admin"){
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        errorPass.classList.add("d-none")
    }
    else{
        password.classList.remove("is-valid")
        password.classList.add("is-invalid")
        errorPass.classList.remove("d-none")
    }
}

function seePassword(){
    let senha = document.getElementById("passwordSignIn")
    let icon = document.getElementById("togglePassword")
    
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