function generate(event) {
  event.preventDefault();
  
  var data = [];
  $('#madlibs-form').serializeArray().forEach( function(option){
    data[option['name']] = option['value'];
  })
  
  const story = `
<p>
addLayer(&quot${data.layername}&quot, &#123; <br> &emsp; name: &quot${data.oflayername}&quot <br> &emsp; test <br> &#125;
</p>
`
  
  $('#output').html(story);
}