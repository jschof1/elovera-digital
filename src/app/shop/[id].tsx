
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const ProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState<typeof Products[number] | null>(null);


    useEffect(() => {
        const productData = Products.find((p) => p.id.toString() === id);
        if (productData) {
            setProduct(productData);
        }
    }, [id]);

    return (
        <>
            {product ? (
                <div>
                    {/* Render your product details here using `product` */}
                    <h1>{product.title}</h1>
                    {/* ... other product details */}
                </div>
            ) : (
                'Product not found'
            )}
        </>
    );
};

export default ProductPage;

export const getStaticPaths = async () => {

    const paths = Products.map((product) => ({
        params: { id: product.id.toString() },
    }));



    return { paths, fallback: 'blocking' };
};