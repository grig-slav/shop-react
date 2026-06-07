import { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; 
import { getUsers, registerUser } from "../../api/usersapi.js"; 
import styles from "./registerPage.module.css";

function RegisterPage() { 
  const navigate = useNavigate(); 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  async function handleRegister(event) { 
    event.preventDefault(); 

    try {
      const users = await getUsers(); 
      const foundUser = users.find((user) => user.email === email); 
      
      if (foundUser) { 
        alert("Эта почта уже используется"); 
        return; 
      } 

      const newUser = { name, email, password }; 
      await registerUser(newUser); 
      

      localStorage.setItem("user", JSON.stringify(newUser));
      
      alert("Регистрация прошла успешно"); 
      navigate("/catalog"); 
    } catch (error) {
      alert("Произошла ошибка при регистрации");
      console.error(error);
    }
  } 

  return ( 
    <div className={styles.container}> 
      <h1>Регистрация</h1> 
      <form className={styles.form} onSubmit={handleRegister}> 
        <input 
          type="text" 
          placeholder="Введите имя" 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          required
        /> 
        <input 
          type="email" 
          placeholder="Введите почту" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          required
        /> 
        <input 
          type="password" 
          placeholder="Введите пароль" 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
          required
        /> 
        <button type="submit">Зарегистрироваться</button> 
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p> 
      </form> 
    </div> 
  ); 
} 

export default RegisterPage;
