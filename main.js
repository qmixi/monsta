var game = new Vue({
	el: '#app',
	data: {
			playerHealth: 100,
			monsterHealth: 100,
			gameIsRunning: false,
			turns: [],
	},
		methods: {
			startGame: function() {
					this.gameIsRunning = true;
					this.monsterHealth = 100;
					this.playerHealth = 100;
					this.turns = [];
			},
			attack: function () {
					var damage = this.calculateDamage(3, 10);
					this.monsterHealth -= damage;
					this.turns.unshift({
						isPlayer: true,
						text: 'Player hits monster for' + damage
					});
					this.monsterAttacks();
					this.checkWin();
			},
			specialAttack: function () {
					var damage = this.calculateDamage(10, 20);
					this.monsterHealth -= damage;
					this.turns.unshift({
						isPlayer: true,
						text: 'Player hits monster hard for' + damage
					});
					this.monsterAttacks();
					this.checkWin();
			},
			monsterAttacks: function () {
					damage = this.calculateDamage(5, 12);
					this.playerHealth -= damage;
					this.turns.unshift({
						isPlayer: false,
						text: 'Monster hits player for' + damage
					});
			},
			heal: function () {
					if (this.playerHealth <= 90) {
						this.playerHealth += 10;
					} else {
							this.playerHealth = 100;
					}
					this.turns.unshift({
						isPlayer: true,
						text: 'Player heals for 10'
					});
			},
			giveUp: function () {
					this.gameIsRunning = false;
			},
			calculateDamage: function (min, max) {
					return Math.max(Math.floor(Math.random() * max) + 1, min);
			},
			checkWin: function () {
					if (this.monsterHealth <= 0) {
							if (confirm('You won! New Game?')) {
									this.startGame();
							} else {
								this.gameIsRunning = false;
							}
							return;
					} else if (this.playerHealth <= 0) {
							if (confirm('You Lost! New Game?')) {
									this.startGame();
							} else {
								this.gameIsRunning = false;
							}
							return;
					} else {
							return false;
					}
			}	
		}
});