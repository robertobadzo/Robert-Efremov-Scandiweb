import { gql } from '@apollo/client';

export const GET_ONE_PRODUCT = gql`
query product($id: String!){
  product(id: $id){
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
`;
export const GET_PRODUCTS = gql`

{
    product1:product(id:"huarache-x-stussy-le")      {
    name
    id
    inStock
    gallery
    category
    prices {
      amount
      currency {
        symbol
        label
      }
    }
  } 

   product2: product(id: "jacket-canada-goosee") {
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

     product3: product(id: "ps-5") {
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

     product4: product(id: "xbox-series-s") {
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

     product5: product(id: "apple-imac-2021") {
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

     product6: product(id: "apple-iphone-12-pro") {
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

     product7: product(id: "apple-airpods-pro") {
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

     product8: product(id: "apple-airtag") {
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
`;
export const GET_CATEGORIES_CURRENCIES = gql` {
  categories {
    name
  }
  currencies {
    symbol
    label
  }
}`;