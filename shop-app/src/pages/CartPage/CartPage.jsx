import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./CartPage.module.css";
import FooterPage from "../FooterPage/FooterPage";

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

  function increaseCount(id) {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        if (item.count >= item.stock) {
          alert("Товара больше нет на складе");
          return item;
        }
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function decreaseCount(id) {
    const newCart = cart
      .map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
      .filter((item) => item.count > 0);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Корзина</h1>
          <button className={styles.backButton} onClick={() => navigate("/catalog")}>
            Назад в каталог
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCard}>
            <p className={styles.emptyMessage}>В корзине пока ничего нет</p>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.itemsCard}>
              {cart.map((item) => {
                const itemImage = item.colors?.[0]?.images?.[0] || "/images/default.jpg";

                return (
                  <div className={styles.itemRow} key={item.id}>
                    <div className={styles.imageWrapper}>
                      <img src={itemImage} alt={item.title} className={styles.itemImage} />
                    </div>
                    <div className={styles.itemMain}>
                      <div className={styles.itemInfo}>
                        <h3>{item.title}</h3>
                        {item.colors?.[0] && (
                          <p className={styles.colorText}>Цвет: {item.colors[0].colorName}</p>
                        )}
                        <p className={styles.singlePrice}>{item.price} $ / шт</p>
                      </div>
                      <div className={styles.itemControls}>
                        <div className={styles.counter}>
                          <button
                            disabled={item.count === 1}
                            onClick={() => decreaseCount(item.id)}
                          >
                            —
                          </button>
                          <span>{item.count}</span>
                          <button onClick={() => increaseCount(item.id)}>+</button>
                        </div>
                        <div className={styles.priceBlock}>
                          <p className={styles.itemTotal}>{item.price * item.count} $</p>
                          <button
                            className={styles.removeButton}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.summaryCard}>
              <h2>Ваш заказ</h2>
              <div className={styles.summaryRow}>
                <span>Товары ({totalItemsCount})</span>
                <span>{totalPrice} $</span>
              </div>
              <div className={styles.totalRow}>
                <span>Итого</span>
                <span className={styles.finalPrice}>{totalPrice} $</span>
              </div>
              <button onClick={clearCart} className={styles.clearButton}>
                Очистить корзину
              </button>
            </div>
          </div>
        )}
      </div>
      <FooterPage />
    </>
  );
}

export default CartPage;
