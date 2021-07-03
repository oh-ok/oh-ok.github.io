---
layout: post
title: Blend'r Adventu'r
date: '2019-11-10T00:00:00+00:00'
---
I've been interested in the 3D software Blender for a while since I've come across its very dedicated community/user base all over the internet, but especially on YouTube and Twitter. With it's new 2.8 update I thought I'd actually give learning the program/3D art a go. Blender is free and open source so it was simple enough to get and install, so I started playing around, watching tutorials and getting a basic understanding of how it all functions & it's workflow. 

After a few hours of tutorials, I felt I had a grasp of how most of the basic sculpting & modeling tools worked, so I set myself a goal: in two weeks time I wanted to have a 3D model/scene of the Pokémon Popplio on a beach playing with a beach ball. I chose this because there are a lot of very simple shapes in Pokémon creature designs, and I would get to have a play around with and learn a lot of the tools in Blender, including modelling, sculpting a landscape, and water simulations. As of writing, it is the final day and I have a *somewhat* acceptable outcome, here it is: 


![Blender Outcome](/assets/posts/blendr_outcome.png)

There is a lot wrong with the image, the water and beach are overly simple, Popplio's fingers are non existent, I got lazy with the eyes and the beach ball isn't quite right. (also the sand castle's shadow was partially added in Photoshop because I couldn't get the shadows to look exactly how I wanted in the scene itself). Maybe in the future I will fix these issues, but for now its *fine*... 

Now I'll just walk through the process of making it... 

First thing I did was start off modelling the body of Popplio, I started with a sphere for the head and added a cone for the nose, but something weird happened with that so I swapped it out for a cylinder and made it look like a cone, I then placed a tiny sphere on that. I then got another cylinder, added a bunch of loops and scaled each loop down until I had a shape that resembled the body. 
The tail fin was quite interesting to model, I used mostly modifiers for this, I added a square plane, and edited its shape to have that middle separation, then added a subdivision modifier to smooth it out and add more geometry to it so that I could then add a simple deform modifier to twist it to get that shape. I did a very similar thing for the arm fins. I then went and fucked around with the head sphere and added some geometry for the ears (probably a mistake because its quite a destructive way to model).. and boom I had this: 

![Blender Poplio](/assets/posts/blendr_poplio.png)

I then went and posed him how I wanted and added a plane, added a simple subdivision modifier, went into sculpt mode and fucked around with it for a while until I had something that looked like beach terrain (not that you can even see it in the final thing). I then also played around with the fluid system and got very frustrated with that because I just didn't understand what the fuck I was doing, I somehow ended up with something though so I cant complain. 
I then tried adding textures to things, I think this was my favorite part just because it's so satisfying, I then discovered that Blender has a post processing effect called "freestyle" which adds strokes around object geometries and so I played around with that too... 

![Adding Beach](/assets/posts/blendr_alphabeach.png)

I really like the effect that freestyle gives you, but I decided against it in the final thing.

You can see here that I was also playing around with lights and colour here, I knew I wanted it to be bright and warm with harsh shadows but I really just didn't know how to do that (I still don't), I googled around and there was everything from compositing shadows separately, to tracing each light path AGAIN and adding effects to that as a separate composite layer. "Maybe another time", I said. 

I played around with the texture editor to get those little "^_^" eyes on Popplio, it was pretty simple really. 

I then also took a sphere, used the boolean modifier on it to get it to be a quarter of a sphere, then used that to cut into the mouth of Popplio to give it that little :D face. I then textured those faces with a red material.

![Beach 2](assets/posts/blendr_beach2.png)

To make the beach ball I went and just had a sphere and made sure it had a number of surfaces that was divisible by 6, then went and added a plane in its center and used the boolean modifier to cut it up into a 6th of its size, then copied it 6 times (probably should've used a mirror modifier or something idk). And boom, beach ball.

![Beach 3](assets/posts/blendr_beach3.png)

For the little scarf thing around Popplio's neck I had a circle, took every 3rd point and scaled it down to make the basic zig-zaggy shape, then made faces and extruded it. I then added a simple subdivision modifier to give it more geometry, and then tried to simulate it as cloth... It didn't go well., but I was still able to use the second frame cause it was good enough. 

You can probably tell that I'm very confused by the water material, I really don't understand how to do it, but it might have something to do with the way I set it up. The way it's set up is that the water is just like a big square box filled with water, I then took the beach, angled it slightly and then made it intersect the water tub. What I think is happening is that because the actual geometry for the water is much deeper than the beach, the material is just not seeing the beach altogether and so it can't simulate the material properly. Maybe something to experiment with in the future. 

![Beach 4](assets/posts/blendr_beach4.png)

At this point I make the switch between the rendering engine I'm using, Blender has two renderers, Eevee and Cycles, Eevee is a real-time engine, so it's good for when you don't need things like accurate light rays, but I switched to Cycles because it uses ray tracing, which means it'll be more accurate when it renders light rays and shadows (at least thats how I understand it, there may be a way to get better shadows in Eevee I couldn't find). Since the shadows behind Popplio and the ball are quite big I thought I'd switch over. I also added a little square sand castle for to add a little detail, but I think that it actually is a little visually confusing where everything is so damn bright and there really isn't much contrast. 

![Beach 5](assets/posts/blendr_beach5.png)

I then rendered it and took it over the Photoshop where I tried to fix some of my mistakes, I added some saturation and tried to make it more contrasty, but it still suffers from that issue in my opinion. I also added a longer shadow for the sand castle to make its shape a tiny bit clearer (its still not very good though).

![Beach 6](assets/posts/blendr_beach6.png)

Overall this was was a fun little project to work on, looking at the final thing I think I could've done it much better but oh well, live and learn. 

I've also made some other stuff in Blender as I've become quite comfortable with it, I'm currently using it to mock up stuff for my current uni project where I'm tackling the task of visually representing infinity...

![](assets/posts/stance_book_mirror.png)

<iframe class="youtube-embed" src="https://www.youtube.com/embed/wjBmzWBa8OY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe class="youtube-embed" src="https://www.youtube.com/embed/sZXMt8gDk2M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>