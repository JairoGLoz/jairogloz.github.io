/**
 * Snap entity to the closest interval specified by 'snap'.
 * Offset entity by 'offset'
 */

AFRAME.registerComponent('snap', {
        dependencies: ['position'],

        schema: {
            offset: {type: 'vec3'},
            snap: {type: 'vec3'}
        },

        init: function () {
            this.originalPos = this.el.getAttribute('position');
        },

        update: function () {
            const data = this.data;
            const el = this.el;

            const pos = AFRAME.utils.clone(this.originalPos);

            pos.x = Math.floor(pos.x / data.snap.x) * data.snap.x + data.offset.x;
            pos.y = Math.floor(pos.y / data.snap.y) * data.snap.y + data.offset.y;
            pos.z = Math.floor(pos.z / data.snap.z) * data.snap.z + data.offset.z;

            el.setAttribute('position', pos);

            // setting box position explicitly in a custom tag
            el.setAttribute('position-str', pos.x + ' ' + pos.y + ' ' + pos.z);
         }
    }// end of component definition
);// end of registerComponent