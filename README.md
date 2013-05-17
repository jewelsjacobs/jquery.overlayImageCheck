# jQuery Overlay Image Check

[![Build Status](https://travis-ci.org/jewelsjacobs/jquery.overlayImageCheck.png)](https://travis-ci.org/jewelsjacobs/jquery.overlayImageCheck)

jQuery plugin to create radio / checkboxes with a nonchecked image and an overlaid checked image. Good for dynamically populating with images and then adding a transparent check mark.

I'm using it to create dynamic image 'buttons' that act as checkboxes.

Based on [Jorden Casper](https://github.com/bunnymatic/jquery.simpleimagecheck.git) and [Mr. Rodgers](http://www.rcode5.com/)'s
simpleImageCheck jQuery plugin
: https://github.com/bunnymatic/jquery.simpleimagecheck

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jjacobs/jquery.overlayImageCheck/master/dist/jquery.overlayImageCheck.min.js
[max]: https://raw.github.com/jjacobs/jquery.overlayImageCheck/master/dist/jquery.overlayImageCheck.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.overlayImageCheck.min.js"></script>
```

## Documentation

Coming soon

### How to use

Here's an example of creating a checkbox "icon button" with a favicon.  You can see this in action [here](http://jsfiddle.net/jewelsjacobs/8Bds3/).
#### CSS
```css
.white {
    background-color: white;
    height: 40px;
    width: 40px;
}

body {
    background-color: black;
}

#centeredInWidndow {
    padding: 30px;
    background-color: white;
    height: 80px;
    width: 270px;
    vertical-align: middle;
    text-align: center;
}

.rounded-corners {
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    border: 1px solid;
}

.shadow {
    -moz-box-shadow:    inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow:         inset 0 0 10px #000000;
}

* :focus {
    outline: 0;
}
```

#### HTML
```html
<div id="providers" class="white rounded-corners shadow">
    <input type='checkbox' id='youtube' />
</div>
```

#### JavaScript
```javascript
      $().ready(function(){
        $('#youtube').overlayImageCheck({
          image: 'http://c2548752.cdn.cloudfiles.rackspacecloud.com/youtube.ico',
          imageChecked: '/img/smallCheckMark.png',
          width: '33px',
          height: '33px'
        });
      });
});
```

## Examples
[Demo jsfiddle](http://jsfiddle.net/jewelsjacobs/8Bds3/)
