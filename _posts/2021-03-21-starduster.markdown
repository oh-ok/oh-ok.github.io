---
layout: post
title: Starduster!
date: '2021-03-21T00:00:00+00:00'
permalink: starduster-03-21
---
# The game

[Starduster](https://kgeary.itch.io/starduster) is our entry to the [Great Spring Game Jam 2021](https://itch.io/jam/great-spring-game-jam-2021), a 3 week long game jam run by [Firith Studio](https://firith.studio/), with the theme of "Spring" (keep in mind this was not our main project for 3 weeks).

I wanted this to be a really chill "a few hours a week" kind of side-project to build experience in Unity/C#, as well as to have something game related in my portfolio. So I got together as many people as possible, at one point there was 10 people on the team, but as the project went on a few dropped out because of other stuff happening. 

As of submission, there's 8 people credited:
- Music and Sound: Ben Pavely, Cathy
- Gameplay Concept: [@Maggie Mojsiejuk](https://twitter.com/MMojsiejuk)
- Programmers: [@KieranGeary](https://twitter.com/KieranGeary), [@mrneverm0re](https://twitter.com/mrneverm0re)
- Artists: [@Hanjosi](https://twitter.com/Hanjosi), [@ashutoph](https://twitter.com/ashutoph), [@KieranGeary](https://twitter.com/KieranGeary)
- UI: [@Ralphoki1](https://twitter.com/Ralphoki1)

Since this was supposed to be a chill game jam the concept we went with was pretty simple: an alien spring cleaning game, where one player is trying to mess everything up, and the other player is trying to clean everything up after them.

Hanjosi got to work making characters, and I started working on getting something into Unity.

By the first week, we had player movement, destroying/cleaning and split screen implemented, as well as some sprites

![](https://media.discordapp.net/attachments/814873327440756756/816770323847446628/damage_basic_demo.gif)

By the second week we had the level layout and a few bits of sound in, 

![](https://media.discordapp.net/attachments/814873327440756756/820984529023533106/gamejam_background_roughs.png?width=1440&height=576)

![](https://media.discordapp.net/attachments/814873327440756756/821866950245220432/bg_test1.gif)

And it was kind of a rush on the last week to get the power-ups, UI and victory screens in.

![](https://media.discordapp.net/attachments/814873152039551028/821079781361582170/health_bar_and_boofs.gif)

The finished product is pretty fun to play, I'm pretty proud of the result, my favourite parts are the walk cycles and the music! But I'm even more proud of the fact that I reached out to so many people to join the team, I've met some really great people who I hope to keep in contact with!!

Feel free to play it and give feedback! From here on, I'm going to talk about the technical problems we encountered and the solutions we came up with! (most of this might be simple to experienced bois, but I still found these challenges fun)

<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">For the past 3 weeks I&#39;ve been working my first game jam with an amazing group of people!<br><br>Our game is ⭐️Starduster⭐️, a 2player game about spring cleaning. It would be sick if yall checked it out, play it (it&#39;s free!), &amp; let me know what you think! <br><br>▶️ <a href="https://t.co/C4N2lQnopl">https://t.co/C4N2lQnopl</a> <a href="https://t.co/js9aUIKUMJ">pic.twitter.com/js9aUIKUMJ</a></p>&mdash; han | DZ (@hanjosi) <a href="https://twitter.com/hanjosi/status/1373703276017909766?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

You can find the project files/source code here [https://github.com/oh-ok/Greenhouse](https://github.com/oh-ok/Greenhouse)

## Problem 1: Outline Shader

There's a few ways to do an outline shader, you can blur the image and then remap the values to expand the sprite, then do some addition/multiplication to put that behind the original sprite. This would give a consistent shape around the object (with the downside of a slightly blurred outline, leading to a more "glow-y" effect), or you can do it the way I ended up doing it, by projecting the sprite in 8 different directions, and then doing the same maths to put it behind the original sprite, which preserves the hard pixelated edges of the sprites, keeping the look relatively clean. 
The problem with this approach however, is that as the "outline" gets bigger (more than ~70% the size of the original image), it will look less and less like an outline and more like the image being projected outwards (but that's not  huge deal, our outlines won't get that big)

Because this is relatively simple I decided to use ShaderGraph, just so it's a bit more readable than pure code. 

How it works in Starduster! is that we have a sub-graph which gets the alpha of the given texture and translates it 

![](https://i.imgur.com/znELHY5.gif). 

The direction is set by the "Translate" float2, where X and Y are either 1 or 0 which is then multiplied by offset is set by the "OutlineThickness" float to give the final offset amount and direction. 

We do this 8 times in total, 4 for each cardinal direction and 4 for the in-between directions (NE,NW,SE,SW), and combine them all together. 

After combining them, we simply subtract the original alpha of the texture, then add the original texture back in again. You could just multiply the RGB values together here if you wanted to save a few operations and always wanted the outline to be white, but we wanted the flexibility of colour, so subtracting, multiplying by a colour and then adding back again is the easiest way to do that.

![](https://i.imgur.com/JMsUQ72.gif)

Now I am aware that branching is slow and not really recommended for shading, but I was having a problem where if the outline thickness was set to 0, there would still be a little rouge outline, so there's here's a little branch that just says ignore the results of the outline entirely.

![](https://i.imgur.com/bxRooD6.png)

## Problem 2: Looping the world

This is one of those problems that seems difficult to solve, but it's actually pretty simple! Once again, this is game jam code, so it can likely be improved and tweaked for optimal performance and stuff (and if you know how be sure to contact me!!!), but it works as is and it works pretty well! 

First, we have a camera which is looking at the entire level which renders to two render textures either side of the level. 

![](https://i.imgur.com/Gp9JUDl.png)

Both the render textures have a box collider which is bigger than the texture, just enough to fit the biggest player's sprite between it and the real level. 

![](https://i.imgur.com/euqrOov.png)

Once the player collides with the box, it will spawn a copy of the sprite on the opposite side, so that if there's someone observing from the other side. If we don't, then the player will be partially invisible from the other player's view, since they're now leaving the true level and not being captured by the render texture's camera...

![](https://i.imgur.com/8fqTBhe.gif)

Here's the code for that, we have a public GameObject set as a Prefab of an object with an empty Sprite Renderer component, and let this do the rest...

{% highlight c# %}
void OnTriggerStay2D(Collider2D col)
{
//If you've collided with a looper, and there's no clone, then make one
if (col.tag == "Loopers")
{
	if (!cloneSpr)
	{
		loopDifference = col.transform.position.x;
		looperCollider = col;
		Vector3 newPos = new Vector3(
			transform.position.x-loopDifference, 
			transform.position.y-col.transform.position.y, 
			transform.position.z-col.transform.position.z);

		cloneSpr = Instantiate(clonePrefab, newPos, new Quaternion(0f,0f,0f,0f));
		cloneSpr.layer = gameObject.layer;
		cloneSpr.GetComponent<SpriteRenderer>().sortingOrder = sprRender.sortingOrder;
	}
}
}
{% endhighlight %}

... And then mimic it's original player for as long as it's alive, and if the player is far enough inside the looped level texture, then teleport them back by the amount that the texture is offset from the true level by. 

{% highlight c# %}
void Update()
{
	//If there's a clone sprite, then update it to be exactly the same as the real object
    if (cloneSpr)
    {
    	cloneSpr.GetComponent<SpriteRenderer>().sprite = sprRender.sprite;
    	cloneSpr.GetComponent<SpriteRenderer>().flipX = sprRender.flipX;
    	cloneSpr.transform.position = new Vector3(
    		transform.position.x-loopDifference,
    		transform.position.y,
    		transform.position.z);
    	//If you've moved into the looper a distance of 3, then teleport the player back a bit
    	if (thisCol.Distance(looperCollider).distance < -3)
    	{
    		transform.position = new Vector3(
			transform.position.x+loopDifference*-1,
			transform.position.y,
			transform.position.z);
    	}
    }
}
{% endhighlight %}

Neat, right?! This ends up making a completely seamless transition, initially I thought it would be kinda janky, but it works really well! 

Another approach you could use for this technique is to keep the teleporting logic, but make the entire level a Prefab and then have 3 copies, but that seems even more janky and less optimal upon closer inspection. If you have 30 objects in your level, then tripling the amount of objects to 90 seems silly

Since we initially thought there'd be more stuff to destroy in the game, the render texture method seemed to fit best when making this system.

Anyway, this was a really fun project! I may do some more game jams in the future, and if I do I'll make sure to write about anything interesting I learned about it here!

Thanks and bye!