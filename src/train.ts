import * as tf from '@tensorflow/tfjs-node';
import { trainingData, categories } from './data';
import * as fs from 'fs';

const maxLen = 120;

console.log('Total training examples:', trainingData.length);
console.log('Categories:', categories);

const allWords = trainingData.flatMap(example => example.prompt.toLowerCase().split(/\s+/));
const vocabulary = Array.from(new Set(allWords));

console.log('Training vocabulary size:', vocabulary.length);
console.log('First 10 words in vocabulary:', vocabulary.slice(0, 10));

// Create a word-to-index mapping (reserve 0 for padding/unknown)
const word2index: { [word: string]: number } = {};
vocabulary.forEach((word, index) => {
  word2index[word] = index + 1;
});

console.log('word2index mapping size:', Object.keys(word2index).length);
console.log('Max word index:', Math.max(...Object.values(word2index)));

function tokenize(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/);
  return words.map(word => word2index[word] || 0);
}

const encodedTexts = trainingData.map(example =>
  tokenize(example.prompt).slice(0, maxLen)
);

console.log('Sample encoded text:', encodedTexts[0]);

function padSequences(sequences: number[][], maxLen: number): number[][] {
  return sequences.map(seq => {
    if (seq.length > maxLen) return seq.slice(0, maxLen);
    return [...seq, ...Array(maxLen - seq.length).fill(0)];
  });
}

const paddedSequences = padSequences(encodedTexts, maxLen);

console.log('Sample padded sequence:', paddedSequences[0]);

const xTrain = tf.tensor2d(paddedSequences);
const labels = trainingData.map(example => categories.indexOf(example.category));
const yTrain = tf.oneHot(labels, categories.length);

console.log('xTrain shape:', xTrain.shape);
console.log('yTrain shape:', yTrain.shape);

// Use the vocabulary length + 1 (to account for padding index 0) as inputDim
const vocabSize = vocabulary.length + 1;
console.log('Embedding layer input dim (vocabSize):', vocabSize);

const model = tf.sequential();
model.add(tf.layers.embedding({
  inputDim: vocabSize,
  outputDim: 16,
  inputLength: maxLen
}));
model.add(tf.layers.globalAveragePooling1d());
model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
model.add(tf.layers.dense({ units: categories.length, activation: 'softmax' }));

model.compile({
  optimizer: 'adam',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy']
});

console.log('Model summary:');
model.summary();

async function trainModel() {
  console.log('Starting model training...');
  const history = await model.fit(xTrain, yTrain, {
    epochs: 50,
    validationSplit: 0.2,
    shuffle: true,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 5 })
  });

  console.log('Training complete. Final metrics:');
  console.log('Loss:', history.history.loss[history.history.loss.length - 1]);
  console.log('Accuracy:', history.history.acc[history.history.acc.length - 1]);

  await model.save('file://./model');
  console.log('Model trained and saved.');

  // Save the global vocabulary for prediction
  fs.writeFileSync('./vocabulary.json', JSON.stringify(vocabulary));
  console.log('Vocabulary saved. Vocabulary size:', vocabulary.length);

  fs.writeFileSync('./word2index.json', JSON.stringify(word2index));
  console.log('word2index mapping saved.');
}

trainModel().catch(error => {
  console.error('Error during training:', error);
});
