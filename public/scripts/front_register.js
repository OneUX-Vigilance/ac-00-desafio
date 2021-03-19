
const btn_register = document.getElementById("btn_register")
btn_register.addEventListener("click", registerPress);
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

    btn_register.disabled = true;
    btn_register.innerText = ""
    btn_register.appendChild(l)
    btn_register.appendChild(ltext)
    const reg = await Register(username,password)
    while (btn_register.firstChild) {
        btn_register.removeChild(btn_register.firstChild);
    }   
    if (reg.code == "OK"){
        window.localStorage.setItem("ACCOUNT",{
            name:username,
            pwd:password,
        })
        btn_register.innerText = "[ 👌 ] -Sucesso."
        btn_register.className = "btn btn-success"
    }
    if (reg.code == "USER_EXISTS") {
        btn_register.className = "btn btn-danger"
        btn_register.innerText = "ERR! Já tem uma conta com esse nome."
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