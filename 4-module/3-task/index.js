function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {

    let row = table.rows[i];
    console.log(row);
    console.log(row.cells[3]);
    
    if(row.cells[3].hasAttribute('data-available')){
        if(row.cells[3].getAttribute('data-available') ===  'true'){
            row.classList.add('available');
            console.log('true');
        } else {
            row.classList.add('unavailable');
        }
    } else {
        row.hidden = true; 
    }

    if(row.cells[2].innerHTML == 'm'){
        row.classList.add('male');
    } else {
        row.classList.add('female');
    }

    if(row.cells[1].innerHTML < 18){
        row.style.textDecoration = "line-through";
    }
  }
}
