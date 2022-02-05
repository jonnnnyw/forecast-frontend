
/**
 * Search array for prefix
 */
export const searchArray = (items: string[], search: string, limit: number = 0): string[] => {
  const results = items.filter(function (this: { count: number }, item) {
    const match = item.toLowerCase().startsWith(search.toLowerCase());
    if(match) {
      this.count++;
    }
    return match && (!limit || this.count <= limit);
  }, { count: 0 });

  return results;
}

/**
 * Add to array if item 
 * is not included.
 */
export const addToArray = (items: any[], value: any) => {
  if(!items.includes(value)) {
    items.push(value);
  }
}

/**
 * Remove from array
 * if item is included.
 */
export const removeFromArray = (items: any, value: any) => {
  if(items.includes(value)) {
    items.splice(items.indexOf(value), 1);
  }
}