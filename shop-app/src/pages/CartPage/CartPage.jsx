import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import { useState } from "react";


function CartPage(){
    const navigate=useNavigate();
    const[cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")))
    return(

       <div className={styles.container}>
        <h1>Корзина</h1>
        <button onClick={()=>navigate("/catalog")}>Назад в каталог</button>
        {cart.length===0?(
            <p>Корзина пустая</p>
        ):(
            <>
            <div className={styles.items}>
                {cart.map((item)=>(
                    <div className={styles.item} key={item.id}>
                        <img src={item.image} alt={item.title}></img>
                        <div>
                            <h3>{item.title}</h3>
                            <p>Цена:{item.price}</p>
                            <p>Количество: {item.count}</p>
                            <p>Сумма: {item.price*item.count}$</p>
                            <button>Удалить</button>
                            </div>
                    </div>
                ))}
                {/* <h2>Итого:{totalPrice}$</h2> */}
                <button>Очистить корзину</button>
            </div>
            </>
        )}
       </div>
    )
}
export default CartPage;