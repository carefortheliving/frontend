* Home page
  *  Nav Bar
    *  Logo/Name of the website
      *  on left
    * `Create Request` Button
      *  Right top
      *  OnClick 
        *  if logged out:
          *  redirects to the `Login Page`
          *  after login, redirects to `Create Request Form`
        *  if logged in: 
          *  redirects to `Create Request Form`
   *  Profile Icon
     *  Right of the `Create Request` button
     *  Visible only if logged in
     *  Menu items
       *  My Requests
         *  redirects to `My Requests` page
       *  Logout
         *  after logging out, redirects to the original URL (or home page)
   *  `Sign In` button
     *  Visible only if logged out
     *  OnClick redirects to `Login Page`
     *  after logging in, redirects to the original URL
  *  Open Requests List
    * Filters
      * On Side for Desktop View
      * On Top for Mobile View
      * Fields
        * State
        * District
        * Category
        * Status
          * By default Open
        * My Requests Checkbox
    * Requests Cards
      * OnClick redirects to `Request Details Page`
      * Info to show
        * Title
        * Image
        * Category as label
        * State/District
        * Requestor's name
        * Contact number
        * Updated At
        * Different color scheme for Open/Close status
* Create Request Form Page
  * Fields
    * Title
    * Image
    * Category
    * Description
    * State/District
    * Requestor's name
    * Contact number
    * Updated At
    * Different color scheme for Open/Close status
    * Status
      * To be shown only if editing
      * Two options
        * Open
        * Closed
  * Submit button
    * OnClick redirects to `My Requests` Page
* Login Page
  * Buttons 
    * Login with Google
    * Login with Facebook
    * Login with Twitter
* Create/Edit Request Details Page
  * `Edit Icon` if request by the logged in user
  * Title
  * Image
  * Category as label
  * State/District
  * Requestor's name
  * Contact number
  * Updated At
  * Different color scheme for Open/Close status
  * Description
  * `Disqus` comment thread
* My Requests Page
  * List of cards of the requests by the logged in User
  * If UI permits, display `edit icon` on the card
    * OnClick redirects to `Edit Request Details` Page
  * OnClick (anywhere on the card) redirects to `Request Details` Page

---

* Person in need asks for help in a form
  * Google form? (so that it's easily customisable?)
    * [Embed in the dashboard somehow?](https://support.google.com/a/users/answer/9308623?hl=en#:~:text=Add%20surveys%20and%20forms%20to,Google%20Forms%20in%20Google%20Sites.&text=Feedback%20survey%E2%80%93Get%20feedback%20from,to%20subscribe%20to%20your%20newsletter.)
    * Can exact map location (or PIN?) as input?
  * fields?? thing needed?
  * How to feed the response data to front-end? A back server in the middle?
    * [App Script](https://script.google.com/home)?
* Dashboard displays the feed on a page
  * Filters - region, requirement, ...?
  * FB comment box below every feed item (i.e. requirement)
* Dashboard displays a map of requirements
  * Filters - requirement, ...?
  * Regions by PIN code? Hierarchical?
