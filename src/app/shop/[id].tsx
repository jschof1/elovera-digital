// pages/shop/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Products } from '@/data';
import Image from 'next/image'

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // State for the product details
    const [product, setProduct] = useState(null);

    // Fetch product data when `id` changes
    useEffect(() => {
        const productData = Products.find((product) => product.id.toString() === id);
        if (productData) {
            setProduct(productData);
        }
    }, [id]);

    return (
    <>
    {Products.title}
    </>
    );
}

export default ProductPage;