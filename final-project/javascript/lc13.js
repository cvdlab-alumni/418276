//Anastasiya Zadorozhna 418276

//Le Corbusier LC13

//domain
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

//color
var black = [0.1,0.1,0.1,1];

//cylinder
function cylinder (r,h){
	var disk = DISK(r)(16);
	var cylinder = EXTRUDE([h])(disk);
	return cylinder;
}

//steel structure

//armrest
var leg = cylinder(0.1,5);
var orizontalPart = cylinder(0.1,5.9);

//curve of the armrest
var curveMapping1 = CUBIC_HERMITE(S0)([[0.4,5,0],[0.7,5.5,0],[0,0.75,0],[0.75,0,0]]);
var curveMapping2 = CUBIC_HERMITE(S0)([[0.6,5,0],[0.7,5.3,0],[0,0.25,0],[0.25,0,0]]);
var curve1 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,0,0.39],[0,0,-0.39]]))(domain);
var curve2 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,0,-0.39],[0,0,0.39]]))(domain);
var curveLeft = STRUCT([curve1, curve2]);
var curveRight = R([0,2])(PI)(curveLeft);

var steelArmrest1 = STRUCT([T([0])([0.5])(R([1,2])(-PI/2)(leg)),T([0])([6.8])(R([1,2])(-PI/2)(leg)),
						   T([0,1])([0.7,5.4])(R([0,2])(PI/2)(orizontalPart)),curveLeft,T([0])([7.3])(curveRight)]);
var steelArmrest2 = T([2])([-6.3])(steelArmrest1);

//other elements of the steel structure
var steelElement1 = cylinder(0.09,6.3);
var steelElement1a = R([0,2])(PI/2)(steelElement1);
var steelElement1b = T([0,1])([0.5,2.1])(R([0,1])(PI/36)(steelElement1a));

var steelElement2 = T([2])([-6.3])(steelElement1b);

var steelElement3 = cylinder(0.09,6.3);
var steelElement3a = R([0,2])(PI)(steelElement3);
var steelElement3b = T([0,1])([6.8,2.65])(steelElement3a);

var steelElement4 = T([0,1])([3.65,2.375])(steelElement3a);

var steelElement5 = T([0,1])([0.5,3.5])(steelElement3a);

//small pillow's supports
var smallSupportElement = R([1,2])(-PI/2)(cylinder(0.08,0.23));
var smallSupportStructure = STRUCT([T([0,1,2])([6.8,2.7,-1.3])(smallSupportElement),T([0,1,2])([6.8,2.7,-5])(smallSupportElement),
							   T([0,1,2])([3.65,2.45,-1.3])(smallSupportElement),T([0,1,2])([3.65,2.45,-5])(smallSupportElement)]);

//support
var c0support = BEZIER(S0)([[1.5,4.6,-3],[2.2,2,-3],[2.5,2.5,-3],[3.5,2.5,-3],[4,2.7,-3]]);
var c1support = BEZIER(S0)([[1.5,4.6,-4],[2.2,2,-4],[2.5,2.5,-4],[3.5,2.5,-4],[4,2.7,-4]]);
var curveSupport1 = MAP(BEZIER(S1)([c0support,c1support]))(domain);

var c2support = BEZIER(S0)([[1.55,4.6,-3],[2.35,2,-3],[2.5,2.55,-3],[3.5,2.55,-3],[4,2.7,-3]]);
var c3support = BEZIER(S0)([[1.55,4.6,-4],[2.35,2,-4],[2.5,2.55,-4],[3.5,2.55,-4],[4,2.7,-4]]);
var curveSupport2 = MAP(BEZIER(S1)([c2support,c3support]))(domain);

var curveSupport3 = MAP(BEZIER(S1)([c0support,c2support]))(domain);
var curveSupport4 = MAP(BEZIER(S1)([c1support,c3support]))(domain);

var supportStructure = STRUCT([curveSupport1,curveSupport2,curveSupport3,curveSupport4]);

var steelStructure = STRUCT([steelArmrest1,steelArmrest2,steelElement1b,steelElement2,steelElement3b,steelElement4,steelElement5,
							 smallSupportStructure,supportStructure]);

//disks under the chair's legs
var disk = EXTRUDE([0.1])(DISK(0.12)(16));
var coloredDisk = COLOR(black)(disk);
var diskR = R([1,2])(-PI/2)(coloredDisk);
var disks = STRUCT([T([0,1])([0.5,-0.1])(diskR),T([0,1])([6.8,-0.1])(diskR),T([0,1,2])([0.5,-0.1,-6.3])(diskR),
					T([0,1,2])([6.8,-0.1,-6.3])(diskR)]);

//armrest's pillows

//left element
var c00 = BEZIER(S0)([[2.5,5.3,0.35],[5.7,5.3,0.35]]);
var c01 = BEZIER(S0)([[2.5,5.7,0.35],[5.7,5.7,0.35]]);
var curveArmrest1 = MAP(BEZIER(S1)([c00,c01]))(domain);

//right element
var curveArmrest2 = T([2])([-0.5])(curveArmrest1);

//up element
var c02 = BEZIER(S0)([[2.5,5.7,0.35],[5.7,5.7,0.35]]);
var c03 = BEZIER(S0)([[2.5,5.7,-0.35],[5.7,5.7,-0.35]]);
var curveArmrest3 = MAP(BEZIER(S1)([c02,c03]))(domain);

//front element
var c04 = BEZIER(S0)([[5.7,5.3,0.35],[5.7,5.3,-0.1],[5.7,5.5,0.2],[5.7,5.5,-0.2],[5.7,5.3,0.1],[5.7,5.3,-0.35]]);
var c05 = BEZIER(S0)([[5.7,5.7,0.35],[5.7,5.7,-0.35]]);
var curveArmrest4 = MAP(BEZIER(S1)([c04,c05]))(domain);

//back element
var curveArmrest5 = T([0])([-3.2])(curveArmrest4);

//down element
var c06 = BEZIER(S0)([[2.5,5.3,0.35],[2.5,5.3,-0.1],[2.5,5.5,0.2],[2.5,5.5,-0.2],[2.5,5.3,0.1],[2.5,5.3,-0.35]]);
var c07 = BEZIER(S0)([[5.7,5.3,0.35],[5.7,5.3,-0.1],[5.7,5.5,0.2],[5.7,5.5,-0.2],[5.7,5.3,0.1],[5.7,5.3,-0.35]]);
var curveArmrest6 = MAP(BEZIER(S1)([c06,c07]))(domain);

var pillowArmrest1 = COLOR(black)(STRUCT([curveArmrest1,curveArmrest2,curveArmrest3,curveArmrest4,curveArmrest5,curveArmrest6]));
var pillowArmrest2 = T([2])([-6.3])(pillowArmrest1);

//orizontal pillow

//left element
var c10 = BEZIER(S0)([[2.5,2.6,-0.3],[8,3,-0.3]]);
var c11 = BEZIER(S0)([[2.5,4.5,-0.3],[8,4.9,-0.3]]);
var curveOrizontalPillow1 = MAP(BEZIER(S1)([c10,c11]))(domain);

//right element
var curveOrizontalPillow2 = T([2])([-5.7])(curveOrizontalPillow1);

//down element
var c12 = BEZIER(S0)([[2.5,2.6,-6],[8,3,-6]]);
var curveOrizontalPillow3 = MAP(BEZIER(S1)([c10,c12]))(domain);

//front element
var c13 = BEZIER(S0)([[8,3,-0.3],[8,4.9,-0.3]]);
var c14 = BEZIER(S0)([[8,3,-6],[8,4.9,-6]]);
var curveOrizontalPillow4 = MAP(BEZIER(S1)([c13,c14]))(domain);

//back element
var c15 = BEZIER(S0)([[2.5,2.6,-0.3],[2.5,4.5,-0.3]]);
var c16 = BEZIER(S0)([[2.5,2.6,-6],[2.5,4.5,-6]]);
var curveOrizontalPillow5 = MAP(BEZIER(S1)([c15,c16]))(domain);

//up element
var c17 = BEZIER(S0)([[2.5,4.5,-2.2],[3,5,-2.2],[7,5,-2.2],[8,4.9,-2.2]]);
var c18 = BEZIER(S0)([[2.5,4.5,-4.1],[3,5,-4.1],[7,5,-4.1],[8,4.9,-4.1]]);
var c19 = BEZIER(S0)([[2.5,4.5,-6],[8,4.9,-6]]);
var curveOrizontalPillow6 = MAP(BEZIER(S1)([c11,c17,c18,c19]))(domain);

var orizontalPillow = COLOR(black)(STRUCT([curveOrizontalPillow1,curveOrizontalPillow2,curveOrizontalPillow3,curveOrizontalPillow4,
										   curveOrizontalPillow5,curveOrizontalPillow6]));

//vertical pillow
var verticalPillow = R([0,1])(-PI/2+PI/12)(S([0,1])([0.8,0.9])(orizontalPillow));

var modelLC13 = STRUCT([steelStructure,disks,pillowArmrest1,pillowArmrest2,orizontalPillow,T([0,1])([-3.3,10])(verticalPillow)]);

DRAW(modelLC13);
















