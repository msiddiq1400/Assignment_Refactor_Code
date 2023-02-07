import * as React from "react";
import styles from "../../shopApp.module.css";
import { Button } from "../button";
import ProductList from "./ListingComponent";

export const ProductListComponent: React.FC<{
    products: any;
    isShowingMessage: boolean;
    favClick: (title: string) => void;
    numFavorites: number;
    prodCount: number;
    message: string;
    openModal: () => void;
}> = ({products, favClick, numFavorites, prodCount, message, isShowingMessage, openModal}) => {    
    return (
        <>
            <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
                <div className={styles.buttonWrapper}>
                    <span role="button">
                    <Button onClick={openModal}>
                        <div data-testid="add-product-proposal">
                            Send product proposal
                        </div>
                    </Button>
                    </span>
                    {isShowingMessage && <div className={styles.messageContainer}>
                        <i>{message}</i>
                    </div>}
                </div>

                <div className={styles.statsContainer}>
                    <span data-testid="total-products-count">Total products: {prodCount}</span>
                    {' - '}
                    <span>Number of favorites: {numFavorites}</span>
                </div>

                {products && !!products.length ? <ProductList products={products} onFav={favClick} /> : <div></div>}
            </div>
        </>
    );
}