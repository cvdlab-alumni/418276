'''
Created on 08/giu/2013

@author: anastasiyazadorozhna
'''

import logging
logging.basicConfig()
from pyplasm import *
import scipy
from scipy import *

'''
Exercise1.
A digital terrain model (DTM) is normally defined as a map that associates the vertices of a simplicial decomposition of a 2D rectangle (corresponding 
to a geographical map) with three coordinate functions x(u,v), y(u,v), z(u,v), where x(u,v) and y(u,v) are the selectors of the first and second 
coordinate of the vertices, and z(u,v) provides the height (altitude) of vertices. This one can be obtained by adding or subtracting a (relatively small)
random number to the altitude values. HINT: To provide the initial values of altitude it is recommended to use either some mathematical function of two 
variables, or a surface generated from a few control points. The random correction of altitude must obviously be executed in a second computing stage.
Produce a model of mountainous terrain using the approach described above.
'''

def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])

##function that create a digital terrain model
domain = PROD([INTERVALS(15)(15),INTERVALS(10)(5)])
def createTerrainModel():
    def createTerrainModel0 (v):
        x = v[0]
        y = v[1]
        z = math.fabs(2*COS(v[0])+SIN(v[1])+0.3*random.random())

        ##create the valleys
        if((x<5 and y<8) or (x>6 and y>1 and y<7)):
            z = 0
        return [x,y,z]
    return createTerrainModel0;

mapping = createTerrainModel()

##add the color to the terrain model
model1 = COLOR([0.5, 0.5, 0.5, 1.0])(MAP(mapping)(domain))
##VIEW(model1)

'''
Exercise2.
A lake can be obtained by adding a colored parallelepiped (green-water) to a digital terrain model, 
in such a way that the height of the parallelepiped gets higher than the altitude of the bottom-valley pattern.
A suitable lake model should be added to the mountains defined by the previous exercise.
'''

##first lake
lake1 = CUBOID([1.5,2.8,0.05])
coloredLake1 = COLOR([0.0, 0.0, 1.0, 1.0])(lake1)
lakePositioned1 = T([1,2])([0.5,0.5])(coloredLake1)

##second lake
lake2 = CUBOID([1,2.5,0.05])
coloredLake2 = COLOR([0.0, 0.0, 1.0, 1.0])(lake2)
lakePositioned2 = T([1,2])([7.5,2.5])(coloredLake2)
model2 = STRUCT([model1,lakePositioned1,lakePositioned2])
VIEW(model2)
