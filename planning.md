ok step by step, building the pieces so scope creep is less bad:
    1. new transactions, simple appended to a list on the page
    2. other basic actions (remove/edit transaction list)
    3. file handling (export / import, how is it formatted, etc). I think comma-seperated objects in a json array.
    4. then clean up the css


BUGS/TODO in order of importance:
    - clear "new-form" fields after a transaction is successfully created
    - add options for income
    - Amount formatting - I want it amounts formatted to two digits if not provided.
    - Date and time defaults - the new transaction "date" field matches the current date.
    - Export transaction list
    - Import transaction list
    - If transactions already exist, an option to combine with import (when importing ofc)
    - Transactions IDs are more likely to repeat after so many transactions in one day.
        - Proposed fix: Restrict the user to so many transactions in one day AND include one hashed character from the "name" field. 
    - can delete item as it's being edited. proposed fix: if var "editing" is true, buttons grey out.


features:
    Transactions, each with:
        transaction amount, income/expense, name (company or person), timestamp (include time or not?), categories (v2), misc notes, ID.
        ID: it's not foolproof, but it's good. 3 randomly generated digits and the date.

    Expense graphs - definitely importing something
        monthly, yearly, or all time

    interesting stats
        with notifications
            eg Apple screen time: your expenses were down 20% this month... awesome job!

    I'd like to track how often I need certain things on average OR how long they last
        ie. how often I need shower gel... or smoothie materials!
        With a robust system, I can then more easily estimate future expenses
            How do we know how often things are purchased? receipt scanning?


general outline:
    An option to import an existing list OR make a new one 
        if imported, then -> editing page
        if from new, then a page to set that up -> edit page        

    Tools:
        Add transactions, delete transactions, edit transactions (v2)
        merge files, save as new.

    At the end of the session, a "save as" button will return the file in its new state.


history file format:
    some type of data structure, with the transactions sorted by the date/time field