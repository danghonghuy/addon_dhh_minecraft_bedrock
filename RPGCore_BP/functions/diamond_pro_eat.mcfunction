scoreboard players random @s newb_food 1 20
replaceitem entity @s[scores={newb_food=1..5}] slot.weapon.mainhand 0 golden_apple
replaceitem entity @s[scores={newb_food=6..10}] slot.weapon.mainhand 0 chorus_fruit
replaceitem entity @s[scores={newb_food=11..17}] slot.weapon.mainhand 0 golden_carrot
replaceitem entity @s[scores={newb_food=18..19}] slot.weapon.mainhand 0 golden_apple
replaceitem entity @s[scores={newb_food=20}] slot.weapon.mainhand 0 enchanted_golden_apple
tag @s add on_eat
playanimation @s eat_item_custom
scoreboard players set @s newb_food 0
scoreboard players set @s eattick 0
effect @s slowness 2 1 true