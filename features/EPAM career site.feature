Feature: EPAM career site test
  As a user
  I visit the EPAM career site
  So that I can apply for a job easily

  Scenario: 1. Searching for Software tester jobs
    Given the EPAM career page is opened

    When the Location filter box is clicked
    And the country "Hungary" is selected
    And the city "Debrecen" is selected
    And the Teams and Roles filter box is clicked
    And the role "Software Test Engineering" is selected
    And the Search button is clicked
    Then the position "Test Automation Engineer" should be visible
    And the priority of the position "Test Automation Engineer" should be normal
    And the category of "Test Automation Engineer" position should be "Software Test Engineering"
    And the location of "Test Automation Engineer" position should be "Debrecen, Hungary"
    And the Apply button for "Test Automation Engineer" position should be visible

    When the Apply button for "Test Automation Engineer" position is clicked
    Then the job description should contain the following text: "Currently we are looking for an Automation Tester for our Debrecen office to make our team even stronger."

  Scenario Outline: 2. Searching for Software tester jobs - <position>
    Given the EPAM career page is opened

    When the Location filter box is clicked
    And the country "<country>" is selected
    And the city "<city>" is selected
    And the Teams and Roles filter box is clicked
    And the role "<category>" is selected
    And the Search button is clicked
    Then the position "<position>" should be visible
    And the priority of the position "<position>" should be <priority>
    And the category of "<position>" position should be "<category>"
    And the location of "<position>" position should be "<city>, <country>"
    And the Apply button for "<position>" position should be visible

    When the Apply button for "<position>" position is clicked
    Then the job description should contain the following text: "<description>"

    Examples:
      | country | city     | position                 | category                  | priority | description                                                                                               |
      | Hungary | Debrecen | Test Automation Engineer | Software Test Engineering | normal   | Currently we are looking for an Automation Tester for our Debrecen office to make our team even stronger. |
      | Hungary | Debrecen | Software Tester          | Software Test Engineering | high     | Currently we are looking for a Software Tester for our Debrecen office to make our team even stronger.    |
