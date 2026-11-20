'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from './../../loading';
import { CartRes, Product } from "../typescript/cart.interface";
import { deleteItem } from "../_actions/deleteitem.action";
import { updateCount } from "../_actions/updateCount.action";
import { toast } from "react-toastify";
import { Button } from "@base-ui/react/button";
import { clearCart } from "../_actions/clearCart.action";
import Link from "next/link";

export default function Cart() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery<CartRes>({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await fetch('/api/cart');
            if (!res.ok) throw new Error(res.status === 401 ? 'Please login first' : 'Failed to load cart');
            return (await res.json()) as CartRes;
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: clearCart,
        onSuccess: (resData) => {
            toast.success(resData?.message || "Cart cleared successfully");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: () => {
            toast.error('login first!');
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <h2>{error.message}</h2>;

    return (
        <>
        <div className="py-5">
            <h2>Total Cart Price: <span className="text-main font-bold">{data?.data?.totalCartPrice} EGP</span></h2>
            <h3>Nums OF Cart items: <span className="text-main font-bold">{data?.numOfCartItems}</span></h3>

            <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.products?.map((prod) => (
                            <ProductItemTable key={prod._id} prod={prod} />
                        ))}
                    </tbody>
                </table>
            </div>

            <Button className='block ml-auto my-5 cursor-pointer bg-red-600 text-white px-4 py-2 rounded' onClick={() => mutate()}>
                {isPending ? <i className="fa-solid fa-spin fa-spinner"></i> : 'Clear Cart'}
            </Button>
            <Link
                href={`/checkout/${data?.data?._id}`}
                className="block w-fit ml-auto my-2 cursor-pointer bg-main text-white px-4 py-2 rounded"
            >
                CheckOut
            </Link>
        </div>
        </>
    );
}

function ProductItemTable({ prod }: { prod: Product }) {
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isPending: deletePending } = useMutation({
        mutationFn: (productId: string) => deleteItem(productId),
        onSuccess: (resData) => {
            toast.success(resData?.message || "Item removed successfully");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: () => {
            toast.error('login first!');
        }
    });

    const { mutate: updateMutate, isPending: updatePending } = useMutation({
        mutationFn: ({ productId, count }: { productId: string; count: number }) => updateCount(productId, count),
        onSuccess: (resData) => {
            toast.success(resData?.message || "Product count updated successfully");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: () => {
            toast.error('Something went wrong!');
        }
    });

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <img src={prod.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full object-cover" alt={prod.product.title} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod.product.title}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <button
                        disabled={updatePending || prod.count <= 1}
                        onClick={() => updateMutate({ productId: prod.product._id, count: prod.count - 1 })}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 cursor-pointer disabled:opacity-50"
                        type="button"
                    >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>

                    <div>
                        <span className="bg-gray-50 px-3 py-1 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:text-white">
                            {updatePending ? <i className="fa-solid fa-spin fa-spinner"></i> : prod.count}
                        </span>
                    </div>

                    <button
                        disabled={updatePending}
                        onClick={() => updateMutate({ productId: prod.product._id, count: prod.count + 1 })}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 cursor-pointer disabled:opacity-50"
                        type="button"
                    >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod.price} EGP
            </td>
            <td className="px-6 py-4">
                {deletePending ? (
                    <i className="fa-solid fa-spin fa-spinner"></i>
                ) : (
                    <button onClick={() => deleteMutate(prod.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                        Remove
                    </button>
                )}
            </td>
        </tr>
    );
}