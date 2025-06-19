import React from 'react';
import './StudentCard.css';

const StudentCard = ({ student, onEdit, onDelete }) => (
  <div className="student-card">
    <div className="card-header">
      <span className="student-name">{student.name}</span>
      <span className="student-class"><b>Class:</b> {student.class}</span>
    </div>
    <div className="card-body">
      <div><b>Age:</b> {student.age}</div>
      <div><b>Roll #:</b> {student.rollNumber}</div>
      <div><b>Address:</b> {student.address ? student.address : 'Not provided'}</div>
    </div>
    <div className="card-actions">
      <button onClick={() => onEdit(student)}>Edit</button>
      <button className="delete" onClick={() => onDelete(student._id)}>Delete</button>
    </div>
  </div>
);

export default StudentCard;
