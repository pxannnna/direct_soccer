import React, { useState } from 'react';

const ARTWORKERS = [
  'Sarah Mitchell',
  'James Chen',
  'Emma Thompson',
  'Lucas Rodriguez',
  'Olivia Parker'
];

const TASK_TYPES = [
  'Posters',
  'Product Images',
  'Badges',
  'Sponsor Logos',
  'Quick Approvals'
];

function TaskEntryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    artworker: '',
    taskType: '',
    hours: '',
    minutes: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.artworker || !formData.taskType || (!formData.hours && !formData.minutes)) {
      alert('Please fill in all required fields (Date, Artworker, Task Type, and Time)');
      return;
    }

    const totalMinutes = (parseInt(formData.hours) || 0) * 60 + (parseInt(formData.minutes) || 0);
    const totalHours = totalMinutes / 60;

    const newTask = {
      id: Date.now().toString(),
      date: formData.date,
      artworker: formData.artworker,
      taskType: formData.taskType,
      hours: totalHours,
      minutes: totalMinutes,
      notes: formData.notes || ''
    };

    onSubmit(newTask);

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      artworker: '',
      taskType: '',
      hours: '',
      minutes: '',
      notes: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Log New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
            />
          </div>

          {/* Artworker Dropdown */}
          <div>
            <label htmlFor="artworker" className="block text-sm font-medium text-gray-700 mb-1">
              Artworker <span className="text-red-500">*</span>
            </label>
            <select
              id="artworker"
              name="artworker"
              value={formData.artworker}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
            >
              <option value="">Select Artworker</option>
              {ARTWORKERS.map(artworker => (
                <option key={artworker} value={artworker}>{artworker}</option>
              ))}
            </select>
          </div>

          {/* Task Type Dropdown */}
          <div>
            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-1">
              Task Type <span className="text-red-500">*</span>
            </label>
            <select
              id="taskType"
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
            >
              <option value="">Select Task Type</option>
              {TASK_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Time Spent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Spent <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                min="0"
                max="24"
                placeholder="Hours"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
              />
              <input
                type="number"
                id="minutes"
                name="minutes"
                value={formData.minutes}
                onChange={handleChange}
                min="0"
                max="59"
                placeholder="Minutes"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Add any additional notes about this task..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soccer-blue focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-soccer-blue hover:bg-soccer-light-blue text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Log Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEntryForm;

