function ifHasLoginMan() {
    let allCookie = document.cookie.split(';');
    if(!allCookie[0]) return false;
    for(var i=0;i<allCookie.length;i++){
        let arr=allCookie[i].split('=');
        if(arr[0]=='bigLegUser'){
            return JSON.parse(arr[1]);
        }
    }
};

