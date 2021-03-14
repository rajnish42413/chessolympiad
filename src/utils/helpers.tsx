import moment from 'moment';
import  {states} from '../constants/states.json';

export const sum = (a: number, b: number): number => a + b;


export const AicfId = (id:number,st:string, date:string):string =>{
  if(!st) return "";
    const year  = moment(date).year();
    let stateCode = "";
    const findState = states?.find(o => o.name === st);

   if(findState){
    stateCode = findState.iso2;
   }
 return `${id}${stateCode}${year}`
}


export const PlayerName= (first:string,middle:string,last:string) =>{
  let name = "";
  if(first) name = name + first + " ";
  if(middle) name = name + middle + " ";
  if(last) name = name +  last;
  return name;
}
