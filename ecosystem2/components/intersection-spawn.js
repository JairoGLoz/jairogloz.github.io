/**
 * Spawn entity at the intersection point on click, given the properties passed.
 *
 * `<a-entity intersection-spawn="mixin: box; material.color: red">` will spawn
 * `<a-entity mixin="box" material="color: red">` at intersection point.
 */

var cube_count = 0;

AFRAME.registerComponent('intersection-spawn', {
    schema: {
        default: '', // type is inferred to string
        parse: AFRAME.utils.styleParser.parse // parses a CSS style-like string to an object
    },

    init: function () {
        const data = this.data;
        const el = this.el;

        el.addEventListener(data.event, evt => {
            // Create element
            const spawnEl = document.createElement('a-entity');

            // set element id
            spawnEl.setAttribute('id', ('box_' + cube_count++) );

            // snap intersection point to grid and offset from center
            spawnEl.setAttribute('position', evt.detail.intersection.point);

            // Set components and properties
            Object.keys(data).forEach(name => {
                // compares for strict equality
                if (name === 'event'){ return; } // ignores the event

                AFRAME.utils.entity.setComponentProperty(spawnEl, name, data[name]);
            });

            // Append to root node
            var root_node = document.getElementById('root-node');
            root_node.appendChild(spawnEl);
            //el.sceneEl.appendChild(spawnEl);

        });// end of addEventListener
    }// end of init
});// end of register component