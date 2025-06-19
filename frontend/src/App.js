import React, { useEffect, useState } from 'react';
import './App.css';
import StudentCard from './components/StudentCard';
import StudentForm from './components/StudentForm';
import Toast from './components/Toast';
import EditModal from './components/EditModal';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from './apis/api';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', class: '', rollNumber: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [modalForm, setModalForm] = useState({ name: '', age: '', class: '', rollNumber: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const handleFetchStudents = async (showToast = false) => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
      setError('');
      if (showToast) setToast({ message: 'All students loaded!', type: 'info' });
    } catch (err) {
      setError('');
      setStudents([]); // Clear the list on error
      setToast({ message: 'Could not fetch students', type: 'error' });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const updated = await updateStudent(editingId, form);
        setToast({ message: 'Student updated!', type: 'update' });
        setStudents(students => students.map(s => s._id === editingId ? { ...s, ...form } : s));
      } else {
        const result = await addStudent(form);
        setToast({ message: 'Student added!', type: 'success' });
        setStudents(students => [...students, result.student || form]);
      }
      setForm({ name: '', age: '', class: '', rollNumber: '', address: '' });
      setEditingId(null);
    } catch (err) {
      setError('');
      setToast({ message: 'Could not save student', type: 'error' });
    }
    setLoading(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setModalForm({
      name: student.name,
      age: student.age,
      class: student.class,
      rollNumber: student.rollNumber,
      address: student.address || '',
    });
  };

  const handleModalChange = (e) => {
    setModalForm({ ...modalForm, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStudent(editingStudent._id, modalForm);
      setToast({ message: 'Student updated!', type: 'update' });
      setStudents(students => students.map(s => s._id === editingStudent._id ? { ...s, ...modalForm } : s));
      setTimeout(() => {
        setEditingStudent(null);
      }, 2000);
    } catch (err) {
      setError('');
      setToast({ message: 'Could not update student', type: 'error' });
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    setLoading(true);
    try {
      await deleteStudent(id);
      setToast({ message: 'Student deleted!', type: 'delete' });
      setStudents(students => students.filter(s => s._id !== id));
    } catch (err) {
      setError('');
      setToast({ message: 'Could not delete student', type: 'error' });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setForm({ name: '', age: '', class: '', rollNumber: '', address: '' });
    setEditingId(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((d) => !d);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-bg');
    } else {
      document.body.classList.remove('dark-bg');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <div className="top-bar">
        <h1>Student API Dashboard</h1>
        <button className="dark-toggle" onClick={toggleDarkMode}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
      </div>
      <StudentForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancel={handleCancel}
        loading={loading}
      />
      <div className="show-btn-bar">
        <button className="show-btn" onClick={() => { setShowStudents(true); handleFetchStudents(true); }}>
          Show All Students
        </button>
        {showStudents && (
          <button className="show-btn" onClick={() => setShowStudents(false)}>
            Hide Students
          </button>
        )}
      </div>
      {showStudents && (
        <div className="card-list">
          {loading ? <div>Loading...</div> : students.length === 0 ? <div>No students found.</div> : students.map(student => (
            <StudentCard
              key={student._id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {editingStudent && (
        <EditModal
          student={editingStudent}
          form={modalForm}
          onChange={handleModalChange}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          loading={loading}
          toast={toast}
          setToast={setToast}
        />
      )}
    </div>
  );
}

export default App;
