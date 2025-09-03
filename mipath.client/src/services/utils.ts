export function delay(ms:number){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateString(str:string, num:number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}


export function getNameInitials(fullName?: string){
if (!fullName) return "";

  const words = fullName.trim().split(/\s+/);
  if (words.length === 0) return "";
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial = words.length > 1 ? words[words.length - 1][0].toUpperCase() : "";
  return firstInitial + lastInitial;
}