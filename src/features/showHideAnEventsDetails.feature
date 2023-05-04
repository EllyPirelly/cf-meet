Feature: Toggle between showing or hiding details of one event

Scenario: An event element is collapsed by default.
Given the main page has been opened
And a list of events has been rendered
When the user has not clicked the toggle button
Then the event element should be collapsed.

Scenario: A user can expand an event element to see its details.
Given the main page has been opened
And a list of events has been rendered
When the user clicks the toggle button
Then the event element should expand and show the event element details.

Scenario: A user can collapse an event to hide its details.
Given an event element is expanded and has been showing event element details
When the user clicks the toggle button
Then the expanded event element should collapse.