scoreboard players random @s newb_food 1 10
replaceitem entity @s[scores={newb_food=1..2}] slot.weapon.mainhand 0 rabbit_stew
replaceitem entity @s[scores={newb_food=3..4}] slot.weapon.mainhand 0 pumpkin_pie
replaceitem entity @s[scores={newb_food=5..6}] slot.weapon.mainhand 0 baked_potato
replaceitem entity @s[scores={newb_food=7..9}] slot.weapon.mainhand 0 cooked_beef
replaceitem entity @s[scores={newb_food=10}] slot.weapon.mainhand 0 golden_apple
tag @s add on_eat
playanimation @s eat_item_custom
scoreboard players set @s newb_food 0
scoreboard players set @s eattick 0
effect @s slowness 2 1 true