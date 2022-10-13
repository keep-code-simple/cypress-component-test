Feature: Verify the position details

  Background:
    Given I visit epam careers


  Scenario: As a job seeker, I want to search for engineer job positions
    When search for "Lead Software Test Engineer - Remote" position
    Then I should see position details
      |name                                |urgent                     |
      |Lead Software Test Engineer - Remote|HOT                        |


  Scenario: As a job seeker, I want to search for construction job positions
    When search for "Roof builder" position
    Then I should see "Sorry, your search returned no results. Please try another combination."
