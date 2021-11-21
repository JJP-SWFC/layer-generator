
function generate(event) {
  let upgradeMessage = `
  &nbsp;&nbsp;&nbsp;&nbsp;upgrades: &#123<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11: &#123<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: &quot(title)&quot,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description: &quot(description)&quot,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cost: new Decimal(your cost),<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unlocked() &#123; return (your requirements) &#125;,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect() &#123; return (your effect) &#125;,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effectDisplay() &#123; return format(this.effect()) + "x" &#125;,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br>
  `
  let milestoneMessage = `
  &nbsp;&nbsp;&nbsp;&nbsp;milestones: &#123;<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0: &#123;requirementDescription: &quot(your requirement description)&quot,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;done() &#123;{return (your done requirement)&#125;,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effectDescription: &quot(describe the reward)&quot,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125,<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125,<br>
  `
  event.preventDefault();
  upgradesEnabled = document.getElementById("upgrades").value
  milestonesEnabled = document.getElementById("milestones").value
  console.log(upgradesEnabled)
  var data = [];
  $('#layer-form').serializeArray().forEach( function(option){
    data[option['name']] = option['value'];
  })
  
  var layerinfo = `
<p>
addLayer(&quot${data.layername}&quot, &#123;<br>
&nbsp;&nbsp;&nbsp;&nbsp;name: &quot${data.oflayername}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;symbol: &quot${data.symbol}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;position: 0, <br>
&nbsp;&nbsp;&nbsp;&nbsp;startData() &#123; return &#123;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unlocked: ${(document.getElementById("unlocked").value)},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;points: new Decimal(${data.startpoints}),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&#125;&#125;,<br>
&nbsp;&nbsp;&nbsp;&nbsp;color: &quot${data.lcolor}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;requires: ${data.requires},<br>
&nbsp;&nbsp;&nbsp;&nbsp;resource: &quot${data.resource}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;baseResource: &quot${data.baseresource}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;baseAmount() &#123;return player.${data.baseresource}&#125;,<br>
&nbsp;&nbsp;&nbsp;&nbsp;type: &quot${(document.getElementById("type").value)}&quot,<br>
&nbsp;&nbsp;&nbsp;&nbsp;exponent: ${data.exponent},<br>
&nbsp;&nbsp;&nbsp;&nbsp;gainMult() &#123;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mult = new Decimal(1) // Calculate the multiplier for main currency from bonuses<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return mult<br>
&nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br>
&nbsp;&nbsp;&nbsp;&nbsp;gainExp() &#123;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return new Decimal(1) // Calculate the exponent on main currency from bonuses<br>
&nbsp;&nbsp;&nbsp;&nbsp;&#125,<br>
&nbsp;&nbsp;&nbsp;&nbsp;row: ${data.layerrow},<br>
&nbsp;&nbsp;&nbsp;&nbsp;layerShown() &#123;return ${(document.getElementById("layershown").value)}&#125;,<br>
`
if(upgradesEnabled == "true"){
	layerinfo += upgradeMessage
}
if(milestonesEnabled == "true"){
	layerinfo += milestoneMessage
}
closingmessage = `
&#125;)
</p>
`
layerinfo += closingmessage
  
  $('#output').html(layerinfo);
}