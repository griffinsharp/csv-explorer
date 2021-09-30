export const HEADERS = ['SALE TYPE', 'SOLD DATE', 'TYPE', 'ADDRESS', 'CITY', 'STATE', 'ZIP', 'PRICE', 'BD', 'BA', 'LOC', 'SQFT', 'LOT SIZE', 'YEAR BUILT', 'DAYS ON MARKET', '$/SQFT', 'HOA/MONTH', 'STATUS', 'OH START', 'OH END', 'URL', 'SOURCE', 'MLS#', 'FAV', 'INTERESTED', 'LAT', 'LONG'];
export const SIMPLE_HEADERS = ['SALE TYPE', 'TYPE', 'ADDRESS', 'CITY', 'STATE', 'ZIP', 'PRICE', 'BD', 'BA', 'LOC', 'SQFT', 'YEAR BUILT', 'DAYS ON MARKET', '$/SQFT', 'STATUS'];

export const getLink = (row) => {
  const urlIndex = HEADERS.indexOf('URL');
  return row[urlIndex];
}

// Given an index, should the data be included in the simplfied table view.
export const indexIsSimple = (index) => {
  const headerText = HEADERS[index];
  return SIMPLE_HEADERS.includes(headerText);
}

export const dataIsUrl = (data, index) => HEADERS[index] === 'URL' && data.includes('redfin.com');