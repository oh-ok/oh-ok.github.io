---
title: Starduster!
date: '2021-01-20T00:00:00+00:00'
thumbnailUrl: 'https://storage.googleapis.com/portfolio_test/starduster/Hero_Image.png'
layout: post
tags: game graphic
order: 1
---
Starduster is a 2D local multiplayer head-to-head game about spring cleaning on an alien planet! One person plays as a cat-like-creature on it's mission to create chaos, and their owner, the other player, tries to stop them by whatever means necessary!

[Skip to the technical bits](#the-technical-bits)

![Example of the looping world](https://storage.googleapis.com/portfolio_test/starduster/loop_example.gif)

For this project I did the following:
- Created some object sprites
- Created the background from layout sketches
- Created and implemented the pulsing outline shader
- Created the particle effects as objects are damaged/cleaned
- Created and implemented the UI sprites
- Coded most of the destruction & cleaning logic
- Coded the looping world
- Implemented animations

This game was made in my own and others spare time over the course of three weeks, for the [Great Spring Game Jam 2021](https://kgeary.itch.io/starduster). [It's available for free and is a measly 40mb download, so there's no reason to not give it a try!](https://kgeary.itch.io/starduster)

In the game, you play as either Herbert (the pet), or Duster (the owner). Herbert's goal is to destroy every object he sees, while Duster's goal is to make sure that the house remains clean

![Visual describer for the win conditions](https://storage.googleapis.com/portfolio_test/starduster/Describing.png)

If you're interested in the development of the looping world and/or outline shader, then read [this blog post](/posts/2021-03-21-starduster), and you can find all of the [source code here](https://github.com/oh-ok/Greenhouse).

We plan on slowly updating Starduster to expand on it's current gameplay and to allow for modern gaming amenities like online multiplayer and input remaping, so keep an eye out!

![Herbert being naughty](https://img.itch.zone/aW1nLzU0ODA1NDkuZ2lm/original/LRBcMs.gif)

![Duster doing their best](https://img.itch.zone/aW1nLzU0ODA1NzYuZ2lm/original/WoE0wX.gif)

# The Technical Bits

## Effects & Shading

There are many ways of creating outlines, especially on 2D objects, but due to the scale and scope of the project the decision was made to keep this element it simple and performant. We knew that we only ever wanted the outlines to be small.. well... outlines that highlight small objects around the main level. As a result, I created a simple shader which copies the silhouette of the sprite/texture in the 8 cardinal directions, creating the illusion of a growing stroke which compliments the pixel art-style.

![](https://i.imgur.com/CypN0VC.gif)
A gif showing the entire ShaderGraph in action.

![](https://i.imgur.com/znELHY5.gif)
A gif showing how the subgraph which creates and offsets the silhouette.

Then in the object's update function, it will update it's material to one with the outline on it. This aspect could be optimised if there were intention to allow more than 2 players using Unity's in-built events, however during development we found they are somewhat unreliable. This approach also prevents the "scattering" of code relating to the interactive objects into other areas of the code-base - i.e. there's no event setup code relating to the interactive objects in the Player scripts. Only the object script handles it's own behavior. 

{%- highlight c# -%}
    private void Update()
    {
        //Switch between shaders depending on who's hovering and the obj state
        if (dCollider.IsTouching(GameObject.Find("PlayerHumanoid").GetComponent<Collider2D>()) && (Destroyed || healthMax-currentHealth>0))
        {
            sprRender.material = outlineMat;
        }
        else if (dCollider.IsTouching(GameObject.Find("PlayerPet").GetComponent<Collider2D>()) && (!Destroyed || healthMax-currentHealth<healthMax))
        {
            sprRender.material = outlineMat;
        }
        else
        {
            sprRender.material = unitMat;
        }
    }
{%- endhighlight-%}

Finally, this approach also allows some customisation, the designer can create materials with different coloured strokes and apply that based on the object as they see fit (defaults are set to this).

![](https://i.imgur.com/OoPih0G.png)