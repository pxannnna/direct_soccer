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

// Time ranges for each task type (in hours)
const TASK_TIME_RANGES = {
  'Posters': { min: 2, max: 4 },
  'Product Images': { min: 0.5, max: 2 },
  'Badges': { min: 0.5, max: 1 },
  'Sponsor Logos': { min: 1, max: 2 },
  'Quick Approvals': { min: 0.25, max: 0.5 }
};

const SAMPLE_NOTES = [
  'Client requested minor color adjustments',
  'Rush order - completed ahead of schedule',
  'Standard production workflow',
  'Multiple revisions required',
  'Final approval pending',
  'Brand guidelines compliance verified',
  'High-resolution export completed',
  '',
  '',
  ''
];

// Generate random date within last 2 weeks
const getRandomDate = () => {
  const today = new Date();
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);
  
  const randomTime = twoWeeksAgo.getTime() + Math.random() * (today.getTime() - twoWeeksAgo.getTime());
  const randomDate = new Date(randomTime);
  
  return randomDate.toISOString().split('T')[0];
};

// Generate random time within task type range
const getRandomTime = (taskType) => {
  const range = TASK_TIME_RANGES[taskType];
  const hours = range.min + Math.random() * (range.max - range.min);
  return parseFloat(hours.toFixed(2));
};

// Generate random note (with 30% chance of empty)
const getRandomNote = () => {
  if (Math.random() < 0.3) return '';
  return SAMPLE_NOTES[Math.floor(Math.random() * SAMPLE_NOTES.length)];
};

export const generateSampleData = () => {
  const sampleData = [];
  const numEntries = 23; // Generate 23 entries for variety

  for (let i = 0; i < numEntries; i++) {
    const artworker = ARTWORKERS[Math.floor(Math.random() * ARTWORKERS.length)];
    const taskType = TASK_TYPES[Math.floor(Math.random() * TASK_TYPES.length)];
    const hours = getRandomTime(taskType);
    const minutes = hours * 60;
    
    sampleData.push({
      id: `sample-${Date.now()}-${i}`,
      date: getRandomDate(),
      artworker,
      taskType,
      hours,
      minutes,
      notes: getRandomNote()
    });
  }

  // Sort by date (most recent first)
  return sampleData.sort((a, b) => new Date(b.date) - new Date(a.date));
};

