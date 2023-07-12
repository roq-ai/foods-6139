import { UserInterface } from 'interfaces/user';
import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface DeliveryInterface {
  id?: string;
  status: string;
  driver_id?: string;
  order_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  order?: OrderInterface;
  _count?: {};
}

export interface DeliveryGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  driver_id?: string;
  order_id?: string;
}
