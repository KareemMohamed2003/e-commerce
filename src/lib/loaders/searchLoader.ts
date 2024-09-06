import { LoaderFunctionArgs } from 'react-router-dom';
import { searchProduct, toArray } from '../helpers';
import { store } from '../../Redux/reduxStore';

export function loader({ request }: LoaderFunctionArgs) {
  const url = request.url;
  const queryParams = new URL(url);
  const productParam = queryParams.searchParams.get('product') as string;
  const products = toArray(store.getState().products?.products)

  const searchResults = searchProduct(productParam, products)
  // console.log(products, productParam)
  return { productParam, searchResults };
}
