function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

Template.QrCode.onRendered(function() {
    var instance = this;
    // Get the current smart argument
    this.autorun(() => {
        var view = Blaze.getView(),
            data = Template.currentData(); // To access reactive data context of the template instance

        instance.$("div").qrcode({
            "render": 'canvas',
            "size": 50,
            "text": data.text
        });


        // First Check if exists an tag image
        // If exist remove it
        var imgOld = instance.$('div.qr-code-container').find('img');
        if (imgOld.length > 0) {
            for (var i = 0; i < imgOld.length; i++) {
                instance.$(imgOld[i]).remove();
            }
        }
        
        var canvas = instance.$('div > canvas')[0];

        instance.$("div").append(convertCanvasToImage(canvas));
        instance.$("canvas").remove();

        instance.$("img").addClass("qr-code");

        if (instance.data.size !== undefined) {
            instance.$("img").css({
                'width': instance.data.size,
                'height': instance.data.size
            });
        }
    });



});
