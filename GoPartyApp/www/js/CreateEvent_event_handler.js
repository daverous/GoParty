(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    $(listv).on("click", function(event) {
        $(list).style.display = 'block';
        $(gmaps).style.display = 'hidden';
    });
     
     $(mapv).on("click", function(event) {
        $(gmaps).style.display = 'block';
        $(list).style.display = 'hidden';
    });
     /* button  Save */
    $(document).on("click", ".uib_w_11", function(evt)
    {
        $.ajax({
  type: 'POST',
  url: $("127.0.0.1:3000/createEvent").attr("action"),
  data: $("form").serialize(), 
  //or your custom data either as object {foo: "bar", ...} or foo=bar&...
  success: function(response) { ... },
});
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
