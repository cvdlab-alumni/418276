'''
Created on 06/apr/2013

@author: anastasiyazadorozhna
'''
import logging
logging.basicConfig()
from pyplasm import *

'''
Exercise1. Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors,
and put them into the STRUCT of an initial building model.
'''

GRID = COMP([INSR(PROD),AA(QUOTE)])

#pillars floor0
#function that defines round pillars on floor0
def Pillar0 ():
    pil = CYLINDER([1.25, 26])(36)
    return T([1,2])([1.25,1.25])(pil)

roundPillarsLine0A = STRUCT(NN(5)([Pillar0(),T([1])([27.5])]))
roundPillarsLine0B = STRUCT([T([2])([50])(Pillar0()),T([1,2])([110,50])(Pillar0())])
squarePillarsLine0 = GRID([[-13.75,2.5,-11.25,2.5,-25,2.5,-25,2.5], [-50,2.5],[-1,25]])

pillars0 = STRUCT([roundPillarsLine0A,roundPillarsLine0B,squarePillarsLine0])
#VIEW(pillars0)

#pillars floor1
#function that defines round pillars on floor1
def Pillar1 ():
    pil = CYLINDER([1.25, 24])(36)
    return T([1,2])([1.25,1.25])(pil)

squarePillarsLine1AA = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillarsLine1AB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillarsLine1BA = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillarsLine1BB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar1t = T([1,2,3])([2.5+25+2.5+25+2.5+25,50,27])(Pillar1())

pillars1 = STRUCT([squarePillarsLine1AA,squarePillarsLine1AB,squarePillarsLine1BA,squarePillarsLine1BB,roundPillar1t])
#VIEW(pillars1)

#pillars floor2
squarePillarsLine2A = GRID([[-55,2.5,-52.5,2.5],[2.5,-62.5],[-52,24,-26]]) 
squarePillarsLine2B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[-50,2.5,-12.5],[-52,24,-26]])

pillars2 = STRUCT([squarePillarsLine2A,squarePillarsLine2B])
#VIEW(pillars2)

#pillars floor3
smallSquarePillars3A = GRID([[1.25], [1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3A = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5], [2.5], [-1,-25,-1,-24,-1,-24,-1,23]])
smallSquarePillars3B = GRID([[1.25,-1.25,-25,1.25], [-1.25,-50,1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5], [-50,2.5], [-1,-25,-1,-24,-1,-24,-1,23]])

pillars3 = STRUCT([smallSquarePillars3A,squarePillarsLine3A,smallSquarePillars3B,squarePillarsLine3B])
#VIEW(pillars3)

building1 = STRUCT([pillars0,pillars1,pillars2,pillars3])
#VIEW(building1)

'''
Exercise2. Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models 
of horizontal partitions, and add them to the STRUCT of the building model.
'''

#function that defines semi-circle on floor0
def semiCircle(r):
    def semiCircle(p):
        alpha = p[0]
        b = p[1]
        a = [b*COS(alpha), b*SIN(alpha)] 
        return a
    dom = PROD([INTERVALS(PI)(36),INTERVALS(r)(1)])
    cerchioO = MAP(semiCircle)(dom)
    semiPlan = PROD([cerchioO,Q(1)])
    return semiPlan

#building base
buildingBase = COLOR(GREEN)(T([3])([-1])(GRID([[112,5],[65],[1]])))

semiPlan0A = GRID([[-13.75,71.25],[-22,43],[1]])
semiPlan0B = GRID([[-85,12.5,-15],[-42,23],[1]])
semiPlan0C = GRID([[-13.75, 12.5],[-18, 4],[1]])
semiPlan0D = T([1,2])([97.5, 53.5])(R([1,2])(-PI/2)(semiCircle(11.5)))
semiPlan0E = T([1,2])([20, 18])(R([1,2])(-PI)(semiCircle(6.25)))
floor0 = STRUCT([semiPlan0A,semiPlan0B,semiPlan0C,semiPlan0D,semiPlan0E,buildingBase])
#VIEW(floor0)

hpartition11 = GRID([[2.5,8.57],[50,3.5,9,2.5],[-1,-25,1]])
hpartition12 = GRID([[-2.5,-8.57,40.22],[50,3.50,-9,2.5],[-1,-25,1]])
hpartition14 = GRID([[-2.5,-8.57,-31.65,-4.58,3.99],[-50,-3.5,9],[-1,-25,1]])
hpartition15 = GRID([[-2.5,-8.57,-31.65,-8.57,8.57],[65],[-1,-25,1]])
hpartition16 = GRID([[-2.5,-8.57,-31.65,-8.57,-8.57,52.64],[65],[-1,-25,1]])
floor1 = STRUCT([hpartition11,hpartition12,hpartition14,hpartition15,hpartition16])
#VIEW(floor1)
     
hpartition21 = GRID([[2.5,5.71],[65],[-1,-25,-1,-24,1]])
hpartition22 = GRID([[-2.5,-5.71,37.14],[2.5,-51,-9,2.5],[-1,-25,-1,-24,1]])
hpartition23 = GRID([[-2.5,-5.71,-37.14,13.57],[2.5],[-1,-25,-1,-24,1]])
verts = [[58.92,0],[45.35,51],[45.35,65],[58.92,65]]
cells = [[1,2,3,4]]
hpartition24 = MKPOL([verts,cells,None])
hpartition24_3D = T([3])([1+25+1+24])(PROD([hpartition24,Q(1)]))
hpartition25 = GRID([[-2.5,-5.71,-37.14,-13.57,53.53],[65],[-1,-25,-1,-24,1]])
floor2 = STRUCT([hpartition21,hpartition22,hpartition23,hpartition24_3D,hpartition25])
#VIEW(floor2)

hpartition31 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition32 = GRID([[2.5,25,2.5,25],[2.5,61.25,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition33 = GRID([[-2.5,-25,-2.5,-25,2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition34 = GRID([[-2.5,-25,-2.5,-25,2.5,34.58],[54.75,-9,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition35 = GRID([[-2.5,-25,-2.5,-25,2.5,-34.58,20.42],[65],[-1,-25,-1,-24,-1,-24,1]])
floor3 = STRUCT([hpartition31,hpartition32,hpartition33,hpartition34,hpartition35])
#VIEW(floor3)

hpartition41 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition42 = GRID([[2.5,25,2.5,25],[2.5,-51.18,11.32],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition43 = GRID([[-2.5,-25,-2.5,-25,2.5,25,2.5,25,2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
floor4 = STRUCT([hpartition41,hpartition42,hpartition43])
#VIEW(floor4)

building2 = STRUCT([building1,floor0,floor1,floor2,floor3,floor4])
VIEW(building2)

















