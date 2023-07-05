function factorial(n) {
    let sum = n;
    if( n === 0 || n === 1){
        sum = 1;
    }else{
        for(let i = 1; i < n; i++){
            
            sum *= ( n - i );

        }
    }
    return sum;
}
