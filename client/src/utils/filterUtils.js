export const FILTER_OPTS = {
  address: {
    number: [ 'contains', 'exact', 'greater_than', 'less_than' ],
    street_name: [ 'contains', 'exact', 'starts_with' ]
  }
};

export const ADDRESS_DEFAULT_STATE = {
  address: {
    number: {},
    street_name: {}
  }
}

export const DEFAULT_STATE_MAP = {
  address: ADDRESS_DEFAULT_STATE
}