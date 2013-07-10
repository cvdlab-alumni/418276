//Anastasiya Zadorozhna 418276

//Le Corbusier LC CASIERS STANDARD

//domain
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

//colors
var beige = [255/255,228/255,196/255,1];
var bordeaux = [128/255,0/255,0/255,1];
var rubino = [55/255,0/255,18/255,1];

//cylinder
function cylinder (r,h){
	var disk = DISK(r)(16);
	var cylinder = EXTRUDE([h])(disk);
	return cylinder;
}

//box1
var bottom1 = SIMPLEX_GRID([[4],[-2,0.1],[2]]);
var top1 = SIMPLEX_GRID([[4],[-5.9,0.1],[2]]);
var left1 = SIMPLEX_GRID([[0.1],[-2.1,3.8],[2]]);
var right1 = T([0])([3.9])(left1);
var back1 = SIMPLEX_GRID([[-0.1,3.8],[-2.1,3.8],[0.1]]);

var box1 = COLOR(beige)(STRUCT([bottom1,top1,left1,right1,back1]));

//box2
var box2 = T([0])([4.01])(box1);

//box3
var box3 = T([0])([8.02])(box1);

//box4
var box4 = T([0])([12.03])(box1);

//bottom element
var bottom = COLOR(beige)(SIMPLEX_GRID([[-2,12.03],[-1.9,0.1],[-0.2,1.6]]));

var externalStructure = STRUCT([box1,box2,box3,box4,bottom]);

//internal box2
var internalBottom2 = SIMPLEX_GRID([[-4.11,3.79],[-2.1,0.01],[-0.1,1.9]]);
var internalTop2 = T([1])([3.79])(internalBottom2);
var internalLeft2 = SIMPLEX_GRID([[-4.11,0.01],[-2.1,3.8],[-0.1,1.9]]);
var internalRight2 = T([0])([3.79])(internalLeft2);
var internalBack2 = SIMPLEX_GRID([[-4.11,3.79],[-2.1,3.79],[-0.1,0.01]]);

var verticalShelf = SIMPLEX_GRID([[-5.95,0.1],[-2.1,3.8],[-0.1,1.9]]);
var orizontalShelf1 = SIMPLEX_GRID([[-6.05,1.85],[-3.2,0.1],[-0.1,1.9]]);
var orizontalShelf2 = T([0,1])([-1.95,1.6])(orizontalShelf1);
var shelvesBox2 = COLOR(bordeaux)(STRUCT([verticalShelf,orizontalShelf1,orizontalShelf2]));

var internalBox2 = COLOR(bordeaux)(STRUCT([internalBottom2,internalTop2,internalLeft2,internalRight2,internalBack2,shelvesBox2]));

//internal box4
var internalBox4 = T([0])([8.02])(internalBox2);

//door box1
var door = SIMPLEX_GRID([[-0.1,3.8],[-2.1,3.8],[-1.9,0.1]]);
var handle = SIMPLEX_GRID([[-1,0.1,-2,0.1],[-5.4,0.2],[-2,0.1]]);
var doorBox1 = COLOR(rubino)(STRUCT([door,handle]));

//door box3 
var doorBox3 = T([0])([8.02])(doorBox1);

//support1
var c1 = COLOR(beige)(cylinder(0.25,1.3));
var c2 = cylinder(0.25,0.1);

var d2 = DOMAIN([[0,1],[0,2*PI]])([20,20]);
var profile = BEZIER(S0)([[0.25,0,0.5],[0.5,0,0.25],[1,0,0.25],[1.5,0,0]]);
var mapping = ROTATIONAL_SURFACE(profile);
var surface = MAP(mapping)(d2);

var disk = DISK(1.5)(16);

var support1 = STRUCT([T([0,1,2])([4.25,0.6,1])(R([1,2])(-PI/2)(c1)),T([0,1,2])([4.25,0.5,1])(R([1,2])(-PI/2)(c2)),
					   T([0,2])([4.25,1])(R([1,2])(-PI/2)(COLOR(beige)(surface))),T([0,2])([4.25,1])(R([1,2])(-PI/2)(COLOR(beige)(disk)))]);

//support2
var support2 = T([0])([8.02])(support1);

var modelLC_casiers_standard = STRUCT([externalStructure,internalBox2,internalBox4,doorBox1,doorBox3,support1,support2]);

DRAW(modelLC_casiers_standard);




