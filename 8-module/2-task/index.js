import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      // noNuts: true, // true/false
      // vegeterianOnly: false, // true/false
      // maxSpiciness: 3, // числа от 0 до 4
      // category: 'soups' // уникальный идентификатор категории товара
    };
    this.filteredProducts = products;
    this.elem = createElement(this.template());
    this.render();
  }

  template(){
    return `
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `
  }

  render(){
    let gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';

    console.log(this.filteredProducts)
    

    this.filteredProducts.forEach(product => {
      const card = new ProductCard(product);
      gridInner.appendChild(card.elem);
    });
    // return this.elem;
  }

  updateFilter(filters) {

    console.log(this.filteredProducts);

    this.filteredProducts = this.products.filter(product => {
      if (filters.noNuts && (product.nuts === true)) {
        console.log('false');
        return false;
      }
      if (filters.vegeterianOnly && product.vegeterian !== true) {
        console.log('false');
        return false;
      }
      if (filters.maxSpiciness && product.spiciness > filters.maxSpiciness) {
        console.log('false');
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        console.log('false');
        return false;
      }
      console.log('true');
      return true;
    });

    console.log(this.filteredProducts);
    
    this.render(); // перерисовываем список товаров с учетом новых фильтров
  }
}
