/******************************************************************
    Phần xử lý nhạc
 ******************************************************************/

const bgMusic = document.getElementById("bg-music");

// function notReady() {
//   if (bgMusic.muted) {
//     bgMusic.muted = false;
//     bgMusic.play().catch(() => {});
//   }

//   app.innerHTML = `
//     <div class="center">
//       <h1>Không sao cả 😊</h1>
//       <p>Khi nào em sẵn sàng thì quay lại nhé.<br>Anh yêu em ❤️</p>
//     </div>
//   `;
// }


/******************************************************************
    Nội dung
 ******************************************************************/
const SCENES = [
  {
    type: "intro",
    title: "Bấm vào sẵn sàng để bắt đầu câu chuyện!",
    text: ``,
  },
  {
    type: "story",
    layout: "image-top",
    image: "images/img1.png",
    text: `Chào em, cô gái Bảo Bình thân thiện và ân cần, nhưng luôn vội vàng với cảm xúc.

    Hôm nay là ngày gì vậy nhỉ?
    Không biết… ngày này của năm 94, khi ấy trông như thế nào. 

    Có lẽ, thành phố với buổi sáng đầu nắng.
    Đầm sen nhộn nhịp,
    người người bận rộn với những lo toan. (Khác lạ với miền quê của anh).

    Thế giới thì vẫn vậy
    Chỉ là... giữa sự bình thường ấy,  
    Một sinh linh bừng nở giữa đời.`,
  },
  {
    type: "story",
    layout: "image-bottom",
    image: "images/img2.jpg",
    text: `Trong đức tin, người ta vẫn tin rằng
sự sống không đến một cách tình cờ.
Như Kinh Thánh đã viết:

“Này đây con cái là hồng ân của Thiên Chúa,
con lòng mẹ sinh hạ là phần thưởng Ngài ban.”
(Thánh Vịnh 127,3). 

Có lẽ, từ khoảnh khắc ấy,
trong một mái nhà rất riêng,
đã có thêm tiếng khóc đầu đời,
thêm những bối rối, thêm những vòng tay vụng về,
và thêm một lý do rất tự nhiên để yêu thương.`,
  },
  {
    type: "story",
    layout: "image-top",
    image: "images/img3.jpg",
    text: `Thời gian rồi cũng lặng lẽ đi qua,
mang theo những ngày tháng lớn lên,
những lần mỉm cười, những lúc mỏi mệt,
và cả những cảm xúc vội vàng mà em vẫn hay mang theo.`,
  },
  {
    type: "story",
    layout: "image-top",
    image: "images/img4.png",
    text: `Để hôm nay, khi nhắc lại ngày ấy,
người ta chỉ muốn dừng lại một chút,
và nói lời cảm ơn.`,
  },
  {
    type: "story",
    layout: "overlay",
    image: "images/img7.png",
    text: `Cảm ơn Chúa,
Cảm ơn bố mẹ và gia đình,
Cảm ơn một ngày rất bình thường của thế giới,
đã trở thành một ngày rất đặc biệt.`,
  },
  {
    type: "story",
    layout: "image-bottom",
    image: "images/img5.png",
    text: "Và rồi hôm nay,\nlà ngày sinh nhật của em 🎂. \nAnh chúc em luôn vui vẻ, luôn hạnh phúc.",
  },
  {
    type: "end",
    image: "images/img6.png",
    text: "Happy Birthday,\nBánh Bao ❤️",
  },
];

/******************************************************************/

let index = 0;
const app = document.getElementById("app");

function render() {
  const s = SCENES[index];
  let html = "";

  if (s.type === "intro") {
    html = `
      <div class="center">
        <h1>${s.title}</h1>
        <p>${s.text.replace(/\n/g, "<br>")}</p>
        <button onclick="next()">Sẵn sàng 💕</button>
        <button class="secondary" onclick="notReady()">Chưa sẵn sàng</button>
      </div>
    `;
  }

  if (s.type === "story") {
    html = renderStory(s);
  }

  if (s.type === "end") {
    html = `
      <div class="center">
        <img src="${s.image}">
        <h1>${s.text.replace(/\n/g, "<br>")}</h1>
      </div>
    `;
  }

  app.innerHTML = html;
}

function renderStory(s) {
  const text = `<p>${s.text.replace(/\n/g, "<br>")}</p>`;
  const img = s.image ? `<img src="${s.image}">` : "";

  switch (s.layout) {
    case "image-top":
      return img + text + `<button onclick="next()">Tiếp tục</button>`+ backButton();
    case "image-bottom":
      return text + img + `<button onclick="next()">Tiếp tục</button>` + backButton();
    case "text-only":
      return `<div class="center">${text}<button onclick="next()">Tiếp tục</button></div>` + backButton();
    case "split":
      return `<div class="split center">${img}${text}<button onclick="next()">Tiếp tục</button></div>`+ backButton();
    case "overlay":
      return `
        <div class="overlay overlay-soft">
          ${img}
          <div class="text">${text}</div>
        </div>
        <button onclick="next()">Tiếp tục</button> 
      ` + backButton();
  }
}

/******************************************************************/
// Cập nhật nút back từng SCENE

function backButton() {
  if (index === 0) return "";
  return `<button class="secondary" onclick="back()">Quay lại</button>`;
}

/******************************************************************/


function next() {
  // Bật nhạc khi có tương tác đầu tiên
  if (bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {});
    console.log("bật nhạc")
  }

  if (index < SCENES.length - 1) {
    index++;
    render();
  }
}

function back() {
  if (index > 0) {
    index--;
    render();
  }
}


function notReady() {
  app.innerHTML = `
    <div class="center">
      <h1>Không sao cả 😊</h1>
      <p>Khi nào em sẵn sàng thì quay lại nhé.<br></p>
    </div>
  `;
}

render();
