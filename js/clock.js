(function($){
  function nextNumber(number) {
    if (number>9) {
      return 0;
    } else if (number<0) {
      return 9;
    } else {
      return number;
    }
  }
  function setNumber($n,up,down) {
    $n.find(".outbox,.inboxdown").text(up);
    $n.find(".inboxup,.inboxin").text(down);
    return up;
  }  
  function isIE789() {
    return (/MSIE [0-9]\./.test(navigator.userAgent));
  }
  function addNumber(number) {
    number++;
    if (number>9) {
      number=0;
    }
    return number;
  }
  function cutNumber(number) {
    number--;
    if (number<0) {
      number=9;
    }
    return number;
  }  
  function getEvents() {
    var events=[];
    events.push("transitionend");
    events.push("webkitTransitionEnd");
    events.push("oTransitionEnd");
    events.push("otransitionend");
    events.push("MSTransitionEnd");
    events=events.join(" ");
    return events;
  }
  $.fn.digitalInit=function(n){
    if ($.isNumeric(n) && n>-1 && n<10 || n===":") {
      var $this=$(this);
      var html="";
      html+= "<div class=\"outbox\">"+n+"</div>";
      html+= "<div class=\"inboxup\"></div>";
      html+= "<div class=\"inboxin\"></div>";
      html+= "<div class=\"inboxdown\">"+n+"</div>";
      $this.css({"float":"left","margin":"0 1px"});
      $this.html(html);
    }
  };
  $.fn.digitalNext=function(next){
    var $this=$(this);
    if ($this.find(".outbox").length) {
      var n=$this.find(".outbox").text();
      if (!$.isNumeric(next) || next>9 || next<0) {
        next=null;
      } 
      $this.find(".inboxup,.inboxin").text(next!==null?next:addNumber(n));
      if (isIE789()){
        n=next!==null?next:addNumber(n);  
        $this.find(".outbox,.inboxdown").text(n);
      } else {
        if (!$this.find(".inboxdown").hasClass("go")) {
          $this.find(".inboxdown,.inboxin").addClass("go");
        }
      }         
      if (!isIE789()){
        $this.find(".inboxdown").unbind().bind(getEvents(),function() {
          n = next!==null?next:addNumber(n);
          setNumber($this,n,nextNumber(n+1));
          $this.find(".inboxdown,.inboxin").removeClass("go");
        });
      }      
    }
  };
  $.fn.digitalPrev=function(prev){
    var $this=$(this);
    if ($this.find(".outbox").length) {
      var n=$this.find(".outbox").text();
      if (!$.isNumeric(prev) || prev>9 || prev<0) {
        prev=null;
      } 
      $this.find(".inboxup,.inboxin").text(prev!==null?prev:cutNumber(n));
      if (isIE789()){
        n=prev!==null?prev:cutNumber(n);
        $this.find(".outbox,.inboxdown").text(n);
      } else {
        if (parseInt(n,10)!==prev) {
          if (!$this.find(".inboxdown").hasClass("go")) {
            $this.find(".inboxdown,.inboxin").addClass("go");
          }
        }
      }    
      if (!isIE789()){
        $this.find(".inboxdown").unbind().bind(getEvents(),function() {
          n=prev!==null?prev:cutNumber(n);
          setNumber($this,n,nextNumber(n-1));
          $this.find(".inboxdown,.inboxin").removeClass("go");
        });
      }
    }
  };
})(jQuery);


function getDig(date) {
  var seconds = (date.getSeconds() < 10 ? "0":"") + date.getSeconds().toString();
  var minutes = (date.getMinutes() < 10 ? "0":"") + date.getMinutes().toString();
  var hours = (date.getHours() < 10 ? "0":"") + date.getHours().toString();
  var dig1 = parseInt(hours.substring(0,1),10);
  var dig2 = parseInt(hours.substring(1,2),10);
  var dig4 = parseInt(minutes.substring(0,1),10);
  var dig5 = parseInt(minutes.substring(1,2),10);
  var dig7 = parseInt(seconds.substring(0,1),10);
  var dig8 = parseInt(seconds.substring(1,2),10);
  return {dig1:dig1,dig2:dig2,dig4:dig4,dig5:dig5,dig7:dig7,dig8:dig8};
}


$(function() {
	/*
	$("#y0").digitalInit(2);
	
	
		
	
	
	
  var begin=new Date();
  var dig=getDig(begin);
  $("#n1").digitalInit(dig.dig1);
  $("#n2").digitalInit(dig.dig2);
  $("#n3").digitalInit(":");
  $("#n4").digitalInit(dig.dig4);  
  $("#n5").digitalInit(dig.dig5);
  $("#n6").digitalInit(":");
  $("#n7").digitalInit(dig.dig7);  
  $("#n8").digitalInit(dig.dig8);
  
  var add=0;
  setTimeout(function() {
    var now=new Date(begin.getTime()+add);
    var dig=getDig(now);
    $("#n1").digitalPrev(dig.dig1);
    $("#n2").digitalPrev(dig.dig2);
    $("#n4").digitalPrev(dig.dig4);
    $("#n5").digitalPrev(dig.dig5);
    $("#n8").digitalPrev(dig.dig8);
    $("#n7").digitalPrev(dig.dig7);
    add-=1000;    
    setTimeout(arguments.callee,1000);
  },0);
  */
	
	
	
	var sid=null;
	var tar = new Date(2015,4,10,12,30,0).getTime();
	var now = new Date().getTime();
	var sec = (tar-now)/1000;
	var day = parseInt(sec/86400,10);
	var hour = parseInt((sec-(day*86400))/3600,10);
	var minute = parseInt((sec-(day*86400)-(hour*3600))/60,10);
	var second = parseInt(sec-(day*86400)-(hour*3600)-(minute*60),10);
	//var str = day + "天" + hour  + "時" + minute + "分" + second + "秒";
	$("#n1").digitalInit(day<10?0:parseInt((day).toString().substring(0,1),10));
    $("#n2").digitalInit(day<10?parseInt((day).toString().substring(0,1),10):parseInt((day).toString().substring(1,2),10));
	$("#n3").digitalInit(hour<10?0:parseInt((hour).toString().substring(0,1),10));
	$("#n4").digitalInit(hour<10?parseInt((hour).toString().substring(0,1),10):parseInt((hour).toString().substring(1,2),10));
    $("#n5").digitalInit(minute<10?0:parseInt((minute).toString().substring(0,1),10));
	$("#n6").digitalInit(minute<10?parseInt((minute).toString().substring(0,1),10):parseInt((minute).toString().substring(1,2),10));
    $("#n7").digitalInit(second<10?0:parseInt((second).toString().substring(0,1),10));
	$("#n8").digitalInit(second<10?parseInt((second).toString().substring(0,1),10):parseInt((second).toString().substring(1,2),10));
	function run() {
	    var now = new Date().getTime();
    	var sec = (tar-now)/1000;
		if (sec>0) {
	    var day = parseInt(sec/86400,10);
    	var hour = parseInt((sec-(day*86400))/3600,10);
	    var minute = parseInt((sec-(day*86400)-(hour*3600))/60,10);
    	var second = parseInt(sec-(day*86400)-(hour*3600)-(minute*60),10);
		$("#n1").digitalPrev(day<10?0:parseInt((day).toString().substring(0,1),10));
    	$("#n2").digitalPrev(day<10?parseInt((day).toString().substring(0,1),10):parseInt((day).toString().substring(1,2),10));
	    $("#n3").digitalPrev(hour<10?0:parseInt((hour).toString().substring(0,1),10));
	    $("#n4").digitalPrev(hour<10?parseInt((hour).toString().substring(0,1),10):parseInt((hour).toString().substring(1,2),10));
    	$("#n5").digitalPrev(minute<10?0:parseInt((minute).toString().substring(0,1),10));
	    $("#n6").digitalPrev(minute<10?parseInt((minute).toString().substring(0,1),10):parseInt((minute).toString().substring(1,2),10));
    	$("#n7").digitalPrev(second<10?0:parseInt((second).toString().substring(0,1),10));
	    $("#n8").digitalPrev(second<10?parseInt((second).toString().substring(0,1),10):parseInt((second).toString().substring(1,2),10));
		} else {
			$("#n1").digitalPrev(0);
			$("#n2").digitalPrev(0);
			$("#n3").digitalPrev(0);
			$("#n4").digitalPrev(0);
			$("#n5").digitalPrev(0);
			$("#n6").digitalPrev(0);
			$("#n7").digitalPrev(0);
			$("#n8").digitalPrev(0);
			clearInterval(sid);
		}
	}
	var sid =setInterval(run,1000);
	
	
	
	//$("body").append(str);
	
	
	
	
	
});