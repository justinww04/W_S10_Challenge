import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../state/pizzaSlice';
import { useGetOrdersQuery } from '../state/pizzaApi';

export default function OrderList() {
   const { data: orders = [], isLoading: ordersLoading, isFetching: ordersRefreshing } = useGetOrdersQuery();
   const activeSize = useSelector(state => state.pizzaSlice.activeSize);
   const dispatch = useDispatch();

   const filteredSize = orders && activeSize !== 'All' ? orders.filter(order => order.size === activeSize) : orders;

   return (
      <div id="orderList">
         <h2>Pizza Orders {ordersLoading || ordersRefreshing ? 'loading...' : ''}</h2>
         <ol>
            {orders && filteredSize.map(order => (
               <li key={order.id}>
                  <div>
                     {order.customer} ordered a size {order.size} with {
                        !order.toppings || order.toppings.length === 0 ? 'No toppings'
                        : order.toppings.length === 1 ? '1 topping'
                        : `${order.toppings.length} toppings`
                     }
                  </div>
               </li>
            ))}
         </ol>
         <div id="sizeFilters">
            Filter by size:
            {['All', 'S', 'M', 'L'].map((size, index) => (
               <button
                  onClick={() => dispatch(setFilters(size))}
                  data-testid={`filterBtn${size}`}
                  className={`button-filter${size === activeSize ? ' active' : ''}`}
                  key={index}
               >
                  {size}
               </button>
            ))}
         </div>
      </div>
   );
}