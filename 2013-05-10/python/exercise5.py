'''
Created on 10/mag/2013

@author: anastasiyazadorozhna
'''

import logging
logging.basicConfig()
from pyplasm import *
import scipy
from scipy import *

'''
Exercise2.
Generate the 2D profile curves of the car envelope in the three coordinate directions, embed them in 3D 
(in the x=0, y=0 and z=0 planes, respectively, with the reference frame origin set approximately at the car centroid) 
and mount them together in a "two-and-a-half-dimensional" (2.5D) or "pseudo-3D" model.
'''

#---------------------------------------------------------
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

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

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

dom1D = GRID([20])

def cerchio(r):
    def cerchio0(p):
        a=p[0]
        return [r*SIN(a), r*COS(a)]
    return cerchio0;

def curveHermite(c1):
    dom = GRID([20])
    return MAP(CUBICHERMITE(S1)(c1))(dom);

#vista laterale
p0dietro = [[0.3,1.3],[0.7,0.7],[1,0.7],[2,0.8]]
p1dietro = [[0.3,1.3],[0.9,0.9],[1.2,0.9],[2,1]]
cu0dietro = MAP(BEZIER(S1)(p0dietro))(dom1D)
cu1dietro = MAP(BEZIER(S1)(p1dietro))(dom1D)
p2dietro = POLYLINE([[0.3,1.3],[2,1.2]])
p3dietro = POLYLINE([[0.15,1.6],[2.15,1.6]])
p4dietro = [[0.3,1.3],[0,1.7],[0,2.3],[0,2.5]]
cu4dietro = MAP(BEZIER(S1)(p4dietro))(dom1D)
p5dietro = POLYLINE([[0,2.5],[2.7,2.5]])
p6dietro = [[0,2.5],[0,3],[3,2.7]]
cu6dietro = MAP(BEZIER(S1)(p6dietro))(dom1D)
dietro = STRUCT([cu0dietro,cu1dietro,p2dietro,p3dietro,cu4dietro,p5dietro,cu6dietro])

p0faroDietro = [[0,2.5],[-0.2,2.75],[-0.2,3.25],[0.5,3.5]]
cu0faroDietro = MAP(BEZIER(S1)(p0faroDietro))(dom1D)
p1faroDietro = [[0.1,2.6],[-0.1,2.75],[-0.1,3.25],[0.3,3.3]]
cu1faroDietro = MAP(BEZIER(S1)(p1faroDietro))(dom1D)
p2faroDietro = [[0,2.5],[0.3,2.75],[0.3,3.25],[0.5,3.5]]
cu2faroDietro = MAP(BEZIER(S1)(p2faroDietro))(dom1D)
faroDietro = STRUCT([cu0faroDietro,cu1faroDietro,cu2faroDietro])

p0center = POLYLINE([[5,0.8],[12,0.8]])
p1center = POLYLINE([[5,1],[12,1]])
p2center = POLYLINE([[4.95,1.2],[12.05,1.2]])
p3center = POLYLINE([[4.9,1.6],[12.1,1.6]])
p4center = POLYLINE([[0.75,4],[10.8,3.4]])
p5center = [[10.8,3.4],[12,3.7],[14,3.6],[16.5,2.65]]
cu5center = MAP(BEZIER(S1)(p5center))(dom1D)
center = STRUCT([p0center,p1center,p2center,p3center,p4center,cu5center])

p0avanti = [[15,0.8],[16,0.8],[17,0.8],[17.8,1]]
cu0avanti = MAP(BEZIER(S1)(p0avanti))(dom1D)
p1avanti = POLYLINE([[14.95,1.2],[17.8,1]])
p2avanti = [[14.9,1.6],[16,1.6],[17,1.6],[18,1.45]]
cu2avanti = MAP(BEZIER(S1)(p2avanti))(dom1D)
p3avanti = [[17.8,1],[18.2,1.1],[18,1.6]]
cu3avanti = MAP(BEZIER(S1)(p3avanti))(dom1D)
p4avanti = POLYLINE([[14.35,2.5],[18.1,2.5]])
p5avanti = POLYLINE([[14.35,2.5],[17.6,2.7]])
p6avanti = POLYLINE([[18.1,2.5],[18,2.3]])
p7avanti = POLYLINE([[18,2.3],[17.5,2.3]])
p8avanti = POLYLINE([[18,1.6],[17.5,1.6]])
p9avanti = [[17.5,2.3],[17.3,2.2],[17.3,1.7],[17.5,1.6]]
cu9avanti = MAP(BEZIER(S1)(p9avanti))(dom1D)
p10avanti = [[18,2.3],[18,2.2],[18,1.7],[17.9,1.6]]
cu10avanti = MAP(BEZIER(S1)(p10avanti))(dom1D)
avanti = STRUCT([cu0avanti,p1avanti,cu2avanti,cu3avanti,p4avanti,p5avanti,p6avanti,p7avanti,p8avanti,cu9avanti,cu10avanti])

p0alto = POLYLINE([[0.3,3.3],[11.5,3.1]])
p1alto = [[0.6,2.8],[0.3,2.7],[0.3,3.5],[0.5,3.5]]
cu1alto = MAP(BEZIER(S1)(p1alto))(dom1D)
p2alto = [[11.5,3.1],[13,3],[11.5,2],[11,1.6]]
cu2alto = MAP(BEZIER(S1)(p2alto))(dom1D)
p3alto = POLYLINE([[12,2.5],[12.7,2.5]])
alto = STRUCT([p0alto,cu1alto,cu2alto,p3alto])

p0tetto = [[0.5,3.5],[0,3.8],[0,4],[5,5]]
cu0tetto = MAP(BEZIER(S1)(p0tetto))(dom1D)
p1tetto = [[5,5],[6.43,5.1],[7.86,5.1],[9.3,5]]
cu1tetto = MAP(BEZIER(S1)(p1tetto))(dom1D)
p2tetto = [[9.3,5],[10.2,4.8],[11.1,4.8],[13,3.9]]
cu2tetto = MAP(BEZIER(S1)(p2tetto))(dom1D)
p3tetto = [[13,3.9],[14,3.5],[16,3.5],[18.1,2.5]]
cu3tetto = MAP(BEZIER(S1)(p3tetto))(dom1D)
p4tetto = POLYLINE([[0.90,4],[5.2,5]])
tetto = STRUCT([cu0tetto,cu1tetto,cu2tetto,cu3tetto,p4tetto])

pCircleDietro = [[2,0.8],[5,0.8],[0,8],[0,-8]]
pCircleAvanti = [[12,0.8],[15,0.8],[0,8],[0,-8]]
circleDietro = curveHermite(pCircleDietro)
circleAvanti = curveHermite(pCircleAvanti)

p0portiera = [[6,3.7],[5.5,3.5],[5.3,3.3],[6.2,1.6]]
cu0portiera = MAP(BEZIER(S1)(p0portiera))(dom1D)
p1portiera = [[10.8,3.4],[11.1,2.8],[11.1,2.2],[10.7,1.6]]
cu1portiera = MAP(BEZIER(S1)(p1portiera))(dom1D)
portiera = STRUCT([cu0portiera,cu1portiera])

p0parabrezza = POLYLINE([[8.5,4.8],[9.3,5]])
p1parabrezza = POLYLINE([[8.5,4.8],[11,3.7]])
p2parabrezza = POLYLINE([[11,3.7],[13,3.9]])
parabrezza = STRUCT([p0parabrezza,p1parabrezza,p2parabrezza])

p0finestrino = [[5.3,3.7],[3,4.5],[3.1,4.6],[6,4.9]]
cu0finestrino = MAP(BEZIER(S1)(p0finestrino))(dom1D)
p1finestrino = [[6,4.9],[7.5,5],[8.5,5],[10.8,3.4]]
cu1finestrino = MAP(BEZIER(S1)(p1finestrino))(dom1D)
p2finestrino = POLYLINE([[6,4.9],[6,3.7]])
p3finestrino = POLYLINE([[6.1,4.9],[6.1,3.7]])
p4finestrino = POLYLINE([[6.2,4.9],[6.2,3.7]])
finestrino = STRUCT([cu0finestrino,cu1finestrino,p2finestrino,p3finestrino,p4finestrino])

modelLaterale = STRUCT([dietro,faroDietro,center,avanti,alto,tetto,circleDietro,circleAvanti,portiera,parabrezza,finestrino])
#VIEW(modelLaterale)

#vista avanti
points0 = [[0,0.25],[4,0],[4,0.5],[4,1.6]]
cu0 = MAP(BEZIER(S1)(points0))(dom1D)
points1 = POLYLINE([[0,0.6],[3.75,0.6]])
points2 = [[0,2.1],[3.5,2],[3.75,2],[3.95,2.2]]
cu2 = MAP(BEZIER(S1)(points2))(dom1D)
points3 = POLYLINE([[0,2.2],[3.95,2.2]])
points4cofano = [[0,3.9],[3.5,4],[3.8,4.5],[4,1.6]]
cu4cofano = MAP(BEZIER(S1)(points4cofano))(dom1D)

points5tetto = POLYLINE([[0,5.3],[2,5.3]])
points6tetto = [[2,5.3],[2.8,5.2],[3,5.2],[3.2,3.9]]
cu6tetto = MAP(BEZIER(S1)(points6tetto))(dom1D)
points7tetto = POLYLINE([[0,5.4],[2,5.4]])
points8tetto = [[2,5.4],[2.9,5.3],[3.1,5.3],[3.3,3.85]]
cu8tetto = MAP(BEZIER(S1)(points8tetto))(dom1D)
tettoAvanti = STRUCT([points5tetto,cu6tetto,points7tetto,cu8tetto])

pointsCurva = [[1.3,0.8],[1.5,1],[1.7,1],[4,1.1]]
cuCurva = MAP(BEZIER(S1)(pointsCurva))(dom1D)

points0ruota = POLYLINE([[3,0],[4,0]])
points1ruota = [[2.9,0.25],[2.95,0],[3,0]]
cu1ruota = MAP(BEZIER(S1)(points1ruota))(dom1D)
points2ruota = [[4,1.6],[4.05,0],[4,0]]
cu2ruota = MAP(BEZIER(S1)(points2ruota))(dom1D)
ruotaAvanti = STRUCT([points0ruota,cu1ruota,cu2ruota])

pointsSedile = [[1,3.95],[1.1,4.9],[2,4.9],[2.1,4]]
cuSedile = MAP(BEZIER(S1)(pointsSedile))(dom1D)
points0faro = [[1.9,2.8],[2,2.4],[3.5,2.3],[3.4,2.8]]
cu0Faro = MAP(BEZIER(S1)(points0faro))(dom1D)
points1faro = [[1.9,2.8],[2,3.4],[3.5,3.3],[3.4,2.8]]
cu1Faro = MAP(BEZIER(S1)(points1faro))(dom1D)
faroAvanti = STRUCT([cu0Faro,cu1Faro])

points0griglia = POLYLINE([[0,1.8],[2,1.8]])
points1griglia = POLYLINE([[0,1.3],[2,1.3]])
points2griglia = [[2,1.8],[2.5,1.8],[2.2,1.5],[2,1.3]]
cu2griglia = MAP(BEZIER(S1)(points2griglia))(dom1D)
grigliaAvanti = STRUCT([points0griglia,points1griglia,cu2griglia])

circleAvanti = T([1,2])([1.6,1.55])(MAP(cerchio(0.2))(INTERVALS(2*PI)(36)))

p0specchietto = [[3.3,3.85],[4.3,4.35],[2,0],[0,1]]
cu0specchietto = curveHermite(p0specchietto)
p1specchietto = [[4.3,4.35],[3.7,4.55],[0,1],[-1,0]]
cu1specchietto = curveHermite(p1specchietto)
p2specchietto = [[3.7,4.55],[3.4,4.05],[-2,0],[-0.5,0]]
cu2specchietto = curveHermite(p2specchietto)
specchietto = STRUCT([cu0specchietto,cu1specchietto,cu2specchietto])

modelAvanti = STRUCT([cu0,points1,cu2,points3,cu4cofano,tettoAvanti,cuCurva,ruotaAvanti,cuSedile,faroAvanti,grigliaAvanti,circleAvanti,specchietto])
modelAvantiRibaltato = R([1,3])(PI)(modelAvanti)
modelFront = S([2])([0.9])(R([1,3])(PI/2)(STRUCT([modelAvanti,modelAvantiRibaltato])))
#VIEW(modelFront)

#vista dall'alto
poly = POLYLINE([[0,9.6],[1,9.6]])
p0superiore = [[1,9.6],[4,10],[3.6,6],[3.6,0]]
cu0superiore = MAP(BEZIER(S1)(p0superiore))(dom1D)
p1latoSup = [[2.6,8.5],[3.7,7.7],[3.3,5.7],[3.3,0]]
cu1latoSup = MAP(BEZIER(S1)(p1latoSup))(dom1D)
poly1 = POLYLINE([[0,-9.6],[1,-9.6]])
cu0inferiore = R([2,3])(PI)(cu0superiore)
poly3 = POLYLINE([[0,-7.5],[1,-7.5]])
p1latoInf = [[3.3,0],[3.3,-5],[2.5,-7.5],[1,-7.5]]
cu1latoInf = MAP(BEZIER(S1)(p1latoInf))(dom1D)

p0faroAlto = [[1.7,7.2],[1.5,10],[3,9],[3.2,7.1]]
cu0faroAlto = MAP(BEZIER(S1)(p0faroAlto))(dom1D)
polyFaro = POLYLINE([[1.7,7.2],[3.2,7.1]])
faroAlto = STRUCT([cu0faroAlto,polyFaro])

p2latoSup = POLYLINE([[1.7,7.2],[2.2,3.5]])

poly4 = POLYLINE([[0,-4],[2,-4]])
p1post = [[2,-4],[2.5,-4],[2.5,-7],[2.1,-9.5]]
cu1post = MAP(BEZIER(S1)(p1post))(dom1D)
complessoPosteriore = STRUCT([poly4,cu1post])

p1parabrezzaAlto = [[0,3.5],[2,3.5],[2.5,3],[3.3,0]]
cu1parabrezzaAlto = MAP(BEZIER(S1)(p1parabrezzaAlto))(dom1D)

modelSopra = STRUCT([poly,cu0superiore,cu1latoSup,poly1,cu0inferiore,poly3,cu1latoInf,faroAlto,p2latoSup,complessoPosteriore,cu1parabrezzaAlto])
modelSopraRibaltato = R([1,3])(PI)(modelSopra)
modelUp = R([1,3])(PI/2)(R([2,3])(-PI/2)(STRUCT([modelSopra,modelSopraRibaltato])))
#VIEW(modelUp)

modelEx2 = STRUCT([modelLaterale,T([1,3])([20,-4])(modelFront),T([1,2,3])([9.4,6,-3.5,])(modelUp)])
#VIEW(modelEx2)

'''
Exercise3.
Generate a 3D model of a racing car wheel, and mount four wheel instances in the 2.5D car mock-up.
'''

#settore di anello
def annulus_sector (alpha, r, R):
    dom= PROD([INTERVALS(alpha)(36), T(1)(r)(INTERVALS(R-r)(1))])
    def mapping(v):
        a=v[0]
        r=v[1]
        return [r*COS(a), r*SIN(a)]
    model=MAP(mapping)(dom)
    return model

#settore di anello
def annulus_sectorBullone (alpha, r, R):
    dom= PROD([INTERVALS(alpha)(6), T(1)(r)(INTERVALS(R-r)(1))])
    def mapping(v):
        a=v[0]
        r=v[1]
        return [r*COS(a), r*SIN(a)]
    model=MAP(mapping)(dom)
    return model

#pneumatico
def pneumatico (radius):
    pneumatico = COLOR([0,0,0,0])(TORUS(radius)([32,32]))
    return pneumatico

#cerchione
def cerchione (radiusIntCerchione,radiusExtCerchione,radiusDiscoInterno,radiusPerno,hPerno,numRaggi):
    anello = T([3])([-0.15])(PROD([annulus_sector(2*PI,radiusIntCerchione,radiusExtCerchione), Q(0.3)]))
    discoInterno = T([3])([-0.2])(PROD([CIRCLE(radiusDiscoInterno)([32,32]), Q(0.05)]))
    coloredDiscoInterno = COLOR([0.5,0.5,0.5,1])(discoInterno)
    perno = T([3])([-hPerno/2])(R([1,2])(PI/2)(CYLINDER([radiusPerno,hPerno])(32)))
    perno2 = T([3])([-0.15])(PROD([annulus_sector(2*PI,radiusPerno,radiusPerno+0.1), Q(hPerno)]))
    coloredPerno = COLOR([1.0,0.0,0.0,1.0])(perno)
    raggio = T([2,3])([2.5,0.15])(S([3])([0.1])(OFFSET([0.6,0.6,0.6])(ELLIPSE([0.5,1.8])(8))))
    rotation = R([1,2])(2*PI/numRaggi)
    structRaggi = STRUCT(NN(numRaggi)([rotation,raggio]))
    cerchione = STRUCT([anello,coloredDiscoInterno,coloredPerno,perno2,structRaggi])
    return cerchione

#bulloni
def bulloni (radiusInt,radiusExt,numBulloni):
    bullone = T([1,2])([-0.6,0.85])(PROD([annulus_sectorBullone(2*PI,radiusInt,radiusExt), Q(0.3)]))
    coloredBullone = COLOR([0,0,0,1])(bullone)
    rotation = R([1,2])(2*PI/numBulloni)
    structBulloni = STRUCT(NN(numBulloni)([rotation,coloredBullone]))
    return structBulloni

#puntiDecorativiDisco
def seriePuntiDisco (radiusInt, radiusExt,numSerie):
    punto = PROD([annulus_sector(2*PI,radiusInt,radiusExt), Q(0.1)])
    coloredPunto = COLOR([0,0,0,1])(punto)
    translation = T([1,2])([0.2,0.2])
    serie = STRUCT(NN(4)([translation,coloredPunto]))
    rotation = R([1,2])(2*PI/numSerie)
    structSerie = STRUCT(NN(numSerie)([rotation,T([1])([2])(serie)]))
    return structSerie
    
pneumatico = pneumatico([7,5])
cerchione = cerchione(4.3,5,3.5,1.5,0.3,5)
bulloni = bulloni(0,0.3,5)
punti = seriePuntiDisco(0,0.1,16)

wheel = STRUCT([pneumatico,cerchione,bulloni,punti])
wheelSuMisura = S([1,2,3])([0.2,0.2,0.2])(wheel)
modelEx3 = STRUCT([modelEx2,T([1,2])([3.5,1.2])(wheelSuMisura),T([1,2])([13.5,1.2])(wheelSuMisura)])
#VIEW(modelEx3)

'''
Exercise4.
Generate the 3D model of a steering wheel specifically designed for Formula and Sport cars. 
Mount it the the 2.5D mock-up.
'''

grid = COMP([INSR(PROD),AA(QUOTE)])

def traslazione (p,parameters):
    for item in p:
        item[0] = item[0]+parameters[0]
        item[1] = item[1]+parameters[1]
        item[2] = item[2]+parameters[2]
    return p

def scalamento (p,parameters):
    for item in p:
        item[0] = item[0]*parameters[0]
        item[1] = item[1]*parameters[1]
        item[2] = item[2]*parameters[2]
    return p

def volanteContorno (radius):
    volanteContorno = COLOR([0,0,0,0])(TORUS(radius)([32,32]))
    return volanteContorno

contorno = volanteContorno([5,4.2])

#triangolo centrale
grid1 = T([1,2])([-2.5,1])(grid([[5],[1],[0.4]]))
verts = [[-2,1],[2,1],[0.5,-1.5],[-0.5,-1.5],[-2,1]]
cells = [[1,2,3,4,5]]
triangolo = MKPOL([verts,cells,None])
triangolo_3D = PROD([triangolo,Q(0.4)])
strutturaTriangolo = T([2,3])([-1,-0.2])(STRUCT([grid1,triangolo_3D]))
coloredStrutturaTriangolo = COLOR([0.5,0.5,0.5,1])(strutturaTriangolo)

#dischi decorativi
d1 = T([3])([0.2])(PROD([annulus_sector(2*PI,0,0.8), Q(0.1)]))
coloredD1 = COLOR([0,0,0,0])(d1)
d2 = T([3])([0.3])(PROD([annulus_sector(2*PI,0,0.7), Q(0.1)]))
coloredD2 = COLOR([1,1,0,0])(d2)
structDisks = STRUCT([coloredD1,coloredD2])

p0volante = [[2.5,2],[2.6,2.2],[3.5,2.2],[4.2,1.8]]
p1volante = [[2.5,1],[2.6,0.8],[3.5,0.8],[4.2,0.8]]
cu0vol = BEZIER(S1)(p0volante)
cu1vol = BEZIER(S1)(p1volante)

p0volanteInf = [[2.5,2],[2.6,2.2],[3.5,2.2],[4.2,2]]
p1volanteInf = [[2.5,1],[2.6,0.8],[3.5,0.8],[4.2,1]]
cu0volInf = BEZIER(S1)(p0volanteInf)
cu1volInf = BEZIER(S1)(p1volanteInf)

segmento1 = MAP(BEZIER(S2)([cu0vol,cu1vol]))(GRID([20,20]))
segmento1Pos = T([2,3])([-1,-0.2])(COLOR(BLACK)(PROD([segmento1,Q(0.4)])))
segmento2 = R([1,3])(PI)(segmento1Pos)

segmentoInf = MAP(BEZIER(S2)([cu0volInf,cu1volInf]))(GRID([20,20]))
segmentoInfPos = T([2,3])([-1,-0.2])(COLOR(BLACK)(PROD([segmentoInf,Q(0.4)])))
segmentoInf = T([1])([-0.5])(R([1,2])(-PI/2)(segmentoInfPos))
segmenti = STRUCT([segmento1Pos,segmento2,segmentoInf])

steeringWheel = STRUCT([contorno,coloredStrutturaTriangolo,structDisks,segmenti])
steeringWheelSuMisura = S([1,2,3])([0.2,0.2,0.2])(steeringWheel)
steeringWheelPos = T([1,2,3])([11,4,-4])(R([1,3])(PI/2)(steeringWheelSuMisura))
#VIEW(steeringWheel)

modelEx4 = STRUCT([modelEx2,modelEx3,steeringWheelPos])
VIEW(modelEx4)

'''
Exercise5.
Create at least two interesting car surfaces and add them to the mock-up.
'''

p0faro = [[1.9,2.8],[2,2.4],[3.5,2.3],[3.4,2.8]]
p1faro = [[1.9,2.8],[2,3.4],[3.5,3.3],[3.4,2.8]]
cu0FaroSup = BEZIER(S1)(p0faro)
cu1FaroSup = BEZIER(S1)(p1faro)
faroSurfacePrimo = COLOR(YELLOW)(MAP(BEZIER(S2)([cu0FaroSup,cu1FaroSup]))(GRID([20,20])))
faroSurfaceSecondo = R([1,3])(PI)(faroSurfacePrimo)
fariSurfacePosizionati = S([2])([0.9])(R([1,3])(PI)(STRUCT([faroSurfacePrimo,faroSurfaceSecondo])))

modelEx5 = STRUCT([modelEx2,modelEx3,modelEx4,fariSurfacePosizionati])
#VIEW(modelEx5)












