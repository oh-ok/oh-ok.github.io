---
layout: post
title: Laika Update
date: '2021-04-05T00:00:00+00:00'
---
Hello! I've been slowly doing things on the Laika project, it's really fun to keep trying to refine the simple things though, such that I forgot that I need to make things, not just code things! 

So here's a snippet of the stuff I've been working on, the most notable changes are that there's now something of a player model, and a character controller, meaning that the environment is now explorable! 

<video controls="controls">
    <source src="https://storage.googleapis.com/portfolio_test/laika/player_movement_apr.mp4">
</video>

It turns out that third person is quite tricky to get right, since the camera can get in awkward positions, but keeping the camera close to the player works in both theme and execution in solving this problem, since the whole point of the game is that you feel caustraphobic, and close to Laika's point-of-view. 

You'll also notice some lighting artifacts on the buildings, that's just because I need to go in and clean up their UV Maps a bit, make them more organised and logical, should be a relatively simple fix!

I'm really happy with how the street lamps have turned out, they really sell that this is a historical setting, so I'm confident that modeling my own cars will help sell it even more, which will be the next thing I work on!

<video controls="controls">
    <source src="https://storage.googleapis.com/portfolio_test/laika/opening%20shot%20mobile%20v4.mp4">
</video>

Finally, I'm having some issues with Unitys ShaderGraph, it's just not as versatile a tool as I need it to be, I'd like to use shader passes but you can't use a ShaderGraph as a pass, or pass anything into a ShaderGraph, which really limits what you can do with them. Either way, I'll likely keep the shadergraph for the environment, since I want Laika to pop off the background more though I want her to at least have an outline/more interesting shading. 