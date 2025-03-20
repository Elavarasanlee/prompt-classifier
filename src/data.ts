export interface TrainingExample {
  prompt: string;
  category: string;
}

export const trainingData: TrainingExample[] = [
  { prompt: "Hi, how are you today?", category: "Basic Chat Responses" },
  { prompt: "What's your favorite hobby?", category: "Basic Chat Responses" },
  { prompt: "Can you share a fun fact about you?", category: "Basic Chat Responses" },

  { prompt: "Write a short story about a dragon in a modern city.", category: "Creative Writing" },
  { prompt: "Compose a poem about autumn rain and nostalgia.", category: "Creative Writing" },
  { prompt: "Create a fictional diary entry of a time traveler exploring ancient ruins.", category: "Creative Writing" },

  { prompt: "Analyze the implications of Gödel's incompleteness theorem on modern mathematics.", category: "Advanced Reasoning" },
  { prompt: "Explain how quantum entanglement might challenge classical physics principles.", category: "Advanced Reasoning" },
  { prompt: "Discuss the potential ethical dilemmas of deploying large-scale AI systems.", category: "Advanced Reasoning" },

  { prompt: "Generate a blog post outline about sustainable living practices.", category: "Content Generation" },
  { prompt: "Write a social media caption for launching a new eco-friendly product.", category: "Content Generation" },
  { prompt: "Draft an email newsletter announcing an upcoming community event.", category: "Content Generation" },

  { prompt: "Create an Excel formula to calculate total sales by region.", category: "Spreadsheet Automation" },
  { prompt: "How do I automate data entry in Google Sheets using a script?", category: "Spreadsheet Automation" },
  { prompt: "Provide a VBA macro example for updating pivot tables automatically.", category: "Spreadsheet Automation" },

  { prompt: "Detect and blur faces in this uploaded photo.", category: "Image Processing Tasks" },
  { prompt: "Apply an image filter to enhance the contrast in this picture.", category: "Image Processing Tasks" },
  { prompt: "Segment objects in a photo and label them (e.g., cars, pedestrians, trees).", category: "Image Processing Tasks" },

  { prompt: "Find and fix the error in this JavaScript code snippet.", category: "Code Debugging" },
  { prompt: "Identify why this Python script is causing a runtime exception.", category: "Code Debugging" },
  { prompt: "Debug this Java code block that throws an array index out-of-bounds exception.", category: "Code Debugging" },

  { prompt: "Plan a multi-stage project for building a mobile app, including risk assessments.", category: "Async Reasoning Tasks" },
  { prompt: "Outline a step-by-step approach to troubleshoot a network outage with contingencies.", category: "Async Reasoning Tasks" },
  { prompt: "Develop a sequential plan to optimize website performance under heavy traffic.", category: "Async Reasoning Tasks" },

  { prompt: "Examine the statistical significance of these experimental results.", category: "Scientific Analysis" },
  { prompt: "Interpret findings from a recent clinical trial of a new drug.", category: "Scientific Analysis" },
  { prompt: "Analyze data trends from a large-scale environmental study.", category: "Scientific Analysis" },

  { prompt: "I need a solution that can summarize text, generate code, and analyze data simultaneously.", category: "Efficient Multi-purpose" },
  { prompt: "Help me come up with a comprehensive system that performs content generation and error debugging in one go.", category: "Efficient Multi-purpose" },
  { prompt: "Provide an efficient strategy for combined tasks: writing a report, analyzing spreadsheets, and generating creative content.", category: "Efficient Multi-purpose" }
];

export const categories = [
  "Basic Chat Responses",
  "Creative Writing",
  "Advanced Reasoning",
  "Content Generation",
  "Spreadsheet Automation",
  "Image Processing Tasks",
  "Code Debugging",
  "Async Reasoning Tasks",
  "Scientific Analysis",
  "Efficient Multi-purpose"
];
