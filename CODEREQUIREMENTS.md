## PART 2 - Coding Project

---

_[Part 1: Code Review](./CODEREVIEW.md)_

_[Back to Readme](./README.md)_

-   Using HTML, CSS, and Javascript, create a web form for a Contact Us page. Use whichever framework you’re most comfortable with (React, Vue, jQuery, vanilla Javascript, etc).

-   Submit the project as either a link to a public Github repository, or a zip file attached to the email.

-   The form must accept the following information and implement the following validations:

    -   The user’s name
        -   Cannot be blank
    -   Email
        -   Cannot be blank AND must be a valid email address
    -   Birth date
        -   Can be blank
        -   If not empty, the input must be a valid date
    -   Agreement to be contacted
        -   Must be checked
    -   The form has a “submit” button that is disabled if any of the previous fields are invalid
    -   The form has a “clear” button that clears the rest of the form
    -   To submit the form, make an HTTP POST request to https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users with JSON as the HTTP request body. The JSON should look like the sample user shown here. You should receive an HTTP 200 in response to your request.
    -   After the form is submitted, display a success message and clear the rest of the form
    -   You may use any preexisting CSS framework or no framework
