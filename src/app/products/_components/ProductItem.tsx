import { productInterface } from '@/interfaces/product.interface'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import ProductItemBtn from './ProductItemBtn';

export default function ProductItem({prod}:{prod:productInterface}) {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
        <div className="p-5">
           <Link href={`/products/${prod._id}`}>
            <Image width={300} height={300} src={prod.imageCover} className='w-full'  alt="prod-image" />
            <span className='text-main'>{prod.category.name}</span>
            <p className="line-clamp-1">{prod.title}</p>
            <div className="flex justify-between items-center my-5">
               <div>
                 <div className={prod?.priceAfterDiscount ? 'line-through' : ''}>{prod.price}EGP</div>
                {prod.priceAfterDiscount && <div>{prod.priceAfterDiscount}EGP</div>}
               </div>
                <span>{prod.ratingsAverage}<i className='fa-solid fa-star text-rating'></i></span>
            </div>
           </Link>
            <ProductItemBtn id={prod._id}></ProductItemBtn>
        </div>
    </div>
  )
}
