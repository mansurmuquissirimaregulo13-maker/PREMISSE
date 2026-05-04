import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HomeView from './components/HomeView'
import TaskView from './components/TaskView'
import SuccessView from './components/SuccessView'
import VSLView from './components/VSLView'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'task' | 'success' | 'vsl'>('home')
  const [balance, setBalance] = useState<number>(0)
  const [taskIndex, setTaskIndex] = useState<number>(0)
  
  // Loading & Feedback states
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [showTaskSuccess, setShowTaskSuccess] = useState<boolean>(false)

  const handleStartTasks = () => {
    setCurrentView('task')
  }

  const handleTaskComplete = () => {
    setIsLoading(true)
    setLoadingMessage('Sending to servers...')
    
    setTimeout(() => {
      setLoadingMessage('Calculating reward...')
      setTimeout(() => {
        setIsLoading(false)
        const newBalance = balance + 3000
        setBalance(newBalance)
        setShowTaskSuccess(true)
        
        setTimeout(() => {
          setShowTaskSuccess(false)
          if (taskIndex >= 4) {
            setCurrentView('success')
          } else {
            setTaskIndex(prev => prev + 1)
          }
        }, 2500) // Show the "Congratulations" popup for 2.5 seconds
        
      }, 800)
    }, 800)
  }

  const handleWithdrawFlow = () => {
    setIsLoading(true)
    setLoadingMessage('Processing withdrawal...')
    
    setTimeout(() => {
      setLoadingMessage('Redirecting...')
      setTimeout(() => {
        setCurrentView('vsl')
        setIsLoading(false)
      }, 1000)
    }, 1500)
  }

  return (
    <div className="app-container fade-in">
      {/* Show header on home and task views */}
      {(currentView === 'home' || currentView === 'task') && <Header balance={balance} />}
      
      <main className="main-content">
        {currentView === 'home' && (
          <HomeView balance={balance} onStart={handleStartTasks} />
        )}
        
        {currentView === 'task' && (
          <TaskView 
            taskIndex={taskIndex} 
            totalTasks={5} 
            onComplete={handleTaskComplete} 
          />
        )}
        
        {currentView === 'success' && (
          <SuccessView balance={balance} onWithdraw={handleWithdrawFlow} />
        )}

        {currentView === 'vsl' && (
          <VSLView />
        )}
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">{loadingMessage}</div>
        </div>
      )}

      {/* Task Success Popup Overlay */}
      {showTaskSuccess && (
        <div className="loading-overlay" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <div className="fade-in" style={{ textAlign: 'center', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '48px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>Congratulations!</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', margin: 0 }}>
              You just earned <strong style={{ color: 'var(--primary)', fontSize: '22px' }}>R 3,000</strong>
            </p>
            <div className="balance-badge" style={{ marginTop: '16px', padding: '12px 24px', fontSize: '20px' }}>
              New Balance: R {balance.toLocaleString('en-ZA')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
