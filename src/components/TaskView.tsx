import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface TaskViewProps {
  taskIndex: number;
  totalTasks: number;
  onComplete: () => void;
}

const tasks = [
  {
    title: "In which continent is South Africa located?",
    subtitle: "Choose the correct continent from the options below.",
    options: ["Africa", "Europe", "Asia", "South America"]
  },
  {
    title: "What is the official currency of South Africa?",
    subtitle: "Select the currency used in South Africa.",
    options: ["South African Rand (R)", "US Dollar ($)", "Euro (€)", "British Pound (£)"]
  },
  {
    title: "Which of these is a major South African city?",
    subtitle: "Identify the correct city from the list.",
    options: ["Johannesburg", "London", "Luanda", "Lisbon"]
  },
  {
    title: "How many colors are in the South African flag?",
    subtitle: "Count the colors in the official national flag.",
    options: ["6 Colors", "3 Colors", "4 Colors", "5 Colors"]
  },
  {
    title: "Which animal is part of the 'Big Five' in South Africa?",
    subtitle: "Select one of the famous 'Big Five' animals.",
    options: ["Elephant", "Kangaroo", "Giraffe", "Zebra"]
  }
];

const TaskView: React.FC<TaskViewProps> = ({ taskIndex, totalTasks, onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const task = tasks[taskIndex] || tasks[0];
  
  const progressPercentage = ((taskIndex + 1) / totalTasks) * 100;

  const handleSubmit = () => {
    if (selected !== null) {
      onComplete();
      setSelected(null); // Reset for next task
    }
  };

  return (
    <div className="card fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '28px 20px',
      background: '#fff',
      borderRadius: '24px',
      boxShadow: '0 12px 30px rgba(0,0,0,0.06)'
    }}>
      {/* Progress Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.03em' }}>
            QUESTION {taskIndex + 1} / {totalTasks}
          </span>
          <div style={{ padding: '4px 10px', backgroundColor: '#eef2ff', borderRadius: '12px' }}>
             <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
               {Math.round(progressPercentage)}%
             </span>
          </div>
        </div>
        <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            background: 'var(--primary)',
            transition: 'width 0.4s ease'
          }}></div>
        </div>
      </div>
      
      <h2 style={{ 
        fontSize: '22px', 
        fontWeight: '800', 
        color: '#1e293b',
        marginBottom: '8px',
        lineHeight: '1.2'
      }}>{task.title}</h2>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#64748b', 
        marginBottom: '24px'
      }}>{task.subtitle}</p>

      {/* Quiz Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        {task.options.map((opt, idx) => {
          const isSelected = selected === idx;
          
          return (
            <div 
              key={idx}
              onClick={() => setSelected(idx)}
              style={{ 
                padding: '16px 20px', 
                borderRadius: '14px',
                border: `1.5px solid ${isSelected ? 'var(--primary)' : '#e2e8f0'}`,
                backgroundColor: isSelected ? '#f5f7ff' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                border: `2px solid ${isSelected ? 'var(--primary)' : '#cbd5e1'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isSelected ? 'var(--primary)' : 'transparent'
              }}>
                {isSelected && <Check size={12} color="white" strokeWidth={4} />}
              </div>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: isSelected ? '700' : '500',
                color: isSelected ? 'var(--primary)' : '#475569'
              }}>{opt}</span>
            </div>
          );
        })}
      </div>

      <button 
        className="btn-primary" 
        disabled={selected === null}
        onClick={handleSubmit}
        style={{ 
          padding: '16px',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        Next Question <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default TaskView;
