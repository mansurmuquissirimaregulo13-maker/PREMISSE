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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  const handleStartTasks = () => {
    setCurrentView('task')
  }

  const handleTaskComplete = () => {
    setIsLoading(true)
    setLoadingMessage('Sending to servers...')
    
    setTimeout(() => {
      setLoadingMessage('Calculating reward...')
      setTimeout(() => {
        const newBalance = balance + 3000
        setBalance(newBalance)
        
        if (taskIndex >= 4) {
          setCurrentView('success')
        } else {
          setTaskIndex(prev => prev + 1)
        }
        setIsLoading(false)
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

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">{loadingMessage}</div>
        </div>
      )}
    </div>
  )
}

export default App
