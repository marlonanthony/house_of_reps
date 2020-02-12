# House of Reps
## Social network for DJs

[Temp website](https://fathomless-escarpment-28544.herokuapp.com)

![House of Reps Landing page background image](client/src/img/dj.jpg)

## Feed

Like every page in this app, things will look differently depending on the users device. The key features of the newsfeed are: 

1. Search posts by hashtag
1. Create post
    * Once a user clicks on the textarea they'll be presented with four options:
        1. Add photo
        1. Add emoji
        1. Submit button
    * If you paste a link, a preview will be presented with accompanied metadata (depending on the website).
1. Search Members (Might remove now that I've added the 'Reps' page which you can navigate to from the hamburger menu)
1. Recently uploaded media
    * Displays a single upload (video/song/playlist) from every user ordered by recency
    * If the user clicks on the 'House of Reps' icon in the bottom right of the uploaded media, an uninterrupted modal will appear that will allow the user to navigate different pages without their music/video experience being interrupted.
1. Promotional section (Stores, Brands, Perks, Music Pools)
1. Speakeasy
    * Real time chat messenger that doesn't save to a database. Messages only exist in memory; hence, the name speakeasy.
1. Post filters
    * At the moment there are 7 core filters that are being accessed via hashtag. These filters will likely change at the whim of the client. None of these are guaranteed to stick around and none are styled/labeled correctly. These are just placeholders to test out functionality.
    * On top of these core filters, there is a 'liked' filter that displays all posts that the user liked.
1. Notifications bell 
    * Informs the user if they have any new notifications and displays the count.
    * Clicking on the bell will navigate the user to the notifications page where they can learn more about each new notification.
1. Posts
    * Each post can be edited by clicking on the more-vert icon in the top right of the post.
    * Each post has comments which in-turn can have their own comments. Comments and nested comments can both be edited by the publisher of said comment/nested comment.
    * Each post/comment has the creators username, avatar, and date created listed in the upper left corner. If you hover over the username, a dropdown menu will appear displaying info about the user.
    * In the bottom left corner either four or five icons will be presented depending on if you're the creator of the post/comment:
        1. Like icon
        1. Remove Like icon
        1. Expand Comments icon
        1. Write Comment icon
        1. Delete Post/Comment icon (if you're the creator of said post or comment)

## Dashboard

What you'll see on this page largely depends on if you're an admin of the site. Whether an admin or not, you'll see a few labels/icons: 

  1. Edit Profile 
  1. Add Media 
  1. Create Chatroom

Admins will see a few additional labels/icons: 

  1. Add Store 
  1. Add DJ Pool 
  1. Add Perk 
  1. Add Brand

Afterwards, there will be a list of chatrooms that you're either a member of or have been invited two.

If you're an admin, under the chatrooms you'll see a list of all promotional material added (DJ Pools, Certified Stores, Perks, Brands, etc). You'll also have opportunity to edit this list at any time.

All users will have a list of their uploaded "media." This is simply audio or video that you've embedded and would like displayed on your profile page. Your most recent addition will also be displayed on the newfeed.

At the very bottom is a button to delete your account. 

From your dashboard you can use the hamburger menu to navigate anywhere you'd like. Let's start with the current users profile page.

## Profile Page

When landing on the profile page depending on whether you're on mobile, tablet, or desktop; you'll see things a bit differently. That said, no matter the device, there'll be three core sections presented: 

1. User Info
    * Name
    * Handle
    * Bio
    * Location
    * Social Links
    * Badges (beta)

1. Embedded Media
    * YouTube
    * Soundcloud

1. Posts
    * Created posts

## Reps

One of the newer pages to the app. For now it's just a list of all members. 