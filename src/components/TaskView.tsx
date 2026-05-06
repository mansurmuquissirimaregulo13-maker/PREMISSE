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
  
  const progressPercentage = ((taskIndex) / totalTasks) * 100;

  const handleSubmit = () => {
    if (selected !== null) {
      onComplete();
      setSelected(null); // Reset for next task
    }
  };

  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      <h2 className="task-title" style={{ fontSize: '22px', marginBottom: '8px' }}>{task.title}</h2>
      <p className="task-subtitle" style={{ marginBottom: '24px' }}>{task.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <div 
          className={`option-card ${selected === 1 ? 'selected' : ''}`}
          onClick={() => setSelected(1)}
          style={{ padding: '20px', textAlign: 'left', minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div className="option-label" style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{task.opt1.label}</div>
          {selected === 1 && (
            <div className="checkmark-circle" style={{ position: 'static' }}>
              <Check size={16} />
            </div>
          )}
        </div>

        <div 
          className={`option-card ${selected === 2 ? 'selected' : ''}`}
          onClick={() => setSelected(2)}
          style={{ padding: '20px', textAlign: 'left', minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div className="option-label" style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{task.opt2.label}</div>
          {selected === 2 && (
            <div className="checkmark-circle" style={{ position: 'static' }}>
              <Check size={16} />
            </div>
          )}
        </div>
      </div>

      <button 
        className="btn-primary" 
        disabled={selected === null}
        onClick={handleSubmit}
      >
        Confirm and continue <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default TaskView;
