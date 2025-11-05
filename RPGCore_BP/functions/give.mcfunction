scoreboard players remove @s[scores={need_count=1..}] need_count 1


execute as @s[tag=need,tag=need_log,scores={need_count=1..}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> Thanks, I still need "},{"score":{"name":"@s","objective":"need_count"}},{"text":" oak logs"}]}
execute as @s[tag=need,tag=need_beef,scores={need_count=1..}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> Thanks, I still need "},{"score":{"name":"@s","objective":"need_count"}},{"text":" steaks"}]}
execute as @s[tag=need,tag=need_iron,scores={need_count=1..}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> Thanks, I still need "},{"score":{"name":"@s","objective":"need_count"}},{"text":" iron ingots"}]}
execute as @s[tag=need,tag=need_diamond,scores={need_count=1..}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> Thanks, I still need "},{"score":{"name":"@s","objective":"need_count"}},{"text":" diamonds"}]}



execute as @s[tag=need,tag=need_log,scores={need_count=0}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> Thanks a lot! I have enough building materials now. Got any diamonds? If so, I'm with you."}]}
execute as @s[tag=need,tag=need_beef,scores={need_count=0}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> I won't have to worry about food anymore! Got any spare diamonds? If you do, I'll follow you, bro."}]}
execute as @s[tag=need,tag=need_iron,scores={need_count=0}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> This should be enough for those redstone contraptions. Do you have any diamonds? I can come with you."}]}
execute as @s[tag=need,tag=need_diamond,scores={need_count=0}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> This is enough to complete my diamond gear. Got any spare diamonds? I can be your bodyguard from now on."}]}
execute as @s[tag=need,tag=need_apple,scores={need_count=0}] run tellraw @a[r=32] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> This will be enough to keep me alive. Got any diamonds? If so, I'll go exploring with you."}]}

event entity @s[tag=need,scores={need_count=0}] can_tame

tag @s[tag=need,scores={need_count=0}] remove need