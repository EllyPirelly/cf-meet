Feature: Show/Hide an events’ details

Scenario 1: An event element is collapsed by default.
Given the main page has been opened
And the list of events has been rendered
When a user hasn’t clicked the toggle button
Then the event element should be collapsed.

Scenario 2: A user can expand an event element to see its details.
Given the main page has been opened
And the list of events has been rendered
When a user clicks the toggle button
Then the event element should expand and show the event element details.

Scenario 3: A user can collapse an event element to hide its details.
Given an event element is expanded and has been showing event element details
When a user clicks the toggle button
Then the expanded event element should collapse.