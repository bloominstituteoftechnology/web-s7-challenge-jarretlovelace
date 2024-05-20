import React, { useState } from 'react';
import * as Yup from 'yup';

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'Full name must be at least 3 characters',
  fullNameTooLong: 'Full name must be at most 20 characters',
  sizeIncorrect: 'Size must be S, M, or L'
};
// 👇 Here you will create your schema.
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('Full name is required'),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required'),
  toppings: Yup.array().of(Yup.string())
});


// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];

export default function Form() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    size: '',
    toppings: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach(error => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues(prevState => ({
        ...prevState,
        toppings: checked
          ? [...prevState.toppings, value]
          : prevState.toppings.filter(topping => topping !== value)
      }));
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      console.log('Form values:', formValues);
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 2000); // simulate form submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {isSubmitting && <div className='success'>Thank you for your order!</div>}
      {errors.submit && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            placeholder="Type full name"
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className='error'>{errors.fullName}</div>}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            id="size"
            name="size"
            value={formValues.size}
            onChange={handleChange}
          >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          {errors.size && <div className='error'>{errors.size}</div>}
        </div>
      </div>

      <div className="input-group">
        {toppings.map(topping => (
          <label key={topping.topping_id}>
            <input
              type="checkbox"
              name="toppings"
              value={topping.text}
              checked={formValues.toppings.includes(topping.text)}
              onChange={handleChange}
            />
            {topping.text}<br />
          </label>
        ))}
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
