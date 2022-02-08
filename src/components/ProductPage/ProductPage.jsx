import React from 'react';
import s from './ProductPage.module.css';
import ProductItemHorizontal from '../ProductItemHorizontal/ProductItemHorizontal';
import RatingComponent from '../RatingComponent/RatingComponent';
import ErrorPage from '../ErrorPage/ErrorPage';
import { BackButton } from '../BackButton/BackButton';

const ProductPage = ({ products, productID }) => {
    const product = products.find(product => (product.id === Number(productID)));

    if (product === undefined) {
        return <ErrorPage title='Товар не найден' back />;
    }

    return (
        <div className={s.product_page}>
            <div>
                <h1 className={s.title}>
                    <BackButton />
                    {product.name}
                </h1>
                <ProductItemHorizontal
                    key={product.id}
                    name={product.name}
                    img={product.img}
                    price={product.price}
                    discount={product.discount}
                    stars={product.stars}
                    status={product.status}
                    ratingComponent={RatingComponent}
                />
            </div>
        </div >
    );
}

export default ProductPage;