# Activity Blog
### Planning Entry 1: Task assignment for Milestone 1.

The following tasks were identified from the project outline as being due at 11:59PM on Jan 30th.
Project proposal
Requirements / User stories
Data Planning
Wireframes
Team Plan
Github Setup
Activity Blog.

The proposal & requirements was identified as the first priority to better clarify and decide the direction of the project as a whole. With Github setup following to organize the rest of the tasks through the Kanban board.

The topic of the project was decided to be a variation of the Expenses Tracker suggested on the MyLearning space due to its relevance as an item I was already interested in making for myself.

The final version of this document was finished on Jan 30th and submitted the same day.

### Development Entry 1: Website Skeleton Creation.

To meet the required goal of milestone 2, devlopment of all key feautres would be required.

A core skeleton of HTML, CSS, and JS functionality would need to be developed for the following pages detailed in Milestone 1's wireframes.
- Login
- Register
- Homepage
- New Statement
- Summary

Additionally, backend api functionality will need to be implemented. Key routes identified are
- POST at /login: Verifies the identitiy of supplied account credentials
- POST at /register: Attempts to create an account with the supplied credentials
- POST at /newstatement: Adds a new statement entry will the form contents to the logged in user account

- GET at /homepage: Retrieves basic data, determined to be the last 10 statement in an account as well as its total declared income minus expenses.
- GET at /summary: Retrieves computed summary data for a user.

All above tasks were asigned to myself, and completed promptly. A key note is that some core functionality was split into custom modules found inside the modules directory for cleaner code.