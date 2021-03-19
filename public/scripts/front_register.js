
const btn_login = document.getElementById("btn_register")
btn_login.addEventListener("click", registerPress);
async function registerPress(){
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username.length >= 30){
        return alert("O nome está muito grande.")
        
    } 
    if (password.length <= 8){
        return alert("A senha está muito pequena.")
    
    }
    
    const l = document.createElement("span")
    l.className = "spinner-border spinner-border-sm"
    const ltext = document.createElement("span");
    const ttext = document.createElement("span")
    
    ttext.innerText = " Registrando..."
    ltext.appendChild(ttext)

    btn_login.disabled = true;
    btn_login.innerText = ""
    btn_login.appendChild(l)
    btn_login.appendChild(ltext)
    const reg = await Register(username,password)
    while (btn_login.firstChild) {
        btn_login.removeChild(btn_login.firstChild);
    }   
    if (reg.code == "OK"){
        window.localStorage.setItem("ACCOUNT",{
            name:username,
            pwd:password,
            SafeCode:reg.SafeCode
        })

        btn_login.innerText = "[ 👌 ] -Sucesso."
        btn_login.className = "btn btn-success"
    }
    if (reg.code == "USER_EXISTS") {
        btn_login.className = "btn btn-danger"
        btn_login.innerText = "ERR! Já tem uma conta com esse nome."
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
}
async function Register(username,password){
      try{
        const x = await axios({
            method: 'post',
            url: '/api/register',
            data: {
              name:username,
              password:password
            }
          })
          return x.data
    } catch(e){
        return {
            code:"USER_EXISTS"
        }
    }
     
}
if (window.localStorage.getItem("ACCOUNT")) {
    window.location.href = "/sair.html"
}