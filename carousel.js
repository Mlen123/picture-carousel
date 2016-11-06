$(function(){
	var $carousel = $("#carousel"),
	    $carouselLeft = $(".carousel-nav.left"),
	    $carouselRight = $(".carousel-nav.right"),
	    $carouselCircles = $("#carousel-circles > li");
	    $carouselUl = $("#carousel-imgs"),
        $carouselFirst = $("#carousel-imgs > li:first-child");

    $carouselUl.append($carouselFirst.clone());
        
    // 设置carousel-imgs的宽度
	var $carouselItems = $carouselUl.children("li"),
        carouselWidth = $carousel.width(),
        carouselItemsNum = $carouselItems.length;
    $carouselUl.css('width',carouselWidth*carouselItemsNum);

    //点击 切换
    carouselClick();

    //自动播放
    var t = setInterval(function(){
    	if(! $carouselUl.is(":animated")){
    		rightSlip();
    	}
    },5000);

    
    function carouselClick(){
    	$carousel.on('click','.carousel-nav.left',function(){
    		if(!$carouselUl.is(":animated")){
    			clearInterval(t);
    			leftSlip();
    			t = setInterval(function(){
				    	if(! $carouselUl.is(":animated")){
				    		rightSlip();
				    	}
				    },5000);
    		}
    		return false;
    	}).on('click','.carousel-nav.right',function(){
    		if(!$carouselUl.is(":animated")){
                clearInterval(t);
    			rightSlip();
    			setInterval(function(){
			    	if(! $carouselUl.is(":animated")){
			    		rightSlip();
			    	}
			    },5000);
    		}
    		return false;
    	}).on('click','#carousel-circles > li',function(){
    		if(!$carouselUl.is(":animated")){
    			clearInterval(t);
    			var that = this;
    			$carouselCircles.each(function(index){
    				if(this === that){
    					var left = -index*carouselWidth;
    					switchAnimate(left);
    					return false;
    				}
    			});
    			t = setInterval(function(){
				    	if(! $carouselUl.is(":animated")){
				    		rightSlip();
				    	}
				    },5000);
    		}
    	})
    }

    

	function leftSlip(){
		var left = parseInt($carouselUl.css("left").match(/-?\d+/));
		if(left == 0){
			left = -carouselWidth*(carouselItemsNum-1);
			$carouselUl.css("left",left);
			left = parseInt($carouselUl.css("left").match(/-?\d+/));
		}
		left += carouselWidth;

		switchAnimate(left)
	}

	function rightSlip(){
		var left = parseInt($carouselUl.css("left").match(/-?\d+/));
		if(left == -carouselWidth*(carouselItemsNum-1)){
			$carouselUl.css("left",0);
			left = parseInt($carouselUl.css("left").match(/-?\d+/));
		}
		left -= carouselWidth;
	    
		switchAnimate(left)
	}

	function switchAnimate(left){
		$carouselUl.animate({
			left:left,
			opacity: 0.8
		},"slow",function(){
			$(this).animate({opacity: 1},"slow");
		});

        //切换小圆点carousel-circles
        if(left == 0 || left/carouselWidth == -(carouselItemsNum-1)){
			$carouselCircles.removeClass("active")
			                .first().addClass("active");
		}else{
			var order = (left/carouselWidth > 0) ? left/carouselWidth : -left/carouselWidth;
			$carouselCircles.removeClass("active")
			                .eq(order).addClass("active");
		}
	}
})
