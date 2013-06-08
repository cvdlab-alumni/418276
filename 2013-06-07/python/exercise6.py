'''
Created on 08/giu/2013

@author: anastasiyazadorozhna
'''

'''
Exercise 6
Write a function to export a LAR model, which is a pair (V, FV), where V is an array of points and FV is the compact representation 
of the characteristic matrix of 2D faces, in the file format OBJ.
'''

##in ingresso alla funzione un modello lar, ovvero una coppia v,fv
##in uscita viene restituito il testo, una stringa che rappresenta il contenuto del file obj.
def lar_to_obj(V,FV):
    result = ""

    for i in (0,V.length):
        result = result + "point" + ": ("
        for coordinata in (0, V[i].length):
            result = result  + V[i][coordinata]
            if(coordinata != V[i].length-1):
                result = result + ", "
        result = result + ") " + "\n"

    for i in (0, FV.length):
        result = result + "facet" + ": ("
        for vertex in (0, FV[i].length):
            result = result + FV[i][vertex]
            if(vertex != FV[i].length-1):
                result = result + ", "
        result = result + ") " + "\n"
    return result

##esempio fatto in aula

V = [[0,6],
[0,0],
[3,0],
[6,0],
[0,3],
[3,3],
[6,3],
[6,6],
[3,6]]

FV = [[5,6,7,8],
[0,5,8],
[0,4,5],
[1,2,4,5],
[2,3,5,6],
[0,8,7], 
[3,6,7], 
[1,2,3], 
[0,1,4]
]

test = lar_to_obj(V,FV)