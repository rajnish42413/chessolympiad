const TOKEN:string = 'token';
const USER = 'user';

export const get = () =>{
    return  localStorage.getItem(TOKEN);
}

export const getUser = ():any =>{
   let user = localStorage.getItem(USER);
   return user;
}

export const storeToken = (value:any) =>{
  localStorage.setItem(TOKEN, value); 
}

export const storeUser = (value:any) =>{
  localStorage.setItem(USER, JSON.stringify(value)); 
}

export const clearAll= ()=>{
  localStorage.clear();
}
