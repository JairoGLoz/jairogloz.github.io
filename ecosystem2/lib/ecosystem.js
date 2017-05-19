/**
 * Created by jairolozano on 5/18/17.
 */

function downloadButton(){
    console.log("serializing scene");

    var sceneRootNode = document.getElementById('root-node');
    var rootNodeChildren = sceneRootNode.children;
    var sceneJSON = [];

    // add each cube to JSON
    for (var i = 0; i < rootNodeChildren.length; i++){
        var child = rootNodeChildren[i];

        // get child rotation
        var childRotationX = child.object3D.rotation.x / (Math.PI / 180);
        var childRotationY = child.object3D.rotation.y / (Math.PI / 180);
        var childRotationZ = child.object3D.rotation.z / (Math.PI / 180);
        var childEulerRotationString = childRotationX + ' ' + childRotationY + ' ' + childRotationZ;

        // get child scale
        var childScale = child.object3D.scale.x + ' ' + child.object3D.scale.y + ' ' + child.object3D.scale.z;

        // get child color
        var childColor = AFRAME.utils.entity.getComponentProperty(child, 'material.color');

        // get child mixin
        // to do: check for missing mixin
        var childMixin = AFRAME.utils.entity.getComponentProperty(child, 'mixin');

        var childJSON = {
            id: child.id,
            position: child.getAttribute('position-str'),
            rotation: childEulerRotationString,
            scale: childScale,
            color: childColor,
            mixin: childMixin
            // reference to file
        }// end of childJSON definition

        sceneJSON.push(childJSON);

    }// end of for

    var JSONstr = JSON.stringify(sceneJSON);

    console.log(JSONstr);
}// end of downloadButton

// called when the "Download Scene as JSON" button is pressed
function loadButton(){
    console.log("loading scene...");

    function isValidJsonString(str){
        try{
            JSON.parse(str);
        }catch(e){
            return false;
        }// end of try/catch

        return true;
    }// end of isValidJsonString

    var jsonInput = document.getElementById('jsonInput').value;

    if(isValidJsonString(jsonInput)){
        toDOM(JSON.parse(jsonInput));
    }else{
        console.log('Not a valid JSON string');
    }// end of if/else
}// end of loadButton

// takes a JSON and puts all of is elements into DOM
function toDOM(jsonInput){
    // this assumes it is being run first, it will start placing objects with id 0 and set objectcount
    // to the number of loaded objects
    for(var i = 0; i < jsonInput.length; i++){
        var obj = jsonInput[i];
        //console.log("Adding entity #" + obj.id);
        appendObject(obj);
    }// end of for

    console.log(i);
}// end of toDOM

function appendObject(obj){
    var newEntity = document.createElement('a-entity');

    newEntity.setAttribute('id', obj.id);

    newEntity.setAttribute('position', obj.position);
    newEntity.setAttribute('mixin', obj.mixin);
    AFRAME.utils.entity.setComponentProperty(newEntity, 'material.color', obj.color);

    // Append to root node
    var root_node = document.getElementById('root-node');
    root_node.appendChild(newEntity);
}// end of appendObject