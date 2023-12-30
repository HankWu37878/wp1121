"use client";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSession } from 'next-auth/react';
import { type ChangeEvent, useState } from 'react';
import { addProductToCart } from './actions';
import { useRouter } from 'next/navigation';

type AddToCartButtonProps = {
    productId: string;
    productDetailId: string;
    quantityLeft: number; 
};

export default function AddToCartButton( { productId, productDetailId, quantityLeft }: AddToCartButtonProps) {
    const [buyQuantity, setBuyQuantity] = useState(1);
    const session = useSession();
    const router = useRouter();
    const userId = session.data?.user?.id;
    if (!userId) {
        return;
    }

    const handleAddCart = async () => {
        if (buyQuantity > quantityLeft) {
            alert("There's not enough stock for this product, please select smaller quantity!");
            return;
        }

        try {
            await addProductToCart(userId, productId, productDetailId, buyQuantity);
            setBuyQuantity(1);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (parseInt(inputValue) <= 1) {
            setBuyQuantity(1);
        }
        else {
            setBuyQuantity(parseInt(inputValue));
        }
      };
    
    return (
        <div className='flex'>
            <button 
            onClick={handleAddCart}
            className="p-2 rounded-md flex gap-2 text-white bg-teal-900 text-base border-2 shadow hover:shadow-xl hover:bg-teal-800">
                <AddShoppingCartIcon/>
                <p>Add to cart</p>
    
            </button>
            <input type='number' value={buyQuantity} className='w-12 border ml-1 rounded-md text-center' onChange={handleOnChange}></input>
        </div>
        
    );
}