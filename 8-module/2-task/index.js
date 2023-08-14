import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }

  template(){
    return `
    <div class="products-grid">
      <div class="products-grid__inner">
      ${this.products
        .filter(product => this.filteredProducts(product))
        .map(product => {
          const card = new ProductCard(product);
          return card.elem.outerHTML;
        })
        .join('')}
      </div>
    </div>
    `
  }

  render(){
    return createElement(this.template());

    // let gridInner = this.elem.querySelector('.products-grid__inner');
    // gridInner.innerHTML = '';

    // console.log(this.filteredProducts)
    

    // this.filteredProducts.forEach(product => {
    //   const card = new ProductCard(product);
    //   gridInner.appendChild(card.elem);
    // });
    // return this.elem;
  }

  filteredProducts(product){
      if (this.filters.noNuts && (product.nuts === true)) {
        return false;
      }
      if (this.filters.vegeterianOnly && product.vegeterian !== true) {
        return false;
      }
      if (this.filters.maxSpiciness && (product.spiciness > this.filters.maxSpiciness)) {
        return false;
      }
      if (this.filters.category && (product.category !== this.filters.category)) {
        return false;
      }
      return true;
  }

  updateFilter(filters) {

    this.filters = { ...this.filters, ...filters };

    let gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = this.products
      .filter(product => this.filteredProducts(product))
      .map(product => {
        const card = new ProductCard(product);
        return card.elem.outerHTML;
      })
      .join('');
  }
}
