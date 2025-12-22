import React, { useState, useEffect } from 'react';
import TaskEntryForm from './components/TaskEntryForm';
import DataDisplayTable from './components/DataDisplayTable';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { generateSampleData } from './utils/sampleData';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';

const STORAGE_KEY = 'directSoccerTimeTracker';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load data from localStorage or initialize with sample data
    const savedData = loadFromLocalStorage(STORAGE_KEY);
    if (savedData && savedData.length > 0) {
      setTasks(savedData);
    } else {
      const sampleData = generateSampleData();
      setTasks(sampleData);
      saveToLocalStorage(STORAGE_KEY, sampleData);
    }
  }, []);

  const handleTaskSubmit = (newTask) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveToLocalStorage(STORAGE_KEY, updatedTasks);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(STORAGE_KEY, updatedTasks);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setTasks([]);
      saveToLocalStorage(STORAGE_KEY, []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-soccer-blue to-soccer-green text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Direct Soccer - Artwork Team Time Tracker
          </h1>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Task logged successfully!</span>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Task Entry Form */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <TaskEntryForm onSubmit={handleTaskSubmit} />
        </section>

        {/* Analytics Dashboard */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <AnalyticsDashboard tasks={tasks} />
        </section>

        {/* Data Display Table */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Task Log
            </h2>
            <button
              onClick={handleClearAll}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All Data
            </button>
          </div>
          <DataDisplayTable tasks={tasks} onDelete={handleDeleteTask} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Direct Soccer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

