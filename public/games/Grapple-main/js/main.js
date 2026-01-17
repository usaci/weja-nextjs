//http://enchantjs.com/ja/tutorial/lets-start-enchant-js/#ref_4
enchant();

function ObjectCreate(what,time,player,scene){
	
	var object = new Sprite(150,150);
	object.x = player.x - object.width/4;
	object.y = player.y - object.width/4;
	object.opacity = 0.5;
	
	var image;
	var starttime = core.time;
	
	
	switch(what){
		case 'uzu':
			
			image = 'image/uzu.png';
			
			break;
	}
	
	object.image = core.assets[image];
	
	object.addEventListener('enterframe',function(e){
		this.rotation += 1;
		
		object.x = player.x - object.width/4;
		object.y = player.y - object.width/4;
		
		if((core.time - starttime) > time )scene.removeChild(this);
		
		if(this.intersect(player.enemy) && player.enemy.state != 'escape' && player.enemy.state != 'stan'){
			player.enemy.set('stan');
			player.callstan = false;
		}
	});
	scene.addChild(object);
}

//当たり判定を取得する関数
function Attack(player,enemy,x,y,form,Push,range,POWER){
	//x,y:当たり判定の中心,form:当たり判定の形,range:円の半径または正方形の辺の1/2

	var col = false;
	var center = enemy.width / 2;
	
	
	//判定の形
	switch (form){
		case 'circle'://円形
			if(Math.sqrt(Math.pow(Math.abs(enemy.x + center - x),2) + Math.pow(Math.abs(enemy.y + center - y),2)) < range){
				col = true;
			}		
			break;
		
		case 'square'://正方形
			if(Math.abs(enemy.x + center - x) <  range && Math.abs(enemy.y + center - y) < range){
				col = true;
			}			
			break;
	}
	
	
	if(col && enemy.state != 'DEAD' && enemy.state != 'escape'){
		
		
		enemy.x -= Push * player.side
		enemy.side = -1 * player.side;
		
		
		if(enemy.state.charAt(0) != 'D' && enemy.state != 'escape'){
			if(core.mode == 'play')enemy.hp -= POWER;
		}
		
		if(enemy.hp < 0){
			enemy.set('DEAD');
			core.mode = 'finish';
		}else{
			if(POWER != 0){
				enemy.set('attacked');
			}
		}
		
		if(player.state == 'AaX')player.Powerset(0);
		
		
	}
	
}

 	//ラベル生成関数
function labelcreate(label,color,x,y,scale,opa,scene){
	
	
	 label.scale(scale,scale);
	 label.x = x;
	 label.y = y;
	 label.color = color;
	 label.opacity =opa;
     label.font ='HGP創英角ﾎﾟｯﾌﾟ体';
     scene.addChild(label);
}


 	//カウントダウン関数
function countdown(time,color,patarn,nextmode,scene,player1,player2){
	
	
	var counttime = 0;
	var count = new Label('');//3sカウントダウン
	labelcreate(count,color,1420,250,8,1,scene);
	var start = new Label('Fight!');
	labelcreate(start,color,1300,250,8,0,scene);
				
				
	if(patarn == 'sudden-death'){
		start.text = 'Sudden-death';
		start.opacity = 1;
		player1.chargetime = 300;
		player2.chargetime = 300;
		player1.charge = true;
		player2.charge = true;
		start.x = 1220;
		start.y += 100;
	}
	
	
	scene.addEventListener('enterframe',function(e){

		counttime++;
		
		if(core.mode == 'countdown'){
			count.text = time - Math.floor(counttime/60);
			if(counttime/60 >= time ){
				core.sparetime = (Math.floor(core.time*10)) / 10;
				scene.removeChild(count);
				start.x = 1370;
				start.y = 250;
				start.opacity = 1;
				core.mode = nextmode;//GameStart

				if(patarn == 'round1'){

				player1.defencetime = 300;
				player2.defencetime = 300;
				player1.chargetime = 0;
				player2.chargetime = 0;
				player1.charge = false;
				player2.charge = false;

				}else if(patarn == 'sudden-death'){
					start.text = 'Fight!';
					player1.chargetime = 300;
					player2.chargetime = 300;
					player1.charge = true;
					player2.charge = true;
				}
				core.assets['sound/BattleBGM.wav'].play();
			}
		}
		if(counttime/60 >= 4){
			scene.removeChild(start);
		}
	});
}


	//Playerクラス	
var Player =enchant.Class.create(enchant.Sprite,{
	
	initialize: function(num,chara,scene){
		
		enchant.Sprite.call(this,75,75);
		
			//playerプロパティ
		this.frame = 1;
		var jtime = 0;
		var atime = 0;	
		if(num == 1)this.x = 500;
		if(num == 2)this.x = 150;
		this.y = 400;
		this.vy= 0;
		this.vx= 0;
		this.hp = 300;
		this.next = false;
		this.side;//右:-1 , 左:+1
		this.enemy;//敵
		this.conflict = false;
		this.state = 'wait';//playerの状態
		this.prestate ='';//状態を保存
		this.defencetime = 300;
		this.chargetime = 0;
		this.charge;
		
		var image;//キャラ画像
		var combo = true; //コンボが可能かどうか
		var falling = false; //落下中かどうか
		var command = new Array(3); //コマンド配列
		var keyon;//最後にキーを押した時間を記録する
		var st = 'wait';//仮state
		var p = this;//player
		var A1,A2,A3,A4,A5,AX;//攻撃コマンド
		
		
		//アニメーション
		var FIRSTFRAME;
		var LASTFRAME;
		var ATTACKfrom;
		var ATTACKto;
		var POWER;
		var PUSH;
		var FORM;
		var RANGE;
		var REPEAT;
		var repeatcount;
		var SPEED;
		var VELOCITY;
		var speedcount;
		var NEXT;
		var NUM;
		var COM;
		var Y;
		var canMove;
		var controlX;
		
		//初期設定
		switch (chara){
			case 'IWA':
				A1 = 'Aa1';
				A2 = 'Aa2';
				A3 = 'Aa3';
				A4 = 'Aa4';
				A5 = 'Aa5';
				AX = 'AaX';
				D = 'Da'
				image = 'image/iwa.png';
				break;

			case 'ICHIGOBAKUMAJIRO':
				A1 = 'Ab1';
				A2 = 'Ab2';
				A3 = 'Aa3';
				A4 = 'Ab4';
				A5 = 'Ab5';
				AX = 'AbX';
				D = 'Da'
				image = 'image/IchigoBakuMajiro.png';
				break;
				
			
			case 'PERSON':
				A1 = 'Ac1';
				A2 = 'Ac2';
				A3 = 'Ac3';
				A4 = 'Ac4';
				A5 = 'Aa5';
				AX = 'AcX';
				D = 'Da'
				image = 'image/person.png';
				break;

		}
		//キャラクターの画像を設定する
		this.image = core.assets[image];
		

		//playerの状態をセットする関数		
		this.set = function(state){
			if(this.prestate != 'DEAD'){
			st = state;
			this.state = state;
			this.prestate = '';
			keyon = core.time;
			}
		}		
		
		
		//playerのコマンドをリセットする関数
		this.ResetCommand = function(){
			command = [];
			this.state = 'wait'
			
		}
		this.Powerset = function(power){
			POWER = power;
		}
		
		
		this.addEventListener('enterframe',function(e){
			
			
			
			
			/*-----ここから初期化-----------------------------------------------------------------*/
			
			if(this.state != this.prestate && this.prestate != 'DEAD'){

				this.prestate = this.state;
				FIRSTFRAME;
				LASTFRAME;
				ATTACKfrom;
				ATTACKto;
				POWER = 0;
				PUSH = 0;
				FORM = 'circle';
				RANGE = 50;
				REPEAT;
				repeatcount = 0;
				SPEED = 1;
				VELOCITY = 0;
				speedcount = 1;
				NEXT = '';
				NUM = 0;
				COM;
				Y = this.y;
				canMove = true;
				controlX = 0;;
				this.scaleX = this.side;
				this.scaleY = 1;
				this.callstan = false;
				
				
				
				switch (this.state){
					
					
					case 'Aa1':
					
						FIRSTFRAME = 30;
						LASTFRAME = 32;
						ATTACKfrom = 31;
						ATTACKto = 32;
						POWER = 2;
						PUSH = 1;
						REPEAT = 1;
						SPEED = 5;
						NEXT = 'Aa2';
						NUM = 4;
						canMove = false;
						
						break;
						
					case 'Ab1':
					
						FIRSTFRAME = 30;
						LASTFRAME = 32;
						ATTACKfrom = 32;
						ATTACKto = 32;
						POWER = 2;
						PUSH = 1;
						REPEAT = 1;
						SPEED = 5;
						NEXT = 'Ab2';
						NUM = 4;
						canMove = false;
						
						break;
						
					case 'Ac1':
					
						FIRSTFRAME = 30;
						LASTFRAME = 31;
						ATTACKfrom = 31;
						ATTACKto = 31;
						POWER = 2;
						PUSH = 1;
						REPEAT = 1;
						SPEED = 5;
						NEXT = 'Ac2';
						NUM = 4;
						canMove = false;
						
						break;
					
					case 'Aa2':
					
						FIRSTFRAME = 33;
						LASTFRAME = 34;
						ATTACKfrom = 35;
						ATTACKto = 35;
						POWER = 3;
						PUSH = 2;
						REPEAT = 1;
						SPEED = 4;
						NEXT = 'Aa3';
						NUM = 5;
						canMove = false;
						
						break;
						
					case 'Ab2':
						
						FIRSTFRAME = 33;
						LASTFRAME = 35;
						ATTACKfrom = 35;
						ATTACKto = 35;
						POWER = 10;
						PUSH = 2;
						REPEAT = 0;
						SPEED = 10;
						NEXT = 'Aa3';
						NUM = 5;
						canMove = false;
						
						break;
						
					case 'Ac2':
						
						FIRSTFRAME = 32;
						LASTFRAME = 34;
						ATTACKfrom = 35;
						ATTACKto = 35;
						POWER = 10;
						PUSH = 2;
						REPEAT = 0;
						SPEED = 10;
						NEXT = 'Ac3';
						NUM = 5;
						canMove = false;
						
						break;
						
					case 'Aa3':
					
						FIRSTFRAME = 36;
						LASTFRAME = 39;
						ATTACKfrom = 36;
						ATTACKto = 39;
						POWER = 7;
						RANGE = 70;
						PUSH = 10;
						REPEAT = 1;
						SPEED = 8;
						VELOCITY = 10 * this.side;
						canMove = false;
						
						break;
						
					case 'Ac3':
					
						FIRSTFRAME = 35;
						LASTFRAME = 36;
						ATTACKfrom = 36;
						ATTACKto = 38;
						POWER = 30;
						RANGE = 50;
						PUSH = 10;
						REPEAT = 0;
						SPEED = 15;
						VELOCITY = 10 * this.side;
						canMove = false;
						
						break;
						
					case 'Aa4':
					
						FIRSTFRAME = 20;
						LASTFRAME = 22;
						ATTACKfrom = 21;
						ATTACKto = 22;
						RANGE = 30;
						POWER = 3;
						PUSH = 7;
						REPEAT = 20;
						SPEED = 1;
						VELOCITY = -1 * this.side;
						canMove = false;
						controlX = 10;
					
						
						break;
						
					case 'Ab4':
					
						FIRSTFRAME = 20;
						LASTFRAME = 22;
						ATTACKfrom = 21;
						ATTACKto = 22;
						RANGE = 30;
						POWER = 3;
						PUSH = 0;
						REPEAT = 40;
						SPEED = 1;
						VELOCITY = -7 * this.side;
						controlX = 10;
						this.vy = -20;
						jtime = core.time;
						falling = true;
					
						
						break;
						
					case 'Ac4':
					
						FIRSTFRAME = 20;
						LASTFRAME = 22;
						ATTACKfrom = 20;
						ATTACKto = 22;
						POWER = 30;
						PUSH = 100;
						REPEAT = 0;
						SPEED = 10;
						VELOCITY = 40 * this.side;
						canMove = false;
					
						
						break;
					/*
					case 'Aa5':
					
						FIRSTFRAME = 20;
						LASTFRAME = 22;
						ATTACKfrom = 21;
						ATTACKto = 22;
						RANGE = 10;
						POWER = 3;
						PUSH = 0;
						REPEAT = 40;
						SPEED = 1;
						VELOCITY = -7 * this.side;
					
						
						break;
						
					case 'Ab5':
					
						FIRSTFRAME = 20;
						LASTFRAME = 22;
						ATTACKfrom = 21;
						ATTACKto = 22;
						RANGE = 10;
						POWER = 3;
						PUSH = 0;
						REPEAT = 40;
						SPEED = 1;
						VELOCITY = -7 * this.side;
					
						
						break;
					
					*/
					case 'AaX':
					
						FIRSTFRAME = 23;
						LASTFRAME = 25;
						ATTACKfrom = 23;
						ATTACKto = 25;
						POWER = 100;
						RANGE = 130;
						REPEAT = 0;
						SPEED = 20;
						PUSH = 50;
						canMove = false;
						this.charge = false;
						this.chargetime = 0;
						
						this.y = 0;
						this.scaleX = 5;
						this.scaleY = 5;
						falling = true;
						jtime = core.time;
						
					
						
						break;
						
					case 'AbX':
					
						FIRSTFRAME = 23;
						LASTFRAME = 25;
						ATTACKfrom = 24;
						ATTACKto = 25;
						POWER = 3;
						RANGE = 60;
						REPEAT = 20;
						SPEED = 1;
						PUSH = 0;
						canMove = false;
						this.charge = false;
						this.chargetime = 0;
					
						
						break;
						
					case 'attacked':
						
						FIRSTFRAME = 50;
						LASTFRAME = 51;
						REPEAT = 2;
						SPEED = 5;
						canMove = false;
				
						break;
					
						
					case 'wait':
						
						FIRSTFRAME = 0;
						LASTFRAME = 3;
						REPEAT = 10000;
						SPEED = 20;
						RANGE = 30;
						PUSH = 17;
						POWER = 0;
						
						break;
						
					case 'afterA':
						
						FIRSTFRAME = 0;
						LASTFRAME = 3;
						REPEAT = 0;
						SPEED = 4;
						canMove = false;
					
						break;
					
					case 'Da':
					
						FIRSTFRAME = 15;
						LASTFRAME = 17;
						REPEAT = 1000;
						RANGE = 45;
						PUSH = 25;
						POWER = 0;
						canMove = false;
					
						break;
						
					case 'escape':
					
						FIRSTFRAME = 60;
						LASTFRAME = 62;
						REPEAT = 5;
						VELOCITY = 10 * this.side;
					
						break;
						
					case 'stan':
					
						FIRSTFRAME = 70;
						LASTFRAME = 72;
						REPEAT = 10;
						SPEED = 6;
						canMove = false;
					
						break;
						
					case 'charge':
					
						FIRSTFRAME = 0;
						LASTFRAME = 3;
						REPEAT = 8;
						SPEED = 6;
						PUSH = 1;
						canMove = false;
					
						break;
					
					case 'run':
					
						FIRSTFRAME = 0;
						LASTFRAME = 3;
						ATTACKfrom = 0;
						ATTACKto = 3;
						REPEAT = 100;
						RANGE = 30;
						PUSH = 3;
						POWER = 0;
						
						break;
						
					case 'jump':
					
						FIRSTFRAME = 5;
						LASTFRAME = 13;
						REPEAT = 0;
						SPEED = 3;
					
						break;
						
					case 'DEAD':
					
						FIRSTFRAME = 40;
						LASTFRAME = 44;
						REPEAT = 0;
						SPEED = 2;
						canMove = false;
					
						break;
			
				}
				
				//プレイヤーの初期フレーム
				
					this.frame = FIRSTFRAME;
					
			}
			/*-----ここまで初期化-----------------------------------------------------------------*/
	
				
			if(this.state == 'Aa4'){
				this.y = Y;
				jtime = core.time;
				falling = true;
				VELOCITY += 0.3 * this.side;
			}
			if(this.state == 'Ac4' && this.frame == 21){
				
				VELOCITY = 0;
			}
			if(this.state == 'AaX'){
				this.scaleX = 5;
			}
			if(this.state.charAt(0) == 'D'){
				this.defencetime -= 2;
				if(this.defencetime < 0){
					this.set('stan');
					this.defencetime = 0;
				}
			}
			if(this.state == 'charge'){
				this.chargetime += 2;
				if(this.chargetime > 300){
					this.charge = true;
					this.chargetime = 300;
				}
			}

			if(speedcount >= SPEED){
				speedcount = 1;
				this.frame ++;
				this.x -= VELOCITY;

				if(this.frame <= ATTACKto && this.frame >= ATTACKfrom){
					Attack(this,this.enemy,this.x + (this.width / 2) - (10 * this.side) + controlX * this.side ,this.y + (this.height / 2),FORM,PUSH,RANGE,POWER);
				}
				if(this.frame > LASTFRAME ){
					
					if(repeatcount < REPEAT){

						this.frame = FIRSTFRAME;
						repeatcount ++;
					}else{

						if(command[NUM] == 'A'){

							this.set(NEXT);
							this.next = false;
							
						}else{
							if(this.state == 'DEAD'){
								this.frame = 44;
								FIRSTFRAME = 44;
								LASTFRAME = 47;
								SPEED = 10;

							}else if(this.state == A3){
								this.set('afterA');
								
							}else if(this.state == 'AaX'){
								this.scaleX = 1 * this.side;
								this.scaleY = 1;
								this.set('wait');
							}else{
								this.ResetCommand();
								this.frame = 0;
								this.set('wait');
								
							}
						}
					}
				}
				
			}else{
				speedcount++;
			}
				
			if(this.state == 'Ab4'){
				VELOCITY += 0.4 * this.side;
			}
});
		
		
			//playerに毎フレーム呼ばれるイベントを追加
		this.addEventListener('enterframe',function(e){
			
			if(this.state != 'DEAD'){

				//今の状態を保存
				st = this.state;
				if(num == 1 && this.state != 'attacked'){
					
					//左ボタンが押されたら
					if(core.input.left){
						if(canMove){
							this.vx -= 7;
							command[0] = '←';
							this.side = 1
							keyon = core.time;
							
						}
					}

					//右ボタンが押されたら
					if(core.input.right){
						if(canMove){
							this.vx += 7;
							command[0] = '→';
							this.side = -1;
							keyon = core.time;
							
						}
					}

					//上ボタンが押されたら			
					if(core.input.up){
						if(this.state == 'Ab4' && !falling){
							this.vy = -20;
							jtime = core.time;
							falling = true;
						}
						if(canMove){
							if(!falling && command[2] != '↑'){	
								this.vy = -20;
								st = 'jump';
								jtime = core.time;//jumpした時間
								falling = true;//落下処理
							}
							command[2] = '↑';
							keyon = core.time;
						}
					}

					//下ボタンが押されたら
					if(core.input.down && canMove && !falling){
						command[2] = '↓';
						this.set('charge')
						keyon = core.time;
					}

					//攻撃ボタンを押されたら
					if(core.input.e && this.state != 'stan'){
						
						if(combo == true){
							if(command[3] == 'A'){
								if(command[4] == 'A'){
									command[5] = 'A';
								}else{
								command[4] = 'A';
								}
							}else{
								command[3] = 'A';
								if(this.charge && core.input.down){
									if(!falling && AX == 'AbX'){
										st = AX;
									}else if(AX == 'AaX'){
										st = AX;
									}else if(AX =='AcX' && !this.callstan){
										
										command[3] = '';
										this.callstan = true;
										ObjectCreate('uzu',2,this,scene);
										this.charge = false;
										this.chargetime = 0;
									}
								}else if(core.input.left || core.input.right){
									st = A4;
								}else{
									st = A1;
								}							
							}
							keyon = core.time;
							combo = false;
						}

					}

					//防御ボタンを押されたら
					if(core.input.z && !falling && this.state != 'stan'){
						if(this.state.charAt(0) != 'A'){
							keyon = core.time;
							if(combo == true){
								command[0] = 'D';
								combo = false;
							}
						}
					}

					//player2のボタン処理
				}else if(num == 2 && this.state != 'attacked'){

					//左ボタンが押されたら
					if(core.input.a){
						if(canMove){
							this.vx -= 7;
							command[0] = '←';
							keyon = core.time;
							this.side = 1;
							
							}
						}
					


					//右ボタンが押されたら
					if(core.input.d){
						if(canMove){
							this.vx += 7;
							command[0] = '→';
							keyon = core.time;
							this.side = -1;
							
						}
					}


					//上ボタンが押されたら			
					if(core.input.w){
						if(this.state == 'Ab4' && !falling){
							this.vy = -20;
							jtime = core.time;
							falling = true;
						}
						if(canMove && command[2] != '↑'){
							if(!falling){	
								this.vy = -20;
								st = 'jump';
								jtime = core.time;//jumpした時間
								falling = true;//落下処理
							}
							command[2] = '↑';
							keyon = core.time;
						}
					}


					//下ボタンを押されたら
					if(core.input.s && canMove){
						if(falling){
							//this.set(A5);
						}else{
							this.set('charge');
						}
						command[2] = '↓';
						keyon = core.time;
					}


					//攻撃ボタンを押されたら
					if(core.input.g && this.state != 'stan'){
						if(combo == true){
							if(command[3] == 'A'){
								if(command[4] == 'A'){
									command[5] = 'A';
								}else{
								command[4] = 'A';
								}
							}else{
								command[3] = 'A'
								if(this.charge && core.input.s ){
									if(!falling && AX == 'AbX'){
										st = AX;
									}else if(AX == 'AaX'){
										st = AX;
									}else if(AX =='AcX' && !this.callstan){
										
										command[3] = '';
										this.callstan = true;
										ObjectCreate('uzu',2,this,scene);
										this.charge = false;
										this.chargetime = 0;
									}
								}else if(core.input.a || core.input.d){
									st = A4;						
								}else{
									st = A1;
								}				
							}
							keyon = core.time;
							combo = false;
						}					
					}


					//防御ボタンを押されたら
					if(core.input.f && !falling && this.state != 'stan'){
						if(this.state.charAt(0) != 'A'){
							keyon = core.time;
							if(combo == true){
								command[0] = 'D';
								combo = false;
							}
						}
					}
				}


				if((core.time - keyon) > 0.5)command =[];



				if(command[0] == '←'){
					this.side = 1;
					if(st == 'wait'){
						st = 'run';
					}
				}


				if(command[0] == '→'){
					this.side = -1;
					if(st == 'wait'){
						st = 'run';
					}				
				}


				if(command[0] == 'D'){
					if(this.defencetime > 0)st = D;
					if(((core.input.left && num == 1 )|| (core.input.a && num == 2)) && this.state.charAt(0) =='D'){
						this.side = 1;
						command[0] = '';
						st = 'escape';
					}
					if(((core.input.right && num == 1 )|| (core.input.d && num == 2))&& this.state.charAt(0) =='D'){
						this.side = -1;
						command[0] = '';
						st = 'escape';
					}
				}else{
					if(this.defencetime < 300)this.defencetime ++;
				}


				if(command[2] == '↑'){

				}


				if(command[2] == '↓'){

				}


				if(command[3] == 'A'){
					if(command[5] == 'A' && this.state == A2){
						this.next = true;
					}else if(command[4] == 'A' && this.state == A1){
						this.next = true;					
					}
				}


				
				this.vy += 10 * (core.time - jtime);
				


					//移動処理
				this.scaleX = this.side;
				this.y += this.vy;
				this.x += this.vx;
				this.vx = 0;


					//地面の設定
				if(this.y >= 400){
					this.y = 400;
					this.vy = 0;
					jtime = 0;
					if(this.state == 'jump')st = 'wait';
					falling = false;
				}


					//壁の設定
				if(this.x > 800 - this.width)this.x = 800 - this.width;
				if(this.x < 0 )this.x = 0;

				this.state = st;
			}
		});
		
		
			
			if(num == 1){
				scene.addEventListener('ebuttonup', function(e) {
							combo = true;
					});	
				scene.addEventListener('leftbuttonup', function(e) {
							command[0] ='' ;
							if(p.state == 'run')p.state = 'wait';
					});	
				scene.addEventListener('rightbuttonup', function(e) {
							command[0] ='' ;
							if(p.state == 'run')p.state = 'wait';
					});	
				scene.addEventListener('upbuttonup', function(e) {
							command[2] ='' ;
					});	
				scene.addEventListener('downbuttonup', function(e) {
							command[2] ='' ;
							if(p.state == 'charge')p.set('wait');
					});	
				scene.addEventListener('zbuttonup', function(e) {
							command[0] ='' ;
							if(p.state.charAt(0) == 'D')p.set('wait');
							combo = true;
					});	
			}else if(num == 2){
				scene.addEventListener('gbuttonup', function(e) {
							combo = true;
					});	
				scene.addEventListener('abuttonup', function(e) {
							command[0] ='' ;
							if(p.state == 'run')p.state = 'wait';
					});	
				scene.addEventListener('wbuttonup', function(e) {
							command[2] ='' ;
					});	
				scene.addEventListener('sbuttonup', function(e) {
							command[2] ='' ;
							if(p.state == 'charge')p.set('wait');
					});	
				scene.addEventListener('dbuttonup', function(e) {
							command[0] ='' ;
							if(p.state == 'run')p.state = 'wait';
					});	
				scene.addEventListener('fbuttonup', function(e) {
							command[0] ='' ;
							if(p.state.charAt(0) == 'D')p.set('wait');
							combo = true;
					});	
			}
		

		    	//playerをシーンに配置
			scene.addChild(this);
		}	
});
//ウィンドウが開いたら
window.onload = function() {
	
 //core = new Game(320, 240);
  core = new Core(800,576);
	
	
  	//変数の宣言
  core.fps = 40;
  core.six = 0;
  core.time = 0;
  core.sparetime = 0;
  core.mode = 'pre';
  core.preload('image/person.png','image/stage.jpg','image/num.png','image/plate.png','image/GRAPPLE.png','image/gauge.png','image/world.png','image/iwa.png','image/slime.png', 'sound/BattleBGM.wav', 'image/apple.png','image/IchigoBakuMajiro.png','image/steam.png','image/haguruma.png','image/ha.png','image/ha1.png','image/serect.png','image/old.png','image/gard.png','image/charge.png','image/energy.png','image/wanted.png','image/mugen.png','image/uzu.png');
  //core.bgm = Sound.load('sound/BattleBGM.wav');
  core.atime = 0;
  core.frame = 0;
  core.gametime = 60;
  core.advantage = 0;
 
	
  	//ゲームが始まったら
  core.onload = function() {
	  
	  
	//core.bgm.volume = 0.5;
	  
	  
		//タイトルシーン
	TITLE = new Sprite(1600,800);
	TITLE.image = core.assets['image/GRAPPLE.png'];
	core.rootScene.addChild(TITLE);
	  
	var start = new Label('SPACEキーを押してください');
	labelcreate(start,'#FFF',500,250,3,1,core.rootScene);
	start.tl.fadeOut(30).fadeIn(30).loop();
	  
	var F5 = new Label('全画面表示にするにはF11キーを押してください');
	labelcreate(F5,'#FFF',500,50,2,1,core.rootScene);
	  
	 
    	//タイトルシーン→バトルシーン
	core.rootScene.addEventListener('touchstart', function(e) {
		 	//バトルシーンへ移行
		 core.pushScene(core.SerectScene());
	});

	  
	  
	core.rootScene.addEventListener('bbuttondown', function(e) {
	 	//バトルシーンへ移行
		 core.pushScene(core.SerectScene());
	});
	  
	  
		//keycodeの割り当て
	core.keybind(32,'b');//Space:決定
	core.keybind(71,'g');//G:攻撃
	core.keybind(191,'e');//?:攻撃
	core.keybind(190,'z');//>:防御
	core.keybind(70,'f');//F:防御
	core.keybind(65,'a');//A:左
	core.keybind(83,'s');//S:下
	core.keybind(68,'d');//D:右
	core.keybind(87,'w');//W:上

	
 		//バトルシーンの生成関数
	core.SerectScene = function(){
		
		var serectScene = new Scene();

		var num1 = 1;
		var num2 = 1;
 		var num3 = 1;		
		var ok1 = true;
		var ok2 = true;
		serect1 = false;
		serect2 = false;
		serect3 = false;
		stageserect = false;
		

		background = new Sprite(800,576);
		background.image = core.assets['image/old.png'];
		serectScene.addChild(background);
		
		
		wanted = new Sprite(800,576);
		wanted.image = core.assets['image/wanted.png'];
		wanted.x = 0;
		wanted.y = 0;
		serectScene.addChild(wanted);


		key1 = new Sprite(100,100);
		key1.image = core.assets['image/ha1.png'];
		key1.x = 400;
		key1.y = 300;
		serectScene.addChild(key1);
		

		key2 = new Sprite(100,100);
		key2.image = core.assets['image/ha1.png'];
		key2.x = 400;
		key2.y = 450;
		serectScene.addChild(key2);
		
		
		key3 = new Sprite(100,100);
		key3.image = core.assets['image/ha1.png'];
		key3.x = 400;
		key3.y = 120;
		serectScene.addChild(key3);
		
		
		var serectwhat = new Label('キャラクターを選択してください');
		labelcreate(serectwhat,'#FFF',600,60,4,1,serectScene);
		
		
		var serecthow = new Label('攻撃ボタンで決定,防御ボタンで取り消すことができます');
		labelcreate(serecthow,'#FFF',330,30,2,1,serectScene);
		
		var recommand = new Label('↓↓　おススメ！');
		labelcreate(recommand,'#FFF',680,100,2,0,serectScene);
		



		serectScene.addEventListener('rightbuttondown',function(e){
			if(ok1 && serect1 == false){
				num1 ++;
				if(num1 > 3)num1 = 1;
			}
			if(ok1 && stageserect && !serect3){
				num3 ++;
				if(num3 > 3)num3 = 1;
			}
			ok1 = false;
		});
		
		
		serectScene.addEventListener('leftbuttondown',function(e){
			if(ok1 && serect1 == false){
				num1 --;
				if(num1 < 1)num1 = 3;
			}
			if(ok1 && stageserect && !serect3){
				num3 --;
				if(num3 < 1)num3 = 3;
			}
			ok1 = false;
		});
		

		serectScene.addEventListener('rightbuttonup',function(e){
			ok1 = true;
		});
		
		
		serectScene.addEventListener('leftbuttonup',function(e){
			ok1 = true;
		});
		
		
		serectScene.addEventListener('ebuttondown',function(e){
			
			if(stageserect){
				serect3 = true;
				key3.frame = 2;
			}else{
				serect1 = true;
				key1.frame = 1;
			}
		});
		
		
		serectScene.addEventListener('zbuttondown',function(e){
			
			
			if(stageserect){
				serect3 = false;
				key3.frame = 0;
			}else{
				serect1 = false;
				key1.frame = 0;
			}
		});




		serectScene.addEventListener('dbuttondown',function(e){
			if(ok2 && serect2 == false){
				num2 ++;
				if(num2 > 3)num2 = 1;
			}
			ok2 = false;
		});
		
		
		serectScene.addEventListener('abuttondown',function(e){
			if(ok2 && serect2 == false){
				num2 --;
				if(num2 < 1)num2 = 3;
			}
			ok2 = false;
		});
		

		serectScene.addEventListener('dbuttonup',function(e){
			ok2 = true;
		});
		
		
		serectScene.addEventListener('abuttonup',function(e){
			ok2 = true;
		});
		
		
		serectScene.addEventListener('gbuttondown',function(e){
			
			if(!stageserect){
				serect2 = true;
				key2.frame = 1;
			}
		});
		
		
		serectScene.addEventListener('fbuttondown',function(e){
			
			if(!stageserect){
				serect2 = false;
				key2.frame = 0;
			}
		});


		serectScene.addEventListener('enterframe',function(e){
			
			
			serectwhat.tl.fadeOut(20).fadeIn(20).delay(30).loop();
			
			
			key1.x = num1 * 200 - 45;
			key2.x = num2 * 200 - 45;
			key3.x = num3 * 200 - 45;
			
			
			if(serect1 && serect2 && !stageserect){
				serecthow.text = 'このキャラクターでよければSPACEキーを押してください';
			}
			

			if(serect1 && serect2 && core.input.b){
				stageserect = true;
				serectwhat.text = 'PLAYER1はステージを選択してください';
				serecthow.text = '攻撃ボタンで決定,防御ボタンで取り消すことができます';
				serectwhat.scaleX = 4;
				serectwhat.x = 500;
				recommand.tl.fadeOut(10).fadeIn(10).loop();
				key1.frame = 2;
				key2.frame = 2;
			}
			
			
			if(serect3){
				serecthow.text = 'このステージでよければSPACEキーを押してください';	
			}
			
			
			if(serect3 && core.input.b)core.pushScene(core.BattleScene('round1',num1,num2,num3));
		});


		return serectScene;	
		
	}
				
	core.BattleScene = function(patarn,num1,num2,num3){

		var chara1,chara2,stage;
		var color;
		

		switch(num1){
				
				
			case 1:
				chara1 = 'IWA';
				break;

			case 2:
				chara1 = 'ICHIGOBAKUMAJIRO';
				break;

			case 3:
				chara1 = 'PERSON'
				break;
				
			case 4:
				chara1 = 'SLIME'
				break;
		}
		
		switch(num2){
				
				
			case 1:
				chara2 = 'IWA';
				break;

			case 2:
				chara2 = 'ICHIGOBAKUMAJIRO';
				break;

			case 3:
				chara2 = 'PERSON'
				break;

		}
		
		switch(num3){
				
				
			case 1:
				stage = 'image/world.png';
				color = '#FFFFFF';
				break;

			case 2:
				stage = 'image/stage.jpg';
				color = '#000000'
				break;

			case 3:
				stage = 'image/steam.png';
				color = '#FFFFFF'
				break;
		}

					//バトルシーンの宣言
		var battleScene = new Scene(patarn);


			//背景の設定
		background = new Sprite(800,576);
		background.image = core.assets[stage];
		battleScene.addChild(background);
		
		

		//HPゲージの設定
		gauge1 = new Sprite(322,50);
		gauge1.image = core.assets['image/gauge.png'];
		gauge1.x = 456;
		gauge1.y = 80;
		battleScene.addChild(gauge1);
		

		gauge2 = new Sprite(322,50);
		gauge2.image = core.assets['image/gauge.png'];
		gauge2.x = 22;
		gauge2.y = 80;
		gauge2.rotation = 180;
		battleScene.addChild(gauge2);


		plate1 = new Sprite(340,50);
		plate1.image = core.assets['image/plate.png'];
		plate1.x = 450;
		plate1.y = 80;
		battleScene.addChild(plate1);
		

		plate2 = new Sprite(340,50);
		plate2.image = core.assets['image/plate.png'];
		plate2.x = 10;
		plate2.y = 80;
		plate2.scaleX = -1;
		battleScene.addChild(plate2);
		
		
		timeback = new Sprite(100,100);
		timeback.image = core.assets['image/ha1.png'];
		timeback.x = 350;
		timeback.y = 70;
		timeback.frame = 1;
		battleScene.addChild(timeback);


		timeten = new Sprite(40,40);
		timeten.image = core.assets['image/num.png'];
		timeten.x = 360;
		timeten.y = 100;
		timeten.frame = 6;
		battleScene.addChild(timeten);
		

		timeone = new Sprite(40,40);
		timeone.image = core.assets['image/num.png'];
		timeone.x = 400;
		timeone.y = 100;
		timeone.frame = 0;
		battleScene.addChild(timeone);
		
		
		timemugen = new Sprite(100,100);
		timemugen.image = core.assets['image/mugen.png'];
		timemugen.x = 350;
		timemugen.y = 70;
		timemugen.opacity = 0;
		battleScene.addChild(timemugen);


			//playerの配置
		var player1 = new Player(1,chara1,battleScene);//player1 
		var player2 = new Player(2,chara2,battleScene);//player2
		player1.tl.fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(10).fadeOut(10).show();
		player2.tl.fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(10).fadeOut(10).show();
		player1.enemy = player2;
		player1.side = 1;
		player2.enemy = player1;
		player2.side = -1;
		
		
		gard1 = new Sprite(75,75);
		gard1.image = core.assets['image/gard.png'];
		gard1.x = player1.x;
		gard1.y = player1.y;
		gard1.opacity = 0;
		battleScene.addChild(gard1);
		

		gard2 = new Sprite(75,75);
		gard2.image = core.assets['image/gard.png'];
		gard2.x = player2.x;
		gard2.y = player2.y;
		gard2.opacity = 0;
		battleScene.addChild(gard2);
		
		
		charge1 = new Sprite(75,75);
		charge1.image = core.assets['image/charge.png'];
		charge1.x = player1.x;
		charge1.y = player1.y;
		charge1.frame = 0;
		charge1.opacity = 0;
		battleScene.addChild(charge1);
		
		
		charge2 = new Sprite(75,75);
		charge2.image = core.assets['image/charge.png'];
		charge2.x = player2.x;
		charge2.y = player2.y;
		charge2.frame = 0;
		charge2.opacity = 0;
		battleScene.addChild(charge2);
		
		
		energy1 = new Sprite(100,100);
		energy1 .image = core.assets['image/energy.png'];
		energy1 .x = player1.x;
		energy1 .y = player1.y;
		energy1 .opacity = 0;
		energy1.frame = 0;
		battleScene.addChild(energy1);
		
		
		energy2 = new Sprite(100,100);
		energy2 .image = core.assets['image/energy.png'];
		energy2 .x = player2.x;
		energy2 .y = player2.y;
		energy2 .opacity = 0;
		energy2.frame = 0;
		battleScene.addChild(energy2);
		
		
		var StartLabel = new Label('準備ができたらSPACEキーを押してください');
		labelcreate(StartLabel,color,400,250,3,1,battleScene);
		StartLabel.tl.fadeOut(30).fadeIn(30).loop();
		
		var finish = new Label('ご利用ありがとうございました!ぜひ７－３に投票お願いします！');
		labelcreate(finish,color,280,500,2.5,0,battleScene);

		var restart = new Label('SPACEキーを押してください');
		labelcreate(restart,color,500,350,3,0,battleScene);
		
		
		if(patarn == 'sudden-death'){
			
			
			player1.hp = 90;
			player2.hp = 90;
			countdown(5,color,patarn,'play',battleScene,player1,player2);
			core.mode = 'countdown';
			gauge1.width = (player1.hp / 300) * 322;
			gauge2.width = (player2.hp / 300) * 322;
			gauge2.x = 344 -(player2.hp / 300) * 322;
			timeten.opacity = 0;
			timeone.opacity = 0;
			timemugen.opacity = 1;
			battleScene.removeChild(StartLabel);
			
		}else{
			
			StartLabel.opacity = 1;
		}
		
		if(core.advantage == 1)player2.hp = 50;
		if(core.advantage == 2)player1.hp = 50;


			//Labelの配置  labelcreate(label,color,x,y,scale,opa,scene)
		var sign = new Label('');
		labelcreate(sign,color,1380,250,8,0,battleScene);


		battleScene.addEventListener('bbuttondown', function(e) {
			

				if(core.mode == 'pre'){
					
					 countdown(3,color,patarn,'play',battleScene,player1,player2);
					 core.mode = 'countdown';
					 battleScene.removeChild(StartLabel);
				}
				if(core.mode == 'finish'){
					
					core.pushScene(core.rootScene);
					core.mode = 'pre';
					core.advantage = 0;
				}
			});


			//バトルシーンにイベントを追加
		battleScene.addEventListener('enterframe', function(e) {
			
			
			if(player1.state.charAt(0) == 'D' && core.mode != 'finish'){
				
				gard1.scaleX = player1.defencetime/300;
				gard1.scaleY = player1.defencetime/300;
				gard1.opacity = 0.5;
			}else{
				gard1.opacity = 0;
			}
			if(player2.state.charAt(0) == 'D' && core.mode != 'finish' ){
				
				gard2.scaleX = player2.defencetime/300;
				gard2.scaleY = player2.defencetime/300;
				gard2.opacity = 0.5;
			}else{
				gard2.opacity = 0;
			}
			
			

			if(player1.state == 'charge' && core.mode != 'finish'){
				
				charge1.scaleX = player1.chargetime/300;
				charge1.scaleY = player1.chargetime/300;
				charge1.opacity = 0.5;
				energy1.opacity = 1;
			}else{
				
				charge1.opacity = 0;
				energy1.opacity = 0;
			}
			if(player2.state == 'charge' && core.mode != 'finish'){
				
				charge2.scaleX = player2.chargetime/300;
				charge2.scaleY = player2.chargetime/300;
				charge2.opacity = 0.5;
				energy2.opacity = 1;
			}else{
				
				charge2.opacity = 0;
				energy2.opacity = 0;
			}
			if(player1.charge){
				
				charge1.frame = 1;
				charge1.opacity = 0.3;
				energy1.opacity = 1;
			}else{
				
				if(player1.state != 'charge'){
					
					charge1.frame = 0;
					charge1.opacity = 0;
					energy1.opacity = 0;
				}
			}
			if(player2.charge){
				
				charge2.frame = 1;
				charge2.opacity = 0.3;
				energy2.opacity = 1;
			}else{
				if(player2.state != 'charge'){
					
					charge2.frame = 0;
					charge2.opacity = 0;
					energy2.opacity = 0;
				}
			}
			
			
			gard1.x = player1.x;
			gard1.y = player1.y;
			gard2.x = player2.x;
			gard2.y = player2.y;
			energy1.x = player1.x;
			energy1.y = player1.y;
			energy2.x = player2.x;
			energy2.y = player2.y;
			charge1.x = player1.x;
			charge1.y = player1.y;
			charge2.x = player2.x;
			charge2.y = player2.y;
		


							//0.1秒ごとに時間を更新
			if(core.six ==5){
				
				core.time += 0.1;
				energy1.frame = (energy1.frame + 1) % 5;
				energy2.frame = (energy2.frame + 1) % 5;
			}
			
			 core.six = (core.six + 1) % 6;


				//playモード
			if(core.mode == 'play'){


					//時間制限こカウントダウン
				 if((Math.floor(core.time*10) % 10) == 0){
					 
					 timeten.frame = Math.floor(Math.floor(core.gametime + core.sparetime - (Math.floor(core.time*10)) / 10)/10);
					 timeone.frame =  Math.floor(core.gametime + core.sparetime - (Math.floor(core.time*10)) / 10) % 10;
				 }


					//制限時間終了
				 if(timeone.frame == 0 && timeten.frame == 0 && patarn != 'sadden-death'){
					 

					 if(player1.hp > player2.hp){
						 core.advantage = 1;
						 player1.hp = 90;
						 player2.hp = 50;
					 }else if((player1.hp < player2.hp)){
						 core.advantage = 2;
						 player1.hp = 50;
						 player2.hp = 90;
					 }else{
						 player1.hp = 90;
						 player2.hp = 90;
					 }

					 
					 core.pushScene(core.BattleScene('sudden-death',num1,num2,num3));
				 } 
				
				
				gauge1.width = (player1.hp / 300) * 322;
				gauge2.width = (player2.hp / 300) * 322;
				gauge2.x = 344 -(player2.hp / 300) * 322;

				
			}else if(core.mode == 'finish'){
				
				
					if(player1.hp > player2.hp){
						
						 sign.text = 'Winner Player1';
						 gauge2.opacity = 0;
						
					}else if((player1.hp < player2.hp)){
						
						 sign.text = 'Winner Player2';
						 gauge1.opacity = 0;
						
					 }
				    finish.opacity = 1;
					restart.tl.fadeOut(30).fadeIn(30).loop();
				
				
				
					charge1.opacity = 0;
					energy1.opacity = 0;
					charge2.opacity = 0;
					energy2.opacity = 0;
					sign.x = 1200;
					sign.opacity = 1;
					timeten.frame = 0;
					timeone.frame = 0;
			}
		});


		return battleScene;
	}
  }
  
  
   core.start();//ゲームスタート！	
}