$(function(){ //ҳ�������ϲ�ִ��

		//=========���ò���==========
		//ͼƬͳһ�߶ȣ�
		var images_height = '560px';
		//ͼƬ·��/����(������ʽ):
		var images_url = [
			'/image/scroll-img/1.jpg',
			'/image/scroll-img/2.jpg',
			'/image/scroll-img/3.jpg'
		];
		var images_count = images_url.length;
		//console.log(images_count);

		//�����ڵ�
		//ͼƬ�б�ڵ�
		for(var j=0;j<images_count+1;j++){
			$('.banner ul').append('<li></li>')
		}
		//�ֲ�Բ�㰴ť�ڵ�
		for(var j=0;j<images_count;j++){
			if(j==0){
				$('.banner ol').append('<li class="current"></li>')
			}else{
				$('.banner ol').append('<li></li>')
			}
		}

		//����ͼƬ
		$('.banner ul li').css('background-image','url('+images_url[0]+')');
		$.each(images_url,function(key,value){
			$('.banner ul li').eq(key).css('background-image','url('+value+')');
		});

		$('.banner').css('height',images_height);

		$('.banner ul').css('width',(images_count+1)*100+'%');

		$('.banner ol').css('width',images_count*20+'px');
		$('.banner ol').css('margin-left',-images_count*20*0.5-10+'px');

		//=========================

		var num = 0;
		//��ȡ���ڿ��
		var window_width = $(window).width();
		$(window).resize(function(){
			window_width = $(window).width();
			$('.banner ul li').css({width:window_width});
			clearInterval(timer);
			nextPlay();
			timer = setInterval(nextPlay,2000);
		});
		//console.log(window_width);
		$('.banner ul li').width(window_width);
		//�ֲ�Բ��
		$('.banner ol li').mouseover(function(){//��hover�Ļ����������¼�(��������뿪)
			$(this).addClass('current').siblings().removeClass('current');
			//��һ��ͼ�� 0 * window_width
			//�ڶ���ͼ�� 1 * window_width
			//������ͼ�� 2 * window_width
			//��ȡ��ǰ���
			var i = $(this).index();
			//console.log(i);
			$('.banner ul').stop().animate({left:-i*window_width},500);
			num = i;
		});
		//�Զ�����
		var timer = null;
		function prevPlay(){
			num--;
			if(num<0){
				//���İ�ͼƬ�������һ��ͼ(����ҳ,���һ��ͼ��ͬ),Ȼ������ͼƬ���Ŷ�����left�����Ƕ�λ�������ƶ��ĳ���
				$('.banner ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},500);
				num=images_count-1;
			}else{
				//console.log(num);
				$('.banner ul').stop().animate({left:-num*window_width},500);
			}
			if(num==images_count-1){
				$('.banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		function nextPlay(){
			num++;
			if(num>images_count){
				//���ŵ����һ��(����ҳ)��,���ĵذ�ͼƬ������һ��,��Ϊ�͵�һ����ͬ,�������Է���,
				$('.banner ul').css({left:0}).stop().animate({left:-window_width},500);
				//css({left:0})��ֱ�����ĸı�λ�ã�animate({left:-window_width},500)�������ƶ�����
				//���Ҫ��ָ��ָ��ڶ���ͼƬ,��ʾ�Ѿ��������ڶ����ˡ�
				num=1;
			}else{
				//����������һ�ź͵�һ����ͬ��ͼƬ��������ŵ����һ�ţ��������²������Ļص���һ��(���ۿ�����)���ӵ�һ�Ų��ŵ��ڶ���
				//console.log(num);
				$('.banner ul').stop().animate({left:-num*window_width},500);
			}
			if(num==images_count){
				$('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		timer = setInterval(nextPlay,5000);
		//��꾭��banner��ֹͣ��ʱ��,�뿪���������
		$('.banner').mouseenter(function(){
			clearInterval(timer);
			//���Ҽ�ͷ��ʾ(����)
			$('.banner i').fadeIn();
		}).mouseleave(function(){
			timer = setInterval(nextPlay,5000);
			//���Ҽ�ͷ����(����)
			$('.banner i').fadeOut();
		});
		//������һ��
		$('.banner .right').click(function(){
			nextPlay();
		});
		//������һ��
		$('.banner .left').click(function(){
			prevPlay();
		});
	});