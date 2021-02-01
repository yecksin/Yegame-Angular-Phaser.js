import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as Phaser from 'phaser';
declare var Phaser
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  load: any;
  add: any;
  physics: any;
  anims: any;
  input: any;
  cursors: any;
  player: any;
  posx =0;

  config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // agregamos fisicas
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    // fin de agregar fisicas
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update,
    }
  };

  game = new Phaser.Game(this.config);

  constructor(private db: AngularFireDatabase) {
   
  }

  pushx(valor) {
    // otra manera de manejar las referencias 
    this.db.database.ref('x').update({
      valor: this.player.x
    }).then(() => {
      console.log('cambiando a name');
    }).catch(e => {
      console.log(e);
    });

  }
  
  ngOnInit(): void {
    
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
   
    let platforms;
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // se escala y se actualiza con el refresh

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);


    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

  }

   saluda(){
    console.log("object");
  }
  update() {
   
    console.log(this.player.x + ' y ' + this.posx);

    // console.log("update");

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
     
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      console.log("salto");

      this.player.setVelocityY(-330);
    }
  }




}
