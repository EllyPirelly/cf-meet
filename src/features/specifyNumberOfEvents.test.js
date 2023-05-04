import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  // test here
  test('When a user has not specified a number of events, 32 is the default number of events.', ({ given, when, then }) => {
    given('the main page has been opened', () => {

    });

    when('the user does not specify the number of events', () => {

    });

    // then('the number of events being shown per default should be 32', () => {
    // this does not work
    // });

    then(/^the number of events being shown per default should be (\d+).$/, (arg0) => {

    });
  });

  test('A user can change the number of events they want to see.', ({ given, when, then }) => {
    given('the main page has been opened', () => {

    });

    when('the user inputs a specific number into the number input field', () => {

    });

    then('the user should only see the number of events they specified.', () => {

    });
  });
});