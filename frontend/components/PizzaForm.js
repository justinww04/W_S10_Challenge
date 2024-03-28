import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';

const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_SIZE = 'CHANGE_SIZE';
const RESET_FORM = 'RESET_FORM';
const TOPPING = 'TOPPING';

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, fullName: action.payload };
    case CHANGE_SIZE:
      return { ...state, size: action.payload };
    case TOPPING:
      const updatedToppings = state.toppings.includes(action.payload)
        ? state.toppings.filter(topping => topping !== action.payload)
        : [...state.toppings, action.payload];
      return { ...state, toppings: updatedToppings };
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [createOrder, { error: createOrderError, isLoading: orderLoading }] = useCreateOrderMutation();

  const onSizeChange = evt => {
    dispatch({ type: CHANGE_SIZE, payload: evt.target.value });
  };

  const onNameChange = evt => {
    dispatch({ type: CHANGE_NAME, payload: evt.target.value });
  };

  const onToppingChange = evt => {
    dispatch({ type: TOPPING, payload: evt.target.name });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const onNewOrder = async evt => {
    evt.preventDefault();
    const { fullName, size, toppings } = state;
    const newCustomer = { fullName, size, toppings };

    createOrder(newCustomer)
      .unwrap()
      .then(data => resetForm(data))
      .catch(err => console.log(err.message));
  };

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {orderLoading && <div className='pending'>Order in progress...</div>}
      {createOrderError && <div className='failure'>{createOrderError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onNameChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            onChange={onSizeChange}
            value={state.size}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={state.toppings.includes('1')}
            onChange={onToppingChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={state.toppings.includes('2')}
            onChange={onToppingChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={state.toppings.includes('3')}
            onChange={onToppingChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={state.toppings.includes('4')}
            onChange={onToppingChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={state.toppings.includes('5')}
            onChange={onToppingChange}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}