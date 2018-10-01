
var cubeW=20;
var cubeArr=[[6,7,12,13],[7,8,11,12],[6,7,11,12],[7,12,17,8],[7,12,16,17],[7,12,17,22],[7,11,12,13]];
var colorArr=['#ffc0cb','#dda0dd','#9370db','#6495ed','#fa8072','#ff8c00','#008000'];
var rotateArr=[4,9,14,19,24,3,8,13,18,23,2,7,12,17,22,1,6,11,16,21,0,5,10,15,20];
var canvas=document.getElementById('can');
var ctx=canvas.getContext('2d');
var score=document.getElementById('score');
var canWidth=canvas.width;
var canHeight=canvas.height;
var downInfor={}, staticCube=[];
var myinter;

window.onload=function() //初始化
{
    drawline();
    for(var i=0;i<(canWidth/cubeW);i++)
    {
        staticCube[i]=[];
        for(var j=0;j<(canHeight/cubeW);j++)
        {
            staticCube[i][j]=0;
        }
    }
    initCube();
    myinter=setInterval('movedown()',1000);  //第一个参数要加引号
}
function drawline()
{
    ctx.lineWidth=1;
    ctx.strokeStyle='#ddd';
    for(var i=0;i<(canWidth/cubeW);i++)
    {
      ctx.moveTo(cubeW*i,0);
      ctx.lineTo(cubeW*i,canHeight);
    }
    ctx.stroke();
    for(var j=0;j<(canHeight/cubeW);j++)
    {
        ctx.moveTo(0,cubeW*j);
        ctx.lineTo(canHeight,cubeW*j);
    }
    ctx.stroke();
}
function initCube()
{
       var index=Math.floor(Math.random()*cubeArr.length);//随机生成
        downInfor.cubeNow=cubeArr[index].concat();
        downInfor.index=index;
        downInfor.prepoint=[5,-1];
        downInfor.point=[5,-1];
        drawEle(colorArr[downInfor.index]);
}
function movedown()
{
    //判断下一个位置是否合理
    var length,isempty=true,px,py,movex,movey,max=0;
    for(var i=0;i<4;i++)
    {
        if(max<downInfor.cubeNow[i])
            max=downInfor.cubeNow[i];
    }
    length=Math.ceil(max/5);
    for(var i=0;i<4;i++)
    {
        px=downInfor.point[0]+downInfor.cubeNow[i]%5;
        py=downInfor.point[1]+1+Math.floor(downInfor.cubeNow[i]/5);
        if(staticCube[px][py]==1)
        {
            isempty=false;
            break;
        }
    }
    if((downInfor.point[1]+length)<(canHeight/cubeW)&&isempty)
    {
        downInfor.prepoint=downInfor.point.concat();//注意引用类型
        downInfor.point[1]=downInfor.point[1]+1;
        clearEle();
        drawEle(colorArr[downInfor.index]);
    }
    else//不能移动的时候
    {
        for(var i=0;i<4;i++)
        {
            px=downInfor.point[0]+downInfor.cubeNow[i]%5;
            py=downInfor.point[1]+Math.floor(downInfor.cubeNow[i]/5);
            staticCube[px][py]=1;
        }
        drawEle('#555');
        checkfullLine();
    }

}
function moveLeft()
{
    var leftroom=4,isempty=true,px,py,movex,movey;
    for(var i=0;i<4;i++)
    {
        px=downInfor.point[0]-1+downInfor.cubeNow[i]%5;
        py=downInfor.point[1]+Math.floor(downInfor.cubeNow[i]/5);
        if((downInfor.cubeNow[i]%5)<leftroom)
            leftroom=downInfor.cubeNow[i]%5;
        if(staticCube[px][py]==1)
        {
            isempty=false;
            break;
        }
    }
    if((downInfor.point[0]+leftroom)>=0&&isempty)
    {
        downInfor.prepoint=downInfor.point.concat();
        downInfor.point[0]=downInfor.point[0]-1;
        clearEle();
        drawEle(colorArr[downInfor.index]);
    }
}
function moveRight()
{
    var rightroom=0,isempty=true,px,py,movex,movey;
    for(var i=0;i<4;i++)
    {
        px=downInfor.point[0]+1+downInfor.cubeNow[i]%5;
        py=downInfor.point[1]+Math.floor(downInfor.cubeNow[i]/5);
        if((downInfor.cubeNow[i]%5)>rightroom)
            rightroom=downInfor.cubeNow[i]%5;
        if(staticCube[px][py]==1)
        {
            isempty=false;
            break;
        }
    }
    if((downInfor.point[0]+rightroom+1)<(canWidth/cubeW)&&isempty)
    {
        downInfor.prepoint=downInfor.point.concat();
        downInfor.point[0]=downInfor.point[0]+1;
        clearEle();
        drawEle(colorArr[downInfor.index]);
    }
}
function moverotate()//处理旋转
{
    var isempty=true,px,py,movex,movey, tempRotate=[0,0,0,0];
    for(var i=0;i<4;i++)
    {
        tempRotate[i]=rotateArr[downInfor.cubeNow[i]];
    }
    for(var i=0;i<4;i++)
    {
        px=downInfor.point[0]+tempRotate[i]%3;
        py=downInfor.point[1]+Math.floor(tempRotate[i]/3);
        if(staticCube[px][py]==1)
        {
            isempty=false;
            break;
        }
    }
    if(isempty)
    {
        downInfor.prepoint=downInfor.point.concat();
        clearEle();
        downInfor.cubeNow=tempRotate.concat();
        drawEle(colorArr[downInfor.index]);
    }

}
function drawEle(color)
{
    ctx.fillStyle=color;
    ctx.strokeStyle='#fff';
    for(var i=0;i<4;i++)
    {
        var movex=downInfor.cubeNow[i]%5;
        var movey=Math.floor(downInfor.cubeNow[i]/5);
        ctx.fillRect(cubeW*(downInfor.point[0]+movex),cubeW*(downInfor.point[1]+movey),cubeW,cubeW);
        ctx.strokeRect(cubeW*(downInfor.point[0]+movex),cubeW*(downInfor.point[1]+movey),cubeW,cubeW)
    }
}
function clearEle()
{
    ctx.lineWidth=1;
    ctx.strokeStyle='#ddd';
    for(var i=0;i<4;i++)
    {
        var movex=downInfor.cubeNow[i]%5;
        var movey=Math.floor(downInfor.cubeNow[i]/5);
        ctx.clearRect(cubeW*(downInfor.prepoint[0]+movex),cubeW*(downInfor.prepoint[1]+movey),cubeW,cubeW);
        ctx.strokeRect(cubeW*(downInfor.prepoint[0]+movex),cubeW*(downInfor.prepoint[1]+movey),cubeW,cubeW)
    }
}
function checkfullLine()//检测是否有一行满了
{
    var isFullLine=true,index=0,changeScore=false;
    for(var i=0;i<canWidth/cubeW;i++)
    {
        if(staticCube[i][0]==1)
        {
            alert('游戏结束!');
            clearInterval(myinter);
            return;
        }
    }
    for(var i=canHeight/cubeW-1;i>=0;i--)
    {
        isFullLine=true;
        for(var j=0;j<(canWidth/cubeW);j++)
        {
            if(staticCube[j][i]==0)
            {
                isFullLine=false;
            }
        }
        if(isFullLine)//加一分
        {
            score.innerHTML=parseInt(score.innerText)+1;
            changeScore=true;
            for(var s=i;s>=0;s--) {
                for (var j = 0; j < (canWidth / cubeW); j++) {
                    (s- 1) >= 0 ? staticCube[j][s] = staticCube[j][s - 1] : staticCube[j][s] = 0;
                }
            }
        }
    }
    if(changeScore)
    {
        ctx.clearRect(0,0,canWidth,canHeight);
        drawline();
        ctx.fillStyle='555';
        ctx.strokeStyle='#fff';
        for(var i=0;i<(canWidth/cubeW);i++)
        {
            for(var j=0;j<(canHeight/cubeW);j++)
            {
                if(staticCube[i][j]==1)
                {
                    ctx.fillRect(cubeW*i,cubeW*j,cubeW,cubeW);
                    ctx.strokeRect(cubeW*i,cubeW*j,cubeW,cubeW);
                }
            }
        }
    }
    initCube();
}
window.onkeydown=function (evt)
{
   switch(evt.keyCode)
   {
       case 37: //左
           moveLeft();
           break;
       case 38: //上
           moverotate();
           break;
       case 39: //右
           moveRight();
           break;
       case 40: //下
           movedown();
           break;
   }
}