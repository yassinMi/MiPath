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



/**
 * return a date and time representing the mooment the current day started (if settings_day_start_hour is 8, it will return the date representing most recent 8:00:00 AM)
 * @param settings_day_start_hour 
 * @param now 
 * @returns 
 */
export function getDayStart(settings_day_start_hour:number, now: Date){
        var SETTINGS_DAY_START_HOUR = settings_day_start_hour
        var settings_day_start_ms = 8*1000*60*60
        var thisTimeMs = (now.getHours()*1000*60*60) + (now.getMinutes()*1000*60) + (now.getSeconds()*1000) + (now.getMilliseconds())
        var isSameDay = thisTimeMs>= settings_day_start_ms;
         var dayStart = new Date(now.getFullYear(),now.getMonth(), now.getDate(), SETTINGS_DAY_START_HOUR,0,0,0)
                if(!isSameDay) dayStart = new Date(dayStart.getTime()-(24*60*60*1000))
                  return dayStart;
}