import json
file = open('chengyu.txt', encoding="utf8")
lines = file.readlines()

chengyu_list = []

for line in lines:
    split = line.split()
    pinyin = f'{split[2]} {split[3]} {split[4]} {split[5]}'
    chengyu_list.append({'simplified': split[0], 
      'traditional': split[1], 
      'pinyin': pinyin, 
      'explanation': ' '.join(split[6:])}) 

out = open("chengyu.json", "w", encoding='utf-8')
json.dump(chengyu_list, out, ensure_ascii=False)

file.close()