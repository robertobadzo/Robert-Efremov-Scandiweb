import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`

{
    product1:product(id:"huarache-x-stussy-le")      {
    name
   id
    gallery
  } 
   product2: product(id: "jacket-canada-goosee") {
      name 
      id 
      gallery
    }
     product3: product(id: "ps-5") {
      name 
      id 
      gallery
    }
     product4: product(id: "xbox-series-s") {
      name 
      id 
      gallery
    }
     product5: product(id: "apple-imac-2021") {
      name 
      id 
      gallery
    }
     product6: product(id: "apple-iphone-12-pro") {
      name 
      id 
      gallery
    }
     product7: product(id: "apple-airpods-pro") {
      name 
      id 
      gallery
    }
     product8: product(id: "apple-airtag") {
      name 
      id 
      gallery
    }
    }
`;