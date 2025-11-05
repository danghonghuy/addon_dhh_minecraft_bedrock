scoreboard players random @s newb_food 1 2
replaceitem entity @s[scores={newb_food=1}] slot.weapon.mainhand 0 apple
replaceitem entity @s[scores={newb_food=2}] slot.weapon.mainhand 0 bread
tag @s add on_eat
playanimation @s eat_item_custom
scoreboard players set @s newb_food 0
scoreboard players set @s eattick 0
effect @s slowness 2 1 true