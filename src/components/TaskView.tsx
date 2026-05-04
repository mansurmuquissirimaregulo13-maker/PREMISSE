import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface TaskViewProps {
  taskIndex: number;
  totalTasks: number;
  onComplete: () => void;
}

const tasks = [
  {
    title: "Which shop front looks more professionally maintained?",
    subtitle: "Your review helps local businesses. Tap to select.",
    opt1: { img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&q=80", label: "Shop A — Cape Town" },
    opt2: { img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80", label: "Shop B — Johannesburg" }
  },
  {
    title: "Which product display looks more appealing?",
    subtitle: "Your review helps local businesses. Tap to select.",
    opt1: { img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500&q=80", label: "Display A" },
    opt2: { img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80", label: "Display B" }
  },
  {
    title: "Which restaurant seating looks more comfortable?",
    subtitle: "Your review helps local businesses. Tap to select.",
    opt1: { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80", label: "Restaurant A" },
    opt2: { img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80", label: "Restaurant B" }
  },
  {
    title: "Which cafe exterior looks more inviting?",
    subtitle: "Your review helps local businesses. Tap to select.",
    opt1: { img: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&q=80", label: "Cafe A" },
    opt2: { img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80", label: "Cafe B" }
  },
  {
    title: "Which supermarket aisle looks cleaner?",
    subtitle: "Your review helps local businesses. Tap to select.",
    opt1: { img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&q=80", label: "Supermarket A" },
    opt2: { img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&q=80", label: "Supermarket B" }
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
      
      <h2 className="task-title">{task.title}</h2>
      <p className="task-subtitle">{task.subtitle}</p>

      <div className="options-grid">
        <div 
          className={`option-card ${selected === 1 ? 'selected' : ''}`}
          onClick={() => setSelected(1)}
        >
          <img src={task.opt1.img} alt="Option 1" className="option-image" />
          <div className="option-label">{task.opt1.label}</div>
          {selected === 1 && (
            <div className="checkmark-circle">
              <Check size={16} />
            </div>
          )}
        </div>

        <div 
          className={`option-card ${selected === 2 ? 'selected' : ''}`}
          onClick={() => setSelected(2)}
        >
          <img src={task.opt2.img} alt="Option 2" className="option-image" />
          <div className="option-label">{task.opt2.label}</div>
          {selected === 2 && (
            <div className="checkmark-circle">
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
        Submit and earn <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default TaskView;
