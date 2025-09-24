import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import useCartStore from '@/store';
import { HiMinus, HiPlus } from "react-icons/hi2"
import React from 'react'
import toast from 'react-hot-toast';
import { Button } from '../ui/button';


interface Props {
    product: Product;
    className?: string;
    borderStyle?: string;
}
const QuantityButtons = ({ product, className, borderStyle }: Props) => {
    const { addItem, removeItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;
    const handleRemoveProduct = () => {
        removeItem(product?._id);
        if (itemCount > 1) {
            toast.success("Quantity Decreased successfully!")
        } else {
            toast.success(`${product?.name?.substring(0, 12)} remove Successfully`)
        }
    };
    const handleAddToCart = () => {
        if ((product?.stock as number) > itemCount) {
            addItem(product);
            toast.success("")
        } else {
            toast.error("")
        }
    };

    return (
        <div className={cn("flex items-center gap-1 text-base",
            borderStyle, className
        )}>
            <Button onClick={handleRemoveProduct}
                disabled={isOutOfStock}
                variant={"outline"}
                size={"icon"}
                className="w-6 h-6 border-0 hover:bg-tech_orange/20 hoverEffect" >
                <HiMinus />
            </Button>
            <span className="font-semibold text-sm w-6 text-center text-tech_dark">
                {itemCount}
            </span>
            <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                variant={"outline"}
                size={"icon"}
                className="w-6 h-6 border:bg-tech_yellow/20 hoverEffected">
                <HiPlus />
            </Button>
        </div>
    );
};

export default QuantityButtons
