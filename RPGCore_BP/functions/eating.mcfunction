scoreboard players add @e[tag=on_eat] eattick 1
execute as @e [scores={eattick=5}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=9}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=13}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=17}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=21}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=25}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=29}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=33}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=37}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=41}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=45}] at @s run playsound random.eat @a[r=8]
execute as @e [scores={eattick=49}] at @s run playsound random.burp @a[r=8]
effect @e[scores={eattick=49..},hasitem={item=apple,location=slot.weapon.mainhand}] regeneration 3 2
effect @e[scores={eattick=49..},hasitem={item=porkchop,location=slot.weapon.mainhand}] regeneration 3 2
effect @e[scores={eattick=49..},hasitem={item=bread,location=slot.weapon.mainhand}] regeneration 5 2
effect @e[scores={eattick=49..},hasitem={item=cooked_mutton,location=slot.weapon.mainhand}] regeneration 6 2
effect @e[scores={eattick=49..},hasitem={item=cooked_chicken,location=slot.weapon.mainhand}] regeneration 6 2
effect @e[scores={eattick=49..},hasitem={item=cooked_cod,location=slot.weapon.mainhand}] regeneration 6 2
effect @e[scores={eattick=49..},hasitem={item=cooked_beef,location=slot.weapon.mainhand}] regeneration 8 2
effect @e[scores={eattick=49..},hasitem={item=rabbit_stew,location=slot.weapon.mainhand}] regeneration 10 2
effect @e[scores={eattick=49..},hasitem={item=cooked_porkchop,location=slot.weapon.mainhand}] regeneration 8 2
effect @e[scores={eattick=49..},hasitem={item=baked_potato,location=slot.weapon.mainhand}] regeneration 6 2
effect @e[scores={eattick=49..},hasitem={item=pumpkin_pie,location=slot.weapon.mainhand}] regeneration 8 2
effect @e[scores={eattick=49..},hasitem={item=golden_apple,location=slot.weapon.mainhand}] regeneration 8 2
effect @e[scores={eattick=49..},hasitem={item=golden_apple,location=slot.weapon.mainhand}] absorption 120 0
effect @e[scores={eattick=49..},hasitem={item=golden_carrot,location=slot.weapon.mainhand}] regeneration 12 2
effect @e[scores={eattick=49..},hasitem={item=chorus_fruit,location=slot.weapon.mainhand}] regeneration 6 2
execute as @e[scores={eattick=49..},hasitem={item=chorus_fruit,location=slot.weapon.mainhand}] run spreadplayers ~ ~ 1 8 @s
execute as @e[scores={eattick=49..},hasitem={item=chorus_fruit,location=slot.weapon.mainhand}] at @s run playsound mob.endermen.portal @a[r=16]
effect @e[scores={eattick=49..},hasitem={item=enchanted_golden_apple,location=slot.weapon.mainhand}] regeneration 36 2
effect @e[scores={eattick=49..},hasitem={item=enchanted_golden_apple,location=slot.weapon.mainhand}] fire_resistance 300 0
effect @e[scores={eattick=49..},hasitem={item=enchanted_golden_apple,location=slot.weapon.mainhand}] resistance 300 0
effect @e[scores={eattick=49..},hasitem={item=enchanted_golden_apple,location=slot.weapon.mainhand}] absorption 120 3
replaceitem entity @e[scores={eattick=49..}] slot.weapon.mainhand 0 air
tag @e[scores={eattick=49..}] remove on_eat
scoreboard players set @e[scores={eattick=49..},tag=!on_eat] eattick 0