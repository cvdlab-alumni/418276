//Anastasiya Zadorozhna 418276

//Le Corbusier LC13

//domain
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

//color
var black = [0.1,0.1,0.1,1];
var brown = [205/255,133/255,63/255,1];

//cylinder
function cylinder (r,h){
	var disk = DISK(r)(16);
	var cylinder = EXTRUDE([h])(disk);
	return cylinder;
}

//cylinder 64
function cylinderTop (r,h){
	var disk = DISK(r)(64);
	var cylinder = EXTRUDE([h])(disk);
	return cylinder;
}

//base of the table
var curveMapping1 = CUBIC_HERMITE(S0)([[0,0,-0.5],[0.3,0,0],[0,0,0.75],[0.75,0,0]]);
var curveMapping2 = CUBIC_HERMITE(S0)([[0.2,0,-0.5],[0.3,0,-0.2],[0,0,0.25,],[0.25,0,0]]);
var curve1 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,0.39,0],[0,-0.39,0]]))(domain);
var curve2 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,-0.39,0],[0,0.39,0]]))(domain);
var curveLeft1 = STRUCT([curve1, curve2]);
var curveLeft2 = T([2])([-7])(R([1,2])(PI)(curveLeft1));
var curveRight1 = T([0])([7])(R([0,1])(PI)(curveLeft1));
var curveRight2 = T([0,2])([7,-7])(R([0,2])(PI)(curveLeft1));

var cyl1 = T([0,2])([0.3,-0.1])(R([0,2])(PI/2)(cylinder(0.1,6.4)));
var cyl2 = T([2])([-6.8])(cyl1);
var cyl3 = T([0,2])([0.1,-6.5])(cylinder(0.1,6));
var cyl4 = T([0])([6.8])(cyl3);

var structBottom = STRUCT([curveLeft1,curveLeft2,curveRight1,curveRight2,cyl1,cyl2,cyl3,cyl4]);

var structTop = T([1])([7])(structBottom);

var cyl5 = T([0,2])([0.17,-0.17])(R([1,2])(-PI/2)(cylinder(0.1,7)));
var cyl6 = T([0])([6.65])(cyl5);
var cyl7 = T([2])([-6.65])(cyl5);
var cyl8 = T([2])([-6.67])(cyl6);

var cylDiagonale = T([0,1])([6.65,0.2])(R([1,2])([-PI/2])(cylinder(0.1,9.4)));
var cylDiagonalePos = T([0,1,2])([2.25,-4.7,-0.17])(R([0,1])(PI/4)(cylDiagonale));

var cylDiagonale2 = R([1,2])([-PI/2])(cylinder(0.1,9.4));
var cylDiagonalePos2 = T([0,1,2])([0.17,0.2,-0.17])(R([1,2])(-PI/4)(cylDiagonale2));

var cylDiagonale3 = T([0,2])([0.17,-6.82])(R([1,2])([-PI/2])(cylinder(0.1,9.4)));
var cylDiagonalePos3 = T([1])([0.25])(R([0,1])(-PI/4)(cylDiagonale3));

var cylDiagonale4 = R([1,2])([-PI/2])(cylinder(0.1,9.4));
var cylDiagonalePos4 = T([0,1,2])([6.82,0.2,-6.84])(R([1,2])(PI/4)(cylDiagonale4));

var baseStruct = COLOR(black)(STRUCT([structBottom,structTop,cyl5,cyl6,cyl7,cyl8,cylDiagonalePos,cylDiagonalePos2,
									  cylDiagonalePos3,cylDiagonalePos4]));

//top plain
var desk = R([1,2])(-PI/2)(COLOR(brown)(cylinderTop(9.25,0.2)));
var deskT = T([0,1,2])([3.5,7.1,-3.5])(desk);

var modelLC15 = STRUCT([baseStruct,deskT]);

DRAW(modelLC15);






