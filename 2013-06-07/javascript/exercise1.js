//exercise1

/**
* A digital terrain model (DTM) is normally defined as a map that associates the vertices of a simplicial decomposition of a 2D rectangle (corresponding 
* to a geographical map) with three coordinate functions x(u,v), y(u,v), z(u,v), where x(u,v) and y(u,v) are the selectors of the first and second 
* coordinate of the vertices, and z(u,v) provides the height (altitude) of vertices. This one can be obtained by adding or subtracting a (relatively small)
* random number to the altitude values. HINT: To provide the initial values of altitude it is recommended to use either some mathematical function of two 
* variables, or a surface generated from a few control points. The random correction of altitude must obviously be executed in a second computing stage.
* Produce a model of mountainous terrain using the approach described above.
*/

//function that create a digital terrain model
var domain = DOMAIN([[0,15],[0,10],[0,15]])([15,5,20]);
var createTerrainModel = function () {
	return function (v) {
		x = v[0];
		y = v[1];
		z = Math.abs(2*COS(v[0])+SIN(v[1])+0.3*Math.random());

		//create the valleys
		if((x<5 && y<8) || (x>6 && y>1 && y<7))
			z = 0;
		return [x,y,z];
	}
}

var mapping = createTerrainModel();

//add the color to the terrain model
var model1 = COLOR([150/255,75/255,0/255])(MAP(mapping)(domain));
DRAW(model1);





