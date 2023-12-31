// Calculate the total number of strikes
function calculateTotalStrikes(data) {
  return data.length;
}

// Calculate the average mass
function calculateAverageMass(data) {
  const masses = data
    .map((item) => parseFloat(item.mass_g))
    .filter((mass) => !isNaN(mass));
  if (masses.length === 0) return 0; // Avoid division by zero
  const totalMass = masses.reduce((sum, mass) => sum + mass, 0);
  return (totalMass / masses.length).toFixed(2); // Calculate average and round to 2 decimal places
}

// Create a year histogram and return data
function createYearHistogramData(data) {
  // Extract years from the search results
  const years = data.map((item) => item.year);

  // Count the number of strikes for each year
  const yearCounts = {};
  years.forEach((year) => {
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  const labels = Object.keys(yearCounts);
  const dataPoints = Object.values(yearCounts);

  return {
    labels: labels,
    data: dataPoints,
  };
}

// Function to create a composition histogram and return data
function createCompositionHistogramData(data) {
  // Count the number of strikes for each recclass value
  const recclassCounts = {};
  data.forEach((item) => {
    const recclass = item.recclass.toLowerCase();
    recclassCounts[recclass] = (recclassCounts[recclass] || 0) + 1;
  });

  const labels = Object.keys(recclassCounts);
  const dataPoints = Object.values(recclassCounts);

  return {
    labels: labels,
    data: dataPoints,
  };
}

function createCombinedChart(results) {
  // Move the entire block of code here
  // Calculate total number of strikes
  const totalStrikes = calculateTotalStrikes(results);

  // Calculate average mass
  const averageMass = calculateAverageMass(results);

  // Get the <span> elements by their IDs
  const totalStrikesSpan = document.getElementById("totalS");
  const averageMassSpan = document.getElementById("avgMass");

  // Set the innerHTML of the <span> elements
  totalStrikesSpan.innerHTML = `Total Strikes: ${totalStrikes}`;
  averageMassSpan.innerHTML = `Average Mass: ${averageMass} grams`;

  // Create year histogram data
  const yearHistogramData = createYearHistogramData(results);

  // Get selected meteorite composition from user input (e.g., compositionInput.value)
  const composition = results[0].recclass;

  // Create composition histogram data for the selected composition
  const compositionHistogramData = createCompositionHistogramData(results);

  // Create a chart for strikes by year
  const yearCtx = document.getElementById("yearGraph").getContext("2d");
  const yearChart = new Chart(yearCtx, {
    type: "bar",
    data: {
      labels: yearHistogramData.labels,
      datasets: [
        {
          label: "Number of Strikes by Year",
          data: yearHistogramData.data,
          backgroundColor: "blue", // Adjust the color
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Year",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
  const strikeCtx = document.getElementById("strikeGraph").getContext("2d");
  const strikeChart = new Chart(strikeCtx, {
    type: "bar",
    data: {
      labels: compositionHistogramData.labels,
      datasets: [
        {
          label: "Number of Strikes by Composition",
          data: compositionHistogramData.data,
          backgroundColor: "red", // Adjust the color
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Composition",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
}

export { createCombinedChart };
