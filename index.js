const fs=require("fs");
const path=require("path");
const folder='./songs';
const file=path.join(__dirname,folder);

const songs=fs.readdirSync(file).filter((element)=>element.endsWith(".mp3"));
let selected_song=0;
let player=null;
let isPaused=false;

(async ()=>{
    const audio=(await import("audio")).default;
    console.log("🎵 Welcome to the Songs App 🎵");
    process.stdin.setEncoding("utf-8");
    process.stdin.setRawMode(true);
    process.stdin.resume();

    showSongs();

    process.stdin.on("data", async (input)=>{
        if(input=='q'){
            quit();
            return;
        }
        if(input=='\r'){
            await playSong(selected_song);
            return;
        }
        if(input=='p'){
            pause();
            return;
        }
        if(input=='r'){
            resume();
            return;
        }
        if(input==="\x1b[A"){
            if(selected_song>0){
                selected_song--;
                process.stdout.write(`\x1b[${songs.length}A`);
                showSongs();
            }
        }   
        else if(input==="\x1b[B"){
            if(selected_song<songs.length-1){
                selected_song++;
                process.stdout.write(`\x1b[${songs.length}A`);
                showSongs();
            }
        }
    })


function showSongs(){
    for(let i=0;i<songs.length;i++){
        process.stdout.write("\x1b[2K");
        if(i===selected_song){
            console.log(`=> ${i+1}: ${songs[i]}`);
        }else{
            console.log(`   ${i+1}: ${songs[i]}`);
        }
    }
}

async function playSong(index){
    if(player){
        player.stop();
        player.dispose();
        player=null;  
    }
    player=await audio(`./songs/${songs[index]}`);
    isPaused=false;
    player.play();
}
})();