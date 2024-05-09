const processDataForChart = (expenses) => {
    // Group expenses by activityType and sum durations for each date
    const dataByActivity = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[expense.activityType]) {
        acc[expense.activityType] = {};
      }
      if (!acc[expense.activityType][date]) {
        acc[expense.activityType][date] = 0;
      }
      acc[expense.activityType][date] += expense.duration;
      return acc;
    }, {});
  
    // Extract unique dates for the chart labels
    const dates = [...new Set(expenses.map(expense => new Date(expense.date).toLocaleDateString()))].sort();
  
    // Create datasets for each activity type
    const datasets = Object.entries(dataByActivity).map(([activityType, durationsByDate]) => {
      // For each date, if there's no entry for an activity, add a 0 duration
      const dataForActivity = dates.map(date => durationsByDate[date] || 0);
  
      return {
        label: activityType,
        data: dataForActivity,
        fill: false,
        borderColor: getRandomColor(), // A function to assign a unique color to each activity
      };
    });
  
    return {
      labels: dates,
      datasets: datasets,
    };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  export default processDataForChart;