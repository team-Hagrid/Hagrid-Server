// $(document).ready(function()
// {
//   $('#submit').click(function()
//   {
//     alert("SSIBAL");
//   })
// });

///////////////////////////////////////////////////////////////

function bigger(x)
{
  x.style.width="40%";
  x.style.height="40%";
}
function normal(x)
{
  x.style.width="30%";
  x.style.height="30%";
}

function bigger1(x)
{
  x.style.width="20%";
  x.style.height="20%";
}
function normal1(x)
{
  x.style.width="15%";
  x.style.height="15%";
}


/////////////////////////////////////////////////////////////////

$("#animate-demo").animate({left:"500px",opacity:"0.5"}, 2000);

setTimeout(function(){ $('#sentence1').removeAttr('hidden');},2500);
setTimeout(function(){ $('#sentence2').removeAttr('hidden');},3500);
setTimeout(function(){ $('#sentence3').removeAttr('hidden');},4500);
setTimeout(function(){ $('#sentence4').removeAttr('hidden');},5500);
setTimeout(function(){ $('#sentence5').removeAttr('hidden');},6500);
setTimeout(function(){ $('#sentence6').removeAttr('hidden');},7500);
