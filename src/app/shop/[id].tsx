'use client'
import { Products } from '@/data';
import Image from 'next/image'
import { useRouter } from 'next/router'


const ProductPage = () => {
    const router = useRouter()
    const { id } = router.query
    const product = Products.find((p) => p.id.toString() === id)

    if (!product) {
        return <p>Product not found</p>
    }

    return (
        <section className="py-10 font-poppins dark:bg-gray-800 bg-primary">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-96">
                                <Image className="object-contain w-full lg:h-full" src={product.thumb_src} alt={product.title} width={500} height={300} layout="responsive"></Image>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="lg:pl-20">
                            <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">New Arrival</span>
                            <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                {product.title}
                            </h2>
                            <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                <span>{product.price}</span>
                                <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">{product.originalPrice}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage
