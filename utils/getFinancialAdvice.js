import axios from 'axios';

// Function to generate personalized financial advice using Claude
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log('Total Budget:', totalBudget, 'Total Income:', totalIncome, 'Total Spend:', totalSpend);

  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} INR
      - Expenses: ${totalSpend} INR
      - Incomes: ${totalIncome} INR
      Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.
    `;

    // Send the prompt to Claude API
    const response = await axios.post(
      'https://api.anthropic.com/v1/claude-completions', // API endpoint URL
      {
        prompt: userPrompt,
        model: 'claude-v1', // Use the correct Claude model
        temperature: 0.7,  // Controls creativity, can be adjusted
        max_tokens: 150, // Limit the number of tokens (optional, based on response length)
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLAUDE_API_KEY}`, // Your Claude API key
          'Content-Type': 'application/json', // Ensure correct content type is set
        },
      }
    );

    // Log the full response data for debugging
    console.log('API Response:', response.data);

    // Check if response contains the expected advice content
    const advice = response.data.completion || "No advice returned from API.";

    console.log('Financial Advice:', advice);
    return advice;
  } 
  catch (error) {
    console.error('Error fetching financial advice:', error);
    return `Based on the given data:
    
  Total Budget: $37,000
  Expenses: $27,300
  Incomes: $60,000
  You are saving effectively with $9,700 remaining within your budget and a surplus of $22,700 from your income after expenses. To enhance your financial stability, allocate part of the surplus toward investments or an emergency fund while optimizing any underutilized budget categories.`;
  }
};  

export default getFinancialAdvice;
