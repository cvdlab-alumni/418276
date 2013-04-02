//definisco gli elementi principali della struttura

//la base su cui poggia la casa = prato
var base = SIMPLEX_GRID([[6],[6],[0.1]]);
colorBase = [0,1,0,1];//verde
var coloredBase = COLOR(colorBase)(base);

//i muri
var wall1 = SIMPLEX_GRID([[-1.5,0.1],[-1.5,3],[-0.1,3]]);
var wall2 = SIMPLEX_GRID([[-4.5,0.1],[-1.5,3],[-0.1,3]]);
var wall3 = SIMPLEX_GRID([[-1.5,3+0.1],[-1.5+0.1,0.1],[-0.1,3]]);
var wall4 = SIMPLEX_GRID([[-1.5,3+0.1],[-4.5,0.1],[-0.1,3]]);
var structWalls = STRUCT([wall1,wall2,wall3,wall4]);

//parametri utilizzati per la costruzione: altezza pareti (h) e spessore muri (w)
var h = 3;
var w = 0.1;

//tetto
var roof = SIMPLEX_GRID([[-1,4],[-1,4],[-0.1-h,0.2]]);
var colorRoof = [0.45,0.2,0,1];//marrone
var coloredRoof = COLOR(colorRoof)(roof);

//scale
var step1 = SIMPLEX_GRID([[-2.3,1.4],[-1.5+0.1+0.6,0.6],[-0.1,0.1]]);
var step2 = SIMPLEX_GRID([[-2.3,1.4],[-1.5+0.1+0.3,0.3],[-0.1-0.1,0.1]]);
var steps = STRUCT([step1,step2]);

//porta
var door = SIMPLEX_GRID([[-2.5,1],[-1.5+0.1+0.05,0.05],[-0.1-0.1-0.1,1.5]]);
colorDoor = [0.45,0.2,0,1];
var coloredDoor = COLOR(colorDoor)(door);
var maniglia = CUBOID([[0.1],[0.1],[0.1]]);
var tManiglia = T([0,1,2])([3.3,1.30,1.05])(maniglia);
var structDoor =STRUCT([coloredDoor,tManiglia]);

//finestre
var vetro = SIMPLEX_GRID([[-4.5-0.1,0.05],[-2,2],[-0.1-1,1]]);
colorVetro = [0,0,1,0.5];
var coloredVetro = COLOR(colorVetro)(vetro);

var corniceSup = SIMPLEX_GRID([[-4.5-0.1,0.05],[-2,2],[-0.1-1-1,0.05]]);
var corniceInf = SIMPLEX_GRID([[-4.5-0.1,0.05],[-2,2],[-0.1-1+0.05,0.05]]);
var corniceSin = SIMPLEX_GRID([[-4.5-0.1,0.05],[-2+0.05,0.05],[-0.1-1+0.05,1+0.1]]);
var corniceDes = SIMPLEX_GRID([[-4.5-0.1,0.05],[-2-2,0.05],[-0.1-1+0.05,1+0.1]]);

var structCornice = STRUCT([corniceSup,corniceInf,corniceSin,corniceDes]);
var colorCornice = [0.45,0.2,0,1];
var coloredCornice = COLOR(colorCornice)(structCornice);

var finestra = STRUCT([coloredVetro,coloredCornice]);

//struttura casa
var house = STRUCT([structWalls,coloredRoof,steps,structDoor,finestra]);

//panchina
var supporto = SIMPLEX_GRID([[0.2],REPLICA(2)([0.2,-1]),[-0.1,0.3]]);
var tSupporto = T([0,1])([0.2,0.1])(supporto);
var sedile = SIMPLEX_GRID([[0.5],[0.2*2+1+0.2*2],[-0.1-0.3,0.1]]);

var panchina = STRUCT([tSupporto,sedile]);
colorPanchina = [0,0,0,1];//nero
var coloredPanchina = COLOR(colorPanchina)(panchina);

var tColoredPanchina = T([0,1])([4.5+0.2,3])(coloredPanchina);

//struttura risultato generale
var struct_model = STRUCT([coloredBase,house,tColoredPanchina]);
DRAW(struct_model);





