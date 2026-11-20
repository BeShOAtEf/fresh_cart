import getSingleProduct from '@/app/apis/singleProduct.api';

import { productInterface } from '@/interfaces/product.interface';
import Image from 'next/image';
import React from 'react'
import { notFound } from 'next/navigation'
import ProductItemBtn from '../_components/ProductItemBtn';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const {id} =await params;
    const data:productInterface = await getSingleProduct(id)
    if (!data) notFound()
  return (
    <div className='flex flex-wrap items-center py-10'>
      <div className="w-full md:w-1/3">
        <Image src={data?.imageCover} width={300} height={300} className="object-cover w-full" alt='productImage'/>
      </div>
      <div className="w-full md:w-2/3 p-5">
      <h3>{data?.title}</h3>
      <p className="text-gray-400 my-3">{data?.description}</p>
      <p>{data?.category.name}</p>
      <div className="flex justify-between items-center my-5">
                <span>{data?.price}EGP</span>
                <span>{data?.ratingsAverage}<i className='fa-solid fa-star text-rating'></i></span>
            </div>
            <ProductItemBtn id={data._id}></ProductItemBtn>
      </div>
    </div>
  )
}
