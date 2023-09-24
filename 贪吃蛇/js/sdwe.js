
const gameWidth = 10;
const gameHeight = 10;
//获取画布
const canvas = document.getElementById("snake");
// 渲染2d画布
const ctx = canvas.getContext("2d");
// 判断
if (ctx != null) {
    canvas.width = 500;
    canvas.height = 500;
}
else {
    alert('请更新浏览器');
}

const snake = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 }
];

const velocity = { x: 0, y: 0 };
const dgutgq = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "d":
            velocity.x = 1;
            velocity.y = 0;
            break;
        case "s":
            velocity.x = 0;
            velocity.y = 1;
            break;
        case "a":
            velocity.x = -1;
            velocity.y = 0;
            break;
    }
});

let lastMove = 0;
let currentTime;

drawSnake();
// 动画
function drawSnake() {
    currentTime = new Date();
    // 绘制动画
    if (lastMove != 0 && currentTime - lastMove < 250) {
        window.requestAnimationFrame(drawSnake);
        return;
    }
 
    lastMove = new Date();

    let head = {
        x: (snake[0].x + velocity.x) % 11,
        y: (snake[0].y + velocity.y) % 11
    };
   console.log({head});
    if (head.x == -1||head.y == -1||head.x==10||head.y==10) {
         alert('就你这样玩游戏还想进莞青？');
         return ;
    }

    //   判断是否追尾
    for (let i = 2; i < snake.length - 1; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            alert('就你这样玩游戏还想进莞青？');
            return ;
        }
    }
    // 吃莞青
    if (head.x == dgutgq.x && head.y == dgutgq.y) {
        snake.unshift(head);
        dgutgq.x = Math.floor(Math.random() * 10);
        dgutgq.y = Math.floor(Math.random() * 10);
    } else if (!(velocity.x == 0 && velocity.y == 0)) {
        snake.unshift(head);
        snake.pop();
    }
    // 通过透明的方法，清除画布

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    snake.forEach((section) => {
        ctx.fillRect(section.x * 50 + 5, section.y * 50 + 5, 40, 40);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(dgutgq.x * 50 + 5, dgutgq.y * 50 + 5, 40, 40);

    window.requestAnimationFrame(drawSnake);
}
