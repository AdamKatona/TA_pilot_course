Feature: EPAM career site test 2.
  As a user
  I visit the EPAM career site
  So that I can apply for a job easily

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
    And the location of "<position>" position should be "<location>"
    And the Apply button for "<position>" position should be visible

    When the Apply button for "<position>" position is clicked
    Then the job description should contain the following text: "<description>"

    Examples:
      | country | city     | position                 | location          | category                  | priority | description                                                                                                     |
      | Hungary | Debrecen | Test Automation Engineer | Debrecen, Hungary | Software Test Engineering | normal   | Currently we are looking for a Test Automation Engineer for our Debrecen office to make the team even stronger. |
      | Hungary | Debrecen | Java Developer           | Debrecen, Hungary | Software Engineering      | normal   | Currently we are looking for a Java Developer for our Debrecen office to make the team even stronger.           |