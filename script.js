var iOS =
  !!navigator.platform && /iPad|iPhone|MacIntel/.test(navigator.platform);
if (iOS) {
  //$("body").addClass("iphone");
}
alert(111);
document
  .querySelector('input[type="file"]')
  .addEventListener("change", function(e) {
    var rotation = true;
    var rotationdeg = 90;
    var _file = e.target.files[0];
    var img = document.querySelector("img");
    console.dir(_file);
    var imgsrc = window.URL.createObjectURL(e.target.files[0]);
    img.src = imgsrc;

    console.dir(_file);

    EXIF.getData(_file, function() {
      var allMetaData = EXIF.getAllTags(this);
      //console.log(allMetaData);
      // console.error(allMetaData.Orientation);
      alert(allMetaData.Orientation);

      if (allMetaData.Orientation == 3) {
        //console.info('rotate180');
        //alert('rotate180');
        $("body.iphone")
          .find("." + cssClsNme + ".iphone-rotate")
          .removeClass("rotate90")
          .addClass("rotate180");
        rotation = true;
        rotationdeg = 180;
      } else if (allMetaData.Orientation == 6) {
        //alert('rotate90');
        // console.info('rotate90');
        $("body.iphone")
          .find("." + cssClsNme + ".iphone-rotate")
          .removeClass("rotate180")
          .addClass("rotate90");
        rotation = true;
        rotationdeg = 90;
      }
    });

    if (rotation) {
      var mCanvas = document.getElementById("canvas");
      var mw = (mCanvas.width = 600);
      var mh = (mCanvas.height = 600);
      var mctx = mCanvas.getContext("2d");
      var reader = new FileReader();
      //var source = new Image();
      var source = document.querySelector("img");
      reader.addEventListener(
        "load",
        function() {
          source.src = reader.result;
        },
        false
      );

      reader.readAsDataURL(_file);

      source.addEventListener("load", function() {
        mctx.clearRect(0, 0, mw, mh);
        mctx.translate(mw, mh / mw);
        mctx.rotate(Math.PI / 2);

        mctx.drawImage(
          source,
          0,
          0,
          source.width,
          source.height,
          0,
          0,
          600,
          600
        );
        var z = mCanvas.toDataURL();

        //console.error('obj.dataUrl',obj.dataUrl);
      });
    }
  });
