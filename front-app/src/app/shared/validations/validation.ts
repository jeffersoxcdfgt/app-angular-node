import {  of , iif  } from 'rxjs';
import {  map ,  mergeMap , filter } from 'rxjs/operators';

export const cleanBlank = map((str: string) => {
    if (!str){
      return '';
    }
    if (str){
      return str.replace(/[\s-]/g, '');
    }
});


export const  validateEmail = map((email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
});

export const passwordLength = map((str: string) => {
  if (str.length >= 6){
    return true;
  }
  return false;
});

export const onlyNumberCard = map((str: string) => {
 if ((str.length >= 6 && str.length <= 9) && (str.substr(4, 1) === '-')){
   return true;
 }

 if ((str.length >= 11 && str.length <= 14) && (str.substr(9, 1) === '-')){
  return true;
}

 if ((str.length >= 15  && str.length <= 19) && (str.substr(14, 1) === '-')){
  return true;
}

 if (/^\d+$/.test(str)){
    return true;
  }
 return false;
});



export const ifEmpty = mergeMap((str: string) => iif(() => str.length === 0, of(false) , of(true)));
export const ifChecked = map((checked: boolean ) => checked );
export const validObs =  filter(value => value === true);
