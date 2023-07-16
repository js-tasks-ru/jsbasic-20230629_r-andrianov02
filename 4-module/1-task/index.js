function makeFriendsList(friends) {
    
  let ul = document.createElement('ul');
  document.body.append(ul);

  for(let value of friends){
      let li = document.createElement('li');
      li.innerHTML = `${value.firstName} ${value.lastName}`;
      ul.append(li);
  }

  return ul;

}
