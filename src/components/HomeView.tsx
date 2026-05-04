import React from 'react';
import { ArrowRight, ClipboardList } from 'lucide-react';

interface HomeViewProps {
  balance: number;
  onStart: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ balance, onStart }) => {
  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 className="welcome-title">
        You have been selected to earn <span className="amount">R15,000 today</span> 🎉
      </h1>
      
      <p className="welcome-subtitle">
        Evaluate 5 quick photos and receive payment directly to your Capitec, FNB or Standard Bank.
      </p>

      <div className="balance-card">
        <div className="balance-label">CURRENT BALANCE</div>
        <div className="balance-amount">
          <span className="balance-currency">R</span>
          {balance.toLocaleString('en-ZA')}
        </div>
        <div className="balance-desc">Increases with each completed task</div>
        <div className="balance-usd">≈ ${(balance * 0.05).toFixed(2)} USD</div>
      </div>

      <div className="task-banner">
        <ClipboardList size={20} color="#f2552c" />
        <span>Complete <strong>5 tasks</strong> to unlock your instant withdrawal</span>
      </div>

      <button className="btn-primary" onClick={onStart}>
        Start earning now <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default HomeView;
