


/////////////////////// ESTILO DO SITE


//Muda o estado do menu lateral 
$(document).ready(function(){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];

    getAllUsers()

    if(name == "index" || name == "userProfile" || name == "uploadAnimation"){
        getAuth().then(res => {
            if(res) logado(name)
        }).catch(e => deslogado(name))          
    }
    switch (name){
        case "index":
            homeReady()
            break;
        case "":
            homeReady()
            break;
        case "userProfile":
            profileReady()
            break;
        case "post":
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
        //console.log("oie");
    }
});

function homeReady(){
    $(".top_navbar .top_menu .search_bar_div a").click(function(){
        filterAnimations()
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
       
        let username = document.getElementById("usernameAltProfile")
        let email = document.getElementById("emailAltProfile")
        let password = document.getElementById("passwordAltProfile")
        let confirmpassword = document.getElementById("confirmPassSignUp")
        let birth = document.getElementById("birthDateAltProfile")
        let description = document.getElementById("descriptionAltProfile")
        let showUsername = document.getElementById("usernameProfile")
        let showEmail = document.getElementById("emailProfile")
        let profilePic = document.getElementById("profilepicShowProfile")

        let usernameNav = document.getElementById("usernameDrop")
        let profileNav = document.getElementById("profilePicNav")
   

        if(data.picture_path != null && data.picture_path != undefined ){
            let formatpath = data.picture_path.substring(1)
            let profilepath = `http://localhost:3004${formatpath}`
            profileNav.src = profilepath
            profilePic.src = profilepath

        }
        

        password.value = ""
        confirmpassword.value = ""
        showUsername.textContent = data.username
        showEmail.textContent = data.email
        description.value= data.description
        username.value = data.username
        email.value = data.email
        birth.value = birthday
        
        usernameNav = data.username
        
        
    }).catch(e => console.log(e))
    
}

function postReady() {
    axi.get("/animation/" + localStorage.animationId).then(res => {
        const data = JSON.parse(JSON.stringify(res.data))
        getUser(data.animation[0].id_user).then( response => {
            const userData = response[0]
            post_user.innerHTML = "por " + userData.username
            let formatpath = userData.picture_path.substring(1)
            let profilepath = `http://localhost:3004${formatpath}`
            post_user_pic.src = profilepath
        })

        console.log(data)
        post_pic.src = data.animation[0].animation_path
        post_title.innerHTML = data.animation[0].title
        post_publish_date.innerHTML = "Publicado em: "+ data.animation[0].creation_date.split('T')[0]
        post_views.innerHTML = data.animation[0].views + " Visualiza????es"
        post_likes.innerHTML = data.likes + " Likes";
        post_comments.innerHTML = data.comments + " Coment??rios";
        post_description.innerHTML = data.animation[0].description
        
        const likeBtn = document.getElementById("likeBtn");
        const commentsDiv = document.getElementById("comments");
        axi.get("/getPostInformation/"+localStorage.animationId).then(res => {
            const commentsArr = res.data.comments;
            likeBtn.disabled = res.data.userLiked;
            console.log(commentsArr)
            let comments="";
            for(let i = 0; i < commentsArr.length; i++){
                let picture_path = commentsArr[i].picture_path ? commentsArr[i].picture_path.substring(2, commentsArr[i].picture_path.length) : "";
                comments += `
                <div style="display:flex; flex-direction:row; align-items:center; justify-content:center">
                    <div style="display:flex">
                        <img style="border-radius:50%;" src="http://localhost:3004/${picture_path}" width="30px" height="30px">
                        <h3 style="margin-left:0.5rem">${commentsArr[i].username}:</h3>
                    </div>
                    <h4 style="margin-left:0.3rem" class="ms-2">${commentsArr[i].comment}</h4>
                </div>
                `;
            }
            commentsDiv.innerHTML += comments;

        });
    })
}
function openPost(elmnt) {
    localStorage.animationId = elmnt.getAttribute("title");
    window.location = "post.html";
    console.log(localStorage.animationId)
}

function filterAnimations() {
    console.log(desk_search_bar.value)
    axi.get("/animations/" + desk_search_bar.value).then(response => {
        const data = response.data
        //renderResults.textContent = JSON.stringify(data)
        let content = ""
        for (let prop in data) {
            var o = JSON.parse(JSON.stringify(data[prop]))
            content += 
            `   <li class="feed_row">
                    <div class="container_sticker">
                        <img loading="lazy" class="sticker" src="${o.animation_path}">
                        <div class="overlay" onclick="openPost(this)" title="${o.title}-${o.id}">
                            <div class="sticker_title">
                                ${o.title}
                            </div>
                            <div class="sticker_views">
                            ${o.views}
                            <span class="icon"><i class="fas fa-eye"></i></span>
                        </div>
                        </div>
                    </div>
                </li>
            `
        }
        while (!renderResults) {}
        renderResults.innerHTML = 
        `<ul class="feed_list">
            ${content}
            <li class="feed_row"></li>
        </ul>`
    }).catch(error => console.error(error))
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
    
    if(cls == "homeContent.html") getAnimations()
    else if (cls == "stickersContent.html") {
        verifyDailyPack()
        getStickers()
    }
};

//Fun????o para chamar o resize corresponde quando a janela ?? mudada de tamanho
window.addEventListener('resize', function(event){
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = page.split(".")[0];
    
    switch (name) {
        case "index":
            resizeIndex();
            break;
        case "":
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
        case "":
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
    let dropdownLogado = document.getElementById("dropdownLogado")
    let upload = document.getElementById("uploadAnimation")
    
    if(isLogged){
        registrar.classList.add("d-none")
        logar.classList.add("d-none")
        
        username.classList.remove("d-none")
        coins.classList.remove("d-none")
        perfil.classList.remove("d-none")
        logout.classList.remove("d-none")
        dropdownLogado.classList.remove("d-none")
        upload.classList.remove("d-none")

        username.textContent = data.username
        coins.textContent = "Moedas: " + data.coins
        
    }
    else{
        registrar.classList.remove("d-none")
        logar.classList.remove("d-none")
        
        username.classList.add("d-none")
        coins.classList.add("d-none")
        perfil.classList.add("d-none")
        logout.classList.add("d-none")
        dropdownLogado.classList.add("d-none")
        upload.classList.add("d-none")
    }
}

$(document).on('click', '#upload_link', function(e) {
    $("#profilePicAltProfile").trigger('click');
});

function verifyDailyPack() {
    try {
        axi.get("/verifyCooldownUser/" + localStorage.id).then(response => {
            if (response.data.message === "S") {
                document.getElementById("exampleModal").style.opacity = "1"
                document.getElementById("exampleModal").style.display = "block"
            } 
            else {
                document.getElementById("exampleModal").style.opacity = "0"
                document.getElementById("exampleModal").style.display = "none"
            }
        })
    } catch (err) { console.error(err) }
}

function getDailyPack() {
    axi.get("/getDailyPacket/" + localStorage.id).then(response => {
        if (response.status == 200) {
            data = response.data
            for (let prop in data)
                console.log(data[prop])
        }
    })
    closePopUp()
}

function logado(page) {

    getUser(localStorage.id).then( res => {
        let data = res[0]
        dropdownLog(true,data,page)
        let profileNav = document.getElementById("profilePicNav")
        let profileIcon = document.getElementById("profileIconNav").classList
        
        if(data.picture_path != null && data.picture_path != undefined ){
            let formatpath = data.picture_path.substring(1)
            let profilepath = `http://localhost:3004${formatpath}`
            profileNav.src = profilepath
            profileIcon.add("d-none")
            profileNav.classList.remove("d-none")
        }
        else{
            profileNav.classList.add("d-none")
            profileIcon.remove("d-none")
        }
            
        
        

        
        


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







/////////////////////// L??GICA DO SITE

const axi = axios.create({
    baseURL: 'http://localhost:3004',
    withCredentials: true
});


async function logout() {
   const res = await axi.post("/logout")
   window.location.replace("index.html")
   return res
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

//Valida????o de registro
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
    console.log(name);
    if(name === "signUp"){
        if(!error){
            checkSignUp(username.value, email.value, password.value, date.value,description.value,profilePic.files[0]).then(data => {
                if(data == 201){
                    getAuth().then( res =>{
                        window.location.replace("signIn.html")}
                    )
                }
            }).catch(e => console.log(e))
        }
    } else if(name === "userProfile"){
        if(!error){
            if(!profilePic.files)
                updateUser(localStorage.id,username.value, email.value, password.value, date.value,description.value,null);
            else
                updateUser(localStorage.id,username.value, email.value, password.value, date.value,description.value,profilePic.files[0]);
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

function getAnimations() {
    axi.get("/animations").then(response => {
        const data = response.data
        //renderResults.textContent = JSON.stringify(data)
        let content = ""
        for (let prop in data) {
            var o = JSON.parse(JSON.stringify(data[prop]))
            content += 
            `   <li class="feed_row">
                    <div class="container_sticker">
                        <img loading="lazy" class="sticker" src="${o.animation_path}">
                        <div class="overlay" onclick="openPost(this)" title="${o.title}-${o.id}">
                            <div class="sticker_title">
                                ${o.title}
                            </div>
                            <div class="sticker_views">
                            ${o.views}
                            <span class="icon"><i class="fas fa-eye"></i></span>
                        </div>
                        </div>
                    </div>
                </li>
            `
            var obj = JSON.parse(JSON.stringify(data[prop]))
            //console.log(obj)
        }
        while (!renderResults) {}
        renderResults.innerHTML += 
        `<ul class="feed_list">
            ${content}
            <li class="feed_row"></li>
        </ul>`
    }).catch(error => console.error(error))
}

function closePopUp() {
    document.getElementById("exampleModal").style.display = "none"
}

function getStickers() {
    if (localStorage.id) {
        axi.get("/stickersPossess/"+localStorage.id).then(response => {
            const data = response.data
            //renderResults.textContent = JSON.stringify(data)
            let content = ""
            for (let prop in data) {
                var o = JSON.parse(JSON.stringify(data[prop]))
                content += 
                `   <li class="feed_row">
                        <div class="container_sticker">
                            <img class="sticker" src="${o.animation_path}">
                            <div class="overlay" onclick="openPost(this)" title="${o.title}-${o.id}">
                                <div class="sticker_title">
                                    ${o.title}
                                </div>
                                <div class="sticker_views">
                                ${o.views}
                                <span class="icon"><i class="fas fa-eye"></i></span>
                            </div>
                            </div>
                        </div>
                    </li>
                `
                var obj = JSON.parse(JSON.stringify(data[prop]))
                //console.log(obj)
            }
            renderResults.innerHTML = 
            `<ul class="feed_list">
                ${content}
                <li class="feed_row"></li>
            </ul>`
        }).catch(error => console.error(error))
    } else {
        renderResults.innerHTML = "Voce n esta Logado"
        console.log("Voce n esta Logado")
    }
}

function openPost(elmnt) {
    localStorage.animationId = elmnt.getAttribute("title").split("-")[1]
    console.log(localStorage.animationId)
    window.location = "post.html";
    console.log(localStorage.animationId)
}

//Valida????o do login
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
    let profilePic = document.getElementById("profilePicAltProfile")
    let password = document.getElementById("passwordAltProfile")
    let confirmPassword = document.getElementById("confirmPassSignUp")

    console.log(profilePic)
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
    var bodyFD = new FormData()

    bodyFD.append("username",username)
    bodyFD.append("email",email)
    if(password != "" || password != null)
        bodyFD.append("password",password)
    bodyFD.append("birthday",birthdayFormatted)
    bodyFD.append("description",description)
    bodyFD.append("profilePic",profilePic)

    const res = await axi.put(`/users/${userId}`,bodyFD,{headers: {'Content-Type': 'multipart/form-data'}})
    console.log(res);
    profileReady()
    return res.status
}

function uploadAnimation(){
    let title = document.getElementById("titleUploadAnimation")
    let description = document.getElementById("descriptionUploadAnimation")
    let path = document.getElementById("fileUploadAnimation")
    let button =  document.getElementById("buttonUpload")

    let error = false

    if(title.value != ""){
        title.classList.remove("is-invalid")
        title.classList.add("is-valid")
        errorTitle.classList.add("d-none")
    }
    else{
        title.classList.add("is-invalid")
        title.classList.remove("is-valid")
        errorTitle.classList.remove("d-none")
        error = true
    }

    if(description.value != ""){
        description.classList.remove("is-invalid")
        description.classList.add("is-valid")
        errorDescription.classList.add("d-none")
    }
    else{
        description.classList.add("is-invalid")
        description.classList.remove("is-valid")
        errorDescription.classList.remove("d-none")
        error = true
    }

    if(path.value != ""){
        path.classList.remove("is-invalid")
        path.classList.add("is-valid")
        errorPath.classList.add("d-none")
    }
    else{
        path.classList.add("is-invalid")
        path.classList.remove("is-valid")
        errorPath.classList.remove("d-none")
        error = true
    }

    if(!error){
        if(localStorage.uploaded){
            postAnimation(title.value,description.value,localStorage.animation_path)
            button.classList.add("btn-primary")
            button.classList.remove("btn-danger")
        }
        else{
            button.classList.add("btn-danger")
            button.classList.remove("btn-primary")
        }

    }
}

function saveImage() {
    uploadImage().then(res =>{
        console.log(res)
        let formatpath = res.substring(1)
        let profilepath = `http://localhost:3004${formatpath}`
        let showImg = document.getElementById("showAnimation")

        showImg.src = profilepath
        localStorage.uploaded = true
        localStorage.animation_path = profilepath


    }).catch(e => console.log(e))
}

async function uploadImage() {
    let path = document.getElementById("fileUploadAnimation")
    var bodyFD = new FormData()
    bodyFD.append("file",path.files[0])
    const res = await axi.post("/uploadFile",bodyFD,{headers: {'Content-Type': 'multipart/form-data'}})
    return res.data
}

async function getAllUsers(){
    const res = await axi.get("/users")
    return res.data
}

async function getUser(userId){
    const res = await axi.get("/user/"+userId)
    return res.data
}

async function postAnimation(title,description,file) {
    if(title == "" || description == "" || file == "" || title == null || description == null || file == null){   
        return false;
    }

    let jsonAnimation = {
        "title" : title,
        "description" : description,
        "id_user" : localStorage.id,
        "path": file
    }

    const res = await axi.post("/stickers",jsonAnimation)
    console.log(res)
}

async function getAuth(){
    const res = await axi.get("/auth")
    if(res.status == 200){
        localStorage.id = res.data.id
        return true
    }
}
//FEED FUNCTIONS
async function like(){
    
    const likeBtn = document.getElementById("likeBtn");
    if(likeBtn.disabled)
        return;
    try{
        const res = await axi.post("/like/"+localStorage.animationId);
        likeBtn.disabled = true;
        post_likes.innerHTML = parseInt(post_likes.innerHTML.split(" ")[0])+1 + " Likes";
    }catch(e){
        console.log(e);
        alert("erro ao dar like");
    }

}
async function comment(){
    try{
        const comment = document.getElementById("userComment").value;
        const res = axi.post("/comments/"+localStorage.animationId,{comment:comment});
        alert("Coment??rio adicionado com sucesso!");
        
    }catch(e){
        alert("erro ao mandar coment??rio");
        console.log(e);
    }

}