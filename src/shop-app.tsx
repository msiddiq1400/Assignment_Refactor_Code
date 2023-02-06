import * as React from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import styles from "./shopApp.module.css";
import { HeaderComponent } from "./components/header-component";

export class ShopApp extends React.Component<
  {},
  { products: any[]; isOpen: boolean; isShowingMessage: boolean; message: string; numFavorites: number; prodCount: number }
> {
  constructor(props: any) {
    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //we would use redux or flux for managing our state instead of declaring a state object inside our app
    this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 };

    fetch('https://fakestoreapi.com/products').then((response) => {
      try {
        let jsonResponse = response.json();
        jsonResponse.then((rawData) => {
          let data = [];

          for (let i = 0; i < rawData.length; i++) {
            let updatedProd = rawData[i];
            data.push(updatedProd);
          }
          this.setState({
            products: data,
          });
          this.setState({
            prodCount: data.length
          })
        });
      } catch (err) {
        alert("some error occured")
      }
    });
  }

   componentDidMount(){
      document.title = "Droppe refactor app"
   }

  favClick(title: string) {
    const prods = this.state.products;
    const idx = lodash.findIndex(prods, {title: title})
    let currentFavs = this.state.numFavorites
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs
    } else {
      totalFavs = ++currentFavs
      prods[idx].isFavorite = true;
    }

    this.setState(() => ({ products: prods, numFavorites: totalFavs }));
  }

  onSubmit(payload: { title: string; description: string, price: string }) {
    const updated = lodash.clone(this.state.products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    this.setState({
      products: updated,
      prodCount: lodash.size(this.state.products) + 1
    });

    this.setState({
      isOpen: false,
    });

    this.setState({
      isShowingMessage: true,
      message: 'Adding product...'
    })

    // **this POST request doesn't actually post anything to any database**
    try {
        fetch('https://fakestoreapi.com/products',{
        method:"POST",
        body:JSON.stringify(
          {
            title: payload.title,
            price: payload.price,
            description: payload.description,
          }
        )
      })
        .then(res=>res.json())
        .then(json => {
            (() => {
              setTimeout(()=>{
                this.setState({
                  isShowingMessage: false,
                  message: ''
              })
            }, 2000)
        })();
      })
    } catch (err) {
      alert("some error occured")
    }
  }

  render() {
    const { products, isOpen } = this.state;
    return (
      <>
        <HeaderComponent />
        <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
          <div className={styles.buttonWrapper}>
            <span role="button">
               <Button onClick={() => this.setState({isOpen: true,})}>
                <div data-testid="add-product-button">
                  Send product proposal
                </div>
               </Button>
            </span>
             {this.state.isShowingMessage && <div className={styles.messageContainer}>
                <i>{this.state.message}</i>
             </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {this.state.prodCount}</span>
            {' - '}
            <span>Number of favorites: {this.state.numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={this.favClick} /> : <div></div>}
        </div>

        <>
           <Modal
              isOpen={isOpen}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
           >
              <div className={styles.modalContentHelper}>
                 <div
                    className={styles.modalClose}
                    onClick={function (this: any) {
                       this.setState({
                          isOpen: false,
                       });
                    }.bind(this)}
                 ><FaTimes /></div>

                 <Form
                    on-submit={this.onSubmit}
                 />
              </div>
           </Modal>
        </>
      </>
    );
  }
}
