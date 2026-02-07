import math
Atk = 2237
for defe in range(1, 200):
    print('방어력:', defe, '데미지:', math.pow(max(0, Atk - math.pow(defe, 1.5)), 1.5) / 5)