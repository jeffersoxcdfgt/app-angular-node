import {  of , iif  } from 'rxjs';
import {  map ,  mergeMap ,filter } from 'rxjs/operators';

export const cleanBlank = map((str:string)=>{
    if(!str){
      return "";
    }
    if(str){
      return str.replace(/[\s-]/g,"");
    }
});


export const ifEmpty = mergeMap((str:string) => iif(() => str.length === 0,of(false) , of(true)))
export const ifChecked = map((checked:boolean ) => checked );
export const validObs =  filter(value=>value==true)
