# appointment-app
An appointment app that displays your meetings for the day. The page will load with today's date and a 'meetings' button along with a simple navigation bar with two links 'current meetings' and 'deleted meetings'. Clicking the 'meetings' button will hide the date, get API data and display the data as a user. 

There will be a randomly generated number of meetings between 1 and 7. Each meeting will show an image that represent the person you are meeting with, their first and last name a 'delete' button and the time of that meeting as well as a horizontal line to separate each meeting. 

It should be noted the last meeting displayed does not have a horizontal line. The meetings are sorted with the earliest am meeting displayed at the top and the latest pm meeting displayed last. Clicking the delete button will remove that meeting and move it to the deleted meetings list. Deleting a meeting will now display the current meetings with that clicked meeting removed.

The navbar lets you navigate between active meetings and any meetings you have deleted. In the deleted meetings section the deleted meeting contains an image which represents the users image, a first and last name and an 'add' button. By clicking the add button this deleted meeting is added to the top of the current meetings list and is given a new am time frame.
