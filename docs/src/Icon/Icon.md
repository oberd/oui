Use Icon elements when you need to display an affordance to the user, but are too limited on space to include text.

If the Icon should be a button, make sure to include a title to enhance accessibility


The icons themselves are built from a file in this repository, `assets/icomoon/selection.json`.  You can modify this selection of icons using the [icomoon app](https://icomoon.io/)


#### Using the font

Because each project is setup differently, you **must** configure the icomoon font-face in your own CSS for the icons to work properly. An example configuration is given below:

<pre>
<code class="css">
    @font-face {
      font-family: 'icomoon';
      src: url('/fonts/icomoon.eot?ot8r61');
      src: url('/fonts/icomoon.eot?#iefixot8r61') format('embedded-opentype'),
        url('/fonts/icomoon.woff?ot8r61') format('woff'),
        url('/fonts/icomoon.ttf?ot8r61') format('truetype'),
        url('/fonts/icomoon.svg?ot8r61#icomoon') format('svg');
      font-weight: normal;
      font-style: normal;
    }
</code>
</pre>
The fonts themselves can be found in the `dist/fonts` directory of this project.
