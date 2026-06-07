import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";

function CartPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    function removeFromCart(id) {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function clearCart() {
        setCart([]);
        localStorage.removeItem("cart");
    }
    function increaseCount(id){
        const newCart=cart.map((item)=>{
            if(item.id===id){
                if(item.count>=item.stock){
                    alert('Товара больше нет')
                    return item;
                }
                return{
                    ...item,count:item.count+1,
                };
            }
            return item;
        });
        setCart(newCart);
        localStorage.setItem("cart",JSON.stringify(newCart));
    }
    function decreaseCount(id){
        const newCart=cart.map((item)=>{
            if(item.id===id){
                
                return{
                    ...item,count:item.count-1,
                };
            }
            return item;
        }).filter((item)=>item.count>0);
        setCart(newCart);
        localStorage.setItem("cart",JSON.stringify(newCart));
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

    return (
        <div className={styles.pageBg}>
            <HeaderPage />
            <div className={styles.glowOrb1}></div>
            <div className={styles.glowOrb2}></div>

            <div className={styles.container}>
                <header className={styles.header}>
                    <button className={styles.backBtn} onClick={() => navigate("/catalog")}>
                        <span className={styles.btnScan}></span>
                        <span>[ Назад ]</span>
                    </button>
                    
                </header>

                {cart.length === 0 ? (
                    <div className={styles.emptyView}>
                        <div className={styles.emptyGlitch} data-text="EMPTY">EMPTY</div>
                        <p className={styles.emptySubtext}>Система пуста. Требуется наполнение.</p>
                        <button className={styles.neonBtn} onClick={() => navigate("/catalog")}>
                            ЗАПОЛНИТЬ
                        </button>
                    </div>
                ) : (
                    <div className={styles.gridWrapper}>
                        <div className={styles.itemsGrid}>
                            {cart.map((item) => (
                                <div className={styles.techCard} key={item.id}>
                                    <div className={styles.imgContainer}>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className={styles.cardDetails}>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                        <div className={styles.specs}>
                                            <div className={styles.specBox}>
                                                <span className={styles.label}>PRICE</span>
                                                <span className={styles.value}>{item.price}$</span>
                                            </div>
                                            <div className={styles.specBox}>
                                                <span className={styles.label}>QTY</span>
                                                <span className={styles.value}>×{item.count}</span>
                                            </div>
                                            <div className={styles.specBox}>
                                                <span className={styles.label}>TOTAL</span>
                                                <span className={styles.valueHighlight}>{item.price * item.count}$</span>   
                                                
                                            </div>
                                            <button disabled={item.count===1} className={styles.zx} onClick={()=>decreaseCount(item.id)}>-</button>
                                            <button d className={styles.zx} onClick={()=>increaseCount(item.id)}>+</button>
                                        </div>
                                    </div>
                                    <button 
                                        className={styles.deleteCross} 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.stickyFooterBar}>
                            <div className={styles.footerInfo}>
                                <span className={styles.footerLabel}>ИТОГОВАЯ СУММА:</span>
                                <span className={styles.footerPrice}>{totalPrice}$</span>
                            </div>
                            <div className={styles.footerActions}>
                                <button className={styles.clearLink} onClick={clearCart}>
                                    [ Очистить ]
                                </button>
                                <button className={styles.actionNeonBtn}>
                                    ОФОРМИТЬ ЗАКАЗ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
