import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function AnalyticsDashboard({ tasks }) {
  // Calculate summary statistics
  const stats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const thisWeekTasks = tasks.filter(task => new Date(task.date) >= startOfWeek);
    const totalHoursThisWeek = thisWeekTasks.reduce((sum, task) => sum + task.hours, 0);
    
    // Task type distribution
    const taskTypeHours = {};
    tasks.forEach(task => {
      taskTypeHours[task.taskType] = (taskTypeHours[task.taskType] || 0) + task.hours;
    });
    const mostTimeConsuming = Object.entries(taskTypeHours).reduce((a, b) => 
      taskTypeHours[a[0]] > taskTypeHours[b[0]] ? a : b, ['', 0]
    )[0] || 'N/A';
    
    // Artworker hours
    const artworkerHours = {};
    tasks.forEach(task => {
      artworkerHours[task.artworker] = (artworkerHours[task.artworker] || 0) + task.hours;
    });
    const busiestArtworker = Object.entries(artworkerHours).reduce((a, b) => 
      artworkerHours[a[0]] > artworkerHours[b[0]] ? a : b, ['', 0]
    )[0] || 'N/A';
    
    // Average time per task
    const avgTimePerTask = tasks.length > 0 
      ? tasks.reduce((sum, task) => sum + task.hours, 0) / tasks.length 
      : 0;
    
    return {
      totalHoursThisWeek: totalHoursThisWeek.toFixed(1),
      mostTimeConsuming,
      busiestArtworker,
      avgTimePerTask: avgTimePerTask.toFixed(2)
    };
  }, [tasks]);

  // Prepare pie chart data (time by task type)
  const pieData = useMemo(() => {
    const taskTypeHours = {};
    tasks.forEach(task => {
      taskTypeHours[task.taskType] = (taskTypeHours[task.taskType] || 0) + task.hours;
    });
    
    const total = Object.values(taskTypeHours).reduce((sum, val) => sum + val, 0);
    
    return Object.entries(taskTypeHours).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)), // Convert to number for Recharts
      percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0
    }));
  }, [tasks]);

  // Prepare bar chart data (hours per artworker)
  const barData = useMemo(() => {
    const artworkerHours = {};
    tasks.forEach(task => {
      artworkerHours[task.artworker] = (artworkerHours[task.artworker] || 0) + task.hours;
    });
    
    return Object.entries(artworkerHours)
      .map(([name, value]) => ({ name, hours: parseFloat(value.toFixed(2)) }))
      .sort((a, b) => b.hours - a.hours);
  }, [tasks]);

  // Prepare line chart data (daily time over past 2 weeks)
  const lineData = useMemo(() => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const dailyHours = {};
    const dateRange = [];
    
    // Initialize all dates in range
    for (let i = 0; i < 14; i++) {
      const date = new Date(twoWeeksAgo);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      dailyHours[dateStr] = 0;
      dateRange.push({
        date: dateStr,
        displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    // Sum hours by date
    tasks.forEach(task => {
      if (task.date >= twoWeeksAgo.toISOString().split('T')[0]) {
        dailyHours[task.date] = (dailyHours[task.date] || 0) + task.hours;
      }
    });
    
    return dateRange.map(({ date, displayDate }) => ({
      date: displayDate,
      hours: parseFloat((dailyHours[date] || 0).toFixed(2))
    }));
  }, [tasks]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Analytics Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Hours This Week</p>
              <p className="text-3xl font-bold mt-2">{stats.totalHoursThisWeek}h</p>
            </div>
            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Most Time-Consuming Task</p>
              <p className="text-xl font-bold mt-2 truncate">{stats.mostTimeConsuming}</p>
            </div>
            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Busiest Artworker</p>
              <p className="text-xl font-bold mt-2 truncate">{stats.busiestArtworker}</p>
            </div>
            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg Time Per Task</p>
              <p className="text-3xl font-bold mt-2">{stats.avgTimePerTask}h</p>
            </div>
            <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart - Time by Task Type */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Distribution by Task Type</h3>
          {pieData.length > 0 ? (
            <div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${parseFloat(value).toFixed(2)} hours (${props.payload.percentage}%)`,
                      props.payload.name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {entry.name}: {entry.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[280px] text-gray-500">
              <p>No data available</p>
            </div>
          )}
        </div>

        {/* Bar Chart - Hours per Artworker */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Hours per Artworker</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip formatter={(value) => `${value} hours`} />
              <Bar dataKey="hours" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Daily Time Over 2 Weeks */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Time Logged (Past 2 Weeks)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart 
              data={lineData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip formatter={(value) => `${value} hours`} />
              <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;

