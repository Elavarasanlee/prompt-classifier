// src/predict.ts
import * as tf from '@tensorflow/tfjs-node';
import { categories } from './data';
import * as fs from 'fs';

const vocabulary: string[] = JSON.parse(fs.readFileSync('./vocabulary.json', 'utf8'));
// console.log('Loaded vocabulary:', vocabulary);
// console.log('Vocabulary size:', vocabulary.length);

const word2index: { [word: string]: number } = {};
vocabulary.forEach((word, index) => {
  word2index[word] = index + 1;
});
// console.log('Built word2index mapping:', word2index);
// console.log('Max word index:', Math.max(...Object.values(word2index)));

function tokenize(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/);
  // console.log('Tokenize - words:', words);
  const tokens = words.map(word => {
    const token = word2index[word] || 0;
    return token;
  });
  // console.log('Tokenize - tokens:', tokens);
  return tokens;
}

function padSequence(sequence: number[], maxLen: number): number[] {
  let padded: number[];
  if (sequence.length >= maxLen) {
    padded = sequence.slice(0, maxLen);
    // console.log('Padded sequence (trimmed):', padded);
  } else {
    padded = sequence.concat(Array(maxLen - sequence.length).fill(0));
    // console.log('Padded sequence (padded):', padded);
  }
  return padded;
}

async function loadModelAndPredict(text: string) {
  // console.log('Loading model...');
  // Load the saved model from disk
  const model = await tf.loadLayersModel('file://./model/model.json');
  // console.log('Model loaded.');

  const maxLen = 120;
  console.log(`Input text: "${text}"`);

  // Tokenize and pad the input text
  const sequence = tokenize(text);
  // console.log('Original token sequence:', sequence);

  const paddedSequence = padSequence(sequence, maxLen);
  // console.log('Final padded sequence:', paddedSequence);
  // console.log('Max token value:', Math.max(...paddedSequence));

  // Create the input tensor; shape [1, maxLen] for a single example
  const inputTensor = tf.tensor2d([paddedSequence], [1, maxLen]);
  // console.log('Input tensor created with shape:', inputTensor.shape);

  // console.log('Model summary:');
  // model.summary();

  // Get prediction from the model (softmax output)
  console.log('Running prediction...');
  const prediction = model.predict(inputTensor) as tf.Tensor;

  // Retrieve prediction results
  const predictionValues = prediction.dataSync();
  console.log('Raw prediction values:', predictionValues);

  // Determine the index of the highest probability
  const predictedCategoryIndex = predictionValues.indexOf(Math.max(...predictionValues));
  console.log('Predicted category index:', predictedCategoryIndex);

  console.log(`Input: "${text}"`);
  console.log(`Predicted category: ${categories[predictedCategoryIndex]}`);
  console.log('-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-');
}

loadModelAndPredict("Write a poem about the ocean").catch(error => {
  console.error('Error during prediction:', error);
});

loadModelAndPredict("What are some important inventions of World War 1 & 2, that are still being used?").catch(error => {
  console.error('Error during prediction:', error);
});

loadModelAndPredict("Is it true that Patriarchal society has more crimes and punishments than matriarchal society?").catch(error => {
  console.error('Error during prediction:', error);
});

loadModelAndPredict("What is 2+2?").catch(error => {
  console.error('Error during prediction:', error);
});

loadModelAndPredict("What is 0.1 + 0.2 according to Python & Javascript?").catch(error => {
  console.error('Error during prediction:', error);
});