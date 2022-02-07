
type DateRange = {
  prev: Date,
  next: Date
};

export const formatTime = (date: Date, locale: string[] | string = []): string => {
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
}

export const formatDate = (date: Date, locale: string[] | string = []): string => {
  return date.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export const getSiblingMonths = (date: Date): DateRange => {
  const prev = new Date(date.getTime()); 
  const next = new Date(date.getTime()); 

  next.setMonth(date.getUTCMonth() + 1);
  prev.setMonth(date.getUTCMonth() - 1);

  return { prev, next };
}

export const isInDateRange = (date: Date, min?: Date, max?: Date): boolean => {

  if(min && (min.getTime()/(86400 * 1000)) > (date.getTime()/(86400 * 1000))) {
    return false;
  }

  if(max && (max.getTime()/(86400 * 1000)) < (date.getTime()/(86400 * 1000))) {
    return false;
  }

  return true;
}