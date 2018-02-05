var tab = [];

for(var i =0; i <81; i++) {
    tab[i]=i;
}


var tab2 = [],
    tab3=[]

for (i=0; i < 81; i++) {
    tab2[i] = Math.floor(tab[i]/3)%3+Math.floor(tab[i]/27)*3+1;
    
    tab3[i]= (Math.floor(tab[i]/27))
}
console.log(tab2)