  import { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { getUsers } from "../../api/usersApi.js";
  import loginClasses from "./LoginPage.module.css"; 

  function LoginPage() {
      const routerNavigator = useNavigate(); 
      const [inputEmail, setInputEmail] = useState(""); 
      const [inputPassword, setInputPassword] = useState(""); 

      async function handleLoginSubmit(authEvent) {
          authEvent.preventDefault();
          
          try {
              const fetchedUsersList = await getUsers(); 


              const matchedAccount = fetchedUsersList.find(
                  (account) => account.email === inputEmail && account.password === inputPassword
              );

              if (matchedAccount) {
            
                  localStorage.setItem("user", JSON.stringify(matchedAccount));
                  
                  alert("Вход успешен");
                  routerNavigator("/catalog"); 
              } else {
                  alert("Неверная почта или пароль");
              }
          } catch (requestError) {
              console.error("Ошибка авторизации:", requestError);
              alert("Произошла ошибка при попытке входа");
          }
      }

      return (
          <div className={loginClasses.container}>
              <h1>Вход</h1>
              <form className={loginClasses.form} onSubmit={handleLoginSubmit}>
                  <input 
                      type="email" 
                      placeholder="Введите почту"
                      value={inputEmail}
                      onChange={(changeEvent) => setInputEmail(changeEvent.target.value)} 
                      required
                  />
                  <input 
                      type="password" 
                      placeholder="Введите пароль"
                      value={inputPassword}
                      onChange={(changeEvent) => setInputPassword(changeEvent.target.value)} 
                      required
                  />
                  <button type="submit">Войти</button>
                  <p>
                      Нет аккаунта? <Link to="/regist">Регистрируйтесь</Link>
                  </p>
              </form>
          </div>
      );
  }

  export default LoginPage;
