# Note From Applicant
Hi! Hope this note finds you well!

I was originally not planning on writing a note, but I decided to write this in order to showcase some additional thoughts I had besides the notes that I added in the code through comments.

I was fixing one of the earlier bugs when I thought I discovered another bug, but it was just bug 6. I started writing what I discovered down (see footnote [1]) but it is now irrelevant since there was no new bug. 

Since I started this notes file, I also started to write down ideas related to bug 6, then just regular ideas for if this were a real project assigned to me.

**Somewhat related to bug 6 - thoughts on lack of nextPage for transactionsByEmployee object:**
However, I think the lack of a next page item in the returned transactionsByEmployee object when using a filter eliminates the possible option of having more than 5 transactions per employee, as once filtered, there will be no option to view the next page of filtered transactions with no "next page" item in the transactionsByEmployee object. If this were a real project given to me, I would refactor useTransactionsByEmployee to also return a next page with its returned data, as long as the api supports that. 

**Other Thoughts**
Additionally, these are other fixes I would make if this were a real project assigned to me:
* Further optimize loading from and updating the API so that checkbox changes and filtering are faster
* I would order the transactions by date by default and also offer a button to sort by date, transaction name, or person name.
* to further enforce the sleek simpler design, I would enlarge the entire transaction rectangle and color it a darker shade of grey instead of using colorful green squares with a border as a checkbox
* to make the hover color for the view more button more obvious as an indicator of interactivity, I would darken it
* in the instructions, there is a span (with line height formatting, so it seems it should add vertical space between lines). This span is in a p tag, but the span does not serve any purpose and instead eliminates the conventional horizontal space between the sentences. I would delete it so there is a space between the two lines there or divide the p tag into two then add the span in the middle at the desired location.

**Slight Difference in Bug 7 Replication** 
I also found that replicating bug 7 was not exactly as the readme.me said.
The replication steps for bug 7 for my project was:
 1. Make a checkbox edit after fetching api's data, then call the opposite of the last 
 2. Fetch function (fetchAll is opposite of fetchById). 
 3. Check the original fetch and see that the checkbox edit is gone

'''
thus, the steps to replicate for me were these, not the ones listed:
* filter by employee -> employee 1
* change transaction checkboxes
* filter by employee -> employee 2
* filter by employee -> employee 1
* transaction checkboxes that were changed have been reverted
''' 

OR

'''
* select all, but not by default
* change transaction checkboxes
* filter by employee -> employee 2
* select all
* transaction checkboxes that were changed have been reverted
'''

[1] the bug I thought I found but was bug 6:
since there are only 5 transactions per employee in this particular
data set, and one can still click on "view more" when filtering by an employee, 
the next page displayed by view more will just be "all employees" list. The expected
behavior intuitively should be no "view more" unless the filtered employee has more than 5 transactions. When view more is clicked for an employee with 6+ transactions, then only
the employees' transactions from pages 1-2 should be shown, not the "all employees" list.
