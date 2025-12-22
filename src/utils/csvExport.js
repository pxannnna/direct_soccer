export const exportToCSV = (tasks, filename) => {
  if (tasks.length === 0) {
    alert('No data to export');
    return;
  }

  // CSV Headers
  const headers = ['Date', 'Artworker', 'Task Type', 'Hours', 'Minutes', 'Notes'];
  
  // Convert tasks to CSV rows
  const rows = tasks.map(task => {
    const hours = Math.floor(task.hours);
    const minutes = Math.round((task.hours - hours) * 60);
    return [
      task.date,
      task.artworker,
      task.taskType,
      hours,
      minutes,
      `"${(task.notes || '').replace(/"/g, '""')}"` // Escape quotes in notes
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

