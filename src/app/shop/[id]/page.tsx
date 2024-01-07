import SingleProductCompo from '@/app/shop/SingleProduct';

interface idType{
    params: {
        id: number | string
    }
}

const SingleProduct = ({params:{id}}: idType) => {
  
    console.log(id)
    return (
        <SingleProductCompo id={id}  />

    )
}

export default SingleProduct
