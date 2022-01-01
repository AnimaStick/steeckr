


/////////////////////// ESTILO DO SITE

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

//Popup de login ao scrollar na ghome
$(document).scroll(function() {
    try {
        var y = $(this).scrollTop();
        const form_popup = document.getElementsByClassName('form_popup')[0]
        const imgLog = document.getElementById('imgForm')
        let sizeX = $(window).width();

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

//Função para chamar o resize corresponde quando a janela é mudada de tamanho
window.addEventListener('resize', function(event){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];
    
    switch (name) {
        case "testIndex":
            resizeIndex();
            break;
        case "signIn":
        case "signUp":
            resizeSign()
            break;
        default:
            break;
    }
});

function resizeIndex() {
    var w = window.innerWidth

    let img = document.getElementById('imgForm')
    let form = document.getElementById('formPopup')
   
    //Tira logo
    if(w< 900){
        img.classList.remove("d-block")
        img.classList.add("d-none")
    }
    else{
        img.classList.remove("d-none")
        img.classList.add("d-block")
    }

    //Aumenta a div
    if(w < 520){
        form.classList.remove("col-sm-5")
        form.classList.remove("col-md-10")
        form.classList.remove("col-md-7")
        form.classList.remove("offset-md-2")
    }
    else if(w < 900){
        form.classList.remove("col-sm-5")
        form.classList.remove("col-md-7")
        form.classList.add("col-md-10")
        form.classList.add("offset-md-2")
    }
    else if(w < 1000){
        form.classList.remove("offset-md-2")
        form.classList.remove("col-md-10")
        form.classList.remove("col-sm-5")
        form.classList.add("col-md-7")
        
        img.classList.add("offset-md-2")
        img.classList.remove("offset-md-4")
    }
    else{
        form.classList.remove("offset-md-2")
        form.classList.remove("col-md-10")
        form.classList.remove("col-md-7")
        form.classList.add("col-sm-5")
        

        img.classList.remove("offset-md-2")
        img.classList.add("offset-md-4")
    }
}

function resizeSign() {
    var w = window.innerWidth

    let formsign = document.getElementById('divSignIn')
    let logosign = document.getElementById('logoSignIn')
    //Tira logo
    if(w < 980){
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
    else if(w < 980){
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

//Previne o redirecionamento ao submitar um form
window.addEventListener('submit', function(event) {
    event.preventDefault();
})

function seePassword(id){
    let senha = document.getElementById(id)
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


/////////////////////// ESTILO DO SITE


/////////////////////// LÓGICA DO SITE

const axi = axios.create({
    baseURL: 'https://localhost:3004'
});

//Validação de registro
function signUpValidation(){
    
    let error = false

    let date = document.getElementById("birthDateSignUp")
    let email = document.getElementById("emailSignUp")
    let username = document.getElementById("usernameSignUp")
    let password = document.getElementById("passwordSignUp")
    let confirmPass = document.getElementById("confirmPassSignUp")

    let errorDate = document.getElementById("errorBirthDateSignUp")
    let errorEmail = document.getElementById("errorEmailSignUp")
    let errorUser = document.getElementById("errorUsernameSignUp")
    let errorPass = document.getElementById("errorPasswordSignUp")
    let errorConfirmPass = document.getElementById("errorConfirmPassSignUp")

    if(validateDate(date.value)){
        date.classList.remove("is-invalid")
        date.classList.add("is-valid")
        errorDate.classList.add("d-none")
    }
    else{
        date.classList.remove("is-valid")
        date.classList.add("is-invalid")
        errorDate.classList.remove("d-none")
        error= true
    }

    if(validateEmail(email.value) != null){
        email.classList.remove("is-invalid")
        email.classList.add("is-valid")
        errorEmail.classList.add("d-none")
    }
    else{
        email.classList.remove("is-valid")
        email.classList.add("is-invalid")
        errorEmail.classList.remove("d-none")
        error= true
    }

    if(username.value != "admin" && username.value.length > 2){
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        errorUser.classList.add("d-none")
    }
    else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        errorUser.classList.remove("d-none")
        error= true
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
        error= true
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
        error= true
    }

    return error
}


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validateDate = (date) =>{
    let splitedDate = date.split("/")
    let day = splitedDate[0]
    let month = splitedDate[1]
    let year = splitedDate[2]
    let currentYear =  new Date().getFullYear();

    if(year > currentYear - 10 || year < currentYear - 150)
        return false
    else if(month < 1 || month > 12)
        return false
    else 
        return checkDay(day,month,year)
};

const checkDay = (day,month,year) => {
    if(month == 2){
        if(year % 4 != 0 && day > 28 )
            return false
        else if(year % 4 != 0 && day > 29)
            return false
        else
            return true
    }
    else if(month < 8){
        if(month % 2 != 0 && day > 31)
            return false
        else if (month % 2 == 0 && day > 30)
            return false
        else
            return true
    } 
    else{
        if(month % 2 != 0 && day > 30)
            return false
        else if (month % 2 == 0 && day > 31)
            return false
        else
            return true
    }
};

//Validação do login
function signInValidation(){
    let signinForm = document.getElementById("formSignIn")
    let username = document.getElementById("usernameSignIn")
    let password = document.getElementById("passwordSignIn")
    let errorLogin = document.getElementById("errorLoginSignIn")
 
    if(checkLogin(username.value,password.value)){
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        errorLogin.classList.add("d-none")
    }
    else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        errorLogin.classList.remove("d-none")
    }
}

const checkLogin = (user,pass) =>{

    if(user == "" || pass == ""){   
        return false;
    }
  

    let jsonLogin = {
        "username" : user,
        "password" : pass
    }
    console.log(jsonLogin)
    axi.post("/login",jsonLogin)
        .then(response => {
            console.log(response)
        })
    return true;
};

/////////////////////// LÓGICA DO SITE