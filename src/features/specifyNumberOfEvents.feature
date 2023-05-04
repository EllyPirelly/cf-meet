Feature: Specify number of events

Scenario: When a user has not specified a number of events, 32 is the default number of events.
Given the main page has been opened
When the user does not specify the number of events
Then the number of events being shown per default should be 32.

Scenario: A user can change the number of events they want to see.
Given the main page has been opened
When the user inputs a specific number into the number input field
Then the user should only see the number of events they specified.