import { useState } from 'react';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { urlString } from '../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		try {
      const response = await fetch(`${urlString}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
				Toastify({
					text: `Form submitted`,
					duration: 3000,
					close: true,
					gravity: "bottom",
					position: "right",
					style: {
						background: "#22c55e",
					}
				}).showToast();
      } else {
				Toastify({
					text: `Error submitting form:, ${response.statusText}`,
					duration: 3000,
					close: true,
					gravity: "bottom",
					position: "right",
					style: {
						background: "#22c55e",
					}
				}).showToast();
      }
    } catch (error) {
      Toastify({
				text: `Error submitting form:, ${error.message}`,
				duration: 3000,
				close: true,
				gravity: "bottom",
				position: "right",
				style: {
					background: "#22c55e",
				}
			}).showToast();
    }
  };

  return (
    <form className='contact-us-form' onSubmit={handleSubmit}>
      <label>
        Naam:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Bestelnummer (optioneel):
        <input
          type="text"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Bericht:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button className='button' type="submit">Indienen</button>
    </form>
  );
};

export default ContactForm;
