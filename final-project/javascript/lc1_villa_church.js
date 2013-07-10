//Anastasiya Zadorozhna 418276

//Le Corbusier LC1 villa church

//domain
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

//color
var black = [0.1,0.1,0.1,1];
var blue = [52/255,58/255,144/255,1];
var gray = [128/255,128/255,128/255,1];

//cylinder
function cylinder (r,h){
	var disk = DISK(r)(16);
	var cylinder = EXTRUDE([h])(disk);
	return cylinder;
}

//steel structure
var cyl1 = R([1,2])(-PI/2)(cylinder(0.1,5.75));
var cyl2 = T([0])([6.5])(cyl1);
var cyl3 = T([2])([-4.9])(cyl1);
var cyl4 = T([2])([-4.9])(cyl2);

var smallCyl1 = cylinder(0.1,0.6);
var smallCylStruct = STRUCT([T([1])([5.65])(smallCyl1),T([0,1])([6.5,5.65])(smallCyl1),T([1,2])([5.65,-5.5])(smallCyl1),
							 T([0,1,2])([6.5,5.65,-5.5])(smallCyl1)]);

var cylHorizAnt = T([0,1,2])([6.49,2.375,-4.9])(cylinder(0.1,4.9));
var cylHorizPost = T([1,2])([2.375,-4.9])(cylinder(0.1,4.9));
var cylHorizHigh = T([0,1,2])([0.8,4.73,-4.9])(cylinder(0.1,4.9));

//pillow's support
var cyl5 = R([0,2])(PI/2)(cylinder(0.1,4.65));
var cyl5Pos = T([0,1])([1.875,2.75])(R([0,1])(PI/18)(cyl5));

var cyl6 = R([1,2])([-PI/2])(cylinder(0.1,1.5));
var cyl6Pos = T([0,1])([1.95,2.7])(R([0,1])(PI/12)(cyl6));

var cyl7 = R([0,2])(PI/2)(cylinder(0.1,0.8));
var cyl7Pos = T([1])([4.8])(R([0,1])(-PI/36)(cyl7));

var curveMapping1 = CUBIC_HERMITE(S0)([[1.66,4.17,0],[0.8,4.83,0],[0,0.75,0],[-0.75,0,0]]);
var	curveMapping2 = CUBIC_HERMITE(S0)([[1.465,4.12,0],[0.78,4.63,0],[0,0.25,0],[-0.25,0,0]]);
var curve1 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,0,0.39],[0,0,-0.39]]))(domain);
var curve2 = MAP(CUBIC_HERMITE(S1)([curveMapping1,curveMapping2,[0,0,-0.39],[0,0,0.39]]))(domain);
var curve = STRUCT([curve1, curve2]);

var support = STRUCT([cyl5Pos,cyl6Pos,cyl7Pos,curve]);
var support2 = T([2])([-4.9])(support);

//punte sui cilindri orizontali
var d2 = DOMAIN([[0,1],[0,2*PI]])([20,20]);

var profile1 = BEZIER(S0)([[0,0,0.05],[0.1,0,0]]);
var mapping1 = ROTATIONAL_SURFACE(profile1);
var surface1 = MAP(mapping1)(d2);

var profile2 = BEZIER(S0)([[0,0,-0.05],[0.1,0,0]]);
var mapping2 = ROTATIONAL_SURFACE(profile2);
var surface2 = MAP(mapping2)(d2);

var peakStruct = STRUCT([T([1,2])([5.65,0.6])(surface1),T([0,1,2])([6.5,5.65,0.6])(surface1),T([1,2])([5.65,-5.5])(surface2),
							 T([0,1,2])([6.5,5.65,-5.5])(surface2)]);

//bolts
var diskBolt = COLOR(gray)(DISK(0.05)(16));
var p1 = POLYLINE([[-0.03,0.03],[0.03,-0.03]]);
var p2 = POLYLINE([[-0.03,-0.03],[0.03,0.03]]);
var bolt = STRUCT([diskBolt,p1,p2]);

var steelStructure = STRUCT([cyl1,cyl2,cyl3,cyl4,smallCylStruct,peakStruct,cylHorizAnt,cylHorizPost,cylHorizHigh,support,support2,
							 T([0,1,2])([0.8,4.74,0.1])(bolt),T([0,1,2])([0.8,4.74,-5])(bolt)]);

//pillows

//horizontal pillow
var c00 = BEZIER(S0)([[2.2,2.45,-0.1],[6.48,3.2,-0.1]]);
var c01 = BEZIER(S0)([[2.2,2.45,-4.82],[6.48,3.2,-4.82]]);
var curveHorizBottom = MAP(BEZIER(S1)([c00,c01]))(domain);

var c10 = BEZIER(S0)([[2.2,2.45,-0.1],[6.48,3.2,-0.1]]);
var c11 = BEZIER(S0)([[2,2.85,-0.1],[6.48,3.6,-0.1]]);
var curveHorizLeft = MAP(BEZIER(S1)([c10,c11]))(domain);

var c20 = BEZIER(S0)([[2.2,2.45,-4.82],[6.48,3.2,-4.82]]);
var c21 = BEZIER(S0)([[2,2.85,-4.82],[6.48,3.6,-4.82]]);
var curveHorizRight = MAP(BEZIER(S1)([c20,c21]))(domain);

var c30 = BEZIER(S0)([[6.48,3.2,-0.1],[6.48,3.2,-4.82]]);
var c31 = BEZIER(S0)([[6.48,3.33,-0.1],[6.48+0.3,3.33,-1.67],[6.48+0.3,3.33,-3.26],[6.48,3.33,-4.82]]);
var c32 = BEZIER(S0)([[6.48,3.46,-0.1],[6.48+0.3,3.46,-1.67],[6.48+0.3,3.46,-3.26],[6.48,3.46,-4.82]]);
var c33 = BEZIER(S0)([[6.48,3.6,-0.1],[6.48,3.6,-4.82]]);
var curveHorizFront = MAP(BEZIER(S1)([c30,c31,c32,c33]))(domain);

var c40 = BEZIER(S0)([[2.2,2.45,-0.1],[2.2,2.45,-4.82]]);
var c41 = BEZIER(S0)([[2.12,2.58,-0.1],[2.12-0.3,2.58,-1.67],[2.12-0.3,2.58,-3.26],[2.12,2.58,-4.82]]);
var c42 = BEZIER(S0)([[2.06,2.71,-0.1],[2.06-0.3,2.71,-1.67],[2.06-0.3,2.71,-3.26],[2.06,2.71,-4.82]]);
var c43 = BEZIER(S0)([[2,2.85,-0.1],[2,2.85,-4.82]]);
var curveHorizBack = MAP(BEZIER(S1)([c40,c41,c42,c43]))(domain);

var c50 = BEZIER(S0)([[2,2.85,-0.1],[2,2.85,-4.82]]);
var c51 = BEZIER(S0)([[2.5,2.85,-0.1],[2.5,3.85,-0.2],[2.5,3.85,-4.73],[2.5,2.85,-4.82]]);
var c52 = BEZIER(S0)([[5.98,3.4,-0.1],[5.98,4.4,-0.2],[5.98,4.4,-4.73],[5.98,3.4,-4.82]]);
var c53 = BEZIER(S0)([[6.48,3.6,-0.1],[6.48,3.6,-4.82]]);
var curveHorizTop = MAP(BEZIER(S1)([c50,c51,c52,c53]))(domain);

var horizontalPillow = COLOR(blue)(STRUCT([curveHorizBottom,curveHorizLeft,curveHorizRight,curveHorizFront,curveHorizBack,curveHorizTop]));

//vertical pillow
var verticalPillow = T([0,1])([-3,8.3])(R([0,1])(-PI/2+PI/12)(horizontalPillow));

//disks under the chair's legs
var disk = EXTRUDE([0.05])(DISK(0.1)(16));
var coloredDisk = COLOR(black)(disk);
var diskR = R([1,2])(-PI/2)(coloredDisk);
var disks = T([1])([-0.05])(STRUCT([diskR,T([0])([6.5])(diskR),T([2])([-4.9])(diskR),
					T([0,2])([6.5,-4.9])(diskR)]));

var disk2 = EXTRUDE([0.05])(DISK(0.12)(16));
var diskR2 = R([1,2])(-PI/2)(disk2);
var disks2 = T([1])([-0.1])(STRUCT([diskR2,T([0])([6.5])(diskR2),T([2])([-4.9])(diskR2),
					T([0,2])([6.5,-4.9])(diskR2)]));

//armrest
var c60 = BEZIER(S0)([[0.3,5.775,0.1],[6,5.775,0.1]]);
var c61 = BEZIER(S0)([[0.3,5.775,0.15],[6,5.775,0.15]]);
var stripe1 = COLOR(black)(MAP(BEZIER(S1)([c60,c61]))(domain));

var stripe2 = T([1])([-0.2])(stripe1);
var stripe3 = T([2])([0.4])(stripe1);
var stripe4 = T([1])([-0.2])(stripe3);

var c62 = BEZIER(S0)([[0.3,5.775,0.15],[6,5.775,0.15]]);
var c63 = BEZIER(S0)([[0.3,5.775,0.5],[6,5.775,0.5]]);
var largeStripe = COLOR(blue)(MAP(BEZIER(S1)([c62,c63]))(domain));
var largeStripeInf = T([1])([-0.2])(largeStripe);

var c64 = BEZIER(S0)([[0.3,5.775,0.1],[-0.245,5.9,0.1],[-0.26,5.38,0.1],[0.3,5.575,0.1]]);
var c65 = BEZIER(S0)([[0.3,5.775,0.15],[-0.245,5.9,0.15],[-0.26,5.38,0.15],[0.3,5.575,0.15]]);
var cuLeft1 = COLOR(black)(MAP(BEZIER(S1)([c64,c65]))(domain));
var cuLeft2 = T([2])([0.4])(cuLeft1);

var c66 = BEZIER(S0)([[0.3,5.775,0.5],[-0.245,5.9,0.5],[-0.26,5.38,0.5],[0.3,5.575,0.5]]);
var cuLeft3 = COLOR(blue)(MAP(BEZIER(S1)([c65,c66]))(domain));
var cuLeft = STRUCT([cuLeft1,cuLeft2,cuLeft3]);

var c67 = BEZIER(S0)([[6,5.775,0.1],[6.545,5.8,0.1],[6.7,5.95,0.1],[6.7,5.3,0.1],[6.6,5.575,0.1],[6,5.575,0.1]]);
var c68 = BEZIER(S0)([[6,5.775,0.55],[6.545,5.8,0.55],[6.7,5.95,0.55],[6.7,5.3,0.55],[6.6,5.575,0.55],[6,5.575,0.55]]);
var cuRight = COLOR(black)(MAP(BEZIER(S1)([c67,c68]))(domain));

var armrestLeft = STRUCT([stripe1,stripe2,stripe3,stripe4,largeStripe,largeStripeInf,cuLeft,cuRight]);
var armrestRight = T([2])([-5.55])(armrestLeft);

var modelLC1_villa_church = STRUCT([disks,disks2,steelStructure,horizontalPillow,verticalPillow,armrestLeft,armrestRight]);

DRAW(modelLC1_villa_church);














