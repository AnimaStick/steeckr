


/////////////////////// ESTILO DO SITE


//Muda o estado do menu lateral 
$(document).ready(function(){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];

    getAllUsers()

    if(name == "index" || name == "userProfile"){
        getAuth().then(res => {
            if(res)
                logado(name)
        }).catch(e => deslogado(name))          
    }

    switch (name){
        case "index":
            homeReady()
            break;
        case "userProfile":
            profileReady()
            break;
        case "Post":
            postReady()
            break;
    }
})

//Popup de login ao scrollar na ghome
$(document).scroll(function() {
    try {
        var y = $(this).scrollTop()
        const form_popup = document.getElementsByClassName('form_popup')[0]
        const imgLog = document.getElementById('imgForm')
        let sizeX = $(window).width()

        if (y > 400) {
            if(sizeX < 800){
                imgLog.style.display = "none"
            }
            else{
                imgLog.style.display = "block"
            }
            form_popup.style.display = "block"
            resizeIndex()
        } else {
            form_popup.style.display = "none"
        }
        if (form_popup.style.display == "block") {
                $('.top_navbar').addClass("blur")
                $('.sidebar').addClass("blur")
                $('.main_container').addClass("blur")
                $('#nav_display').addClass("blur")
            
        } else {
                $('.top_navbar').removeClass("blur")
                $('.sidebar').removeClass("blur")
                $('.main_container').removeClass("blur")
                $('#nav_display').removeClass("blur")
        }
    } catch (err) {
        console.log("oie");
    }
});

function homeReady(){
 
    $(".search_button").click(function(){
        $(".search_bar_div").toggleClass("m")
    })
    $(".top_navbar .top_menu .search_bar_div a").click(function(){
         $(".search_bar_div").toggleClass("m")
    })
    $(".menu_item").click(function(){
        $('.menu_item').removeClass('active_item')
        $(this).addClass('active_item')
    })
    const home = document.getElementsByClassName('menu_item')[0]
    showContent(home)

    //home.addClass('active_item')
}

function profileReady(){
    getUser(localStorage.id).then( res => {
        let data = res[0]
        let splitedDate = data.birthday.split("-")
        let date = splitedDate[2].substring(0,2)
        let birthday = `${date}/${splitedDate[1]}/${splitedDate[0]}`
        let formatpath = data.picture_path.substring(1)
        let profilepath = `http://localhost:3004${formatpath}`

        let username = document.getElementById("usernameAltProfile")
        let email = document.getElementById("emailAltProfile")
        let password = document.getElementById("passwordAltProfile")
        let confirmpassword = document.getElementById("confirmPassSignUp")
        let birth = document.getElementById("birthDateAltProfile")
        let description = document.getElementById("descriptionAltProfile")
        let showUsername = document.getElementById("usernameProfile")
        let showEmail = document.getElementById("emailProfile")
        let profilePic = document.getElementById("profilepicAltProfile")
   

        password.value = ""
        confirmpassword.value = ""
        showUsername.textContent = data.username
        showEmail.textContent = data.email
        description.value= data.description
        username.value = data.username
        email.value = data.email
        birth.value = birthday
        profilePic.src = profilepath
    }).catch(e => console.log(e))
}

function postReady() {

}

//Muda o conteudo da pagina
function showContent (elmnt) {

    //Parte para escolher qual conteudo sera exibido e qual sera removido
    var cl = elmnt.getAttribute("class").split(" ")
    cls = cl[1] + "Content.html"

    //Parte que remove o anterior
    try {
        document.getElementById("include_wrapper").remove()
        document.getElementById("include_style").remove()
        document.getElementsByTagName("script")[3].remove()
    } catch(npe){
       console.log("alou")
    }

    nav_display.innerHTML = `<p id="nav_title">${cl[1]}</p>`

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
    for(b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && c[b].getAttribute("data-include") == cls && a(c[b], c[b].getAttribute("data-include"))
    getStickers()
};

//Função para chamar o resize corresponde quando a janela é mudada de tamanho
window.addEventListener('resize', function(event){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];
    
    switch (name) {
        case "index":
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

window.addEventListener('load', function(event){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];
    
    switch (name) {
        case "index":
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
    let formWithin = document.getElementById('formSignIn')
   
    let hform = form.offsetHeight

    //Tira logo
    if(w< 1000){
        img.classList.remove("d-block")
        img.classList.add("d-none")

        formWithin.style.height = "330px"
    }
    else{
        img.classList.remove("d-none")
        img.classList.add("d-block")
        formWithin.style.height = hform+"px"
    }
    
    //Aumenta a div
    if(w < 520){
        form.classList.remove("col-sm-5")
        form.classList.remove("col-md-10")
        form.classList.remove("col-md-7")
       
        formWithin.style.height = "330px"
    }
    else if(w < 900){
        form.classList.remove("col-sm-5")
        form.classList.remove("col-md-7")
        form.classList.add("col-md-10")
        form.classList.add("offset-md-2")

        formWithin.style.height = "330px"
    }
    else if(w < 1000){
        form.classList.remove("offset-md-2")
        form.classList.remove("col-md-10")
        form.classList.remove("col-sm-5")
        form.classList.add("col-md-7")
        
        img.classList.add("offset-md-2")
        img.classList.remove("offset-md-4")

        formWithin.style.height = "330px"
    }
    else if(w < 1200){
        formWithin.style.height = "330px"
    }
    else{
        form.classList.remove("offset-md-2")
        form.classList.remove("col-md-10")
        form.classList.remove("col-md-7")
        form.classList.add("col-sm-5")
        

        img.classList.remove("offset-md-2")
        img.classList.add("offset-md-4")

        formWithin.style.height = hform+"px"
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

function seePassword(idPass){
    let senha = document.getElementById(idPass)
    let icon
    if(idPass != "confirmPassSignUp" )
        icon = document.getElementById("togglePassword")
    else
        icon = document.getElementById("toggleConfirmPassword")
    
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

function dropdownLog(isLogged,data, page) {
    let registrar = document.getElementById("registrarDrop")
    let logar = document.getElementById("logarDrop")

    let perfil = document.getElementById("perfilDrop")
    let logout = document.getElementById("logoutDrop")
    let username = document.getElementById("usernameDrop")
    let coins = document.getElementById("coinsDrop")
    
    if(isLogged){
        registrar.classList.add("d-none")
        logar.classList.add("d-none")
        
        username.classList.remove("d-none")
        coins.classList.remove("d-none")
        perfil.classList.remove("d-none")
        logout.classList.remove("d-none")

        username.textContent = data.username
        coins.textContent = "Moedas: " + data.coins
        
    }
    else{
        registrar.classList.remove("d-none")
        logar.classList.remove("d-none")
        
        username.classList.add("d-none")
        coins.classList.remove("d-none")
        perfil.classList.add("d-none")
        logout.classList.add("d-none")
    }
}

function logado(page) {
    
    getUser(localStorage.id).then( res => {
        let data = res[0]
        dropdownLog(true,data,page)
        let profileNav = document.getElementById("profilePicNav")
        let profileIcon = document.getElementById("profileIconNav").classList

        let formatpath = data.picture_path.substring(1)
        let profilepath = `http://localhost:3004${formatpath}`

        
        profileNav.src = profilepath
        profileIcon.add("d-none")


    }).catch(e => console.error(e))
}

function deslogado() {

    dropdownLog(false)

    let usernameNav = document.getElementById("usernameNav")
    let profileNav = document.getElementById("profilePicNav")
    let profileIcon = document.getElementById("profileIconNav").classList
    
    profileNav.src = ""
    profileNav.classList = ("d-none")
    profileIcon.remove("d-none")

    usernameNav.classList.add("d-none")
}




/////////////////////// ESTILO DO SITE







/////////////////////// LÓGICA DO SITE

const axi = axios.create({
    baseURL: 'http://localhost:3004',
    withCredentials: true
});


function logout() {
    console.log("Deslogou, só que não")
}

function signUpClick(){
    let date = document.getElementById("birthDateSignUp")
    let email = document.getElementById("emailSignUp")
    let username = document.getElementById("usernameSignUp")
    let password = document.getElementById("passwordSignUp")
    let confirmPass = document.getElementById("confirmPassSignUp")
    let description = document.getElementById("descriptionSignUp")
    let profilePic = document.getElementById("profilePicSignUp")
    signUpValidation(username,email,password,confirmPass,date,description,profilePic)
}

//Validação de registro
async function signUpValidation(username,email,password,confirmPass,date,description,profilePic){
    
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];

    let error = false

    
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

    const emailError = await validateEmail(email.value).then(res => {
        if(res){
            email.classList.remove("is-invalid")
            email.classList.add("is-valid")
            errorEmail.classList.add("d-none")
            return false
        }
        else{
            email.classList.remove("is-valid")
            email.classList.add("is-invalid")
            errorEmail.classList.remove("d-none")
            return true
        }
    })
    
    if(emailError)
        error = emailError

    const userError = await checkUsername(username.value).then(res =>{
        if( res && username.value.length > 2){
            username.classList.remove("is-invalid")
            username.classList.add("is-valid")
            errorUser.classList.add("d-none")
            return false
        }
        else{
            username.classList.remove("is-valid")
            username.classList.add("is-invalid")
            errorUser.classList.remove("d-none")
            return true
        }
    })

    if(userError)
        error = userError

    if(name == "signUp" || (name == "userProfile" && password.value !="")){
        if(password.value.length >= 8){
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
    } 

    
    if(name == "signUp" || (name == "userProfile" && confirmPass.value !="")){
        if(confirmPass.value == password.value && password.value.length >= 8){
            confirmPass.classList.remove("is-invalid")
            confirmPass.classList.add("is-valid")
            errorConfirmPass.classList.add("d-none")
        }
        else{
            confirmPass.classList.remove("is-valid")
            confirmPass.classList.add("is-invalid")
            errorConfirmPass.classList.remove("d-none")
            error= true
        }

    } 
    console.log(error)
    if(name == "signUp"){
        if(!error){
            checkSignUp(username.value, email.value, password.value, date.value,description.value,profilePic.files[0]).then(data => {
                if(data == 201){
                    getAuth().then( res =>{
                        window.location.replace("signIn.html")}
                    )
                }
            }).catch(e => console.log(e))
        }
    } else if(name == "updateProfile"){
        if(!error){
            updateUser(localStorage.id,username.value, email.value, password.value, date.value,description.value,profilePic.files[0])
        }
    }
    
}


async function validateEmail (email) {
    const checked = getAllUsers().then(res => {
        for (let index = 0; index < res.length; index++) {
            if(res[index].email == email && res[index].id != localStorage.id)
                return false
        }
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    })
    return checked
}

const validateDate = (date) =>{
    let splitedDate = date.split("/")
    let day = splitedDate[0]
    let month = splitedDate[1]
    let year = splitedDate[2]
    let currentYear =  new Date().getFullYear();

    if(date == null || date == "")
        return false

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

//show feed
//const url = "http://localhost:3004/stickers"

function getStickers() {
    axi.get("/stickers").then(response => {
        const data = response.data
        //renderResults.textContent = JSON.stringify(data)
        let content = ""
        for (let prop in data) {
            var o = JSON.parse(JSON.stringify(data[prop]))
            content += 
            `   <li class="feed_row">
                        <img class="sticker" src="${o.animation_path}">
                </li>
            `
            var obj = JSON.parse(JSON.stringify(data[prop]))
            //console.log(obj)
        }
        renderResults.innerHTML += 
        `<ul class="feed_list">
            ${content}
            <li class="feed_row"></li>
        </ul>`
    }).catch(error => console.error(error))
}

//Validação do login
function signInValidation(){
    let signinForm = document.getElementById("formSignIn")
    let username = document.getElementById("usernameSignIn")
    let password = document.getElementById("passwordSignIn")
    let errorLogin = document.getElementById("errorLoginSignIn")

    checkLogin(username.value,password.value).then(res => {
        if(res){
            username.classList.remove("is-invalid")
            username.classList.add("is-valid")
            errorLogin.classList.add("d-none")
            getAuth().then( res =>{
                window.location.replace("index.html")}
            )
             
        }
        else{
            username.classList.remove("is-valid")
            username.classList.add("is-invalid")
            errorLogin.classList.remove("d-none")
        }
    }).catch(e => {
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        errorLogin.classList.remove("d-none")
    })
}

function updateProfile(){
    let username = document.getElementById("usernameAltProfile")
    let email = document.getElementById("emailAltProfile")
    let birth = document.getElementById("birthDateAltProfile")
    let description = document.getElementById("descriptionAltProfile")
    let profilePic = document.getElementById("profilepicAltProfile")
    let password = document.getElementById("passwordAltProfile")
    let confirmPassword = document.getElementById("confirmPassSignUp")

    signUpValidation(username,email,password,confirmPassword,birth,description,profilePic)

}

const checkLogin = async (user,pass) =>{
    if(user == "" || pass == "" || user == null || pass == null){   
        return false;
    }

    let jsonLogin = {
        "email" : user,
        "password" : pass
    }
    
    const res = await axi.post("/login",jsonLogin)
    if(res.status == 200)
        return true
    return false
};

async function checkSignUp(user, email, pass, birth, desc, profPic) {
    let birthdayValues = birth.split("/");
    let birthdayFormatted = `${birthdayValues[2]}-${birthdayValues[1]}-${birthdayValues[0]}`
    
    var bodyFD = new FormData()

    bodyFD.append("username",user)
    bodyFD.append("email",email)
    bodyFD.append("password",pass)
    bodyFD.append("birthday",birthdayFormatted)
    bodyFD.append("description",desc)
    console.log(profPic);
    bodyFD.append("profilePic",profPic)

    const res = await axi.post("/users",bodyFD,{headers: {'Content-Type': 'multipart/form-data'}})
    return res.status

}

async function checkUsername(username){
    const exist = getAllUsers().then(res =>{
        for(let i = 0; i < res.length; i++){
            if(res[i].username == username && res[i].id != localStorage.id)
                return false
        }
        return true
    }).catch(e => console.log(e))

    return exist
}




async function updateUser(userId,username, email, password, birth,description,profilePic){
    let birthdayValues = birth.split("/");
    let birthdayFormatted = `${birthdayValues[2]}-${birthdayValues[1]}-${birthdayValues[0]}`

}

async function getAllUsers(){
    const res = await axi.get("/users")
    return res.data
  
}

async function getUser(userId){
    const res = await axi.get("/user/"+userId)
    return res.data
}

async function getAuth(){
    const res = await axi.get("/auth")
    if(res.status == 200){
        localStorage.id = res.data.id
        return true
    }
}
/////////////////////// LÓGICA DO SITE