**What validations do the backend models have?**

Story:  title: can't be null, must be unique
User: e-mail: can't be null, must be unique

*Question to keep in mind what are scopes in 3rd argument of db.define?*

**How does npm run seed trigger users ending up in the database?**

Seed file states that there will be 100 users and 500 stories
Uses the chance module to create random e-mails random photos, random users (gender, name, etc)
for 100 users and 500 stories

Npm runs the file and calls all of these functions which are eventually inserted into the postGres database on the backend using the build function, and then pushes them into a user array and later saved in the db in the seed function.  Also two known users Zeke and Omri are pushed into the database.

**Diagram out the frontend's state tree — i.e. all states and parent/child relationships. This app has a fairly "shallow" state tree, it should not be especially complicated.**

Since we are using react-redux, the state is stored in the store which we pass to the Provider componenet.  This enables to access state in our container elements and then the same state as props in the dumb components.


**How does webpack package up your React/Redux and inject it into the front-end?**

It enters app.js and it goes through all of the referenced files and creates one big file.  It also uses loaders to transpile SASS, JSX, ES6, and other things we don't use or know about.

*How deep should we go here? Does it go through and create an HTML file to be rendered?*
*What is gulp? How is it related to webpack?*
Check out [this page on webpack](http://jpsierens.com/tutorial-react-redux-webpack/).

**How does the server deal with the requests for stylesheets?**

In index.html we just reference/load it with link tag like any other stylesheet. As far as we could see there is no express static serving it.

**In as much full stack detail as possible, describe what happens when you go to the URL http://127.0.0.1:8080/users.**

First we make an HTTP request to the URL.  In the backend we hit the route in user.router.js from api.router.js --> user.router.js, there we User.findAll() to return all instances in the User Model. On the frontend the same route and render the UserList component which is wrapped in a Navbar on top and Footer on the bottom.  The UserList component is populated by the data retrieved by the axios request that is in the users.js of redux, specifically in the dispatchers section.  When the root route is rendered, there is an onEnter hook that runs the fetchInitialData method which dispatches the fetchUers and fetchStories functions that do the actual axios requests.

**What components and reducers does this app have and what purpose does each one serve?**

Provider component --> Routes child
Routes has a Router which is the parent of a root Route associated with the root component, this componenet has many Route children each associated with a component (Home, Login, Signnup, UserList, UserDetail, StoryList, StoryDetail)

Provider is simple the ancestral components where store is kept.
Router component has all the routes
The root Route uses hooks to get data from the backend and make it available to all of its children, i.e. all other components.
The other components do what their names say.

** In as much full stack detail as possible, describe what happens when you click on the (X) button next to a particular user card on the 'users' page.

Note that in the same file that creates the Sequelize associations, there is an option called cascade… **

NB. Sequelize associations are made in db.js in utils.


On the UsersList component many UserItems are rendered.  Each UserItem has a button that has an onClick attribute linked to this.removedUserallback.  This function takes the event from this.props and uses it actually the remover from the db.  This comes from the backed via the users.js file in the redux folder.  The removeUser uses and axios delete request to access the database.  On the backend in the users.router.js file there is a corresponded route which deletes the specific user from the db, by the parametrized id.

From the route, we look at the model associations in the db.js file.  The onDelete property within the association creation is used.  The value for the onDelete key is called 'cascade' --> cascade removes all of the associated stories for a user.  There is also a property called hooks which must be true in order for onDelete to work.  


**Starting with some user action, what sequence of events leads to a PUT request for a particular story?

If you're curious, debounce is a technique to make sure a function cannot be invoked repeatedly within a short period.**

In the Storylist.js component there is a renderNewStoryWidget which is used in the main render function.  This child render function includes a plus button attached to an input elment for the Story Title and a select element for the Story Author.  Then the submit is clicked the onSubmit attached to the form is called.  The onSubmit method uses the addStory function which is imported from redux/stories.  This action includes an axios post request which is associated with a backend post request which updates the database with a new story.  This returns a story which is then dispatched with the create Action. This updates the state and eventually our frontend to display the newly created story.  debounce is an option used when stories are updated so that it cannot be invoked repeatedly within 500 ms.

