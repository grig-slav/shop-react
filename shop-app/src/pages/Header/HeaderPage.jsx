import styles from './HeaderPage.module.css'

function HeaderPage(){


    return(
<div>
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
    )
}

export default HeaderPage;