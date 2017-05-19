AFRAME.registerComponent('random-color', {

        // called once when component is attached
        init: function () {

            // set material component's color property to a random color
            this.el.setAttribute('material', 'color', getRandomColor());

        }// end of init

    }// end of component definition

);// end of AFRAME.registerComponent

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';

    for( var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }// end of for

    return color;
}// end of getRandomColor