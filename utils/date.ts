
export const formatTime = (date: Date, locale: string[] | string = []): string => {
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
}
