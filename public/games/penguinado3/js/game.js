enchant();
window.onload = function() {
  var core = new Game(800, 720);
  core.fps = 30;
  core.rootScene.backgroundColor = "#ffffff";
  core.preload(   'pictures/bullet01.png' , 'pictures/bullet02.png'
                , 'pictures/bullet03blue.png' , 'pictures/bullet03yellow.png'
                , 'pictures/ice_ball.png' , 'pictures/snow_ball.png'
                , 'pictures/Player01.png' , 'pictures/PlayerChild.png'
                , 'pictures/boss.png' , 'pictures/boss_ring.png' , 'pictures/boss_hp.png'
                , 'pictures/enemy02white.png' , 'pictures/enemy02whiteblue.png'
                , 'pictures/enemy02red.png' , 'pictures/enemy02green.png' , 'pictures/enemy02blue.png'
                , 'pictures/enemy02cyan.png' , 'pictures/enemy02magenta.png' , 'pictures/enemy02yellow.png'
                , 'pictures/enemy02orange.png' , 'pictures/enemy02purple.png'
                , 'pictures/effect.png' , 'pictures/fish.png'
                , 'pictures/title.png' , 'pictures/selectScene.png' , 'pictures/universe.png'
                , 'pictures/frame.png' , 'pictures/pause.png' , 'pictures/WeJa.png'
                , 'musics/CometAdventure.wav');
	core.tick = 0;
  core.score = 0;
  core.play = true;
  core.level = 3;
  core.finish = false;

  core.onload = function() {

  core.keybind(27 , 'esc');   //esc
	core.keybind(32 , 'sp');		//space
	core.keybind(16 , 'sh');		//shift
	core.keybind(67 , 'c');		//c
  core.keybind(86 , 'v');   //v
	core.keybind(88 , 'x');		//x
	core.keybind(90 , 'z');		//z

  var WeJa = new Sprite(400, 400);
  WeJa.x = 200;
  WeJa.y = 160;
  WeJa.image = core.assets['pictures/WeJa.png'];
  WeJa.opacity = 0;
  WeJa.before = true;
  core.rootScene.addChild(WeJa);

  var titleScene = new Scene();
  titleScene.backgroundColor = "#ffffff";

  var levelselectScene = new Scene();
  levelselectScene.backgroundColor = "#00ff00";

  var levelselectScenepicture = new Sprite(800, 720);
  levelselectScenepicture.image = core.assets['pictures/selectScene.png'];
  levelselectScene.addChild(levelselectScenepicture);

  var staffrollScene = new Scene();
  staffrollScene.backgroundColor = "#050505";

	var battleScene = new Scene();
	 battleScene.backgroundColor = "#000011";
  var background01 = new Background(40, -1290, battleScene);
  var background02 = new Background(40, -3260, battleScene);

	var Ending = new Scene();
	 Ending.backgroundColor = "#eeeeee";
	var bullets = new Group();
	var Playerbullets = new PlayerBulletsGroup(battleScene);
  var Enemybullets = new EnemyBulletsGroup(battleScene);
	var Enemies = new Group();

  var title = new Sprite(800, 720);
    title.x = 0;
    title.y = 0;
    title.image = core.assets['pictures/title.png'];
    titleScene.addChild(title);

	var start_text = new Select(500, 400, 30, '#ffffff', true, 'start', titleScene);
  var staff_text = new Select(480, 440, 30, '#ffffff', false, 'staff roll', titleScene);

  var level1_text = new Select(200, 520, 30, '#ffefef', true, 'easy', levelselectScene);
  var level2_text = new Select(350, 520, 30, '#ffefef', false, 'normal', levelselectScene);
  var level3_text = new Select(540, 520, 30, '#ffefef', false, 'hard', levelselectScene);

  var lifeLabel = new Label();
    lifeLabel.x = 560;
    lifeLabel.y = 240;
    lifeLabel.color = '#1aa19d';
    lifeLabel.font = '30px sens-serif';

  var scoreLabel = new Label();
    scoreLabel.x = 560;
    scoreLabel.y = 200;
    scoreLabel.color = '#1aa19d';
    scoreLabel.font = '30px sens-serif';

  var powerLabel = new Label();
    powerLabel.x = 560;
    powerLabel.y = 280;
    powerLabel.color = '#1aa19d';
    powerLabel.font = '30px sens-serif';

  var tickLabel = new Label();
    tickLabel.x = 560;
    tickLabel.y = 400;
    tickLabel.color = '#1aa19d';
    tickLabel.font = '30px sens-serif';

  var pauseLabel01 = new Label("再開:ESC");
    pauseLabel01.x = 180;
    pauseLabel01.y = 200;
    pauseLabel01.color = '#f4f4f4';
    pauseLabel01.font ='50px sens-serif';

  var pauseLabel02 = new Label("終了:F5");
    pauseLabel02.x = 180;
    pauseLabel02.y = 360;
    pauseLabel02.color = '#f4f4f4';
    pauseLabel02.font ='50px sens-serif';

  var congratulati = new Label("Congratulati");
    congratulati.x = 50;
    congratulati.y = 200;
    congratulati.color = "#ffffff";
    congratulati.font = '50px sens-serif'

  var ons = new Label("ons!!!")
    ons.x = 350;
    ons.y = 200;
    ons.color = "#ffffff";
    ons.font = '50px sens-serif'

	var EndLabel = new Label('Game Over');
  	EndLabel.x = 230;
    EndLabel.y = 300;
  	EndLabel.color = '#0000FF';
  	EndLabel.font ='50px sens-serif';
  	Ending.addChild(EndLabel);

  var Frame = new Sprite(800, 720);
    Frame.image = core.assets['pictures/frame.png'];

  var pause_menu = new Sprite(800, 720);
    pause_menu.image = core.assets['pictures/pause.png'];
    pause_menu.opacity = 0.5;

  var select = 1;
	var worldtick = 0;
	var delay = 0;
  var pause_time = 0;
  var m01 = 3;
  var m02 = 13;
  var finish = 0;
  var can = true;
  var bomb_time = 0;

  var color_array = ["red","green","blue","cyan","magenta","yellow","orange","purple","white"];

	player = new Player(240, 640, 3, Playerbullets, battleScene, Ending);

    core.rootScene.addEventListener('enterframe', function(e) {

      if(WeJa.opacity < 1 && WeJa.before){
        WeJa.opacity += 0.05;
      }else if (WeJa.opacity >= 1) {
        WeJa.before = false;
      }

      if(core.tick >= 50 && !WeJa.before){
        if(WeJa.opacity > 0.05){
          WeJa.opacity -= 0.05;
        }else{
          core.rootScene.removeChild(WeJa);
        }
      }

      if(core.tick >= 80){
        core.tick = 0;
        core.pushScene(titleScene);
        console.log("WeJa");
      }

      core.tick ++

    });

		titleScene.addEventListener('enterframe', function(e) {

      if(can){

        if(core.input.up){
          if(select > 1){
            select --;
          }else{
            select = 2;
          }
          can = false;
        }
        if(core.input.down){
          if(select < 2){
            select ++;
          }else{
            select = 1;
          }
          can = false;
        }

      }

      start_text.select = false;
      staff_text.select = false;
      if(select == 1){
        start_text.select = true;

        if(core.input.sp){
          select = 1;
          can = false;
  				core.pushScene(levelselectScene);
  			}

      }else if(select == 2){
        staff_text.select = true;

        if(core.input.sp){
          select = 1;
          can = false;
  				core.pushScene(staffrollScene);
  			}
      }


		});

    titleScene.addEventListener('upbuttonup', function(e) {
      can = true;
    });

    titleScene.addEventListener('downbuttonup', function(e) {
      can = true;
    });

    levelselectScene.addEventListener('enterframe', function(e) {

      if(can){

        if(core.input.left){
          if(select > 1){
            select --;
          }else{
            select = 3;
          }
          can = false;
        }
        if(core.input.right){
          if(select < 3){
            select ++;
          }else{
            select = 1;
          }
          can = false;
        }

      }

      level1_text.select = false;
      level2_text.select = false;
      level3_text.select = false;

      switch (select){
        case 1:
        level1_text.select = true;
        core.level = 1;

        break;
        case 2:
        level2_text.select = true;
        core.level = 2;

        break;
        case 3:
        level3_text.select = true;
        core.level = 3;

        break;
      }

      if(core.input.sp && can){
        core.tick = 0;
        core.pushScene(battleScene);
      }

		});

    levelselectScene.addEventListener('rightbuttonup', function(e) {
      can = true;
    });

    levelselectScene.addEventListener('leftbuttonup', function(e) {
      can = true;
    });

    levelselectScene.addEventListener('spbuttonup', function(e) {
      can = true;
    });

    staffrollScene.addEventListener('enterframe', function(e) {

      //new StaffRoll(x, y, number, text, time, scene);

      /*

      case :
      = new StaffRoll("", this);
      break;

      */

      switch (core.tick){
        case 30:
        plan = new StaffRoll("plan:", this);
        break;
        case 40:
        plan = new StaffRoll("e-penguins", this);
        break;
        case 70:
        program = new StaffRoll("program:", this);
        break;
        case 80:
        program = new StaffRoll("e-penguins", this);
        break;
        case 110:
        design = new StaffRoll("design:", this);
        break;
        case 120:
        design = new StaffRoll("e-penguins", this);
        break;
        case 150:
        bgm = new StaffRoll("bgm:", this);
        break;
        case 160:
        bgm = new StaffRoll("ichii", this);
        break;
        case 190:
        soundeffect = new StaffRoll("sound effect:", this);
        break;
        case 200:
        soundeffect = new StaffRoll("On-Jin ~音人~", this);
        break;
        case 210:
        soundeffect = new StaffRoll("TheGamerGirl", this);
        break;
        case 240:
        madewith = new StaffRoll("MADE WITH", this);
        break;
        case 250:
        madewith = new StaffRoll("JavaScript", this);
        break;
        case 260:
        madewith = new StaffRoll("enchant.js", this);
        break;
        case 290:
        specialthanks = new StaffRoll("SPECIAL THANKS", this);
        break;
        case 300:
        specialthanksp = new StaffRoll("ペンギン", this);
        break;
        case 390:
        andyou = new StaffRoll("And You!!!", this);
        break;
      }

      if(core.tick >= 390){
        if(andyou.y <= 360){
          specialthanksp.y += 4;
          andyou.y = 360;
          finish ++;
        }
      }

      if(finish == 150){
        pushf5 = new Select(300, 200, 50, '#ffffff', true, 'push F5', this);
      }

      core.tick ++;

      if(core.input.esc){
        core.tick = 0;
        finish = 0;
        core.pushScene(titleScene);
      }

    });

    battleScene.addEventListener('xbuttonup', function(e) {
      can = true;
    });

		battleScene.addEventListener('enterframe', function(e) {

      if(core.input.esc){

        if(pause_time <= 0){

          if(core.play == true){
            core.play = false;
            core.assets['musics/CometAdventure.wav'].pause();
            battleScene.addChild(pause_menu);
            battleScene.addChild(pauseLabel01);
            battleScene.addChild(pauseLabel02);
          }
          else if(core.play == false){
            core.play = true;
            core.assets['musics/CometAdventure.wav'].play();
            battleScene.removeChild(pause_menu);
            battleScene.removeChild(pauseLabel01);
            battleScene.removeChild(pauseLabel02);
          }

          pause_time = 10;

        }

      }

      if(pause_time > 0){

        pause_time --;

      }

      if(core.play){

        if(core.input.sp){
          m01 = 1;
          m02 = 5;
        }
        else{
          m01 = 3;
          m02 = 13;
        }

  			if(delay == 0){
  				if(core.input.z){

            switch(Math.floor(player.power)){
              case 5:
                if(core.tick % 2 == 0){
                  playerbullet31 = new PlayerBullet02(player, m02, battleScene);
                  playerbullet32 = new PlayerBullet02(player, -m02, battleScene);
                }else{
                  playerbullet31 = new PlayerBullet02(player, m02, battleScene);
                  playerbullet32 = new PlayerBullet02(player, -m02, battleScene);
                }
                Playerbullets.addChild(playerbullet31);
                Playerbullets.addChild(playerbullet32);

              case 4:

              case 3:
                if(core.tick % 2 == 0){
                  playerbullet21 = new PlayerBullet01(player, m01, battleScene);
                  playerbullet22 = new PlayerBullet01(player, -m01, battleScene);
                }else{
                  playerbullet21 = new PlayerBullet01(player, m01, battleScene);
                  playerbullet22 = new PlayerBullet01(player, -m01, battleScene);
                }
                Playerbullets.addChild(playerbullet21);
                Playerbullets.addChild(playerbullet22);

              case 2:

              case 1:
                if(core.tick % 2 == 0){
                  playerbullet11 = new PlayerBullet01(player, 0, battleScene);
                }else{
                  playerbullet11 = new PlayerBullet01(player, 0, battleScene);
                }
                Playerbullets.addChild(playerbullet11);
              }

              delay += 2;
            }
          }else if(delay > 0){
            delay --;
          }



        //Enemybullets.bomb = false;

        if(core.input.x){
          if(player.power >= 2 && can){
            can = false;
            Enemybullets.bomb_time = 30;
            player.power --;
            Enemybullets.bomb = true;
            Enemybullets.player_bomb = true;

            bomb_effect = new Effect(player, battleScene);
            bomb_effect.scaleX = 10;
            bomb_effect.scaleY = 10;
          }
        }

        if(core.tick == 30 ){
          core.assets['musics/CometAdventure.wav'].play();
        }

        this.removeChild(Frame);
        this.addChild(Frame);

        lifeLabel.text = lifeLabeltext(player.life);
        this.removeChild(lifeLabel);
        this.addChild(lifeLabel);

        powerLabel.text = "Power:" + (Math.floor(player.power * 10) / 10);
        this.removeChild(powerLabel);
        this.addChild(powerLabel);

        scoreLabel.text = "Score:" + core.score;
        this.removeChild(scoreLabel);
        this.addChild(scoreLabel);

        tickLabel.text = core.tick;
        this.removeChild(tickLabel);
        this.addChild(tickLabel);

        //1530

  			core.tick ++;
  			worldtick ++;

      }

		});

    battleScene.addEventListener('enterframe', function(e) {
      //enemy_maker(Enemy, x, y, color, direction, player, Playerbullets, EnemyBulletsGroup, scene, start_time, space, roop);

      var random_color = Math.floor( Math.random() * 8 );

      switch(core.level){
        case 3:
        for (var i = 0; i < color_array.length; i++) {
          enemy_maker(Enemy_u, 500 - 2*i, 400 + 20 * i, color_array[i], "left", true, 4, player, Playerbullets, Enemybullets, battleScene, 1000 + 10 * i, 30, 1);
        }
        if(core.tick >= 1180 && core.tick <= 1400 && core.tick % 21 == 0){
          var randomY = Math.floor(Math.random() * 300);
          enemy_maker(Enemy_z, -10, 200 + randomY, "white", "right", true, 3, player, Playerbullets, Enemybullets, battleScene, core.tick, 63, 1);
        }


        case 2:
        enemy_maker(Enemy_l, -20, 100, "orange", "right", true, 3, player, Playerbullets, Enemybullets, battleScene, 400, 30, 3);
        for (var i = 0; i < color_array.length; i++) {
          enemy_maker(Enemy_i, -20, 100 + 30 * i, color_array[i], "right", true, core.level, player, Playerbullets, Enemybullets, battleScene, 30 + 20 * i, 30, 1);
        }
        enemy_maker(Enemy_z, 500, 450, "cyan", "left", true, 3, player, Playerbullets, Enemybullets, battleScene, 500, 63, 5);
        enemy_maker(Enemy_v, 20, 0, "purple", "right", true, 3, player, Playerbullets, Enemybullets, battleScene, 600, 43, 3);
        enemy_maker(Enemy_u, 0, 140, "orange", "right", false, 3, player, Playerbullets, Enemybullets, battleScene,900, 63, 3);
        enemy_maker(Enemy_u, 500, 290, "yellow", "left", true, 3, player, Playerbullets, Enemybullets, battleScene,950, 48, 5);
        enemy_maker(Enemy_i, 0, 380, "blue", "right", true, 3, player, Playerbullets, Enemybullets, battleScene,1100, 126, 2);
        enemy_maker(Enemy_l, 0, 530, "red", "right", true, 3, player, Playerbullets, Enemybullets, battleScene, 840, 43, 3);


        case 1:
        enemy_maker(Enemy_v, 400, -10, "purple", "left", true, 3, player, Playerbullets, Enemybullets, battleScene, 60, 42, 6);
        enemy_maker(Enemy_z, -20, 200, "red", "right", true, 1, player, Playerbullets, Enemybullets, battleScene, 240, 42, 3);
        enemy_maker(Enemy_z, -20, 220, "magenta", "right", false, 1, player, Playerbullets, Enemybullets, battleScene, 256, 42, 3);
        enemy_maker(Enemy_i, 300, -20, "green", "down", true, 2, player, Playerbullets, Enemybullets, battleScene, 320, 42, 7);
        enemy_maker(Enemy_u, 500, 150, "yellow", "left", true, 3, player, Playerbullets, Enemybullets, battleScene, 560, 63, 3);
        //780
        enemy_maker(Enemy_l, 500, 160, "blue", "left", true, 3, player, Playerbullets, Enemybullets, battleScene, 800, 63, 3);
        enemy_maker(Enemy_l, 70, 720, "green", "up", false, 3, player, Playerbullets, Enemybullets, battleScene, 900, 80, 5);
        enemy_maker(Enemy_u, 400, -20, "magenta", "down", true, 2, player, Playerbullets, Enemybullets, battleScene, 990, 42, 5);
        enemy_maker(Enemy_z, 500, 200, "white", "left", true, 3, player, Playerbullets, Enemybullets, battleScene, 1140, 63, 3);
        enemy_maker(Enemy_z, -20, 160, "yellow", "right", true, 3, player, Playerbullets, Enemybullets, battleScene, 1330, 42, 4);

        if(core.tick == 1490){
          boss = new Boss(125, -60, player, Playerbullets, Enemybullets, battleScene);
        }

        if(core.finish){
          finish ++;
        }

        if(finish >= 25){
          //core.pushScene(Ending);
            core.play = false;
            core.assets['musics/CometAdventure.wav'].pause();
            battleScene.addChild(pause_menu);
            battleScene.addChild(congratulati);
            battleScene.addChild(ons);
            var finalScoretext = new Label("Your Score:");
              finalScoretext.x = 50;
              finalScoretext.y = 400;
              finalScoretext.color = "#ffffff";
              finalScoretext.font = '50px sens-serif'
            battleScene.addChild(finalScoretext);
            var finalScore = new Label(core.score);
              finalScore.x = 50;
              finalScore.y = 470;
              finalScore.color = "#ffffff";
              finalScore.font = '50px sens-serif'
            battleScene.addChild(finalScore);
        }

      }

    });

    Ending.addEventListener('enterframe', function(e) {
      core.tick = 0;
      if(core.tick == 0 ){
        bgm01.stop();
      }

    });

    };
    core.start();

    function lifeLabeltext(life){
      var star = "Life:";
      for(var i = 0; i < life ; i++){
        star += "☆";
      }
      return star;
    }

    function enemy_maker(Enemy, x, y, color, direction, attack, enemy_bullet, player, Playerbullets, Enemybullets, scene, start_time, space, roop){

      if(direction == "left"){
        roop ++;
      }

      if(core.tick >= start_time && core.tick <= start_time + (space * (roop - 1))){

        if( (core.tick - start_time) % space == 0){

          var enemy = new Enemy(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, Enemybullets, scene);



          //return enemy;

        }

      }

    }

  // クラスの作成

    //背景

    var Background = Class.create(Sprite, {
			initialize : function(x, y, scene) {
        Sprite.call(this, 480, 1970)
        this.image = core.assets['pictures/universe.png'];

        this.x = x;
        this.y = y;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            this.y += 3

            if(this.y >= 680){
              this.y = -3260;
            }

          }

        });
        scene.addChild(this);
      }
    });

    //ラベル

    var Text = Class.create(Label, {
      initialize : function(x, y, number, color, text, scene){
        Label.call(this);
        this.text = text;
        this.x = x;
        this.y = y;

        this.color = color;

        if(number == 28){
      	   this.font = '28px sens-serif';
        }

        if(number == 30){
      	   this.font = '30px sens-serif';
        }

        if(number == 50){
     	    this.font = '50px sens-serif';
        }


        this.addEventListener('enterframe', function(e) {

        });

        scene.addChild(this);

      }

    });

    var Select = Class.create(Text, {
      initialize : function(x, y, number, color, select, text, scene){
        Text.call(this, x, y, number, color, text, scene);

        this.select = select;

        this.addEventListener('enterframe', function(e) {

          if(this.select){
            this.color = color;
          }else{
            this.color = '#3f3f3f';
          }

        });

      }

    });

    var StaffRoll = Class.create(Text, {
      initialize : function(text, scene){

        var x = 50;

        var y = 720;

        var number = 30;

        var color = "#f5f5f5";

        Text.call(this, x, y, number, color, text, scene);

        this.color = color;

        this.textAlign = "center";

        this.x = x;

        this.y = y;

        this.addEventListener('enterframe', function(e) {

          if(core.input.sp){
            this.y -= 16;
          }else{
            this.y -= 4;
          }

          if(this.y < -50 ){
            scene.removeChild(this);
          }

        });

      }

    });

    //自機

		var Player = Class.create(Sprite, {
			initialize : function(x, y, life, Playerbullets, scene, Ending) {
				this.tick = 1;
				var speed = 8;

				Sprite.call(this, 6, 6);

				this.image = core.assets['pictures/bullet01.png'];

				this.x = x + 40;
				this.y = y + 40;

        this.life = life;

        switch (core.level) {
          case 1:
            this.power = 3;
            break;

          case 2:
            this.power = 2;
            break;

          case 3:
            this.power = 1;
            break;
          default:

        }

        this.time_of_death = 0;

        this.opacity = 0.0;

        this.muteki = false;

        surfacePlayer = new SurfacePlayer(this.x - 15, this.y - 15, this, scene);

        this.child = 0;


        //playerchild03 = new PlayerChild(100, -40, this, scene);
        //playerchild04 = new PlayerChild(100, -40, this, scene);

						this.addEventListener('enterframe', function(e) {

              if(core.play){
                if(this.power > 5){
                  this.power = 5;
                }

                if(this.power >= 2 && this.child == 0){
                  playerchild01 = new PlayerChild(70, 40, this, 2, Playerbullets, scene);
                  playerchild02 = new PlayerChild(-70, 40, this, 2, Playerbullets, scene);
                  this.child += 2;
                }

                if(this.power >= 4 && this.child == 2){
                  playerchild03 = new PlayerChild(40, 60, this, 4, Playerbullets, scene);
                  playerchild04 = new PlayerChild(-40, 60, this, 4, Playerbullets, scene);
                  this.child += 2;
                }

                if(this.tick - this.time_of_death <= 15){
                  this.y -= 15/(this.tick - this.time_of_death + 1)*2 + 2;
                }

                if(this.tick - this.time_of_death < 150){
                  this.muteki = true;
                }else if(this.tick - this.time_of_death == 150){
                  this.muteki = false;
                }

                if(player.life < 0){
                  core.pushScene(Ending);
                }

  							if(core.input.sp){
  								speed = 2;
                  this.opacity = 1.0;
  							}else{
  								speed = 8;
                  this.opacity = 0.0;
  							}

                if(core.input.up && core.input.right ||
                   core.input.up && core.input.left ||
                   core.input.down && core.input.right ||
                   core.input.down && core.input.left){
                  speed = speed / Math.sqrt(2);
                }

  							//操作
  							if(core.input.up){
  								if(this.y > 40){
  									this.y -= speed;
                    surfacePlayer.y -= speed;
  								}
  							}
  							if(core.input.down){
  								if(this.y < 674){
  									this.y += speed;
                    surfacePlayer.y += speed;
  								}
  							}
  							if(core.input.right){
  								if(this.x < 514){
  									this.x += speed;
                    surfacePlayer.x += speed;
  								}
  							}
  							if(core.input.left){
  								if(this.x > 40){
  									this.x -= speed;
                    surfacePlayer.x -= speed;
  								}
  							}

                this.tick ++;

              }

						});

      	      scene.addChild(this);

        	}

		});

		var SurfacePlayer = Class.create(Sprite, {
			initialize : function(x, y, player, scene) {
				var tick = 0;
        var delay = 0;

				Sprite.call(this, 36, 36);

				this.image = core.assets['pictures/Player01.png'];
        this.frame = 0;

				this.x = x;
				this.y = y;

      	scene.addChild(this);

        this.addEventListener('enterframe', function(e){

          if(core.play){

            this.x = player.x - 15;
            this.y = player.y - 15;

            if(core.input.up && core.input.sp == false){
              if(tick % 8 <= 1){
                this.frame = 5;
              }
              else if(tick % 8 == 4 || tick % 8 ==5){
                this.frame = 6;
              }
              else{
                this.frame = 0;
              }
              delay = 0;
            }
            else if(core.input.right){
              this.frame = 6;
              delay = 0;
            }
            else if(core.input.left){
              this.frame = 5;
              delay = 0;
            }
            else {
              if(delay % 120 == 50 ||delay % 120 == 51){
                this.frame = 2;
              }
              else if(delay % 120 == 52 ||delay % 120 == 53){
                this.frame = 3;
              }
              else if(delay % 120 == 54 ||delay % 120 == 55){
                this.frame = 2;
              }
              else if(delay % 120 == 56 ||delay % 120 == 57){
                this.frame = 1;
              }
              else{
                this.frame = 0;
              }
            }

            if(player.muteki){
              if(tick % 8 <= 3){
                this.opacity = 0.8;
              }
              else{
                this.opacity = 0.3;
              }
            }
            else{
              this.opacity = 1.0;
            }

            tick ++;
            delay ++;

          }

        });

        }

		});

    var PlayerChild = Class.create(Sprite, {
			initialize : function(x, y, player, power, Playerbullets, scene) {
				var tick = 0;
        var delay = 0;
        var m = x /40;

				Sprite.call(this, 32, 32);

				this.image = core.assets['pictures/PlayerChild.png'];

				this.x = player.x  + player.width/2 - this.width/2 + x;
				this.y = player.y  + player.height/2 - this.height/2 + y;

        this.power = 1;

      	scene.addChild(this);

        this.addEventListener('enterframe', function(e){

          if(core.play){

            if(core.input.sp){
              this.x = player.x  + player.width/2 - this.width/2 + x/2 ;
              this.y = player.y  + player.height/2 - this.height/2 + y/2;
              m = 0;
            }else{
              this.x = player.x  + player.width/2 - this.width/2 + x ;
              this.y = player.y  + player.height/2 - this.height/2 + y;
              m = x /40;
            }

            if(player.power < power){
              player.child --;
              scene.removeChild(this);
            }

            if(player.muteki){
              if(tick % 8 <= 3){
                this.opacity = 0.8;
              }
              else{
                this.opacity = 0.3;
              }
            }
            else{
              this.opacity = 1.0;
            }

            if(player.tick - player.time_of_death == 0){
              player.child = 0;
              scene.removeChild(this);
            }


              if(delay == 0){
                if(core.input.z){
                  playerbullet11 = new PlayerBullet01(this, m, scene);
                  Playerbullets.addChild(playerbullet11);
        					delay += 2;
        				}
        			}else if(delay > 0){
        				delay --;
        			}

            tick ++;

          }

        });

        }

		});

    //自弾

		var PlayerBullet01 = Class.create(Sprite, {
			initialize : function(player, m, scene) {

        switch(Math.floor(player.power)){
          case 1:

          case 2:

          case 3:
          Sprite.call(this, 12, 12);
          this.image = core.assets['pictures/snow_ball.png'];
          break;
          case 4:

          case 5:
          Sprite.call(this, 18, 18);
          this.image = core.assets['pictures/ice_ball.png'];
          break;
        }

				this.x = player.x + player.width/2 - this.width/2;
				this.y = player.y + player.height/2 - this.height/2;

        this.opacity = 0.5;

        switch (Math.floor(player.power)) {
          case 1:

          case 2:

          case 3:
            this.power = 3;
            break;

          case 4:

          case 5:
            this.power = 4;
            break;
          default:

        }

        var M = Math.sqrt(m*m + 16*16);

						this.addEventListener('enterframe', function(e) {

              if(core.play){

                this.x += 16 * m/M;

  							this.y -= 16 * 16/M;

                this.rotation += 30;

              }

						});

      	      scene.addChild(this);

        	}

		});

    var PlayerBullet02 = Class.create(Sprite, {
			initialize : function(player, m, scene) {

				Sprite.call(this, 12, 12);

				this.image = core.assets['pictures/snow_ball.png'];

        this.x = player.x + player.width/2 - this.width/2;
				this.y = player.y + player.height/2 - this.height/2;

        this.opacity = 0.5;

        this.power = 2;

        var M;

        if(m > 0){
          M = true;
        }
        else if(m < 0){
          M = false;
        }

						this.addEventListener('enterframe', function(e) {

              if(core.play){

                if(Math.abs(m) > 1){
                  if(M){
                    m -= 0.5;
                  }else{
                    m += 0.5;
                  }
                }

                this.x += m;

  							this.y -= 13;

              }

						});

      	      scene.addChild(this);

        	}

		});

    var PlayerBulletsGroup = Class.create(Group, {
      initialize : function(scene) {

        Group.call(this);

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            for(var i = 0; i < this.childNodes.length; i ++){

              if(this.childNodes[i].y < -10){

                this.removeChild(this.childNodes[i]);

              }

            }

          }

        });

        scene.addChild(this);

      }
    });


		//敵機

    var Boss = Class.create(Sprite, {
      initialize : function(x, y, player, Playerbullets, EnemyBulletsGroup, scene) {
        Sprite.call(this, 100, 100);
        this.image = core.assets['pictures/boss.png'];
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.finish = 0;
        this.stage = 1;

        var HP = new Sprite(460, 20);
        HP.image = core.assets['pictures/boss_hp.png'];
        HP.x = 50;
        HP.y = 60;
        HP.scaleY = 0.5;
        HP.opacity = 0.7;

        switch(core.level){
          case 1:
          this.life = 5000;
          this.max = 5000;
          break;
          case 2:
          this.life = 8000;
          this.max = 8000;
          break;
          case 3:
          this.life = 9000;
          this.max = 9000;
          break;
        }

        var tick = 0;
        var r = 40;
        var acceleration = 9.8;
        var start_tick = 0;
        var start_x;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            this.frame = Math.floor(tick) % 4;

            tick += 0.5;

            if(core.tick == 1525){
              scene.addChild(HP);
            }else if(core.tick >= 1525){
              HP.scaleX = this.life / this.max;
            }


            if(core.tick >= 1495 && core.tick <= 1525){
              this.x += 3;
              this.y += 8;
            } else if(core.tick >= 1525 && core.tick <= 1530){
              this.x += 3;
              this.y += 2;
              start_x = this.x;
            }

            if (this.max - this.life >= 2000 * this.stage){
              EnemyBulletsGroup.bomb = true;
              EnemyBulletsGroup.player_bomb  = false;
              if(EnemyBulletsGroup.bomb_time < 30){
                EnemyBulletsGroup.bomb_time = 30;
              }
              this.stage ++;

              for(var i = 0; i < 20; i++){
                fish = new Fish(this, player, true, scene);
              }

            }

            if(this.max - this.life < 2000){

              if(core.tick % (30/core.level) == 0){
                bulr = new TypeStraight1(this,  core.tick % 360, 2, 30, 5, scene, player, EnemyBulletsGroup);
                bull = new TypeStraight1(this, -core.tick % 360, 2, 30, 5, scene, player, EnemyBulletsGroup);
              }

            }else if (this.max - this.life > 2000 && this.max - this.life < 4000) {

              if(core.tick % (30/core.level) == 0 ){

                bul = new TypeStraight1(this, 0, 3, 5, 7, scene, player, EnemyBulletsGroup);

              }

              scene.x = 0;

              this.x += acceleration * start_tick * start_tick;
              if(this.x + 100 > 520){
                this.x = 420;
                acceleration = -3;
                start_tick = 0;
                scene.x = 4;
                var vx = -Math.random() * (2 + core.level * 2);
                var startY = Math.random() * 300 + 50;
                bulf = new TypeFreefall(520, startY, vx, 4, scene, player, EnemyBulletsGroup);
              }

              if(this.x < 40){
                this.x = 40;
                acceleration =  3;
                start_tick = 0;
                scene.x = -4;
                var vx = Math.random() * (2 + core.level * 2);
                var startY = Math.random() * 300 + 50;
                bulf = new TypeFreefall(40, startY, vx, 4, scene, player, EnemyBulletsGroup);
              }

              start_tick ++;

            }else if (this.max - this.life > 4000 && this.max - this.life < 6000) {

              if(this.max - this.life >= 4000){
                this.x = start_x;
              }

              if(core.level >= 2){

                if(core.tick % (30/core.level) == 0){

                  for (var i = 0; i < 4 + 4 * core.level; i++) {
                    bul = new TypeStraight1(this,  0, 5, 30 + i * 5, 0, scene, player, EnemyBulletsGroup);
                  }

                }

              }

              if(core.level == 1){
                  this.stage = "final"

                  if(core.tick % 42 == 0){

                    for (var i = 0; i < 3; i++) {
                      bul = new TypeStraight1(this,  0, 5, 30 + i * 5, 0, scene, player, EnemyBulletsGroup);
                    }

                  }

              }



            }else if (this.max - this.life > 6000 && this.max - this.life < 8000) {

              if(core.tick % (60/core.level) == 0){

                for (var i = 0; i < 6; i++) {
                  bul3 = new TypeCircle(this, (i * 60) + ((core.tick % 360)/3), 3, 2, 0, scene, player, EnemyBulletsGroup);
                  //(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
                }

              }

              if(core.level == 2){
                this.stage = "final"
              }

            }else if (this.max - this.life > 8000 && this.max - this.life < 9000) {

              if(core.tick % 30 == 0 || core.tick % 30 == 3 || core.tick % 30 == 6){
                for (var i = 0; i < 12; i++) {
                  bul3 = new TypeStraight0(this.x + this.width/2, this.y + this.height/2, (i * 30) + (core.tick % 360), 6, 0, 90, scene, player, EnemyBulletsGroup);
                }
              }

              if(core.tick % 30 == 15 || core.tick % 30 == 18 || core.tick % 30 == 21){
                for (var i = 0; i < 12; i++) {
                  bul3 = new TypeStraight0(this.x + this.width/2, this.y + this.height/2, (i * 30) - (core.tick % 360), 5, 0, 90, scene, player, EnemyBulletsGroup);
                }
              }

              if(core.level == 3){
                this.stage = "final"
              }

            }

            if(core.tick == 1600){
              ringR = new Boss_ring(this.x + this.width/2 - 100, this.y + this.height/2 + 50, this.x + this.width/2 - 150, -30, player, EnemyBulletsGroup, this, scene);
              ringL = new Boss_ring(this.x + this.width/2 + 100, this.y + this.height/2 + 50, this.x + this.width/2 + 150,  30, player, EnemyBulletsGroup, this, scene);
            }

            for(var i = 0; i < Playerbullets.childNodes.length; i ++){
              hitX = Math.abs(( Playerbullets.childNodes[i].x + (Playerbullets.childNodes[i].width / 2)) - ( this.x + (this.width / 2  )));
              hitY = Math.abs(( Playerbullets.childNodes[i].y + (Playerbullets.childNodes[i].height / 2)) - ( this.y + (this.height / 2  )));

              if(hitX < r && hitY < r){
                Playerbullets.childNodes[i].y = -10;
                effect = new Effect(this, scene);
                effect.x += Math.random()*60 - 30;
                effect.y += 35;
                effect.scaleY = 0.5;
                if(this.stage == "final"){
                  this.life -= Playerbullets.childNodes[i].power/2;
                }else{
                  this.life -= Playerbullets.childNodes[i].power;
                }
              }
            }

            if(EnemyBulletsGroup.bomb && EnemyBulletsGroup.player_bomb){
              if(this.stage == "final"){
                this.life -= 1;
              }else{
                this.life -= 3;
              }
            }

            if(this.life <= 0){

              effect = new Effect(this, scene);
              effect.scaleX = 3;
              effect.scaleY = 3;

              core.score += 2000;

              core.fps = 10;

              core.finish = true;

              player.muteki = true;

              scene.removeChild(this);

            }

          }

        });

        scene.addChild(this);
      }
    });

    var Boss_ring = Class.create(Sprite, {
      initialize : function(x, y, x2, rotation, player, EnemyBulletsGroup, boss, scene) {
        Sprite.call(this, 120, 60);
        this.image = core.assets['pictures/boss_ring.png'];
        this.x = x - this.width/2;
        this.y = y + this.height/2;
        this.frame = 0;
        this.tick = 0;
        this.rotation = rotation;
        this.stage = 1;
        this.opacity = 0;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            this.frame = Math.floor(this.tick) % 4;

            this.tick += 0.5;

            if(boss.max - boss.life < 2000){

              if(this.opacity < 1){
                this.opacity += 0.05;
              }

              if((core.tick - 153) % (63/core.level) == 0){
                bul = new Type3way(this, 0, 3, 100, 0, scene, player, EnemyBulletsGroup);
              }

            }

            if(boss.max - boss.life > 2000 && boss.max - boss.life < 4000){

              if(this.stage == 1){
                this.opacity -= 0.05;
              }

              if(this.opacity <= 0){
                this.stage = 3;
                this.x = x2 - this.width/2;
                this.y = 100;
              }

              if(core.level >= 2){
                if((core.tick - 153) % (63/core.level) == 0){
                  bul = new Type5time(this, 0, 4, 100, 20, scene, player, EnemyBulletsGroup);
                }
              }

            }

            if(boss.max - boss.life > 4000 && boss.max - boss.life < 6000){

              if(this.stage == 3){
                if(this.opacity < 1){
                  this.opacity += 0.05;
                }
              }

              if(this.opacity >= 1){

                if(core.tick % 60 == 30){

                    bul = new Type5way(this,  0, 4, 30, 0, scene, player, EnemyBulletsGroup);

                }

              }

            }

            if(boss.max - boss.life > 6000 && boss.max - boss.life < 8000){

              if(this.stage == 3){
                if(this.opacity > 0){
                  this.opacity -= 0.05;
                }
              }

              if(this.opacity <= 0){

                this.rotation = -rotation;

                this.y = 640;

                this.stage = 4;

              }

              if(this.stage == 4){
                if(this.opacity < 1){
                  this.opacity += 0.05;
                }
              }

              if(this.opacity >= 1){

                if((core.tick - 153) % (126/core.level) == 0 || (core.tick - 153) % (126/core.level) == 31){
                  bul = new Type3way(this,  5, 6, 200, 0, scene, player, EnemyBulletsGroup);
                }

              }

            }

            if(boss.max - boss.life > 8000 && boss.max - boss.life < 9000){

              if(this.stage == 4){
                if(this.opacity > 0){
                  this.opacity -= 0.05;
                }
              }

              if(this.opacity <= 0){

                this.rotation = rotation;

                this.y = 100;

                this.stage = 5;

              }

              if(this.stage == 5){
                if(this.opacity < 1){
                  this.opacity += 0.05;
                }
              }

              if(this.opacity >= 1){

                if((core.tick - 153) % 86 == 0){

                  for (var i = 0; i < 30; i++) {
                    bul = new TypeStraight1(this, 0, 3, 50 + i * 2, 14, scene, player, EnemyBulletsGroup);
                  }

                }

              }

            }

          }

        });

        scene.addChild(this);

      }
    });

		var Enemy0 = Class.create(Sprite, {
			initialize : function(x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
				Sprite.call(this, 36, 36);

        this.bullet_color;

        switch(color){
          case "red":
            this.image = core.assets['pictures/enemy02red.png'];
            this.bullet_color = 4;
            break;

          case "green":
            this.image = core.assets['pictures/enemy02green.png'];
            this.bullet_color = 3;
            break;

          case "blue":
            this.image = core.assets['pictures/enemy02blue.png'];
            this.bullet_color = 3;
            break;

          case "cyan":
            this.image = core.assets['pictures/enemy02cyan.png'];
            this.bullet_color = 3;
            break;

          case "magenta":
            this.image = core.assets['pictures/enemy02magenta.png'];
            this.bullet_color = 4;
            break;

          case "yellow":
            this.image = core.assets['pictures/enemy02yellow.png'];
            this.bullet_color = 4;
            break;

          case "orange":
            this.image = core.assets['pictures/enemy02orange.png'];
            this.bullet_color = 4;
            break;

          case "purple":
            this.image = core.assets['pictures/enemy02purple.png'];
            this.bullet_color = 3;
            break;

          case "white":
            this.image = core.assets['pictures/enemy02white.png'];
            this.bullet_color = 3;
            break;

          case "whiteblue":
            this.image = core.assets['pictures/enemy02whiteblue.png'];
            this.bullet_color = 3;
            break;
          }

        if(enemy_bullet <= 2){
          this.bullet_color = enemy_bullet;
        }

        this.frequency;

        switch (core.level) {
          case 1:
            this.frequency = 63;
            break;
          case 2:
            this.frequency = 42;
            break;
          case 3:
            this.frequency = 21;
            break;
          default:
        }

				this.x = x + 40;
				this.y = y + 40;

        this.life = 3;

        this.ex_x = 0;

        this.tick = 0;

        var hitX ;
        var hitY ;
        var r;

        var surface_frame = 0;

					this.addEventListener('enterframe', function(e) {

            if(core.play){

              this.ex_x = this.x;

              this.frame = (surface_frame % 8);

              switch (Math.floor(player.power)) {
                case 1:
                  r = 15;
                  break;
                case 2:
                  r = 15;
                  break;
                case 3:
                  r = 20;
                case 4:
                  r = 20;
                case 5:
                  r = 20;
                break;
              }

              for(var i = 0; i < Playerbullets.childNodes.length; i ++){
                hitX = Math.abs(( Playerbullets.childNodes[i].x + (Playerbullets.childNodes[i].width / 2)) - ( this.x + (this.width / 2  )));
                hitY = Math.abs(( Playerbullets.childNodes[i].y + (Playerbullets.childNodes[i].height / 2)) - ( this.y + (this.height / 2  )));

                if(hitX < r && hitY < r){
                  Playerbullets.childNodes[i].y = -10;
                  this.life -= Playerbullets.childNodes[i].power;
                }
              }

              if(this.life <= 0 || EnemyBulletsGroup.bomb){
                core.score += 40;
                fish = new Fish(this, player, false, scene);
                effect = new Effect(this, scene);
                scene.removeChild(this);
              }

              if( this.x < -40 || this.x > 640 || this.y < -40 || this.y > 800 ){
                 //広めに範囲を指定
                 scene.removeChild(this);
              }

              this.tick++;

              if(this.tick % 2 == 0){
                surface_frame ++;
              }

            }

					});

      	      scene.addChild(this);

			}

		});

    var Enemy_l = Class.create(Enemy0, {
			initialize : function(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene);

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            switch(direction){
              case "up":
              this.y -= 4;
              break;
              case "down":
              this.y += 4;
              break;
              case "right":
              this.x += 4;
              break;
              case "left":
              this.x -= 4;
              break;
              default:
            }

            if(attack){

              if( (core.tick - 153 ) % this.frequency == 0){
                var bul0 = new Type3way(this, 0, this.bullet_color, 150 + 50*core.level, 0, scene, player, EnemyBulletsGroup);
              }

            }

            if(this.ex_x > this.x){
              this.scaleX = -1
            }else if (this.ex_x < this.x){
              this.scaleX = 1;
            }

          }

        });

      }

    });

    var Enemy_i = Class.create(Enemy0, {
      initialize : function(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene);
        var r = 1;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            if(this.tick >= 30 && this.tick <= 90){
              r = -1

              if(attack){

                if((core.tick - 153 ) % this.frequency == 0){
                  var bul0 = new Type12circle(this, 0, this.bullet_color, 150 + 50*core.level, 0, scene, player, EnemyBulletsGroup);
                }

              }

            }else{

              switch(direction){
                case "up":
                this.y -= r * 4;
                break;
                case "down":
                this.y += r * 4;
                break;
                case "right":
                this.x += r * 4;
                break;
                case "left":
                this.x -= r * 4;
                break;
                default:
              }

            }

            if(this.ex_x > this.x){
              this.scaleX = -1
            }else if (this.ex_x < this.x){
              this.scaleX = 1;
            }

          }

        });

      }

    });

    var Enemy_u = Class.create(Enemy0, {
      initialize : function(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene);

        var theta;
        var r = 60;

        var proto_x = 0;
        var proto_y = 0;

        switch(direction){
          case "up":
          theta = 180;
          proto_x = r;
          break;
          case "down":
          theta = 0;
          proto_x = -r;
          break;
          case "right":
          theta = 270;
          proto_y = r;
          break;
          case "left":
          theta = 90;
          proto_y = -r;
          break;
          default:
        }

        var proto_theta = theta;
        var t = 1;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            console.log()

            Theta = (theta / 180 )* Math.PI;

            if(this.tick < 70 || theta - proto_theta >= 180){

              switch(direction){
                case "up":
                this.y -= t * 4;
                break;
                case "down":
                this.y += t * 4;
                break;
                case "right":
                this.x += t * 4;
                break;
                case "left":
                this.x -= t * 4;
                break;
                default:
              }

            }

            if(this.tick == 70){
              proto_x += this.x;
              proto_y += this.y;
              t = -1
            }

            if(this.tick > 70 && theta - proto_theta <= 180){

              this.x = proto_x + (Math.cos(Theta) * r);
              this.y = proto_y + (Math.sin(Theta) * r);

              theta += 4;

            }

            if(attack){

              if((core.tick - 153 ) % this.frequency == 0){
                var bul0 = new Type5time(this, 0, this.bullet_color, 150 + 50*core.level, 0, scene, player, EnemyBulletsGroup);
              }

            }

            if(this.ex_x > this.x){
              this.scaleX = -1
            }else if (this.ex_x < this.x){
              this.scaleX = 1;
            }

          }

        });

      }

    });

    var Enemy_v = Class.create(Enemy0, {
      initialize : function(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene);

        var r;
        var tick;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            switch(direction){

              case "right":
              r = 1;
              break;
              case "left":
              r = -1;
              break;
              default:

            }

            if(this.tick <= 20){
              this.x += (r * 4) + this.tick/16;
              this.y += 48 / (this.tick + 1) + 1;
            }
            else if(this.tick > 20 && this.tick < 120){
              this.x += r * 2;
              tick = this.tick;
            }
            else{
              this.x += (r * 4) + (this.tick - tick) / 16;
              this.y -= 48 / ( 22 - (2 * (this.tick - tick) / 3 + 0.5));
            }

            if(attack){

              if((core.tick - 153 ) % this.frequency == 0 && this.tick > 30 && this.tick < 120){
                var bul0 = new Type3way(this, 0, this.bullet_color, 150 + 50*core.level, 0, scene, player, EnemyBulletsGroup);
              }

            }

            if(this.ex_x > this.x){
              this.scaleX = -1
            }else if (this.ex_x < this.x){
              this.scaleX = 1;
            }

          }

        });

      }

    });

    var Enemy_z = Class.create(Enemy0, {
      initialize : function(x, y, color, direction, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, attack, enemy_bullet, player, Playerbullets, EnemyBulletsGroup, scene);

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            switch(direction){
              case "right":
              this.x += 4;
              this.y -= 2;
              break;
              case "left":
              this.x -= 4;
              this.y -= 2;
              break;
              default:
            }

            if(attack){

              if((core.tick - 153 ) % this.frequency == 0){
                var bul0 = new Type5time(this, 0, this.bullet_color, 150 + 50*core.level, 0, scene, player, EnemyBulletsGroup);
              }

            }

            if(this.ex_x > this.x){
              this.scaleX = -1
            }else if (this.ex_x < this.x){
              this.scaleX = 1;
            }

          }

        });

      }

    });

    var Enemy3 = Class.create(Enemy0, {
			initialize : function(x, y, color, player, Playerbullets, EnemyBulletsGroup, scene) {
        Enemy0.call(this, x, y, color, player, Playerbullets, EnemyBulletsGroup, scene);

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            if(this.tick >= 30 && this.tick <= 50 && this.tick % 5 == 0){

              for (var i = 0; i < 12; i++) {
                var bul0 = new TypeStraight2(this, i * 30 + this.tick, 2, 80, -10, scene, player, EnemyBulletsGroup);
              }

             // var bul0 = new TypeStraight1(this.x + (this.width/4), this.y + (this.height/4), 0, 2, 3, scene, player, EnemyBulletsGroup);

            }

          }

        });

      }

    });




    //敵弾

    var TypeStraight0 = Class.create(Sprite, {
			initialize : function(x, y, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        var PlayerCenterX;
				var PlayerCenterY;
				var thisCenterX;
				var thisCenterY;
				var px = player.x;
				var py = player.y;
        var r;


        switch (bulletType) {
          case 1:

            Sprite.call(this, 6, 6);

            this.image = core.assets['pictures/bullet01.png'];

            r = 4;

          break;

          case 2:

            Sprite.call(this, 6, 12);

            this.image = core.assets['pictures/bullet02.png'];

            r = 4;

            break;

          case 3:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 6;

            break;

          case 4:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 6;

            break;

          case 5:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 20;

            break;

          case 6:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 20;

            break;


          default:

        }


				this.tick = 0;
        this.speed = speed;
        this.acceleration = acceleration;
        this.opacity = 0.6;

				this.x = x - this.width/2;
				this.y = y - this.height/2;
        this.startX = this.x;
        this.startY = this.y;

        //回転
        this.rotation = -theta + 90;

						this.addEventListener('enterframe', function(e) {

              if(core.play){

									 this.tick += 1/30;

									 this.x = this.startX + (this.speed * this.tick + this.acceleration * this.tick * this.tick) * Math.cos((Math.PI * theta) / 180);



									 this.y = this.startY + (this.speed * this.tick + this.acceleration * this.tick * this.tick) * -Math.sin((Math.PI * theta) / 180);

									 //あたり判定

                   if(Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50){

  									 PlayerCenterX = player.x + player.width/2;
  									 PlayerCenterY = player.y + player.height/2;
  									 thisCenterX = this.x + this.width/2;
  									 thisCenterY = this.y + this.height/2;

  									 if( player.muteki == false){

    									 if( Math.sqrt( ((PlayerCenterX - thisCenterX) * (PlayerCenterX - thisCenterX))
    									 				 +  ((PlayerCenterY - thisCenterY) * (PlayerCenterY - thisCenterY)) )
    													 		< r ){

    											if(player.life >= 0){

                            for(var i = 0; i < 20; i++){
                              fish = new Fish(player, player, true, scene);
                            }

                            player.power = 1;
                            player.life --;
                            player.muteki = true;
                            player.time_of_death = player.tick;
                            player.x = 280;
                            player.y = 680;

                          }

    										}

                      }

									 }

									 //画面端にいったら消去
									 if(this.y < 0 || this.y > 720 || this.x < 0 || this.x > 560){
										 //広めに範囲を指定
										 scene.removeChild(this);
									 }

              }

						});

              EnemyBulletsGroup.addChild(this);

      	      //scene.addChild(this);

        	}

		});

    var TypeFreefall = Class.create(Sprite, {
			initialize : function(x, y, vx, bulletType, scene, player, EnemyBulletsGroup) {

        var PlayerCenterX;
				var PlayerCenterY;
				var thisCenterX;
				var thisCenterY;
				var px = player.x;
				var py = player.y;
        var r;


        switch (bulletType) {
          case 1:

            Sprite.call(this, 6, 6);

            this.image = core.assets['pictures/bullet01.png'];

            r = 4;

          break;

          case 2:

            Sprite.call(this, 6, 12);

            this.image = core.assets['pictures/bullet02.png'];

            r = 4;

            break;

          case 3:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 6;

            break;

          case 4:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 6;

            break;

          case 5:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 20;

            break;

          case 6:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 20;

            break;


          default:

        }


				this.tick = 0;
        this.opacity = 0.6;

				this.x = x - this.width/2;
				this.y = y - this.height/2;
        this.startX = this.x;
        this.startY = this.y;

						this.addEventListener('enterframe', function(e) {

              if(core.play){

									 this.tick += 1/30;

									 this.x += vx * this.tick;

									 this.y += 9.8 * this.tick * this.tick;

									 //あたり判定

                   if(Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50){

  									 PlayerCenterX = player.x + player.width/2;
  									 PlayerCenterY = player.y + player.height/2;
  									 thisCenterX = this.x + this.width/2;
  									 thisCenterY = this.y + this.height/2;

  									 if( player.muteki == false){

    									 if( Math.sqrt( ((PlayerCenterX - thisCenterX) * (PlayerCenterX - thisCenterX))
    									 				 +  ((PlayerCenterY - thisCenterY) * (PlayerCenterY - thisCenterY)) )
    													 		< r ){

    											if(player.life >= 0){

                            for(var i = 0; i < 20; i++){
                              fish = new Fish(player, player, true, scene);
                            }

                            player.power = 1;
                            player.life --;
                            player.muteki = true;
                            player.time_of_death = player.tick;
                            player.x = 280;
                            player.y = 680;

                          }

    										}

                      }

									 }

									 //画面端にいったら消去
									 if(this.y < 0 || this.y > 720 || this.x < 0 || this.x > 560){
										 //広めに範囲を指定
										 scene.removeChild(this);
									 }

              }

						});

            EnemyBulletsGroup.addChild(this);

            //scene.addChild(this);

        	}

		});

		var TypeStraight1 = Class.create(Sprite, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        var PlayerCenterX;
				var PlayerCenterY;
				var thisCenterX;
				var thisCenterY;
				var px = player.x;
				var py = player.y;
        var r;


        switch (bulletType) {
          case 1:

            Sprite.call(this, 6, 6);

            this.image = core.assets['pictures/bullet01.png'];

            r = 4;

          break;

          case 2:

            Sprite.call(this, 6, 12);

            this.image = core.assets['pictures/bullet02.png'];

            r = 4;

            break;

          case 3:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 6;

            break;

          case 4:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 6;

            break;

          case 5:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 20;

            break;

          case 6:

            Sprite.call(this, 18, 18);

            this.scaleX = 3;

            this.scaleY = 3;

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 20;

            break;

          default:

        }


				this.tick = 0;
        this.speed = speed;
        this.acceleration = acceleration;
        this.opacity = 0.6;

				this.x = enemy.x + enemy.width/2 - this.width/2;
				this.y = enemy.y + enemy.height/2 - this.height/2;
        this.startX = this.x;
        this.startY = this.y;

        var b = (player.x + player.width/2) - (enemy.x + enemy.width/2);
        var a = (player.y + player.height/2) - (enemy.y + enemy.height/2);
        var c = Math.sqrt (b * b + a * a);
        var s = (((b / c) * Math.cos(theta*(Math.PI/180))) - ((a / c) * Math.sin(theta*(Math.PI/180))));
        var t = (((a / c) * Math.cos(theta*(Math.PI/180))) + ((b / c) * Math.sin(theta*(Math.PI/180))))

        //回転
        this.rotation = theta + (Math.atan2(player.y - this.y, player.x - this.x)/(Math.PI / 180)) + 90;

						this.addEventListener('enterframe', function(e) {

              if(core.play){

									 this.tick += 1/30;

									 this.x = this.startX + (this.speed * this.tick + this.acceleration * this.tick * this.tick) * s;



									 this.y = this.startY + (this.speed * this.tick + this.acceleration * this.tick * this.tick) * t;

									 //あたり判定

                   if(Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50){

  									 PlayerCenterX = player.x + player.width/2;
  									 PlayerCenterY = player.y + player.height/2;
  									 thisCenterX = this.x + this.width/2;
  									 thisCenterY = this.y + this.height/2;

  									 if( player.muteki == false){

    									 if( Math.sqrt( ((PlayerCenterX - thisCenterX) * (PlayerCenterX - thisCenterX))
    									 				 +  ((PlayerCenterY - thisCenterY) * (PlayerCenterY - thisCenterY)) )
    													 		< r ){

    											if(player.life >= 0){

                            for(var i = 0; i < 20; i++){
                              fish = new Fish(player, player, true, scene);
                            }

                            player.power = 1;
                            player.life --;
                            player.muteki = true;
                            player.time_of_death = player.tick;
                            player.x = 280;
                            player.y = 680;

                          }



    										}

                      }

									 }

									 //画面端にいったら消去
									 if(this.y < 0 || this.y > 720 || this.x < 0 || this.x > 560){
										 //広めに範囲を指定
										 scene.removeChild(this);
									 }

              }

						});

            EnemyBulletsGroup.addChild(this);

            //scene.addChild(this);

        	}

		});

		var TypeStraight2 = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {
        var before = true;
				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

            //-at*t + vt = -a(t*t - vt/a) = -a(t - v/2a)

            //if(this.tick >= this.speed / (-2 * this.acceleration) && before == true){
            if(core.tick == 160){
              this.startX = this.x;
              this.startY = this.y;
              this.tick = 0;
              this.acceleration = 3;
              theta += 90;
              before = false;
            }

          }

			  });

      }

		});

    var Type3way = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        bul2r = new TypeStraight1(enemy, theta - 30, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        bul2l= new TypeStraight1(enemy, theta + 30, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var Type5way = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        bul2r = new TypeStraight1(enemy, theta - 30, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        bul2l= new TypeStraight1(enemy, theta + 30, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        bul3r = new TypeStraight1(enemy, theta - 60, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        bul3l= new TypeStraight1(enemy, theta + 60, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var Type3time = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        bul2 = new TypeStraight1(enemy, theta, bulletType, speed - 20, acceleration, scene, player, EnemyBulletsGroup);
        bul3 = new TypeStraight1(enemy, theta, bulletType, speed - 40, acceleration, scene, player, EnemyBulletsGroup);

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var Type5time = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        bul2 = new TypeStraight1(enemy, theta, 1, speed - 20, acceleration, scene, player, EnemyBulletsGroup);
        bul3 = new TypeStraight1(enemy, theta, 1, speed - 30, acceleration, scene, player, EnemyBulletsGroup);
        bul4 = new TypeStraight1(enemy, theta, 1, speed - 40, acceleration, scene, player, EnemyBulletsGroup);
        bul5 = new TypeStraight1(enemy, theta, 1, speed - 50, acceleration, scene, player, EnemyBulletsGroup);

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var Type8circle = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        for(var i = 0; i < 8 ; i++){
          bul1 = new TypeStraight1(enemy, theta + 45 + (i * 45), bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
          if(bulletType >= 3){
            bul2 = new TypeStraight1(enemy, theta + 30 + (i * 30), 1, speed - 20, acceleration, scene, player, EnemyBulletsGroup);
          }
        }

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var Type12circle = Class.create(TypeStraight1, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        for(var i = 0; i < 12 ; i++){
          bul1 = new TypeStraight1(enemy, theta + 30 + (i * 30), bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
          if(bulletType >= 3){
            bul2 = new TypeStraight1(enemy, theta + 30 + (i * 30), 1, speed - 20, acceleration, scene, player, EnemyBulletsGroup);
            bul3 = new TypeStraight1(enemy, theta + 30 + (i * 30), 1, speed - 40, acceleration, scene, player, EnemyBulletsGroup);
          }
        }

				TypeStraight1.call(this, enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup);
        this.addEventListener('enterframe', function(e) {

          if(core.play){

          }

			  });

      }

		});

    var TypeCircle = Class.create(Sprite, {
			initialize : function(enemy, theta, bulletType, speed, acceleration, scene, player, EnemyBulletsGroup) {

        var PlayerCenterX;
				var PlayerCenterY;
				var thisCenterX;
				var thisCenterY;
				var px = player.x;
				var py = player.y;
        var r;
        var radius = 0;


        switch (bulletType) {
          case 1:

            Sprite.call(this, 6, 6);

            this.image = core.assets['pictures/bullet01.png'];

            r = 4;

          break;

          case 2:

            Sprite.call(this, 6, 12);

            this.image = core.assets['pictures/bullet02.png'];

            r = 4;

            break;

          case 3:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03blue.png'];

            r = 6;

            break;

          case 4:

            Sprite.call(this, 18, 18);

            this.image = core.assets['pictures/bullet03yellow.png'];

            r = 6;

            break;

          default:

        }


				this.tick = 0;
        this.speed = speed;
        this.acceleration = acceleration;
        this.opacity = 0.6;


        this.x = enemy.x + enemy.width/2 - this.width/2 + (radius * Math.cos( theta*(Math.PI/180)));
				this.y = enemy.y + enemy.height/2 - this.height/2 + (radius * Math.sin(-theta*(Math.PI/180)));
        this.startX = this.x;
        this.startY = this.y;

						this.addEventListener('enterframe', function(e) {

              if(core.play){

									 this.tick++;

                   radius += 2 + this.acceleration;

									 this.x = this.startX + radius * Math.cos( ((this.tick*this.speed)+theta)*(Math.PI/180));

									 this.y = this.startY + radius * Math.sin(-((this.tick*this.speed)+theta)*(Math.PI/180));

									 //あたり判定

                   if(Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50){

  									 PlayerCenterX = player.x + player.width/2;
  									 PlayerCenterY = player.y + player.height/2;
  									 thisCenterX = this.x + this.width/2;
  									 thisCenterY = this.y + this.height/2;

  									 if( player.muteki == false){

    									 if( Math.sqrt( ((PlayerCenterX - thisCenterX) * (PlayerCenterX - thisCenterX))
    									 				 +  ((PlayerCenterY - thisCenterY) * (PlayerCenterY - thisCenterY)) )
    													 		< r ){

    											if(player.life >= 0){

                            for(var i = 0; i < 20; i++){
                              fish = new Fish(player, player, true, scene);
                            }

                            player.power = 1;
                            player.life --;
                            player.muteki = true;
                            player.time_of_death = player.tick;
                            player.x = 280;
                            player.y = 680;

                          }

    										}

                      }

									 }

									 //画面端にいったら消去
									 if(this.y < -1000 || this.y > 2000 || this.x < -1000 || this.x > 2000){
										 //広めに範囲を指定
										 scene.removeChild(this);
									 }

              }

						});

      	      EnemyBulletsGroup.addChild(this);

        	}

		});

    var EnemyBulletsGroup = Class.create(Group, {
      initialize : function(scene) {

        Group.call(this);

        this.bomb = false;

        this.bomb_time = 0;

        this.player_bomb;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            for(var i = 0; i < this.childNodes.length; i ++){

              if(this.childNodes[i].y < 30 || this.childNodes[i].y > 690 || this.childNodes[i].x < 30 || this.childNodes[i].x > 530){

                this.removeChild(this.childNodes[i]);

              }

            }

            if(this.bomb){

              for(var i = 0; i < this.childNodes.length; i ++){

                this.removeChild(this.childNodes[i]);

              }

            }

            this.bomb_time --;

            if(this.bomb_time == 0){
              this.bomb = false;
            }

              //console.log(this.childNodes.length)

          }

        });

        scene.addChild(this);

      }
    });

  /*  var TypeCircle1 = Class.create(Sprite, {
			initialize : function(x, y, radius, theta, scene) {

				var tick = 0;

				Sprite.call(this, 6, 6);

				this.image = core.assets['pictures/bullet01.png'];

				this.x = x + (radius * Math.cos( theta*(Math.PI/180)));
				this.y = y + (radius * Math.sin(-theta*(Math.PI/180)));

						this.addEventListener('enterframe', function(e) {

              if(core.play){

									 tick++;

									 this.x = x + radius * Math.cos( ((tick*3)+theta)*(Math.PI/180));



									 this.y = y + tick * 4 + radius * Math.sin(-((tick*3)+theta)*(Math.PI/180));


									 if(this.y < -20 || this.y > 500 || this.x < -20 || this.x > 340){
										 //広めに範囲を指定
										 scene.removeChild(this);
									 }

              }

						});

      	      scene.addChild(this);

        	}

		});

*/



    //パワーアップアイテム

    var Fish = Class.create(Sprite, {
      initialize : function(enemy, player, player_dead, scene){

        Sprite.call(this, 12, 12);

        this.image = core.assets['pictures/fish.png'];

        this.x = enemy.x + enemy.width/2;
        this.y = enemy.y + enemy.height/2;



        this.tick = 0;

        var player_centerx ,player_centery ,this_centerx ,this_centery;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            this.tick ++;

            if(player_dead){

              var randomX = Math.random() * 48 - 24;
              var randomY = Math.random() * 40;
              this.x += randomX;
              this.y -= (16 + randomY - 40 * (randomX/24) * (randomX/24) )/this.tick;

            }

            if (this.tick >= 16) {
              player_dead = false
            }

            this.y += 2;

            player_centerx = player.x + (player.width / 2);
            player_centery = player.y + (player.height / 2);

            this_centerx = this.x + (this.width / 2);
            this_centery = this.y + (this.height / 2);

            r = Math.sqrt(
                (player_centerx - this_centerx) * (player_centerx - this_centerx) +
                (player_centery - this_centery) * (player_centery - this_centery)
              );

            if(!player_dead){

              if(r < 50){
                player.power += 0.1;
                core.score += 20;
                scene.removeChild(this);
              }

            }

            if(this.y >= 720){
              scene.removeChild(this);
            }

          }

        });

        scene.addChild(this);

      }

    });

    //エフェクト

    var Effect = Class.create(Sprite,{
      initialize : function(object, scene){
        Sprite.call(this, 72, 72);

        this.image = core.assets['pictures/effect.png'];

        this.x = object.x + (object.width / 2) - 36;
        this.y = object.y + (object.height / 2) - 36;

        this.frame = 0;

        this.opacity = 1.0;

        var tick = 0;
        var half_tick = 0;

        this.addEventListener('enterframe', function(e) {

          if(core.play){

            if(tick <= 8){
              this.frame = half_tick % 4;
            }else{
              scene.removeChild(this);
            }

            this.opacity -= 0.1;

            tick ++;
            if(tick % 2 == 0){
              half_tick ++ ;
            }

          }

        });

        scene.addChild(this);

      }

    });

}
