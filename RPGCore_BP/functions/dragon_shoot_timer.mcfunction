scoreboard objectives add ticks dummy
scoreboard players add @a[tag=cooldown] ticks 1
execute as @a[tag=cooldown] if score @s ticks matches 100.. run scoreboard players set @s ticks 0
execute as @a[tag=cooldown] if score @s ticks matches 0 run tag @s remove cooldown
scoreboard players add @e[tag=flightless,family=dhh_dragon] ticks 1
execute as @e[tag=flightless,family=dhh_dragon] if score @s ticks matches 600.. run scoreboard players set @s ticks 0
execute as @e[tag=flightless,family=dhh_dragon] if score @s ticks matches ..0 run tag @s remove flightless
effect @e[tag=flightless,family=dhh_dragon] slow_falling 0
effect @e[tag=flightless,family=dhh_dragon] levitation 0
effect @e[tag=flightless,family=dhh_dragon] speed 0