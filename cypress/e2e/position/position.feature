Feature: Provide available position details

  @positiveTest
  Scenario: As a job seeker, I want to see available position details
    Given There is one "Software Engineer" position available
    When I visit epam careers
    And I search for "Software Engineer" position
    Then I should see position details as below
      |name             |positionType|
      |Software Engineer|REMOTE      |


  @negativeTest
  Scenario: As a job seeker, I want to see message when position I am looking is not available
    Given There are no positions available
    When I visit epam careers
    And I search for "Software Engineer" position
    Then I should see an error message "Sorry, your search returned no results. Please try another combination."


  @edgeCaseTest
  Scenario: As a job seeker, I want to see graceful error message when service is not available
    Given Vacancy service is not available
    When I visit epam careers
    And I search for "Software Engineer" position
    Then I should see an error message "Sorry, something went wrong. Please, try again later."


