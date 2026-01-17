enchant();
window.onload = function() {
    var core = new Core(640, 320);
    core.fps = 30;
    core.rootScene.backgroundColor = '#000000';
    core.preload('img/tank.png','img/map0.png','img/enemy.png','img/start.png','img/ballet.png','img/ballet2.png','music/sougen2.mp3','img/title.png','img/life.png');
	
	core.keybind(65,'a')
	core.keybind(87,'w')
	core.keybind(68,'d')
	core.keybind(83,'s')
	core.keybind(32,'shot')
	core.keybind(13,'shot2')
    //core.keybind(48,'kaisi')
	
    core.onload = function() {
	var ccc = new Label('スペースキーを押すか<br>STARTをクリックしてください');
	  ccc.x = 200;
	  ccc.y = 250;
     var start = new Sprite(236,48);
              start.image = core.assets['img/start.png'];
              start.x = 200;
              start.y = 180;

  　var title = new Sprite(640,320);
	         title.x = 0;
		 title.y = 0;
		 title.image = core.assets['img/title.png'];	  
             
             
            start.addEventListener('touchstart',function(){
               core.assets['music/sougen2.mp3'].play();
               core.pushScene(createGameScene());
                  });
				  
            core.rootScene.addEventListener('shotbuttonup',function(e){
               core.assets['music/sougen2.mp3'].play();
               core.pushScene(createGameScene());
               //console.log("start");     
                  });    
				  
	 			  
             
			 core.rootScene.addChild(title);
		     core.rootScene.addChild(start);
			 core.rootScene.addChild(ccc);

       

    


	
                    

          

    
     
      var createGameScene = function() {

          var ggg = new Scene();
          
          var Time = 60;		
			
        
		
	    var timeLimit = new Label;
            timeLimit.font = '14px sans-serif','#fc8000';
            timeLimit.x = 20;
            timeLimit.y = 20;
            
			timeLimit.addEventListener('enterframe', function() {
                            if(core.frame % core.fps == 0) 
			  
			   Time --;
                           this.text = "残り時間:" + Time + "秒";                           

                           if(Time <= 0){
			core.pushScene(createGameoverScene(tank,enemy1,Time));
			}
                                         
	     }); 
           
               

 　　　　var life1 = new Sprite(16,16);
               life1.x = 20;
			   life1.y = 0;
			   life1.image = core.assets['img/life.png']; 	   
 　　　　var life2 = new Sprite(16,16);
               life2.x = 40;
			   life2.y = 0;
			   life2.image = core.assets['img/life.png']; 	   
 　　　　var life3 = new Sprite(16,16);
               life3.x = 60;
			   life3.y = 0;
			   life3.image = core.assets['img/life.png']; 	   
 　　　　var life4 = new Sprite(16,16);
               life4.x = 80;
			   life4.y = 0;
			   life4.image = core.assets['img/life.png']; 	   
 　　　　var life5 = new Sprite(16,16);
               life5.x = 100;
			   life5.y = 0;
			   life5.image = core.assets['img/life.png']; 	   
 　　　　var life6 = new Sprite(16,16);
               life6.x = 520;
			   life6.y = 0;
			   life6.image = core.assets['img/life.png']; 	   
 　　　　var life7 = new Sprite(16,16);
               life7.x = 540;
			   life7.y = 0;
			   life7.image = core.assets['img/life.png']; 	   
 　　　　var life8 = new Sprite(16,16);
               life8.x = 560;
			   life8.y = 0;
			   life8.image = core.assets['img/life.png']; 	   
 　　　　var life9 = new Sprite(16,16);
               life9.x = 580;
			   life9.y = 0;
			   life9.image = core.assets['img/life.png']; 	   
 　　　　var life10 = new Sprite(16,16);
               life10.x = 600;
			   life10.y = 0;
			   life10.image = core.assets['img/life.png']; 	   



           var Ballet = Class.create(Sprite,{
			   initialize:function(x,y,rotation,scene){
				   Sprite.call(this,16,16);
				   this.rotation = tank.rotation;
				   if(this.rotation == 270)this.x =tank.x+25;
				   if(this.rotation == 270)this.y =tank.y+7;
				   if(this.rotation == 180)this.x =tank.x+9;
				   if(this.rotation == 180)this.y =tank.y-13;
				   if(this.rotation == 90)this.x =tank.x-13;
				   if(this.rotation == 90)this.y =tank.y+7;
				   if(this.rotation == 0)this.x =tank.x+7;
				   if(this.rotation == 0)this.y =tank.y+25;
				   if(this.rotation == 45)this.x =tank.x-8;
				   if(this.rotation == 45)this.y =tank.y+23;
				   if(this.rotation == 135)this.x =tank.x-7;
				   if(this.rotation == 135)this.y =tank.y-7;
				   if(this.rotation == 225)this.x =tank.x+23;
				   if(this.rotation == 225)this.y =tank.y-6;
				   if(this.rotation == 315)this.x =tank.x+22;
				   if(this.rotation == 315)this.y =tank.y+24;
				   
				   this.image = core.assets['img/ballet.png']; 
				  ggg.addChild(this);
				   
				   this.addEventListener('enterframe', function() {
					   if(this.intersect(enemy1)){
						   //console.log("hit");
									   enemy1.hp -= 1;
									   ggg.removeChild(this) ;
									 }
						if(this.y < 180 && this.y > 90){
                                                                  
                                                                    
                                                          if( this.x < 380  ){
								   
								  if(this.x > 260){
                                                          
								  ggg.removeChild(this); 
								   }    
                                                                  }
								  } 
					if(this.x > 260 && this.x < 380 ){
                                                               
                                                                    
                                                         if( this.y > 90 ){
								 
 								
								           
								  if(this.y < 180){
                                                         
								   ggg.removeChild(this);
								}
                                                              } 
								}
                                              if(this.x > 110 && this.x < 170 ){
                                                               
                                                                   
                                                          if( this.y > 16){
								        
								  
                                                          if( this.y < 90){
								   ggg.removeChild(this);
									}	
								  }
                                                                  }
									 
						   if(this.y > 16 && this.y < 100 ){
                                                               
                                                                    
                                                          if( this.x > 110){
								         
								  
                                                          if( this.x < 170){
								   ggg.removeChild(this);
								}
						                  }
								}
								if(this.y < 280 && this.y > 215){
                                                                  
                                                                    
                                                          if( this.x < 460){
								  
								  
                                                          if( this.x > 410){
								    ggg.removeChild(this);      
                                                                  }
								  }	    
						  }
							if(this.x > 460 && this.x < 480 ){
                                                               
                                                                    
                                                          if( this.y > 180){
								          
								  
                                                          if( this.y < 280){
								   ggg.removeChild(this);
                                                                } 
								} 
						  }
					   //console.log(this.x);
					   if(this.rotation == 0)this.y += 6;
					   if(this.rotation == 90)this.x -= 6;
					   if(this.rotation == 180)this.y -= 6;
					   if(this.rotation == 270)this.x += 6;
					   if(this.rotation == 45)this.x -= 6,this.y +=6;
					   if(this.rotation == 135)this.x -= 6,this.y -=6;
					   if(this.rotation == 225)this.x += 6,this.y -=6;
					   if(this.rotation == 315)this.x += 6,this.y +=6;
					   
				   });
			   }
	  		});
	
	


      var BalleT = Class.create(Sprite,{
		   initialize:function(x,y,rotation,scene){
			   Sprite.call(this,16,16);
			  
			   this.image = core.assets['img/ballet2.png']; 
			   this.rotation = enemy1.rotation;
			   if(this.rotation == 270)this.x =enemy1.x+25;
			   if(this.rotation == 270)this.y =enemy1.y+8;
			   if(this.rotation == 180)this.x =enemy1.x+9;
			   if(this.rotation == 180)this.y =enemy1.y-13;
			   if(this.rotation == 90)this.x =enemy1.x-13;
			   if(this.rotation == 90)this.y =enemy1.y+7;
			   if(this.rotation == 0)this.x =enemy1.x+7;
			   if(this.rotation == 0)this.y =enemy1.y+25;
			   if(this.rotation == 45)this.x =enemy1.x-8;
			   if(this.rotation == 45)this.y =enemy1.y+23;
			   if(this.rotation == 135)this.x =enemy1.x-6;
			   if(this.rotation == 135)this.y =enemy1.y-8;
			   if(this.rotation == 225)this.x =enemy1.x+23;
			   if(this.rotation == 225)this.y =enemy1.y-6;
			   if(this.rotation == 315)this.x =enemy1.x+18;
			   if(this.rotation == 315)this.y =enemy1.y+20;
		      ggg.addChild(this);
			   
			   this.addEventListener('enterframe', function() {
				  if(this.intersect(tank)){
					  tank.hp -= 1;
					  ggg.removeChild(this) ;
						 }
					if(this.y < 180 && this.y > 70){
                                                                  
                                                                    
                                                          if( this.x < 380  ){
								   
								  if(this.x > 260){
                                                          
								  ggg.removeChild(this); 
								   }    
                                                                  }
								  } 
					if(this.x > 260 && this.x < 380 ){
                                                               
                                                                    
                                                         if( this.y > 90 ){
								 
 								
								           
								  if(this.y < 180){
                                                         
								   ggg.removeChild(this);
								}
                                                              } 
								}

						if(this.y < 280 && this.y > 215){
                                                                  
                                                                    
                                                          if( this.x < 460){
								  
								  
                                                          if( this.x > 410){
								    ggg.removeChild(this);      
                                                                  }
								  }	    
						  }
							if(this.x > 460 && this.x < 480 ){
                                                               
                                                                    
                                                          if( this.y > 180){
								          
								  
                                                          if( this.y < 280){
								   ggg.removeChild(this);
                                                                } 
								} 
						  }
							if(this.x > 110 && this.x < 170 ){
                                                               
                                                                   
                                                          if( this.y > 16){
								        
								  
                                                          if( this.y < 90){
								   ggg.removeChild(this);
									}	
								  }
                                                                  } 
						   if(this.y > 16 && this.y < 100 ){
                                                               
                                                                    
                                                          if( this.x > 110){
								         
								  
                                                          if( this.x < 170){
								   ggg.removeChild(this);
								}
						                  }
								}
				   if(this.rotation == 0)this.y += 6;
				   if(this.rotation == 90)this.x -= 6;
				   if(this.rotation == 180)this.y -= 6;
				   if(this.rotation == 270)this.x += 6;
				   if(this.rotation == 45)this.x -= 6,this.y +=6;
			           if(this.rotation == 135)this.x -= 6,this.y -=6;
				   if(this.rotation == 225)this.x += 6,this.y -=6;
				   if(this.rotation == 315)this.x += 6,this.y +=6;
			 
				   
			   });
		   }
	  });	

	
		
       
		   
	  
	   
	   
	                           
				   var reroad = true;
				   var reroad2 = true;
				   
				   var Tank = Class.create(Sprite,{
						   initialize:function(x,y,num){
							   Sprite.call(this,32,32);
							   this.x = x;
							   this.y = y;
							   this.hp = 5;
							   if(num == 1){
								   // console.log("hp");
								   this.image = core.assets['img/enemy.png'];
								   this.rotation = 90;
								  
							   }
							   if(num == 2){
								   this.image = core.assets['img/tank.png'];
								   this.rotation = 270;
								   
								   
						 
							   }
							  
						
						
                                                           
					
						
						
							   
			   this.addEventListener('enterframe', function() {
								 
				//console.log(this.hp);
				 

					if(num == 2){
						if(this.hp < 5){
							ggg.removeChild(life5);
						}
						if(this.hp < 4){
							ggg.removeChild(life4);
						}
						if(this.hp < 3){
							ggg.removeChild(life3);
						}
						if(this.hp < 2){
							ggg.removeChild(life2);
						}
                      if(this.hp < 1){
                                    ggg.removeChild(this);
                                    var bom = new Sprite(16,16);
                                    bom.x = this.x;
                                    bom.y = this.y;
                                    bom.image = core.assets['img/life.png'];
                                    ggg.addChild(bom); 
                                    bom.addEventListener('enterframe', function() {
					    core.pushScene(createGameoverScene(tank,enemy1,Time)); 
                          });
                      }				   



						if(this.intersect(enemy1)  && this.x < enemy1.x){
                                                            this.x -= 3;
                                                            if(this.y < enemy1.y)this.y -= 3;
                                                            if(this.y > enemy1.y)this.y += 3;  
                                                                 }       
						if(this.intersect(enemy1)  && this.x > enemy1.x){
                                                            this.x += 3;
                                                            if(this.y < enemy1.y)this.y -= 3;
                                                            if(this.y > enemy1.y)this.y += 3;  
                                                                 }       
						if(this.intersect(enemy1)  && this.y < enemy1.y){
                                                            this.y -= 3;
                                                              }
                                                if(this.intersect(enemy1)  && this.y > enemy1.y){
                                                            this.y += 3;
                                                              }

						 if(core.input.a) {
							  this.x -= 3
							  if(this.x < 11)this.x += 3;
							  this.rotation = 90;
                                                          if(this.x > 260 && this.x < 380 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 90){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 198){
								   this.x -= 3
                                                                } 
								}
							if(this.x > 110 && this.x < 170 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 16){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 90){
								   this.x -= 3	
							 
                                                                }
								}
							  if(this.x > 460 && this.x < 480 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 190){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 240){
								   this.x -= 3
                                                                } 
								}
								}
						  if(core.input.d) {
							  this.x += 3;
							  if(this.x > 590)this.x -= 3;
							  this.rotation = 270;
							  if(this.x > 260 && this.x < 380){
                                                                  
                                                                    this.x -= 3
                                                          if( this.y < 90){
								   this.x += 3        
                                                                  }         
								  
                                                          if( this.y > 198){
								   this.x += 3        
                                                                  }
								  }

							if(this.x > 90 && this.x < 170 ){
                                                               
                                                                    this.x -= 3
                                                          if( this.y < 16){
								   this.x += 3        
                                                                  }                   
								  
                                                          if( this.y > 90){
								   this.x += 3	
								  }
                                                                  }
								if(this.x > 390 && this.x < 440 ){
                                                               
                                                                    this.x -= 3
                                                          if( this.y < 190){
								   this.x += 3        
                                                                  }                   
								  
                                                          if( this.y > 240){
								   this.x += 3
                                                                } 
								}
								}

						  if(core.input.w){
							 this.y -= 3;
							 if(this.y < 12)this.y += 3;
							 this.rotation = 180;
							 if(core.input.d)this.rotation = 225;
							 if(core.input.a)this.rotation = 135;

                                                         if(this.y < 210 && this.y > 80){
                                                                  
                                                                    this.y += 3
                                                          if( this.x > 375){
								   this.y -= 3        
                                                                  }         
								  
                                                          if( this.x < 270){
								   this.y -= 3        
                                                                  }
								  }

							if(this.y > 50 && this.y < 90 ){
                                                               
                                                                    this.y += 3
                                                          if( this.x < 90){
								   this.y -= 3        
                                                                  }                   
								  
                                                          if( this.x > 170){
								   this.y -= 3	
						                  }
								}
							if(this.y < 280 && this.y > 215){
                                                                  
                                                                    this.y += 3
                                                          if( this.x > 460){
								   this.y -= 3        
                                                                  }         
								  
                                                          if( this.x < 410){
								   this.y -= 3        
                                                                  }
								  }
								}
					          if(core.input.s) {
							  this.y += 3;
							  if(this.y > 273)this.y -= 3;
							  this.rotation = 0;
							  if(core.input.d)this.rotation = 315;
							  if(core.input.a)this.rotation = 45;

							  if(this.y < 210 && this.y > 70){
                                                                  
                                                                    this.y -= 3
                                                          if( this.x > 375){
								   this.y += 3        
                                                                  }         
								  
                                                          if( this.x < 270){
								   this.y += 3        
                                                                  }
								  }

							if(this.y > 16 && this.y < 90 ){
                                                               
                                                                    this.y -= 3
                                                          if( this.x < 90){
								   this.y += 3        
                                                                  }                   
								  
                                                          if( this.x > 170){
								   this.y += 3	
						                  }
								}
								if(this.y < 240 && this.y > 190){
                                                                  
                                                                    this.y -= 3
                                                          if( this.x > 460){
								   this.y += 3        
                                                                  }         
								  
                                                          if( this.x < 410){
								   this.y += 3        
                                                                  }
								  }
						  }						
					if(core.input.shot && reroad ){
								  var ballet1 = new Ballet(this.x,this.y,this.rotation,core.rootScene);
								 
								  reroad = false;
							  }
					}
				
					
					    ggg.addEventListener('shotbuttonup', function(e) {
							
                                   　　　　　　　　　  reroad = true;
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
							
						})
					
					
					
						if(num == 1){
                      if(this.hp < 5){
							ggg.removeChild(life6);
						}
						if(this.hp < 4){
							ggg.removeChild(life7);
						}
						if(this.hp < 3){
							ggg.removeChild(life8);
						}
						if(this.hp < 2){
							ggg.removeChild(life9);
						}
                     if(this.hp < 1){
					
				   ggg.removeChild(this);
                                    var bom2 = new Sprite(16,16);
                                    bom2.x = this.x;
                                    bom2.y = this.y;
                                    bom2.image = core.assets['img/life.png'];
                                    ggg.addChild(bom2); 
                                    bom2.addEventListener('enterframe', function() {
					    core.pushScene(createGameoverScene(tank,enemy1,Time)); 
                          });
                      }				   

 
					           if(this.intersect(tank)  && this.x < tank.x){
                                                            this.x -= 3;
                                                            if(this.y < tank.y)this.y -= 3;
                                                            if(this.y > tank.y)this.y += 3;  
                                                                 }       
						if(this.intersect(tank)  && this.x > tank.x){
                                                            this.x += 3;
                                                            if(this.y < tank.y)this.y -= 3;
                                                            if(this.y > tank.y)this.y += 3;  
                                                                 }       
						if(this.intersect(tank)  && this.y < tank.y){
                                                            this.y -= 3;
                                                              }
                                                if(this.intersect(tank)  && this.y > tank.y){
                                                            this.y += 3;
                                                              }  
							
							
						 if(core.input.left) {
							  this.x -=3;
							  if(this.x < 11)this.x += 3;
							  this.rotation = 90;
                                                          if(this.x > 260 && this.x < 380 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 90){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 198){
								   this.x -= 3
                                                                } 
								} 
							  if(this.x > 460 && this.x < 480 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 190){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 240){
								   this.x -= 3
                                                                } 
								} 
								if(this.x > 110 && this.x < 170 ){
                                                               
                                                                    this.x += 3
                                                          if( this.y < 16){
								   this.x -= 3        
                                                                  }                   
								  
                                                          if( this.y > 90){
								   this.x -= 3
                                                              }
							}
						  }
						  if(core.input.right) {
							  this.x += 3;
							  if(this.x > 590)this.x -= 3;
							  this.rotation = 270;
							  if(this.x > 260 && this.x < 380){
                                                                  
                                                                    this.x -= 3
                                                          if( this.y < 90){
								   this.x += 3        
                                                                  }         
								  
                                                          if( this.y > 198){
								   this.x += 3        
                                                                  }
								  }
								if(this.x > 390 && this.x < 440 ){
                                                               
                                                                    this.x -= 3
                                                          if( this.y < 190){
								   this.x += 3        
                                                                  }                   
								  
                                                          if( this.y > 240){
								   this.x += 3
                                                                } 
								}
							if(this.x > 90 && this.x < 170 ){
                                                               
                                                                    this.x -= 3
                                                          if( this.y < 16){
								   this.x += 3        
                                                                  }                   
								  
                                                          if( this.y > 90){
								   this.x += 3	
								  }
                                                                  } 
								  }
						  if(core.input.up){
							 this.y -= 3;
							 if(this.y < 12)this.y += 3;
							 this.rotation = 180;
							 if(core.input.right)this.rotation = 225;
							 if(core.input.left)this.rotation = 135;
                                                         if(this.y < 210 && this.y > 70){
                                                                  
                                                                    this.y += 3
                                                          if( this.x > 375){
								   this.y -= 3        
                                                                  }         
								  
                                                          if( this.x < 270){
								   this.y -= 3        
                                                                  }
								  }
							if(this.y < 280 && this.y > 215){
                                                                  
                                                                    this.y += 3
                                                          if( this.x > 460){
								   this.y -= 3        
                                                                  }         
								  
                                                          if( this.x < 410){
								   this.y -= 3        
                                                                  }
								  }	
								if(this.y > 50 && this.y < 90 ){
                                                               
                                                                    this.y += 3
                                                          if( this.x < 90){
								   this.y -= 3        
                                                                  }                   
								  
                                                          if( this.x > 170){
								   this.y -= 3	
						                  }
								}	    
						  }
					  if(core.input.down) {
							  this.y += 3;
							  if(this.y > 273)this.y -= 3;
							  this.rotation = 0;
							  if(core.input.right)this.rotation = 315;
							  if(core.input.left)this.rotation = 45;
							  if(this.y < 210 && this.y > 70){
                                                                  
                                                                    this.y -= 3
                                                          if( this.x > 375){
								   this.y += 3        
                                                                  }         
								  
                                                          if( this.x < 270){
								   this.y += 3        
                                                                  }
								  }
							if(this.y < 240 && this.y > 190){
                                                                  
                                                                    this.y -= 3
                                                          if( this.x > 460){
								   this.y += 3        
                                                                  }         
								  
                                                          if( this.x < 410){
								   this.y += 3        
                                                                  }
								 } 
								if(this.y > 16 && this.y < 90 ){
                                                               
                                                                    this.y -= 3
                                                          if( this.x < 90){
								   this.y += 3        
                                                                  }                   
								  
                                                          if( this.x > 170){
								   this.y += 3	
						                  }
								}
						  }	   
					  if(core.input.shot2 && reroad2){
								  var ballet2 = new BalleT(this.x,this.y,this.rotation,core.rootScene);
								  reroad2 = false;
							  }		   
						
						}				   
										 
							
							  
								
						   
					  
					   
					  ggg.addEventListener('shot2buttonup', function(e) {
							reroad2 = true ;
								}) 
								 
							   });
						}
					   
				 　　 });
					   
					   var enemy1 = new Tank(540,100,1);
					   var tank = new Tank(50,200, 2);




         
             
                 
              
		
	    // 16x16 pxのサイズでマップオブジェクトの用意
        var map = new Map(16, 16);
        // マップオブジェクトに画像を登録
        map.image = core.assets['img/map0.png'];
        // 配列でマップデータを用意する
        var mapArray = [
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 15, 15, 15, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,0,0, 4 ]
        ];


    



		map.loadData(mapArray);
        
		 ggg.addChild(map);
		 ggg.addChild(tank);
		 ggg.addChild(enemy1);
		 ggg.addChild(life1);
		 ggg.addChild(life2);
		 ggg.addChild(life3);
		 ggg.addChild(life4);
		 ggg.addChild(life5);
		 ggg.addChild(life6);
		 ggg.addChild(life7);
		 ggg.addChild(life8);
		 ggg.addChild(life9);
		 ggg.addChild(life10);
		 ggg.addChild(timeLimit);

                 
		

		 
    
	return ggg;
	
	  };
	
	
	var createGameoverScene = function(tank,enemy1,time){
		var ddd = new Scene();
		ddd.backgroundColor = '#555555';
		 var label = new Label( '             finish  <br>スペースキーを押してください')
		label.x = 250;
		label.y = 160;
        
            ddd.addEventListener('shotbuttonup', function(e){
				// console.log("die");

                if(tank.hp < 1){
                 ddd.removeChild(label);
                 var win1 = new Label ('player2 win　　<br> f5キーを押してください')
                 win1.x = 250;
		 win1.y = 160;
				 ddd.addChild(win1);
                }
                if(enemy1.hp < 1){
		ddd.removeChild(label);
                 var win2 = new Label ('player1 win　　<br> f5キーを押してください')
                 win2.x = 250;
		 win2.y = 160;
				 ddd.addChild(win2);
                }
		        if(time <= 0 ){
                 ddd.removeChild(label);
                 var drow = new Label ('draw　<br> f5キーを押してください')
                 drow.x = 250;
		 drow.y = 160;
				 ddd.addChild(drow);
                }
               });
		ddd.addChild(label);
		

               core.assets['music/sougen2.mp3'].stop();
		
		
		return ddd;
		
		
	};
           
	};
	
	
    core.start();




  
}





