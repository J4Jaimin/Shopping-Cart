import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const Home = () => {

    const dispatch = useDispatch();

    const productList = [
        {
            name: "Mac Book",
            price: 12000,
            imgSrc: "https://www.shutterstock.com/image-photo/cracow-poland-february-24-2020-260nw-1654752016.jpg",
            id: "askdigwfw90efwk",
        },
        {
            name: "Black shoes",
            price: 500,
            imgSrc: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
            id: "90fmevisosvmiso",
        },
        {
            name: "Iphone",
            price: 5000,
            imgSrc: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aSUyMHBob25lfGVufDB8fDB8fHww",
            id: "sgwif90fr3ri209",
        },

    ]

    const addToCartHandler = (options) => {
        console.log(options);

        dispatch(
            {
                type: "addToCart",
                payload: options,
            }
        );

        dispatch({ type: 'calculatePrice' });

        toast.success("Item added to cart successfully!!");
    }

    return (
        <div className='home'>
            {
                productList.map((product) => (
                    <ProductCard key={product.id} name={product.name} price={product.price} imgSrc={product.imgSrc} id={product.id} handler={addToCartHandler} />
                ))
            }
        </div>
    );
}

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
    <div className='productCard'>
        <img src={imgSrc} alt={name} />
        <p>{name}</p>
        <h4>${price}</h4>
        <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>Add to cart</button>
    </div>
);

export default Home;