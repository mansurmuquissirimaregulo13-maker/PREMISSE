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
    subtitle: "Select the correct answer to earn your reward.",
    opt1: { label: "Africa" },
    opt2: { label: "Europe" }
  },
  {
    title: "What is the official currency of South Africa?",
    subtitle: "Select the correct answer to earn your reward.",
    opt1: { label: "South African Rand (R)" },
    opt2: { label: "US Dollar ($)" }
  },
  {
    title: "Which of these is a famous South African city?",
    subtitle: "Select the correct answer to earn your reward.",
    opt1: { label: "Cape Town" },
    opt2: { label: "London" }
  },
  {
    title: "Which of these is a capital city of South Africa?",
    subtitle: "Select the correct answer to earn your reward.",
    opt1: { label: "Pretoria" },
    opt2: { label: "Paris" }
  },
  {
    title: "Which animal is part of the 'Big Five' in South Africa?",
    subtitle: "Select the correct answer to earn your reward.",
    opt1: { label: "Lion" },
    opt2: { label: "Penguin" }
  }
];

const TaskView: React.FC<TaskViewProps> = ({ taskIndex, totalTasks, onComplete }) => {
  const [selected, setSelected] = useState<1 | 2 | null>(null);
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
      padding: '32px 24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.05em' }}>
            TASK {taskIndex + 1} OF {totalTasks}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="progress-container" style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
          <div className="progress-bar" style={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, var(--primary) 0%, #4f46e5 100%)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}></div>
        </div>
      </div>
      
      <h2 className="task-title" style={{ 
        fontSize: '26px', 
        fontWeight: '800', 
        lineHeight: '1.3',
        color: '#0f172a',
        marginBottom: '12px'
      }}>{task.title}</h2>
      
      <p className="task-subtitle" style={{ 
        fontSize: '16px', 
        color: '#64748b', 
        marginBottom: '32px',
        lineHeight: '1.5'
      }}>{task.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {[1, 2].map((id) => {
          const isSelected = selected === id;
          const option = id === 1 ? task.opt1 : task.opt2;
          
          return (
            <div 
              key={id}
              className={`option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelected(id as 1 | 2)}
              style={{ 
                padding: '24px', 
                textAlign: 'left', 
                minHeight: 'auto', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? 'var(--primary)' : '#f1f5f9'}`,
                backgroundColor: isSelected ? '#f8fafc' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 10px 20px rgba(79, 70, 229, 0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  border: `2px solid ${isSelected ? 'var(--primary)' : '#cbd5e1'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                </div>
                <div className="option-label" style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: isSelected ? '#0f172a' : '#475569'
                }}>{option.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className="btn-primary" 
        disabled={selected === null}
        onClick={handleSubmit}
        style={{ 
          padding: '18px',
          fontSize: '18px',
          fontWeight: '700',
          borderRadius: '16px',
          boxShadow: selected === null ? 'none' : '0 12px 24px rgba(79, 70, 229, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        {selected === null ? 'Select an answer' : 'Confirm Answer'} 
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

export default TaskView;
