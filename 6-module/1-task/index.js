/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table");

    this.template();
  }
  get elem(){
    return this.elem;
  }

  template(){
    let table =  `
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>` + this.rows.map(value => `
              <tr>
                <td>${value.name}</td>
                <td>${value.age}</td>
                <td>${value.salary}</td>
                <td>${value.city}</td>
                <td><button>X</button></td>
              </tr> `).join("") + ` </tbody>`;
              this.elem.innerHTML = table;
              for(let btn of this.elem.querySelectorAll('button'))
                btn.addEventListener("click", this.removeTr);
  }

  removeTr(event){
    let row = event.target.parentElement.parentElement;
    // this.rows.splice(row.rowIndex - 1, 1);
    row.remove();
  }

}
