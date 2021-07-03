---
layout: post
title: Making Black Holes In Unreal
date: '2021-04-12T00:00:00+00:00'
---
# So, Unreal is great!

... unless you want to do someting remotely outside it's comfort zone, that is. I saw in Genesis Noir they had some kind of black hole global shader which distorted everything in a really interesting way, so I decided I wanted to try and replicate it somehow. I'm pretty confident that Feral Cat Den were using Unreal Engine, since they [recieved a dev grant from them on thier Kickstarter page](https://www.kickstarter.com/projects/1704150591/genesis-noir-a-cosmic-adventure). So I thought hey, why not give it a go, see if I can get something close! 

Here's the Genesis Noir example for reference (SPOILERS!!): 

<iframe class="youtube-embed" src="https://www.youtube.com/embed/rwA46I0b-14?start=739" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

So yeah it turns out that making a global shader in Unreal is kinda difficult when you don't know the software that well!

I started by doing what I would do in Unity:
- Making a Render Texture
- Create a system to decide where a black hole is (be it passing in parameters in a script or custom render layers on objects)
- Make the shader and render that to the screen

I immediately discovered Render Targets, so I then went to find out how to render the screen to the Render Target. First I tried C++, which was a mistake, while the language is somewhat familiar coming from C#, it's a lot more involved and I spent a while trying to get it to work when it just wasn't meant to be, there was a much simpler solution, just put a SceneCapture2D component on the Player pawn and then make a Blueprint to pass in the Render Texture at runtime. 

With the render target now set up, I then created a material that takes in the Render Target, and then *tries* to manipulate it to look like black hole light distortion

Here's what that looked like, nowhere near close, but quite promising! I feel like if you fiddled with this enough you could get it to work. 

<video style="width:100%;" controls="controls">
	<source src="https://storage.googleapis.com/kgeary_blog_posts/black_hole_fun!/yeah_this_aint_it.mp4">
</video>

I tried looking up some equations for this, but after discovering that refraction exists on transparent materials I cried a little and decided to give that a shot, which has worked pretty well so far!

I started by just playing around with the refraction values through trial and error, and I then [came across this Quora page where someone gave a simple equation](https://www.quora.com/Google-What-is-refractive-index-of-blackhole?share=1), which I then implemented in Unreal using a simple transparent Material.

<video style="width:100%;" controls="controls">
	<source src="https://storage.googleapis.com/kgeary_blog_posts/black_hole_fun!/ahh_much_better.mp4"> 
</video>

I have it set so that if the refraction index is below about -3, then colour the pizel black, giving the nice black "event horizon".  As far as I can tell there's only 1 issue; as the black hole gets to the edges of the screen it will be trying to draw pixels which are off-screen and hence dont exist, because of that it draws no pixels and you just see the refraction have no effect leading to the effect seen in the screenshot below. If I had the time to search for a workaround, I would like to just colour these pixels in black too, but I've looked for a bit and short of just remaking the entire refraction system in this material, it seems like I can't do that :'c

![An image of "the problem"](https://i.imgur.com/LExvK3B.png)

With that said though, as long as the black hole is in the center of the camera, or as long as its far away enough, it's not that much of a problem. Though I'm sure that the Genesis Noir guys had a slightly different solution.

Here's the final Material, it's super super simple for such a nice effect!

![The material, shown in the Material node editor](https://i.imgur.com/8b6PSFW.png)

I then went and made a qiuck particle system to orbit the black hole, similar to what happens in Genesis Noir

![A gif showing the orbiting stars particle emitter](https://i.imgur.com/WByTFqP.gif)

I'm pretty sure Genesis Noir had more complicated particles, but this recreates the effect somewhat well...

<video style="width:100%;" controls="controls" loop=true>
	<source src="https://storage.googleapis.com/kgeary_blog_posts/black_hole_fun!/up_close.mp4">
</video>

I'll definitely be trying to use Unreal in the future, it seems quite user friendly and full of solutions, but annoyingly technical if you want to dive deeper and add custom functionality (which is pretty much what I thought it was going to be like going into this).

Here's some more footage of me moving the black hole around against a "night sky" (the deafult BP_Sky_Sphere, so there's some clouds but it still looks cool)! 

<video style="width:100%;" controls="controls">
	<source src="https://storage.googleapis.com/kgeary_blog_posts/black_hole_fun!/showing_it_off.webm">
</video>

Overall I'm really surprised by how simple Unreal make this, it was so simple that I just didn't consider they had a solution for something like this and I went on a big crazy journey, when all I needed was to just \*look it up\*.

Using Unreal more seems like a good way to learn C++ (even if it's a more simplified script-y implementation of it)!