import React, { useState } from 'react';
import "../Styles/Modal.css";

const Modal = ({title, onSubmit, onClose, fields}) => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

  return (
    <div>
    <div className="modal-backdrop">
    <div className="modal">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.name}>
              <label>{field.label}:</label>
              <input
                name={field.name}
                type={field.type || "text"}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
            <div className="modal-button-group">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
    </div>
    </div>
    </div>
  )
}

export default Modal
