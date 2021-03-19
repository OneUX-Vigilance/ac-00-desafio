const form_login = document.getElementById("form_login");
function handleForm(event) { event.preventDefault(); } 
form_login.addEventListener('submit', handleForm);
const btn_login = document.getElementById("btn_login");
btn_login.addEventListener("click",LoginButtonClick);

if (window.localStorage.getItem("ACCOUNT")){
    window.location.href = "/sair.html"
}
const inp_us = document.getElementById("name");
const inp_pwd = document.getElementById("password");

async function LoginButtonClick(){
    if(!inp_us.value || !inp_pwd.value){
        return;
    }
    const l = document.createElement("span")
    l.className = "spinner-border spinner-border-sm"
    const ltext = document.createElement("span");
    const ttext = document.createElement("span")
    
    ttext.innerText = " Logando..."
    ltext.appendChild(ttext)

    btn_login.disabled = true;
    btn_login.innerText = ""
    btn_login.appendChild(l)
    btn_login.appendChild(ltext)
    const log = await Login(inp_us.value,inp_pwd.value);
    const SafeCode = log.resp
    if (log.code == "OK"){
      window.localStorage.setItem("ACCOUNT",{
        name:inp_us.value,
        pwd:inp_pwd.value,
        SafeCode:SafeCode
    })

    btn_login.innerText = " 👌 Logado."
    btn_login.className = "btn btn-success"
    setTimeout(() => {
      window.location.href = "/"
    }, 2000);
    } else{
      btn_login.innerText = "Não existe uma conta com esse nome ou a senha está errada."
      btn_login.className = "btn btn-danger"
      setTimeout(() =>{
        btn_login.disabled = false;
        btn_login.innerText = "Login"
        btn_login.className = "btn btn-primary"
      },2000)
    }

}
async function Login(username,password){
    try{
      const x = await axios({
          method: 'post',
          url: '/api/login',
          data: {
            name:username,
            password:password
          }
        })
        return x.data
  } catch(e){
      return {
          code:"USER_404"
      }
  }
   
}
if (window.localStorage.getItem("ACCOUNT")) {
  window.location.href = "/sair.html"
}