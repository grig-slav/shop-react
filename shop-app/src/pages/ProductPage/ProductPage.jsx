import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [cartCount, setCartCount] = useState(0); 

  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.count, 0);
    setCartCount(count);
  }

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProducts();
       
        const foundProduct = data.find((item) => String(item.id) === String(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        setError(true);
      }
    }

    loadProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;

    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
      alert("Чтобы добавить товар в корзину нужно войти");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundProductIndex = cart.findIndex((item) => String(item.id) === String(product.id));

    if (foundProductIndex !== -1) {
      cart[foundProductIndex].count += 1;
    } else {
      cart.push({ ...product, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");

 
    updateCartCount();
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Товар не найден или произошла ошибка загрузки.</p>
        <button className={styles.backButton} onClick={() => navigate("/catalog")}>Назад в каталог</button>
      </div>
    );
  }

  if (!product) {
    return <div className={styles.container}><p>Загрузка...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/catalog")}>
          ← Назад в каталог
        </button>
      </div>

      <div className={styles.product}>
        <div className={styles.left}>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={styles.right}>
          <p className={styles.cost}>{product.price}$</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}>Осталось: {product.stock} шт.</p>
      
          <button className={styles.add} onClick={handleAddToCart}>
            ДОБАВИТЬ В КОРЗИНУ
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
