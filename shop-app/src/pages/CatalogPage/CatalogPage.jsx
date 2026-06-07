import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";

function CatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    loadProducts();
    updateCartCount();
  }, []);

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.count, 0);
    setCartCount(count);
  }

  function addToCart(product) {
    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
      alert("Чтобы добавить товар в корзину нужно войти");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundProductIndex = cart.findIndex((item) => item.id === product.id);

    if (foundProductIndex !== -1) {
      cart[foundProductIndex].count += 1;
    } else {
      cart.push({ ...product, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");
    updateCartCount();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Каталог товаров</h1>
        <div>
          <span>{user?.name}</span>
          <button onClick={() => navigate("/cart")}>Корзина({cartCount})</button>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}$</p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
