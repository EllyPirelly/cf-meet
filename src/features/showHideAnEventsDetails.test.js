// loadFeature loads a Gherkin file
// defineFeature defines the code for that file
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => { });