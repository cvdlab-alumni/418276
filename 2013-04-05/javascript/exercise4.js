//adapt pyplasm code to plasm.js code
T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

//Exercise1
//Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors,
//and put them into the STRUCT of an initial building model.

//pillars floor0
//function that defines round pillars on floor0
function Pillar0 (){
    pil = EXTRUDE([26])(DISK(1.25)(36))
    return T([1,2])([1.25,1.25])(pil)
}

roundPillarsLine0A = STRUCT(NN(5)([Pillar0(),T([1])([27.5])]))
roundPillarsLine0B = STRUCT([T([2])([50])(Pillar0()),T([1,2])([110,50])(Pillar0())])
squarePillarsLine0 = GRID([[-13.75,2.5,-11.25,2.5,-25,2.5,-25,2.5], [-50,2.5],[-1,25]])

pillars0 = STRUCT([roundPillarsLine0A,roundPillarsLine0B,squarePillarsLine0])
//VIEW(pillars0)

//pillars floor1
//function that defines round pillars on floor1
function Pillar1 (){
    pil = EXTRUDE([24])(DISK(1.25)(36))
    return T([1,2])([1.25,1.25])(pil)
}

squarePillarsLine1AA = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillarsLine1AB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillarsLine1BA = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillarsLine1BB = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar1t = T([1,2,3])([2.5+25+2.5+25+2.5+25,50,27])(Pillar1())

pillars1 = STRUCT([squarePillarsLine1AA,squarePillarsLine1AB,squarePillarsLine1BA,squarePillarsLine1BB,roundPillar1t])
//VIEW(pillars1)

//pillars floor2
squarePillarsLine2A = GRID([[-55,2.5,-52.5,2.5], [2.5,-62.5], [-52,24,-26]]) 
squarePillarsLine2B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5], [-50,2.5,-12.5], [-52,24,-26]])

pillars2 = STRUCT([squarePillarsLine2A,squarePillarsLine2B])
//VIEW(pillars2)

//pillars floor3
smallSquarePillars3A = GRID([[1.25], [1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3A = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5], [2.5], [-1,-25,-1,-24,-1,-24,-1,23]])
smallSquarePillars3B = GRID([[1.25,-1.25,-25,1.25], [-1.25,-50,1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5], [-50,2.5], [-1,-25,-1,-24,-1,-24,-1,23]])

pillars3 = STRUCT([smallSquarePillars3A,squarePillarsLine3A,smallSquarePillars3B,squarePillarsLine3B])
//VIEW(pillars3)

building1 = STRUCT([pillars0,pillars1,pillars2,pillars3])
VIEW(building1)

//Exercise2
//Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models 
//of horizontal partitions, and add them to the STRUCT of the building model.

//function that defines semi-circle on floor0
function semiCircle(r){
    function semiCircle(p){
            alpha = p[0]
            b = p[1]
            a = [b*COS(alpha), b*SIN(alpha)] 
            return a;
        };
    var dom = DOMAIN([[0,PI],[0,r]])([36,1]);
    var cerchioO = MAP(semiCircle)(dom)
    var semiPlan = EXTRUDE([1])(cerchioO);
    return semiPlan;
};

buildingBase = COLOR([0,1,0])(T([3])([-1])(GRID([[112,5],[65],[1]])))

semiPlan0A = GRID([[-13.75, 71.25], [-22, 43], [1]])
semiPlan0B = GRID([[-85, 12.5, -15], [-42, 23], [1]])
semiPlan0C = GRID([[-13.75, 12.5],[-18, 4],[1]])
semiPlan0D = T([1,2])([97.5, 53.5])(R([1,2])(-PI/2)(semiCircle(11.5)))
semiPlan0E = T([1,2])([20, 18])(R([1,2])(-PI)(semiCircle(6.25)))
floor0 = STRUCT([semiPlan0A,semiPlan0B,semiPlan0C,semiPlan0D,semiPlan0E,buildingBase])
//VIEW(floor0)

hpartition11 = GRID([[2.5,8.57],[50,3.5,9,2.5],[-1,-25,1]])
hpartition12 = GRID([[-2.5,-8.57,40.22],[50,3.5,-9,2.5],[-1,-25,1]])
hpartition14 = GRID([[-2.5,-8.57,-31.65,-4.58,3.99],[-50,-3.5,9],[-1,-25,1]])
hpartition15 = GRID([[-2.5,-8.57,-31.65,-8.57,8.57],[65],[-1,-25,1]])
hpartition16 = GRID([[-2.5,-8.57,-31.65,-8.57,-8.57,52.64],[65],[-1,-25,1]])
floor1 = STRUCT([hpartition11,hpartition12,hpartition14,hpartition15,hpartition16])
//VIEW(floor1)

hpartition21 = GRID([[2.5,5.71],[65],[-1,-25,-1,-24,1]])
hpartition22 = GRID([[-2.5,-5.71,37.14],[2.5,-51,-9,2.5],[-1,-25,-1,-24,1]])
hpartition23 = GRID([[-2.5,-5.71,-37.14,13.57],[2.5],[-1,-25,-1,-24,1]])
verts = [[58.92,0],[45.35,51],[45.35,65],[58.92,65]]
cells = [[0,1,3],[1,2,3]]
hpartition24_2D = SIMPLICIAL_COMPLEX(verts)(cells)
hpartition24_3D = T([3])([1+25+1+24])(EXTRUDE([1])(hpartition24_2D))
hpartition25 = GRID([[-2.5,-5.71,-37.14,-13.57,53.53],[65],[-1,-25,-1,-24,1]])
floor2 = STRUCT([hpartition21,hpartition22,hpartition23,hpartition24_3D,hpartition25])
//VIEW(floor2)

hpartition31 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition32 = GRID([[2.5,25,2.5,25],[2.5,61.25,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition33 = GRID([[-2.5,-25,-2.5,-25,2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition34 = GRID([[-2.5,-25,-2.5,-25,2.5,34.58],[54.75,-9,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition35 = GRID([[-2.5,-25,-2.5,-25,2.5,-34.58,20.42],[65],[-1,-25,-1,-24,-1,-24,1]])
floor3 = STRUCT([hpartition31,hpartition32,hpartition33,hpartition34,hpartition35])
//VIEW(floor3)

hpartition41 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition42 = GRID([[2.5,25,2.5,25],[2.5,-51.18,11.32],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition43 = GRID([[-2.5,-25,-2.5,-25,2.5,25,2.5,25,2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
floor4 = STRUCT([hpartition41,hpartition42,hpartition43])
//VIEW(floor4)

building2 = STRUCT([building1,floor0,floor1,floor2,floor3,floor4])
//VIEW(building2)

//Exercise3
//Define, with names north, south, east, and west, the 4 models of vertical enclosures (including the hollows), 
//and add them to the STRUCT of the building mode

//north
function annulus_sector (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];

    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

roundNorth0 = T([1,2,3])([97.5, 53.5, 1])(R([1,2])(-PI/2)(EXTRUDE([25])(annulus_sector(PI, 9, 11.5))))
north0 = T([3])([1])(GRID([[-82.5, 2.5], [-22, 11.5], [25]]))
north0A = T([1,2,3])([82.5, 33.5, 23])(CUBOID([2.5,8.5,3]))
north0B = T([3])([1])(GRID([[-23.75, 2.5],[-18, 4],[25]]))

north1 = GRID([[-110, 2.5],[-2.5, 50],[-27, 10, -10, 4]])
north1A = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-27, 24]])
north1B = T([1,2,3])([110, 59.5,50])(CUBOID([2.5,3,1]))
north1C = T([1,2,3])([110, 59.5,27])(CUBOID([2.5,3,1]))

north2 = GRID([[-110, 2.5],[-2.5, 50],[-52, 7, -10, 7]])
north2A = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-52, 24]])
north2B = T([1,2,3])([110, 59.5,74.5])(CUBOID([2.5,3,1.5]))
north2C = T([1,2,3])([110, 59.5,52])(CUBOID([2.5,3,1.5]))

north3 = GRID([[-110, 2.5],[-2.5, 50],[-77, 5, -10, 8]])
north3A = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-77, 24]])
north3B = T([1,2,3])([110, 59.5,77])(CUBOID([2.5,3,2]))
north3C = T([1,2,3])([110, 59.5,99])(CUBOID([2.5,3,2]))

north = STRUCT([roundNorth0,north0,north0A,north0B,north1,north1A,north1B,north1C,north2,north2A,north2B,north2C,north3,north3A,north3B,north3C])
//VIEW(north)

//east
east0 = T([1,2,3])([20, 18, 1])(R([1,2])(-PI)(EXTRUDE([25])(annulus_sector(PI, 3.75, 6.25))))
east0A = T([3])([1])(GRID([[-23.75, 32.25], [-22, 2.5], [25]]))
east0B = T([3])([1])(GRID([[-56, 26.5], [-22, 2.5], [14, -10, 1]]))
east0C = T([3])([1])(GRID([[-82.5, 15], [-42, 2.5],[25]]))

east1A = GRID([[-2.5, 25], [2.5], [-27, 24]])
east1B = GRID([[-30, 25], [2.5], [-27, 24]])
east1C = GRID([[-85, 25], [2.5], [-27, 24]])
east1D = GRID([[-56, 26.5], [2.5], [-27, 10, -10, 4]])
east1 = STRUCT([east1A,east1B,east1C,east1D])

east2A = GRID([[-2.5, 25], [2.5], [-52, 24]])
east2B = GRID([[-30, 25], [2.5], [-52, 24]])
east2C = GRID([[-82.5, 27.5], [2.5], [-52, 24]])
east2D = GRID([[-56, 26.5], [2.5], [-52, 10, -10, 4]])
east2 = STRUCT([east2A,east2B,east2C,east2D])

east3A = GRID([[55], [2.5], [-77, 7.14, -15.86]])
east3B = GRID([[-82.5, 27.5], [2.5], [-77, 23]])
east3C = GRID([[-56, 26.5], [2.5], [-77, 7.14, -10, 5.86]])
east3 = STRUCT([east3A,east3B,east3C])
east = STRUCT([east0,east0A,east0B,east0C,east1,east2,east3])
//VIEW(east)

//south
south01 = GRID([[2.5],[-50,-2.5,-10,+2.5],[1,25]])
south02 = GRID([[-13.75,2.5],[-2.5,-18.86,28.64],[-1,14.28,-9.47,1.25]])
south03 = GRID([[-13.75,2.5],[-2.5,-15.36,3.5],[1,25]])
south0 = STRUCT([south01,south02,south03])

south1 = GRID([[2.5],[-50,-10.82,4.18],[-1,-25,-1,24]])
south2 = GRID([[2.5],[-50,15],[-1,-25,-1,-24,-1,24]])
south3 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,7.14]])
south = STRUCT([south0,south1,south2,south3])
//VIEW(south)

//west
west01 = GRID([[-2.5,25],[-62.5,2.5],[1,25]])
west02 = GRID([[-2.5,-25,46.78],[-62.5,2.5],[-1,25]])
west03 = GRID([[-2.5,-25,-46.78,5.71],[-62.5,2.5],[-1,17.14,-5.71,2.15]])
west04 = GRID([[-74.28,-5.71,18.51],[-62.5,2.5],[-1,25]])
west0 = STRUCT([west01,west02,west03,west04])

west11 = GRID([[63.57],[-62.5,2.5],[-1,-25,-1,24]])
west12 = GRID([[-63.57,25.71],[-62.5,2.5],[-1,-25,-1,12]])
west13 = GRID([[-63.57,-25.71,23.22],[-62.5,2.5],[-1,-25,-1,24]])
west1 = STRUCT([west11,west12,west13])

west21 = GRID([[89.28],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west22 = GRID([[-89.28,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west23 = GRID([[-89.28,-1.25,5.71],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west24 = GRID([[-89.28,-1.25,-5.71,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west25 = GRID([[-89.28,-1.25,-5.71,-1.25,15.01],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west26 = GRID([[112.5],[-62.5,2.5],[-1,-25,-1,-24,-1,-24,-1,23]])
west2 = STRUCT([west21,west22,west23,west24,west25,west26])

west = STRUCT([west0,west1,west2])
//VIEW(west)

building3 = STRUCT([building2,floor0,floor1,floor2,floor3,floor4,south,west,east,north])
//VIEW(building3)

//Exercise4
//Exercise4. Define and color (BLACK) the models of (some) windows, and instance them within the building model.

BLACK = [0,0,0,1]
structureEast1 = COLOR(BLACK)(GRID([[-57.5, 25], [-1.5,0.5], [-37, 0.5, -9, 0.5, -4]]))
structureEast2 = COLOR(BLACK)(GRID([[-57.5, 0.5, -11.5, 1 , -11.5 , 0.5], [-1.5,0.5], [-37, 10, -4]]))
structureEast3 = COLOR(BLACK)(GRID([[-56, 26.5], [-23.5, 0.5], [-15 ,0.5, -9 , 0.5]]))
structureEast4 = COLOR(BLACK)(GRID([[-56, 0.5, -12.25 , 1 , -12.25 , 0.5], [-23.5, 0.5], [-15 ,10]]))

windowEast1 = STRUCT ([structureEast1,structureEast2])
windowEast2 = T([3])([25])(windowEast1)
windowEast3 = T([3])([22.14])(windowEast2)
windowEast4= STRUCT ([structureEast3,structureEast4])

windowEast = STRUCT([windowEast1,windowEast2,windowEast3,windowEast4])

structureNorth1 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 47.5],[-37, 0.5, -9 , 0.5]]))
structureNorth2 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 0.6, -11.125, 0.6, -11.125 , 0.6, -11.125 , 0.6, -11.125 , 0.6],[-37, 10, -4]]))

windowNorth1 = STRUCT([structureNorth1,structureNorth2])
windowNorth2 = T([3])([22])(windowNorth1)
windowNorth3 = T([3])([23])(windowNorth2)

windowNorth = STRUCT([windowNorth2,windowNorth3,windowNorth1])

structureSouth1 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,0.5,-10.875,1,-10.875,1,-10.875,1,-10.875,0.5],[-27,24]]))
structureSouth2 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,47.5],[-27,0.5,-11,1,-11,0.5]]))
structureSouth3 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 0.5, -13.35, 1, -13.35, 0.5],[-15.28,9.47]]))
structureSouth4 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 28.7],[-15.28,0.5,-8.47,0.5]]))

windowSouth1 = STRUCT ([structureSouth1,structureSouth2])
windowSouth2 = T([3])([25])(windowSouth1)
windowSouth3 = STRUCT ([structureSouth3,structureSouth4])

windowSouth = STRUCT([windowSouth1,windowSouth2,windowSouth3])

building4 = STRUCT([building3,windowNorth,windowEast,windowSouth])
VIEW(building4)

