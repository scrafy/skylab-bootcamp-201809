function fill(){
    if (arguments[2] == undefined){
        for (i=0;i<arr.length;i++){
            arr[i]=arguments[1];
        }
    }else if (arguments[3] == undefined){
        for (i=arguments[2];i<arr.length;i++){
            arr[i]=arguments[1];
        }  
    } else  {
        for (i=arguments[2];i<arguments[3];i++){
            arr[i]=arguments[1];
        }  
    }
    return arr;
}