import {useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './api/index.js'


function App() {
  const {data, loading, error} = useQuery (GET_PRODUCTS);
  
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  console.log(data)
  return (
    <div>
    <div>{data.product1.name}</div>
    <img src={data.product1.gallery[0]}></img>
    <img src={data.product1.gallery[1]}></img>
    <img src={data.product1.gallery[2]}></img>
    <div>{data.product2.name}</div>
    <div>{data.product3.name}</div>
    <div>{data.product4.name}</div>
    <div>{data.product5.name}</div>
    <div>{data.product6.name}</div>
    <div>{data.product7.name}</div>
    <div>{data.product8.name}</div>

    </div>
    );
}

export default App;
