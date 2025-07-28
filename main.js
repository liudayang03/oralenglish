const wordList = [
  { word: "thought", phonetic: "/θɔːt/", audio: "audio/thought.mp3" },
  { word: "develop", phonetic: "/dɪˈveləp/", audio: "audio/develop.mp3" },
  { word: "language", phonetic: "/ˈlæŋɡwɪdʒ/", audio: "audio/language.mp3" }
];

let currentIndex = 0;

// 播放标准发音
function playStandardAudio() {
  const audio = new Audio(wordList[currentIndex].audio);
  audio.play();
}

// 随机换一个词
document.getElementById('resetBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % wordList.length;
  document.getElementById('word').textContent = wordList[currentIndex].word;
  document.getElementById('phonetic').textContent = wordList[currentIndex].phonetic;
  document.getElementById('scoreText').textContent = '--';
  document.getElementById('statusMessage').textContent = '准备录音...';
  document.getElementById('feedbackContainer').style.display = 'none';
});

// 初始化 Canvas 圆环
const canvas = document.getElementById('scoreCanvas');
const ctx = canvas.getContext('2d');

function drawScoreCircle(score) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(60, 60, 50, 0, 2 * Math.PI);
  ctx.strokeStyle = '#1890ff';
  ctx.lineWidth = 10;
  ctx.stroke();

  const percent = Math.min(score / 100, 1);
  ctx.beginPath();
  ctx.arc(60, 60, 50, -Math.PI / 2, (2 * Math.PI * percent) - Math.PI / 2);
  ctx.strokeStyle = '#ff4d4f';
  ctx.lineWidth = 10;
  ctx.stroke();
}

// 简单模拟发音评分
document.getElementById('recordBtn').addEventListener('click', () => {
  document.getElementById('statusMessage').textContent = '评分中...';
  setTimeout(() => {
    const score = Math.floor(60 + Math.random() * 40);
    document.getElementById('scoreText').textContent = score;
    drawScoreCircle(score);
    document.getElementById('statusMessage').textContent = '评测完成';

    // 简单建议展示
    document.getElementById('feedbackItems').innerHTML = `
      <ul>
        <li>注意清晰发出 "${wordList[currentIndex].word}" 中的重音部分</li>
        <li>练习 "${wordList[currentIndex].phonetic}" 的开头辅音</li>
      </ul>
    `;
    document.getElementById('feedbackContainer').style.display = 'block';
  }, 2000);
});
