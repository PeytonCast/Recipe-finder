# DREAM TEAM - Recipe Finder

## Description

```text
Home cooking is something the younger generation is no longer excited about. It is seen more as a chore and less as an enjoyable experience. The purpose of building our Recipe Finder was to make cooking an adventure again.

Our project is a fun and simple search by ingredient web application that brings the user new recipes that they likely haven't tried before. The Recipe Finder will show an image of the meal, a youtube video on how to cook it, as well as helpful information like nutrition, calories, cost, and preptime.

When the user finds a recipe he/she likes he/she can save that recipe to try out later. In a neatly arranged storage tab.

Next time you are staring blankly into the fridge wondering what to make, or perhaps you’re tired of the same old Hotpocket freezer aisle special.

Consider something new and exciting like our Recipe Finder.
```

Here is a link to the live finished page: https://peytoncast.github.io/Recipe-finder/

## User Story

> AS A user of the site
>
> I WANT to search for a recipe based on a keyword
>
> SO THAT I can get videos on how to cook the recipe
>

## Finished Site

![screenshot of the finished site](assets/images/screenshot.png)

## Process

We used the [Spoonacular API](https://spoonacular.com/food-api) to pull a recipe and ingredients based on the user's search input. Then a call is made to the [YouTube API](https://developers.google.com/youtube/v3) to get a video with the title of the recipe as the search query. The user can save the recipe to local storage, which also saves the video link so they can recall previously saved recipes without making more API calls. A text summary of the recipe is brought to the bottom of the page as well.

The site is designed using the [Skeleton CSS Framework](http://getskeleton.com/)and written in Javascript.

## Addtional Notes

[Jon](https://github.com/shogren) handled the Spoonacular API and initial page setup, while Peyton handled the YouTube API and styling.

**Challenges**:

We had to change scope from the initial idea, both for time and because of the amount of team members we have. We also ran into several merge conflicts that took time to resolve manually.

**Successes**:

The Site works as we intended! It's polished, and makes the correct API calls with no errors. This was a good exercise in Teamwork as well, we had a good time collaborating and working together.
