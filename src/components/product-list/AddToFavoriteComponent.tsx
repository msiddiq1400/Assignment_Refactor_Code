import * as React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ProductList.module.css";
import { IProduct } from "../../common/common";

export const AddToFavoriteComponent: React.FC<{
    product: IProduct;
    onFav: (title: string) => void;
}> = ({product, onFav}) => {
    const {actionBarItem, actionBarItemLabel} = styles
    
    return (
        <>
            <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
                <span
                    className={`${actionBarItem} ${
                        product.isFavorite ? "active" : ""
                    }`}
                    role="button"
                    onClick={() => {
                        onFav(product.title);
                    }}
                >
                    <FaStar /> 
                    <span className={actionBarItemLabel}>
                        {!!(!!(product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}
                    </span>
                </span>
            </span>
        </>
    );
}