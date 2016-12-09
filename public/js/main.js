Dropzone.options.formDesignUpload = {
paramName: "photo",
autoProcessQueue: false,
uploadMultiple: false,
parallelUploads: 1,
maxFiles: 1,
thumbnailWidth:null,
thumbnailHeight:null,
addRemoveLinks: true,
removedfile: function(file) {
    var name = file.name;
    $.ajax({
        type: 'GET',
        url: '/',
        data: "id="+name,
        dataType: 'html'
    });
    var _ref;
    return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
},
renameFilename:function(file){
  return file.renameFilename = $('#regid').val() + "_" + file;
},
init: function() {
      this.on("thumbnail", function(file, dataUrl) {
          $('.dz-image').last().find('img').attr({width: '100%', height: '100%'});
      }),
      this.on("success", function(file) {
          $('.dz-image').css({"width":"100%", "height":"auto"});
      })
    var myDropzone = this;
    $("#submit-all").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if($('#regid').val()==''){
          $('#regid').focus();
          $('#regid').attr("placeholder","Enter Registration Number First");
        }else{
          myDropzone.processQueue();
        }
    });
}
}
