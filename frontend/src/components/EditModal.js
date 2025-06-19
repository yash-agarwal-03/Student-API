import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './EditModal.css';
import Toast from './Toast';

const EditModal = ({ student, form, onChange, onSubmit, onClose, loading, toast, setToast }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!student) return null;

  const modalContent = (
    <div className="edit-modal-overlay">
      {toast && toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      )}
      <div className="edit-modal" ref={modalRef}>
        <h2>Edit Student</h2>
        <form onSubmit={onSubmit} className="edit-modal-form">
          <input name="name" placeholder="Name" value={form.name} onChange={onChange} required minLength={2} maxLength={50} />
          <input name="age" type="number" placeholder="Age" value={form.age} onChange={onChange} required min={1} max={120} />
          <input name="class" placeholder="Class" value={form.class} onChange={onChange} required minLength={1} maxLength={20} />
          <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={onChange} required minLength={1} maxLength={20} />
          <input name="address" placeholder="Address (optional)" value={form.address} onChange={onChange} maxLength={100} />
          <div className="edit-modal-actions">
            <button type="submit" disabled={loading}>Save</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default EditModal;
