export function delay(ms:number){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateString(str:string, num:number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}