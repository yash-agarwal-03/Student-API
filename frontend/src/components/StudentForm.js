import React from 'react';
import './StudentForm.css';

const StudentForm = ({ form, onChange, onSubmit, editingId, onCancel, loading }) => (
  <form className="student-form" onSubmit={onSubmit}>
    <input name="name" placeholder="Name" value={form.name} onChange={onChange} required minLength={2} maxLength={50} />
    <input name="age" type="number" placeholder="Age" value={form.age} onChange={onChange} required min={1} max={120} />
    <input name="class" placeholder="Class" value={form.class} onChange={onChange} required minLength={1} maxLength={20} />
    <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={onChange} required minLength={1} maxLength={20} />
    <input name="address" placeholder="Address (optional)" value={form.address} onChange={onChange} maxLength={100} />
    <div className="form-actions">
      <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Student</button>
      {editingId && <button type="button" onClick={onCancel}>Cancel</button>}
    </div>
  </form>
);

export default StudentForm;
