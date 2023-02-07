import * as React from "react";
import lodash from 'lodash';
import { HeaderComponent } from "./components/header-component";
import { AddProductModalComponent } from "./components/add-product-modal.component";
import { ProductListComponent } from "./components/product-list/ProductListComponent";

//TODO - usually i would prefer to use functional component, as the code is more readable and easily understandable
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

    //instead of using fetch we can extract all the logic into a seperate api file, moreover we can use axios with it
      try {
        fetch('https://fakestoreapi.com/products').then((response) => {
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
          });
        } catch (err) {
          alert("some error occured")
      }
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
    updated.unshift({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    this.setState({
      products: updated,
      prodCount: this.state.products.length + 1
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
        <ProductListComponent 
          products={products}
          isShowingMessage={this.state.isShowingMessage}
          favClick={this.favClick}
          numFavorites={this.state.numFavorites}
          prodCount={this.state.prodCount}
          message={this.state.message}
          openModal={() => this.setState({isOpen: true,})}
        />
        <AddProductModalComponent isOpen={isOpen} setModalClose={() => this.setState({isOpen: false})} onSubmit={this.onSubmit}/>
      </>
    );
  }
}
