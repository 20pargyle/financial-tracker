# Financial Tracker
## Overview
This app is a financial tracker - something that is quite useful for any functional adult. While there are certainly many types of apps, websites, and paper trails for this use case, I have yet to find a solution that I feel best fits my needs. With this app, a user will be able to track every kind of expense, while receiving detailed data and reports about how they are spending their money.
I have previously attempted such a project, but I ran into many roadblocks that I had no idea how to overcome. Luckily, Django provides the tools to overcome many of them - local, constant storage (SQLite databases), displaying that info easily (the template system), and so on. So here I am - making one how I like it!
## Current Features
- Make an account to interact only with your data
- Create and view transaction history

## Planned Features
### Must-Have
As a user I should be able to:
- Manage my transactions and income (add, delete, edit)
  - Catch duplicates when adding transactions
- Remembering previous locations 
- See reports on my finances
- Set basic budgets
- Export data to JSON or CSV
### Nice-to-Have
As a user, it would be nice to:
- Use it comfortably on my mobile browser
- See more advanced reports (spending vs last [time period])
- Estimate future expenses
- Starting with grocery lists - what did you buy, and how often do you buy it?
- Export as Excel file or PDF.
- Direct export to Google Drive?
- Store photographs of receipts
- Have some user onboarding
  - A landing page for non-registered users that explains basic functions
  - In-app tutorials - those really annoying ones that hand-hold first-time users through each step and function of the application
- Use it as a native mobile app

## Technical Challenges
Over time, there will certainly be a lot of data to handle, and I need to make sure there are systems in place to organize it all and display it piece by piece. Maybe I just display the current month’s transactions?
The visual reports will also be tough. There most certainly are libraries that I can use, but those will have a learning curve of their own.
Useful tools like this are much more useful if also available from a mobile device. I’m not sure if I’ll get to this, but it would be a fun challenge. At the very least, I want it to have a mobile-friendly design.
## Requirements
- My app will be a single-page application, using React and Django.
- My app will have multiple pages, which will switch when performing actions like creating a new transaction or - viewing reports.
- Other than the landing page, authentication is required to access and manage data.
- The app is useful! Once complete, it will be a functional financial app that I will use for my finances!
- It will have a consistent and intentional design!
- It will use the backend for data validation, data interpretation (for reports and charts), and the database to store users and their information.

## technologies
Tanstack / React Query
- Handles requests for you, don't need useEffect and all that.
- Caches data as well
