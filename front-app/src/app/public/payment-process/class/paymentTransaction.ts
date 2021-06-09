import { Product } from '../../../private/product/class/product';

export class PaymentTransaction{
    nameCard?: string;
    numCard?: string;
    securitycode?: string;
    daycard?: string;
    monthcard?: string;
    yearcard?: string;
    products?: Product[];
}
