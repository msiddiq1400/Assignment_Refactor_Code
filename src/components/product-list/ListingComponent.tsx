import * as React from "react";
import styles from "./ProductList.module.css";
import { IProduct } from "../../common/common";
import { AddToFavoriteComponent } from "./AddToFavoriteComponent";

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}

export const Posts: React.FC<IPostsProps> = ({products, onFav}) => {
  return (
    products.map((p:any, i:number) => {
      return <div>
        <Product key={i} index={i} product={p} onFav={onFav} />
      </div>
    })
  );
}

export const Product: React.FC<{
  index: number;
  product: IProduct;
  onFav: (title: string) => void;
}> = ({ product, onFav }) => {
  const {product: productClass, productBody} = styles
  // Problem: Now product title can be too long, I just put overflowX as fix now
  //we can take the title to the next line but it depends on the requirements given, or figma layout, so not sure if it is a problem.
  return (
    <span className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
      <span className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</span>
      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>
      <p><b>Price: ${+product.price}</b></p>
      <p className={productBody}>
        <span><b>Description:</b></span>
        <br/>
        {product.description}
     </p>
     <AddToFavoriteComponent product={product} onFav={onFav}/>
    </span>
  );
};

export default Posts;
