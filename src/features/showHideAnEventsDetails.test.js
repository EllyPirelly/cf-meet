import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // test here
  test('An element is collapsed by default.', ({ given, and, when, then }) => {
    given('the main page has been opened', () => {

    });

    and('a list of events has been rendered', () => {

    });

    when('the user has not clicked the toggle button', () => {

    });

    then('the event element should be collapsed.', () => {

    });
  });

  test('A user can expand an event element to see its details.', ({ given, and, when, then }) => {
    given('the main page has been opened', () => {

    });

    and('a list of events has been rendered', () => {

    });

    when('the user clicks the toggle button', () => {

    });

    then('the event element should expand and show the event element details.', () => {

    });
  });

  test('A user can collapse an event to hide its details.', ({ given, when, then }) => {
    given('an event element is expanded and has been showing event element details', () => {

    });

    when('the user clicks the toggle button', () => {

    });

    then('the expanded event element should collapse.', () => {

    });
  });
});