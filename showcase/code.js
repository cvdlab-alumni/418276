/**
 * @author Anastasiya Zadorozhna 418276
 * 
 * THE BYCICLE by Leonardo da Vinci
 */

//functions

//annulus sector (settore di corona circolare)
function annulus_sector (alpha,r,R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

//circle sector (settore di cerchio)
function circle_sector (alpha,R) {
  var domain = DOMAIN([[0,alpha],[0,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

//cylinder
function cylinder (r,h){
  var disk = DISK(r)(36);
  var cylinder = EXTRUDE([h])(disk);
  return cylinder;
}

//color of the model
color = [250/255,190/255,135/255];

//domain
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

//wheel
function wheel (rInt,rExt,numOfRays) {
  var sector = annulus_sector(2*PI, rInt, rExt);
  var cerchione = EXTRUDE([0.6])(sector);
  var diskExtruded = cylinder(1,0.6);
  var ray = T([0])([-0.25])(SIMPLEX_GRID([[0.5],[5],[0.6]]));
  var rotation = R([0,1])(2*PI/numOfRays);
  var structOfRays = STRUCT(REPLICA(numOfRays)([rotation,ray]));
  var pivot = T([2])([-1])(cylinder(0.2,2.6)); 
  var result = STRUCT([cerchione,diskExtruded,structOfRays,pivot]); 
  return result;
}

var frontWheel = wheel(5,6,8);
var backWheel = T([0])([22])(frontWheel);

//front fork
var support1 = SIMPLEX_GRID([[2.5],[-3,+4],[0.2]]);

var verts = [[0,0],[0,3],[2.5,3],[1,0]];
var cells = [[0,1,3],[1,2,3]];
var support2_2D = SIMPLICIAL_COMPLEX(verts)(cells);
var support2_3D = EXTRUDE([0.2])(support2_2D);

var supportForward = R([0,1])([-PI/11])(T([0,1,2])([-0.5,-0.4,0.7])(STRUCT([support1,support2_3D])));
var supportBehind = T([2])([-1])(supportForward);
var support = STRUCT([supportForward,supportBehind]);

var forkForward = T([0,1,2])([9.5,-0.4,1])(R([0,1])(PI/2)(EXTRUDE([0.2])(annulus_sector(PI/2,9,10))));
var forkBehind = T([2])([-1.6])(forkForward);
var fork = STRUCT([forkForward,forkBehind]);

//head tube
var element1 = cylinder(0.7,3);
var element2 = cylinder(0.5,7);
var element3 = T([2])([-0.5])(cylinder(0.3,0.6));
var element4 = T([2])([-0.7])(cylinder(0.7,0.2));
var headTube = T([0,1,2])([8,7,0.3])(R([1,2])([-PI/2])(STRUCT([element1,element2,element3,element4])));

//stem
var stem1 = cylinder(0.3,3);
var stem2 = T([2])([-3])(stem1);
var stem = T([0,1,2])([8,13,0.3])(STRUCT([stem1,stem2]));

//central part
var element1Central = T([1,2])([-0.9,-0.85])(SIMPLEX_GRID([[22],[1.8],[0.2]]));
var lato1 = EXTRUDE([0.2])(circle_sector(PI,0.9));
var lato1Positioned = T([0,2])([22,-0.85])(R([0,1])(-PI/2)(lato1));
var lato2Positioned = T([0])([22])(R([0,1])(PI)(lato1Positioned));

var element1Forward = T([1,2])([-0.9,1.3])(SIMPLEX_GRID([[6],[1.8],[0.2]]));
var lato1PositionedForward = T([2])([2.15])(lato2Positioned);
var cForward0 = BEZIER(S0)([[6,0.9,1.5],[7,0.9,1.2],[7.5,0.9,1.2],[9,0.9,-0.65]]);
var cForward1 = BEZIER(S0)([[6,-0.9,1.5],[7,-0.9,1.2],[7.5,-0.9,1.2],[9,-0.9,-0.65]]);
var curvaForward01 = MAP(BEZIER(S1)([cForward0,cForward1]))(domain);
var cForward2 = BEZIER(S0)([[6,0.9,1.3],[7,0.9,1],[7.5,0.9,1],[8.8,0.9,-0.65]]);
var cForward3 = BEZIER(S0)([[6,-0.9,1.3],[7,-0.9,1],[7.5,-0.9,1],[8.8,-0.9,-0.65]]);
var curvaForward23 = MAP(BEZIER(S1)([cForward2,cForward3]))(domain);
var cForward4 = BEZIER(S0)([[6,0.9,1.5],[7,0.9,1.2],[7.5,0.9,1.2],[9,0.9,-0.65]]);
var cForward5 = BEZIER(S0)([[6,0.9,1.3],[7,0.9,1],[7.5,0.9,1],[8.8,0.9,-0.65]]);
var curvaForward45 = MAP(BEZIER(S1)([cForward4,cForward5]))(domain);
var curvaForward45T = T([1])([-1.8])(MAP(BEZIER(S1)([cForward4,cForward5]))(domain));

var element2Forward = T([0,1,2])([16,-0.9,1.3])(SIMPLEX_GRID([[6],[1.8],[0.2]]));
var lato2PositionedForward = T([2])([2.15])(lato1Positioned);
var cForward0A = BEZIER(S0)([[12.8,0.9,-0.65],[14.5,0.9,1.2],[15,0.9,1.2],[16,0.9,1.5]]);
var cForward1A = BEZIER(S0)([[12.8,-0.9,-0.65],[14.5,-0.9,1.2],[15,-0.9,1.2],[16,-0.9,1.5]]);
var curvaForward01A = MAP(BEZIER(S1)([cForward0A,cForward1A]))(domain);
var cForward2A = BEZIER(S0)([[13,0.9,-0.65],[14.5,0.9,1],[15,0.9,1],[16,0.9,1.3]]);
var cForward3A = BEZIER(S0)([[13,-0.9,-0.65],[14.5,-0.9,1],[15,-0.9,1],[16,-0.9,1.3]]);
var curvaForward23A = MAP(BEZIER(S1)([cForward2A,cForward3A]))(domain);
var cForward4A = BEZIER(S0)([[12.8,0.9,-0.65],[14.5,0.9,1.2],[15,0.9,1.2],[16,0.9,1.5]]);
var cForward5A = BEZIER(S0)([[13,0.9,-0.65],[14.5,0.9,1],[15,0.9,1],[16,0.9,1.3]]);
var curvaForward45A = MAP(BEZIER(S1)([cForward4A,cForward5A]))(domain);
var curvaForward45AT = T([1])([-1.8])(MAP(BEZIER(S1)([cForward4A,cForward5A]))(domain));

var centralForward = STRUCT([element1Forward,lato1PositionedForward,curvaForward01,curvaForward23,curvaForward45,curvaForward45T,
              element2Forward,lato2PositionedForward,curvaForward01A,curvaForward23A,curvaForward45A,curvaForward45AT]);

//chain ring
var chainRing = cylinder(2,0.4);
var pivotCentrale = T([2])([-2.2])(cylinder(0.2,3.1));
var dentino = T([1])([1.9])(EXTRUDE([0.4])(circle_sector(PI,0.2)));
var rotation = R([0,1])(2*PI/12);
var structDentini = STRUCT(REPLICA(12)([rotation,dentino]));
var structChainRing = T([0,2])([11,0.8])(STRUCT([chainRing,pivotCentrale,structDentini]));

//pedal
var pedal1 = SIMPLEX_GRID([[0.5],[4],[0.2]]);
var pedal2Forward = T([0,1,2])([0.25,0.3,0.2])(cylinder(0.2,1));
var pedalForward = R([0,1])([PI/11])(T([0,1,2])([10.30,-6.6,1.3])(STRUCT([pedal1,pedal2Forward])));
var pedal2Behind = T([0,1,2])([0.25,0.3,-1])(cylinder(0.2,1));
var pedalBehind = R([0,1])(PI+PI/11)(T([0,1,2])([-10.8,-0.6,-1.2])(STRUCT([pedal1,pedal2Behind])));
var pedals = STRUCT([pedalForward,pedalBehind]);

var centralPart = STRUCT([element1Central,lato1Positioned,lato2Positioned,centralForward,structChainRing,pedals]);

//smal chain ring
var smallChainRing = S([0,1,2])([0.6,0.6,0.6])(T([0,2])([36.5,1.3])(STRUCT([chainRing,structDentini])));

//seat stay
var verts1 = [[0,5],[1,9],[1,5],[0,5]];
var cells1 = [[0,1,3],[1,2,3]];
var part1 = SIMPLICIAL_COMPLEX(verts1)(cells1);
var verts2 = [[1,5],[1,9],[3.5,9],[1,5]];
var cells2 = [[0,1,3],[1,2,3]];
var part2 = SIMPLICIAL_COMPLEX(verts2)(cells2);
var part3 = SIMPLEX_GRID([[1],[5],[0.2]]);
var seatStay = EXTRUDE([0.2])(STRUCT([part1,part2,part3]));
var seatStayForward = T([0,1,2])([21.5,-0.4,1])(seatStay);
var seatStayBehind = T([0,1,2])([21.5,-0.4,-0.3])(seatStay);
var structSeatStay = STRUCT([seatStayForward,seatStayBehind]);

//seat
var c0 = BEZIER(S0)([[0,0,0],[4,9,-0.3],[10,11,-0.7],[17,11,-0.7]]);
var c1 = BEZIER(S0)([[1,0,0],[4,8,-0.3],[10,9,-0.7],[16.5,9,-0.7]]);
var curva01 = MAP(BEZIER(S1)([c0,c1]))(domain);

var c2 = BEZIER(S0)([[0,0,0.5],[4,9,0.8],[10,11,1.2],[17,11,1.2]]);
var c3 = BEZIER(S0)([[1,0,0.5],[4,8,0.8],[10,9,1.2],[16.5,9,1.2]]);
var curva23 = MAP(BEZIER(S1)([c2,c3]))(domain);

var c4 = BEZIER(S0)([[0,0,0],[4,9,-0.3],[10,11,-0.7],[17,11,-0.7]]);
var c5 = BEZIER(S0)([[0,0,0.5],[4,9,0.8],[10,11,1.2],[17,11,1.2]]);
var curva45 = MAP(BEZIER(S1)([c4,c5]))(domain);

var c6 = BEZIER(S0)([[1,0,0],[4,8,-0.3],[10,9,-0.7],[16.5,9,-0.7]]);
var c7 = BEZIER(S0)([[1,0,0.5],[4,8,0.8],[10,9,1.2],[16.5,9,1.2]]);
var curva67 = MAP(BEZIER(S1)([c6,c7]))(domain);

var cA = BEZIER(S0)([[17,11,-0.7],[16.5,9,-0.7]]);
var cB = BEZIER(S0)([[17,11,1.2],[16.5,9,1.2]]);
var curvaAB = MAP(BEZIER(S1)([cA,cB]))(domain);

var cC = BEZIER(S0)([[0,0,0],[1,0,0]]);
var cD = BEZIER(S0)([[0,0,0.5],[1,0,0.5]]);
var curvaCD = MAP(BEZIER(S1)([cC,cD]))(domain);

var seat = T([0,1,2])([10.5,-0.4,0.2])(STRUCT([curva01,curva23,curva45,curva67,curvaAB,curvaCD]));

//chain
var x1 = BEZIER(S0)([[10.45,2.1,0.9],[22,1.2,0.8]]);
var x2 = BEZIER(S0)([[10.45,2.1,1.1],[22,1.2,1]]);
var curva1 = SKELETON(0)(MAP(BEZIER(S1)([x1,x2]))(domain));
var x3 = BEZIER(S0)([[10.45,-2.1,0.9],[22,-1.3,0.8]]);
var x4 = BEZIER(S0)([[10.45,-2.1,1.1],[22,-1.3,1]]);
var curva2 = SKELETON(0)(MAP(BEZIER(S1)([x3,x4]))(domain));
var x5 = BEZIER(S0)([[10,1.9,0.9],[8.55,1,0.9],[8.6,-1,0.9],[10,-1.9,0.8]]);
var x6 = BEZIER(S0)([[10,1.9,1.1],[8.55,1,1.1],[8.6,-1,1.1],[10,-1.9,1]]);
var curva3 = SKELETON(0)(MAP(BEZIER(S1)([x5,x6]))(domain));
var x7 = BEZIER(S0)([[22,1.2,0.8],[23.6,0.9,0.8],[23.6,-1,0.8],[22,-1.3,0.8]]);
var x8 = BEZIER(S0)([[22,1.2,1],[23.6,0.9,1],[23.6,-1,1],[22,-1.3,1]]);
var curva4 = SKELETON(0)(MAP(BEZIER(S1)([x7,x8]))(domain));
var chain = COLOR([0,0,0])(STRUCT([curva1,curva2,curva3,curva4]));

var model = STRUCT([COLOR(color)(STRUCT([frontWheel,backWheel,support,fork,headTube,stem,centralPart,smallChainRing,structSeatStay,seat])),chain]);



















