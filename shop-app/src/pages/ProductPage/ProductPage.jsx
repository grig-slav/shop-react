import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import FooterPage from "../FooterPage/FooterPage";

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.count || 0), 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const foundProduct = data.find((item) => String(item.id) === String(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedColorIndex(0);
          setActiveImageIndex(0);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        setError(true);
      }
    };
    loadProduct();
  }, [id]);

  const currentColor = product?.colors?.[selectedColorIndex];
  const images = currentColor?.images || [];

  const getCurrentImage = () => {
    if (images.length > 0 && activeImageIndex >= 0 && activeImageIndex < images.length) {
      return images[activeImageIndex];
    }
    return "/images/default.jpg";
  };

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    setActiveImageIndex(0);
  };

  const handleAddToCart = () => {
    if (!product || !currentColor) return;
    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
      alert("Чтобы добавить товар в корзину, нужно войти");
      navigate("/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundProductIndex = cart.findIndex((item) => String(item.id) === String(product.id));
    if (foundProductIndex !== -1) {
      cart[foundProductIndex].count += 1;
    } else {
      cart.push({
        ...product,
        count: 1,
        selectedColorIndex: selectedColorIndex,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");
    updateCartCount();
  };

  if (error) {
    return (
      <div className={styles.container}>
        <p>Товар не найден или произошла ошибка загрузки.</p>
        <button className={styles.backButton} onClick={() => navigate("/catalog")}>
          Назад в каталог
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className={styles.container}><p>Загрузка...</p></div>;
  }

  const currentImage = getCurrentImage();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate("/catalog")}>
            ← Назад в каталог
          </button>
        </div>
        <div className={styles.productLayout}>
          <div className={styles.left}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <div className={styles.galleryWrapper}>
              <button
                type="button"
                className={styles.carouselPrev}
                onClick={() =>
                  setActiveImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                }
                aria-label="Предыдущая картинка"
              >
                ←
              </button>
              <img
                src={currentImage}
                alt={product.title}
                className={styles.mainImage}
                onError={(e) => {
                  e.target.src = "/images/default.jpg";
                }}
              />
              <button
                type="button"
                className={styles.carouselNext}
                onClick={() =>
                  setActiveImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                }
                aria-label="Следующая картинка"
              >
                →
              </button>
              {images.length > 0 && (
                <div className={styles.thumbnails}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={idx === activeImageIndex ? styles.thumbActive : styles.thumb}
                      type="button"
                      aria-label={`Миниатюра ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`thumb ${idx}`}
                        className={styles.thumbImg}
                        onError={(e) => {
                          e.target.src = "/images/default.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.colorSelector}>
              <p className={styles.selectorLabel}>ВЫБЕРИТЕ ЦВЕТ:</p>
              <div className={styles.colorOptions}>
                {product.colors?.map((color, index) => {
                  const isSelected = index === selectedColorIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => handleColorChange(index)}
                      className={isSelected ? styles.colorBtnActive : styles.colorBtn}
                      style={{ backgroundColor: color.colorHex }}
                      title={color.colorName}
                      type="button"
                    >
                      {isSelected && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
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
      <FooterPage />
    </>
  );
}

export default ProductPage;
