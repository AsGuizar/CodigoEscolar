// Function to calculate the llama population growth
function calculateLlamaPopulation(startingPopulation, endingPopulation) {
    let years = 0;
    
    // Validate input for starting population
    while (startingPopulation < 9) {
      startingPopulation = parseInt(prompt("Enter a starting population greater than or equal to 9:"));
    }
    
    // Validate input for ending population
    while (endingPopulation < startingPopulation) {
      endingPopulation = parseInt(prompt("Enter an ending population greater than or equal to the starting population:"));
    }
  
    // Calculate the number of years required
    while (startingPopulation < endingPopulation) {
      const newLlamas = Math.floor(startingPopulation / 3);
      const llamasPassedAway = Math.floor(startingPopulation / 4);
      startingPopulation = startingPopulation + newLlamas - llamasPassedAway;
      years++;
    }
  
    return years;
  }
  
  // Prompt the user for starting and ending populations
  const startingPopulation = parseInt(prompt("Enter the starting population:"));
  const endingPopulation = parseInt(prompt("Enter the ending population:"));
  
  // Calculate and display the number of years required
  const yearsRequired = calculateLlamaPopulation(startingPopulation, endingPopulation);
  console.log("Years:", yearsRequired);
  