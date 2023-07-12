import { DeliveryInterface } from 'interfaces/delivery';
import { UserInterface } from 'interfaces/user';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  status: string;
  customer_id?: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;
  delivery?: DeliveryInterface[];
  user?: UserInterface;
  business?: BusinessInterface;
  _count?: {
    delivery?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  customer_id?: string;
  business_id?: string;
}
