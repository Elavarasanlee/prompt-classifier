# prompt-classifier

A simple module for training a lightweight language model (SLM) to categorize user prompts into predefined categories. This project leverages TensorFlow.js to build and train a model that can classify prompts in various domains such as chat responses, creative writing, code debugging, scientific analysis, and more.

## Features

- **Prompt Classification:** Automatically categorize prompts into one of ten predefined categories.
- **Custom Training Pipeline:** Tokenizes, pads, and encodes prompt data for model training.
- **Model Persistence:** Saves the trained model along with its vocabulary and word-to-index mapping for later use.
- **Sample Predictions:** Includes a prediction script to test the model on sample prompts.

## Categories

The model is designed to classify prompts into the following categories:

- Basic Chat Responses
- Creative Writing
- Advanced Reasoning
- Content Generation
- Spreadsheet Automation
- Image Processing Tasks
- Code Debugging
- Async Reasoning Tasks
- Scientific Analysis
- Efficient Multi-purpose

## Installation

1. **Prerequisites:**  
   Ensure you have [Node.js](https://nodejs.org/) (v12 or higher) installed.

2. **Clone the Repository:**

```bash
    git clone <repository-url>
```

3. **Navigate to the Project Directory:**

```bash
    cd prompt-classifier
```

4. **Install Dependencies:**

```bash
   npm install
```

## Usage

### Training the Model

To train the model, run:
```bash
    npm run train
```


This command will:
- Tokenize the training data defined in `src/data.ts`.
- Build a vocabulary and generate a word-to-index mapping.
- Create and train the TensorFlow.js model.
- Save the trained model, vocabulary, and word-to-index mapping to disk.

### Running Predictions

After training the model, you can run predictions by executing:
```bash
    npm run predict
```


The prediction script in `src/predict.ts` loads the saved model and vocabulary, processes input text, and outputs the predicted category. You can modify this file to test with your own prompts.

## File Structure

- **src/data.ts:** Contains the training data and category definitions.
- **src/train.ts:** Script for training and saving the model.
- **src/predict.ts:** Script to load the model and perform predictions.
- **package.json:** Defines the project scripts and dependencies.
- **tsconfig.json:** TypeScript configuration.

## Dependencies

- [@tensorflow/tfjs-node](https://www.npmjs.com/package/@tensorflow/tfjs-node) — TensorFlow.js for Node.js.
- [typescript](https://www.npmjs.com/package/typescript) — TypeScript support.
- [ts-node](https://www.npmjs.com/package/ts-node) — Run TypeScript scripts directly.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.