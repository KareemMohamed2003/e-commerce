import { Link } from 'react-router-dom';
import { displayProducts } from '../Redux/SelectedCategorySlice';
import { ISideBar, selectedCategoryType } from '../types';
import '../sass/navbar.scss';

export default function SideBar({
  setMenuToggle,
  electronics,
  womenCategories,
  menCategories,
  dispatch,
  productsState,
}: ISideBar) {
  const selectProducts = (el: selectedCategoryType) => {
    dispatch(
      displayProducts({ state: productsState?.products?.products, type: el })
    );
  };

  return (
    <div className="menu">
      <div className="close-menu-btn" onClick={() => setMenuToggle(false)}>
        &#10006;
      </div>
      <h2 className="menu-heading">shop by department</h2>
      <h2>electronics</h2>
      {electronics.map((el) => (
        <Link
          reloadDocument
          onClick={() => selectProducts(el)}
          key={el}
          to={`/home/SelectedCategory/${el}`}
          className="link"
        >
          {el}
        </Link>
      ))}

      <h2>women's Fashion</h2>
      {womenCategories.map((el: string) => (
        <Link
          reloadDocument
          onClick={() => selectProducts(el as selectedCategoryType)}
          className="link"
          key={el}
          to={`/home/SelectedCategory/${el}`}
        >
          {el}
        </Link>
      ))}
      <h2>men's Fashion</h2>

      {menCategories.map((el: string) => (
        <Link
          reloadDocument
          to={`/home/SelectedCategory/${el}`}
          key={el}
          className="link"
          onClick={() => selectProducts(el as selectedCategoryType)}
        >
          {el}
        </Link>
      ))}

      <h2>others</h2>
      <Link
        reloadDocument
        to={`/home/SelectedCategory/videoGames`}
        key={'videoGames'}
        className="link"
        onClick={() => selectProducts('video games')}
      >
        {'video games'}
      </Link>
    </div>
  );
}
