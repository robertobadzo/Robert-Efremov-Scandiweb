import { gql } from '@apollo/client';

export const GET_ONE_PRODUCT = gql`query product($id: String!){
  currencies {
    symbol
    label
  }
  product(id: $id){
    name
    brand
    id
    inStock
    gallery
    category
    description
    attributes {
      name
      id
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      amount
      currency {
        symbol
      }
    }
  }
}
`;


export const GET_CATEGORIES_CURRENCIES = gql` {
  categories {
    name
    products {
      brand
      name
      id
      inStock
      gallery
      category
      prices {
        amount
        currency {
          symbol
        }
      }
    }
  }
  currencies {
    symbol
    label
  }
}`;