## Part 1 - Code Review

---

_[Back to Readme](./README.md)_

Review the following pull request. Code review is an important, but difficult skill. Be specific and concrete in your review comments (referencing line numbers, specific code snippets, etc).

https://github.com/JustUtahCoders/comunidades-unidas-internal/pull/610

1. Do not leave Github comments on the pull request, as those are seen by other applicants.

2. Answer the following questions about the pull request in your submission email:

-   What is the purpose of the code changes? From a user’s perspective, what does this change?
-   What questions do you have about the code?
-   What suggestions do you have for the code?
-   Any other comments?

## Pull Request

---

### .elasticbeanstalk/config.yml :

---

```yml
environment: comunidades-unidas-prod-2
```

-   Line 3 appears to change the environment to a version 2 of the original environment.

-   What are the changes in the new environment?
-   How will it effect the legacy code?
-   Was the new environment thoroughly tested before commiting live code to it's use?

---

### backend/apis/reports/outstanding-invoices.api.js :

---

-   Line 45 to 47: checks for errors and returns the error if it exists
-   Line 49 to 58: initilizes 4 variables with their values
-   Line 59: begins a forEach loop on result
    -   Lodash is already imported, why not use it's each function?

_Lodash each function can operate up to 4 times faster than a forEach loop on some browsers_

-   Line 67: returns true or false depending on result
-   Line 69: if line 67 returns a client that is not completed it returns a function on the client updating the clients array and outstandingInvoices array
-   Line 112: sends the results of the previous sections in a results object, with the outstandingSummary, completedSummary, clientsWhoOwe sorted by balance, outstandingInvoices, sorted by balance, finally the reportParameters.

_Overall it looks good to me. It shows a list of clients to the user that seperates and tallies their accounts_

---

### backend/apis/reports/outstanding-invoices.sql :

---

It is MySQL, I'm not real practiced in sql databases. I have focused more on MongoDB.

-   It selects a set of tables from the invoices database, then joins them together on the relational key of invoices.id structures the joined table and only adds the entries that are open or completed, and null or invoices and by date then groups them by id.

```sql
34 (invoices.invoiceDate >= ? AND invoices.invoiceDate <= ?)
```

_This line appears to grab any date possible, is it really necessary to run?_

---

### backend/server.js :

---

-   line 156 imports in the previously mentioned outstanding-invoices.api route.

---

### frontend/reports/outstanding-invoices/outstanding-invoices-params.component.tsx :

---

-   Creates a react functional component
-   line 6 to 7: uses what appears to be a custom hook to store the start and end date of the invoice
-   The rest is a series of jsx to show date inputs to set the start and end date, then run the report for the user.

---

### frontend/reports/outstanding-invoices/outstanding-invoices-results.component.tsx

---

-   creates a react functional component
-   line 10 pulls in the userMode from the useContext hook referencing UserModeContext
-   line 11 sets the constant tagsQuery to the pulled in data from line 10
-   line 12 appears to destructure the returned data from the useReportsApi hook to the referenced endpoint, on tagsQuery
-   line 17 checks if the data is still loading and shows loading status to the user if so
-   line 21 checks for an error object, if there is one it states it to the user
-   line 25 destructures the data.results object

_could possibly save the lines and destructure the results object on line 9 in place of props_

-   line 32 to 209 returns a series of jsx to display the queried invoices to the user

_The map logic on line 142 could be broken out into it's own function for testing purposes_

-   line 211 sets a helper function show either redacted or the number to the second decimal

---

### frontend/reports/reports.components.tsx

---

-   lines 23 to 24 imports the above components into the report component
-   lines 79 to 83 calls the imported components and passes the path and title props to the components from report components

---

### frontend/reports/shared/use-reports-api.tsx

---

-   line 4 adds a second argument to the exported function called extraQuery
-   line 7 becomes a constant creation to see the length of the reference and return if the expression is true or false
-   line 8, previously line 7, adds extraQueryPrefix and extraQuery to the previous url string
