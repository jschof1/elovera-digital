// pages/shop/[id].js
import { useRouter } from 'next/router';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Here you would fetch the product data from an API or your server
    // using the product ID. For this example, we'll just use static data.


    // If there's no product data yet, you can show a loading indicator or return null.
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            {/* Render more product details here */}
        </div>
    );
};

export default ProductPage;