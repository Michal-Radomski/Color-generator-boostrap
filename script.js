// Initial welcome script
let firstName = ""; //Ask for a name; for testing firstname="Stranger"
while (firstName === "") {
  firstName = prompt("What's your name? ");
  if (firstName === "") {
    alert("Give me a name, please");
  }
}
if (firstName == null) {
  firstName = "Stranger";
}
// console.log(12, firstName);
let firstNameLower = firstName.toLowerCase();
// console.log(14, firstNameLower);
function firstNameCase(firstNameLower) {
  let arr = firstNameLower.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("");
    arr[i][0] = arr[i][0].toUpperCase();
    arr[i] = arr[i].join("");
  }
  return arr.join(" ");
}
firstNameUpperCase = firstNameCase(firstNameLower);
// console.log(25, firstNameUpperCase);
const welcome = document.querySelector("#Welcome");
welcome.innerHTML = `Hello ${firstNameUpperCase} on the Random Color Generator`;

//Adding random BGC for #Welcome message and H1 title + p.link message
let colors = randomColor({ count: 3, luminosity: "light", alpha: 0.8 });
console.log(31, colors);
document.querySelector("#Welcome").style.backgroundColor = colors[0];
document.querySelector(
  "h1>div"
).style.textShadow = `0px 0px 35px ${colors[1]}, 0px 0px 35px ${colors[1]},
0px 0px 35px ${colors[1]}, 0px 0px 35px ${colors[1]}`;
document.querySelector(
  ".link>span"
).style.textShadow = `0px 0px 35px ${colors[2]}, 0px 0px 35px ${colors[2]},
0px 0px 35px ${colors[2]}, 0px 0px 35px ${colors[2]}`;

// Generate random color
function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0);
  // console.log(47, randomColor);
  randomColor = "#" + randomColor;
  console.log(49, randomColor.length, typeof randomColor, randomColor);
  return randomColor;
}

// Attending upon first divLevel2 + HEX to RGB converter + RGB to HSL converter [alghoritm]
function colorFirstDiv() {
  const colorForDiv = generateRandomColor();
  console.log(56, colorForDiv);
  // Setting BGC for third divLevel2 - for changing it
  const colorToChange = document.querySelector("#colorToChange");
  colorToChange.style.backgroundColor = colorForDiv;
  // Changing first divLevel2 - below
  const generatedBGC = document.querySelector("#generatedBGC");
  generatedBGC.style.backgroundColor = colorForDiv;
  const HEXvalue = document.querySelector("#HEXvalue");
  HEXvalue.innerHTML = `HEX Value: <span>${colorForDiv}</span>`;
  //HEX to RGB converter
  let red = parseInt(colorForDiv.substring(1, 3), 16);
  let green = parseInt(colorForDiv.substring(3, 5), 16);
  let blue = parseInt(colorForDiv.substring(5, 7), 16);
  console.log(69, red, green, blue);
  RGBvalue.innerHTML = `RGB Values: <span>${red} ${green} ${blue}</span>`;
  //RGB to HSL converter
  let r = red / 255;
  let g = green / 255;
  let b = blue / 255;
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  // console.log(81, r, b, g);
  // console.log(82, cmin, cmax, delta);
  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  // console.log(93, h);
  if (h < 0) {
    h = h + 360;
  }
  // console.log(97, h);
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  l = (l * 100).toFixed(1);
  s = +(s * 100).toFixed(1);
  console.log(102, `HSL: ${h}°, ${s}%, ${l}%`);
  HSLvalue = document.querySelector("#HSLvalue");
  HSLvalue.innerHTML = `HSL Values: <span>${h}°, ${s}%, ${l}%</span>`;
  findColorHTML();
}

//Finding neares color with HTML name
function findColorHTML() {
  let colorToChange = HEXvalue.innerHTML.substring(18, 24);
  console.log(111, colorToChange);
  fetch(`https://www.thecolorapi.com/id?hex=${colorToChange}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(117, data.hex.value.toLowerCase());
      colorSecondDiv(data);
      setTimeout(function () {
        colorSecondDiv;
      }, 100);
      return data;
    });
}

// Attending upon second divLevel2 + converting colors using functions
const colorSecondDiv = (data) => {
  setTimeout(function () {
    const fetchedColor = data;
    console.log(130, fetchedColor.hex.value.toLowerCase());
    const fetched = document.querySelector(".fetched>span");
    fetched.innerHTML = `${fetchedColor.name.value}`;
    const fetchedBGC = document.querySelector("#fetchedBGC");
    fetchedBGC.style.backgroundColor = fetchedColor.name.closest_named_hex;
    const toHide = document.querySelectorAll(".hide");
    console.log(136, toHide);
    toHide.forEach((item) => (item.style.visibility = "hidden"));
    const HEXvalue2 = document.querySelector("#HEXvalue2");
    HEXvalue2.innerHTML = `HEX Value: <span>${fetchedColor.name.closest_named_hex.toLowerCase()}</span>`;
    //converting color spaces
    let colorConvert = `${fetchedColor.name.closest_named_hex}`.toLowerCase();
    console.log(142, "colorToConvert:", colorConvert, typeof colorConvert);
    const arrayRGB = hexToRGB(colorConvert);
    console.log(144, "arrayRGB:", arrayRGB);
    RGBvalue2 = document.querySelector("#RGBvalue2");
    RGBvalue2.innerHTML = `RGB Values: <span>${arrayRGB[0]} ${arrayRGB[1]} ${arrayRGB[2]}</span>`;
    const arrayHSL = hexToHsl(colorConvert);
    console.log(148, arrayHSL);
    HSLvalue2 = document.querySelector("#HSLvalue2");
    HSLvalue2.innerHTML = `HSL Values: <span>${arrayHSL[0]}°, ${arrayHSL[1]}%, ${arrayHSL[2]}%</span>`;
  }, 100);
  countingDistance();
  setTimeout(function () {
    setSliders();
    putDescription();
  }, 250);
  setTimeout(function () {
    slidersValue();
    grayScaleConvert();
  }, 300);
  setTimeout(function () {
    setSlidersHSL();
    leftRightCharts();
    RGBtoCMYK();
  }, 320);
};

//Function HEX to RGB
function hexToRGB(hex) {
  let red = parseInt(hex.substring(1, 3), 16);
  let green = parseInt(hex.substring(3, 5), 16);
  let blue = parseInt(hex.substring(5, 7), 16);
  console.log(173, "RGB colors:", red, green, blue);
  return [red, green, blue];
}

//Function HEX to HSL
function hexToHsl(hex) {
  //HEX to RGB first
  let red = parseInt(hex.substring(1, 3), 16);
  let green = parseInt(hex.substring(3, 5), 16);
  let blue = parseInt(hex.substring(5, 7), 16);
  console.log(183, "RGB colors:", red, green, blue);
  //RGB to HSL
  let r = red / 255;
  let g = green / 255;
  let b = blue / 255;
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  // console.log(194, r, b, g);
  // console.log(195, cmin, cmax, delta);
  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  // console.log(206, h);
  if (h < 0) {
    h = h + 360;
  }
  // console.log(210, h);
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  l = (l * 100).toFixed(1);
  s = +(s * 100).toFixed(1);
  console.log(215, "HSL colors:", h, s, l);
  return [h, s, l];
}

//Counting the distance bewtween colors (RGB)
function countingDistance() {
  setTimeout(function () {
    let color1 = document.querySelector("#RGBvalue> span").innerHTML.split(" ");
    let color2 = document.querySelector("#RGBvalue2>span").innerHTML.split(" ");
    color1 = color1.map((elem) => (elem = parseInt(elem)));
    color2 = color2.map((elem) => (elem = parseInt(elem)));
    console.log(226, color1, color2);
    let distance = Math.sqrt(
      (color2[0] - color1[0]) ** 2 +
        (color2[1] - color1[1]) ** 2 +
        (color2[2] - color1[2]) ** 2
    ).toFixed(1);
    // console.log(232, "distance:", distance);
    let putDistance = document.querySelector("p.fetched>span").innerHTML;
    // console.log(234, putDistance);
    putDistance = putDistance.concat(" [", distance, "]");
    console.log(236, putDistance);
    document.querySelector("p.fetched>span").innerHTML = putDistance;
  }, 150);
}

// Attending upon third divLevel2
// Setting up the sliders
function setSliders() {
  let colorToChange =
    document.querySelector("#colorToChange").style.backgroundColor;
  // console.log(246, colorToChange, typeof colorToChange);
  colorToChange = colorToChange
    .substring(4, colorToChange.length - 1)
    .split(", ");
  // console.log(250, colorToChange);
  colorToChange = colorToChange.map((elem) => (elem = parseInt(elem)));
  console.log(252, colorToChange);
  const rangeRed = document.querySelector("#rangeRed");
  const rangeGreen = document.querySelector("#rangeGreen");
  const rangeBlue = document.querySelector("#rangeBlue");
  rangeRed.value = colorToChange[0];
  rangeGreen.value = colorToChange[1];
  rangeBlue.value = colorToChange[2];
  console.log(
    260,
    "Sliders were set to:",
    rangeRed.value,
    rangeGreen.value,
    rangeBlue.value
  );
}
// Setting up the sliders for initial value=0
function initialValues() {
  document.querySelector("#rangeRed").value = 0;
  document.querySelector("#rangeGreen").value = 0;
  document.querySelector("#rangeBlue").value = 0;
  document.querySelector("#rangeHue").value = 0;
  document.querySelector("#rangeSaturation").value = 0;
  document.querySelector("#rangeLightness").value = 0;
}
initialValues();
// Putting descriptons of color spaces to third divLevel2
function putDescription() {
  let descripton1 = document.querySelector("#HEXvalue").innerHTML;
  let descripton2 = document.querySelector("#RGBvalue").innerHTML;
  let descripton3 = document.querySelector("#HSLvalue").innerHTML;
  document.querySelector("#HEXvalue3").innerHTML = descripton1;
  document.querySelector("#RGBvalue3").innerHTML = descripton2;
  document.querySelector("#HSLvalue3").innerHTML = descripton3;
}
// Changing the color Live
function changeColorBySlider() {
  let changeRed = document.querySelector("#rangeRed").value;
  let changeGreen = document.querySelector("#rangeGreen").value;
  let changeBlue = document.querySelector("#rangeBlue").value;
  let colorDiv3 =
    "rgb(" + changeRed + "," + changeGreen + "," + changeBlue + ")";
  // console.log(293, colorDiv3, typeof colorDiv3);
  document.querySelector("#colorToChange").style.backgroundColor = colorDiv3;
  RGBvalue3 = document.querySelector("#RGBvalue3");
  RGBvalue3.innerHTML = `RGB Values: <span>${changeRed} ${changeGreen} ${changeBlue}</span>`;
}
// Converting RGB to HEX Live
function RGBtoHEX() {
  let Red = parseInt(document.querySelector("#rangeRed").value).toString(16);
  let Green = parseInt(document.querySelector("#rangeGreen").value).toString(
    16
  );
  let Blue = parseInt(document.querySelector("#rangeBlue").value).toString(16);
  Red = Red.padStart(2, 0);
  Green = Green.padStart(2, 0);
  Blue = Blue.padStart(2, 0);
  console.log(308, Red, Green, Blue);
  document.querySelector("#HEXvalue3").innerHTML = `HEX Value: <span>#${
    Red + Green + Blue
  }</span>`;
}
// Converting HEX to HSL Live
function liveHEXtoHSL() {
  hex = document.querySelector("#HEXvalue3>span").innerHTML;
  console.log(316, hex, typeof hex);
  const arrayHSL = hexToHsl(hex);
  console.log(318, arrayHSL);
  HSLvalue3 = document.querySelector("#HSLvalue3");
  HSLvalue3.innerHTML = `HSL Values: <span>${arrayHSL[0]}°, ${arrayHSL[1]}%, ${arrayHSL[2]}%</span>`;
}
// Displaying slider's value into label > span
function slidersValue() {
  document.querySelector("#redValue").innerHTML =
    document.querySelector("#rangeRed").value;
  document.querySelector("#greenValue").innerHTML =
    document.querySelector("#rangeGreen").value;
  document.querySelector("#blueValue").innerHTML =
    document.querySelector("#rangeBlue").value;
}

// Attending upon fourth divLevel2
// Converting to the grayscale
function grayScaleConvert() {
  let red = document.querySelector("#rangeRed").value;
  let green = document.querySelector("#rangeGreen").value;
  let blue = document.querySelector("#rangeBlue").value;
  let grayColor = (red / 3 + green / 3 + blue / 3).toFixed(1);
  console.log(339, red, green, blue, grayColor);
  let grayScaleBGC = document.querySelector("#grayScaleBGC");
  grayScaleBGC.style.backgroundColor =
    "rgb(" + grayColor + "," + grayColor + "," + grayColor + ")";
}
// Displaying info about BGC of the fourth divLevel2
function infoFor4DivGray() {
  let grayScaleBGC =
    document.querySelector("#grayScaleBGC").style.backgroundColor;
  // console.log(348, grayScaleBGC);
  grayScaleBGC = grayScaleBGC.substring(4, grayScaleBGC.length - 1).split(", ");
  grayScaleBGC = grayScaleBGC.map((elem) => (elem = parseInt(elem)));
  console.log(351, grayScaleBGC);
  GrayValue = document.querySelector("#GrayValue");
  GrayValue.innerHTML = `RGB Values: <span>${grayScaleBGC[0]} ${grayScaleBGC[1]} ${grayScaleBGC[2]}</span>`;
  return grayScaleBGC;
}
// Setting  up Live conversion to HEX and HSL (disabled, setSlidersHSL() - enabled)
function infoFor4DivHexHSL() {
  const grayScaleBGC = infoFor4DivGray();
  console.log(359, grayScaleBGC);
  // RGB to HEX conversion
  let Red = grayScaleBGC[0].toString(16);
  let Green = grayScaleBGC[1].toString(16);
  let Blue = grayScaleBGC[2].toString(16);
  Red = Red.padStart(2, 0);
  Green = Green.padStart(2, 0);
  Blue = Blue.padStart(2, 0);
  console.log(367, Red, Green, Blue);
  document.querySelector("#HEXvalue4").innerHTML = `HEX Value: <span>#${
    Red + Green + Blue
  }</span>`;
  // HEX to HSL conversion
  hex = "#" + Red + Green + Blue;
  console.log(373, hex, typeof hex);
  const arrayHSL = hexToHsl(hex);
  console.log(375, arrayHSL);
  HSLvalue4 = document.querySelector("#HSLvalue4");
  HSLvalue4.innerHTML = `HSL Values: <span>${arrayHSL[0]}°, ${arrayHSL[1]}%, ${arrayHSL[2]}%</span>`;
  return arrayHSL;
}

// Setting up the HSL sliders
function setSlidersHSL() {
  const arrayHSL = infoFor4DivHexHSL();
  console.log(384, arrayHSL);
  document.querySelector("#rangeHue").value = arrayHSL[0];
  document.querySelector("#hueValue").innerHTML = arrayHSL[0] + "°";
  document.querySelector("#rangeSaturation").value = arrayHSL[1];
  document.querySelector("#saturationValue").innerHTML = arrayHSL[1] + "%";
  document.querySelector("#rangeLightness").value = arrayHSL[2];
  document.querySelector("#lightnessValue").innerHTML = arrayHSL[2] + "%";
}

// Adding AddEventLister - change your color by RGB sliders
const rangeSlidersRGB = document.querySelectorAll(
  ".colorsRange>input[type=range]"
);
// console.log(397, rangeSlidersRGB);
rangeSlidersRGB.forEach((input) =>
  input.addEventListener("input", () => {
    changeColorBySlider();
    RGBtoHEX();
    liveHEXtoHSL();
    slidersValue();
    grayScaleConvert();
    setSlidersHSL();
    leftRightCharts();
    RGBtoCMYK();
  })
);

// Changing the Grayscale live by HSL sliders and printing Live HSL values
function slidersForHSL() {
  const div4GBC = document.querySelector("#grayScaleBGC");
  const rangeHue = document.querySelector("#rangeHue").value;
  const rangeSaturation = document.querySelector("#rangeSaturation").value;
  const rangeLightness = document.querySelector("#rangeLightness").value;
  console.log(417, rangeHue, rangeSaturation, rangeLightness);
  div4GBC.style.backgroundColor =
    "hsl(" + rangeHue + "," + rangeSaturation + "% ," + rangeLightness + "%)";
  document.querySelector("#hueValue").innerHTML = rangeHue + "°";
  document.querySelector("#saturationValue").innerHTML = rangeSaturation + "%";
  document.querySelector("#lightnessValue").innerHTML = rangeLightness + "%";
  // Live HSL values
  const HSLvalue4 = document.querySelector("#HSLvalue4");
  HSLvalue4.innerHTML = `HSL Values: <span>${rangeHue}°, ${rangeSaturation}%, ${rangeLightness}%</span>`;
}

// Displaying Live RGB + HEX values
function liveRGBandHEXvalues() {
  let div4GBC = document.querySelector("#grayScaleBGC").style.backgroundColor;
  console.log(431, div4GBC, typeof div4GBC);
  div4GBC = div4GBC.substring(4, div4GBC.length - 1).split(", ");
  console.log(433, div4GBC);
  div4GBC = div4GBC.map((elem) => (elem = parseInt(elem)));
  console.log(435, div4GBC);
  document.querySelector(
    "#GrayValue"
  ).innerHTML = `RGB Values: <span>${div4GBC[0]} ${div4GBC[1]} ${div4GBC[2]}</span>`;
  // RGB to HEX conversion
  let Red = div4GBC[0].toString(16);
  let Green = div4GBC[1].toString(16);
  let Blue = div4GBC[2].toString(16);
  Red = Red.padStart(2, 0);
  Green = Green.padStart(2, 0);
  Blue = Blue.padStart(2, 0);
  console.log(446, Red, Green, Blue);
  document.querySelector("#HEXvalue4").innerHTML = `HEX Value: <span>#${
    Red + Green + Blue
  }</span>`;
}

// Adding AddEventLister - change grayscale BGC by HSL sliders
const rangeSlidersHSL = document.querySelectorAll(
  ".rangeHSL>input[type=range]"
);
// console.log(456, rangeSlidersHSL);
rangeSlidersHSL.forEach((input) =>
  input.addEventListener("input", () => {
    slidersForHSL();
    liveRGBandHEXvalues();
    leftRightCharts();
    RGBtoCMYK();
  })
);

// RGB to CMYK conversion
function RGBtoCMYKconversion(RGBarray) {
  let red = RGBarray[0];
  let green = RGBarray[1];
  let blue = RGBarray[2];
  let black = 1 - Math.max(red, green, blue) / 255;
  let cyan = (1 - red / 255 - black) / (1 - black);
  let magenta = (1 - green / 255 - black) / (1 - black);
  let yellow = (1 - blue / 255 - black) / (1 - black);
  // console.log(475, cyan, magenta, yellow, black);
  cyan = Math.round(cyan * 100);
  magenta = Math.round(magenta * 100);
  yellow = Math.round(yellow * 100);
  black = Math.round(black * 100);
  // console.log(480, cyan + "%", magenta + "%", yellow + "%", black + "%");
  if (isNaN(cyan)) {
    cyan = 0;
  }
  if (isNaN(magenta)) {
    magenta = 0;
  }
  if (isNaN(yellow)) {
    yellow = 0;
  }
  return [cyan, magenta, yellow, black];
}
// RGB to CMYK conversion - third divLevel2
function RGBtoCMYKthirdDiv() {
  arrayRGB = [];
  colorsRGB = document.querySelector("#colorToChange").style.backgroundColor;
  // console.log(496, colorsRGB);
  colorsRGB = colorsRGB.substring(4, colorsRGB.length - 1).split(", ");
  arrayRGB = colorsRGB.map((elem) => parseInt(elem));
  // console.log(499, colorsRGB);
  arrayCMYK = RGBtoCMYKconversion(arrayRGB);
  console.log(501, "arrayCMYK - 3.div:", arrayCMYK);
  document.querySelector(
    "#CMYKvalue3"
  ).innerHTML = `CMYK Values: <span>${arrayCMYK[0]}% ${arrayCMYK[1]}% ${arrayCMYK[2]}% ${arrayCMYK[3]}%</span>`;
}
// RGB to CMYK conversion - fourth divLevel2
function RGBtoCMYKfourthDiv() {
  arrayRGB = [];
  colorsRGB = document.querySelector("#grayScaleBGC").style.backgroundColor;
  // console.log(510, colorsRGB);
  colorsRGB = colorsRGB.substring(4, colorsRGB.length - 1).split(", ");
  arrayRGB = colorsRGB.map((elem) => parseInt(elem));
  // console.log(513, colorsRGB);
  arrayCMYK = RGBtoCMYKconversion(arrayRGB);
  console.log(515, "arrayCMYK - 4.div:", arrayCMYK);
  document.querySelector(
    "#CMYKvalue4"
  ).innerHTML = `CMYK Values: <span>${arrayCMYK[0]}% ${arrayCMYK[1]}% ${arrayCMYK[2]}% ${arrayCMYK[3]}%</span>`;
}
// RGB to CMYK conversion - connecting functins into one function
function RGBtoCMYK() {
  RGBtoCMYKthirdDiv();
  RGBtoCMYKfourthDiv();
}

// Function to animate the progress bar
function animateBar() {
  let i = 0;
  document.querySelector(".progress-bar").innerHTML = i + "%";
  let animation = setInterval(function () {
    i = i + 1;
    if (i <= 100) {
      document.querySelector(".progress-bar").style.width = i + "%";
      document.querySelector(".progress-bar").innerHTML = i + "%";
    } else {
      clearInterval(animation);
    }
  }, 20);
}
// Function opening and closig modal (from Bootstrap material)
function openCloseModal() {
  console.log(542, "Modal was fired");
  $("#ModalInfo").modal("show");
  setTimeout(function () {
    animateBar();
  }, 100);
  setTimeout(function () {
    $("#ModalInfo").modal("hide");
  }, 2300);
}

// Setting backgroundColor
function setColorRBG() {
  const colorRBG =
    document.querySelector("#colorToChange").style.backgroundColor;
  document.body.style.background = colorRBG;
  console.log(557, "BGC was set to:", colorRBG);
}
function setColorHSL() {
  const colorHSL =
    document.querySelector("#grayScaleBGC").style.backgroundColor;
  document.body.style.background = colorHSL;
  console.log(563, "BGC was set to:", colorHSL);
}

// Enable tooltips (Bootstrap Material script)
function enableTooltip() {
  console.log(568, "Tooltips were enabled");
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}
enableTooltip();

//Bootstrap Material Charts - Left
function leftRightCharts() {
  {
    console.log(578, "Charts were printed");
    arrayRGB = [];
    arrayRGB[0] = document.querySelector("#rangeRed").value;
    arrayRGB[1] = document.querySelector("#rangeGreen").value;
    arrayRGB[2] = document.querySelector("#rangeBlue").value;
    arrayRGB = arrayRGB.map((elem) => parseInt(elem));
    // console.log(584, arrayRGB);
    //1L bar left RGB
    let ctxB = document.getElementById("barChart").getContext("2d");
    let myBarChart = new Chart(ctxB, {
      type: "bar",
      data: {
        labels: ["Red", "Green", "Blue"],
        datasets: [
          {
            label: "",
            data: [arrayRGB[0], arrayRGB[1], arrayRGB[2]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(54, 162, 235, 0.4)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        events: ["onHover", null],
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 255,
              },
            },
          ],
        },
      },
    });
  }
  // 2L Chart with labels
  {
    let ctxP = document.getElementById("labelChart").getContext("2d");
    let myPieChart = new Chart(ctxP, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: ["Red", "Green", "Blue"],
        datasets: [
          {
            data: [arrayRGB[0], arrayRGB[1], arrayRGB[2]],
            backgroundColor: ["#F7464A", "#46BFBD", "rgba(66, 133, 244, 1.0)"],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "rgba(66, 133, 244, 0.8)",
            ],
          },
        ],
      },
      options: {
        animation: { duration: 0 },
        events: ["onHover", null],
        responsive: true,
        legend: {
          position: "right",
          labels: {
            padding: 20,
            boxWidth: 10,
          },
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += data;
              });
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              if (sum == 0 && value == 0) {
                percentage = 0;
              }
              return percentage;
            },
            color: "white",
            labels: {
              title: {
                font: {
                  size: "16",
                },
              },
            },
          },
        },
      },
    });
  }
  // 3L CMYK - colorful chart
  {
    let colorsRGB =
      document.querySelector("#colorToChange").style.backgroundColor;
    // console.log(689, colorsRGB);
    colorsRGB = colorsRGB.substring(4, colorsRGB.length - 1).split(", ");
    arrayRGB = colorsRGB.map((elem) => parseInt(elem));
    // console.log(692, arrayRGB);
    arrayCMYKleft = RGBtoCMYKconversion(arrayRGB);
    console.log(694, arrayCMYKleft);
    let ctxB2 = document.getElementById("barCMYKcolor").getContext("2d");
    let myBarChart2 = new Chart(ctxB2, {
      type: "bar",
      data: {
        labels: ["Cyan", "Magenta", "Yellow", "Black"],
        datasets: [
          {
            label: "",
            data: [
              arrayCMYKleft[0],
              arrayCMYKleft[1],
              arrayCMYKleft[2],
              arrayCMYKleft[3],
            ],
            backgroundColor: [
              "rgba(0,255,255, 0.4)",
              "rgba(255,0,255, 0.4)",
              "rgba(255,255,0, 0.4)",
              "rgba(0, 0, 0, 0.4)",
            ],
            borderColor: [
              "rgba(0,255,255, 1)",
              "rgba(255,0,255, 1)",
              "rgba(255,255,0, 1)",
              "rgba(0, 0, 0, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        events: ["onHover", null],
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },
    });
  }
  // Bootstrap Material Charts - Right
  {
    arrayHSL = [];
    arrayHSL[0] = document.querySelector("#rangeHue").value;
    arrayHSL[1] = document.querySelector("#rangeSaturation").value;
    arrayHSL[2] = document.querySelector("#rangeLightness").value;
    arrayHSL = arrayHSL.map((elem) => parseInt(elem));
    // console.log(750, arrayHSL);
    // 1R Doughnut Chart
    let ctxD = document.getElementById("doughnutChart").getContext("2d");
    let gradient = ctxD.createLinearGradient(50, 55, 55, 200);
    gradient.addColorStop(0, "red"); // 0deg
    gradient.addColorStop(1 / 6, "yellow"); //  60deg
    gradient.addColorStop(1 / 3, "green"); //  120deg
    gradient.addColorStop(1 / 2, "blue"); //  180deg
    gradient.addColorStop(2 / 3, "#6600FF"); //  240deg
    gradient.addColorStop(5 / 6, "#FF00DC"); //  300deg
    gradient.addColorStop(1, "red"); // 360deg
    let myLineChart = new Chart(ctxD, {
      type: "doughnut",
      data: {
        labels: ["Hue", "360° color wheel"],
        datasets: [
          {
            data: [arrayHSL[0], 360 - arrayHSL[0]],
            backgroundColor: [gradient, "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#A8B3C5"],
          },
        ],
      },
      options: {
        animation: { duration: 0 },
        events: ["onHover", null],
        responsive: true,
      },
    });
  }
  // 2R Horizontal Bar Chart
  {
    let ctxH = document.getElementById("horizontalBar").getContext("2d");
    let myHorizontalChart = new Chart(ctxH, {
      type: "horizontalBar",
      data: {
        labels: ["Saturation [%]", "Lightness [%]"],
        datasets: [
          {
            label: "",
            data: [arrayHSL[1], arrayHSL[2]],
            fill: false,
            backgroundColor: [
              "rgba(153, 102, 255, 0.4)",
              "rgba(255, 159, 64, 0.4)",
            ],
            borderColor: ["rgb(153, 102, 255)", "rgb(255, 159, 64)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        events: ["onHover", null],
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },
    });
  }
  // 3R CMYK - colorful chart
  {
    let colorsRGB =
      document.querySelector("#grayScaleBGC").style.backgroundColor;
    // console.log(823, colorsRGB);
    colorsRGB = colorsRGB.substring(4, colorsRGB.length - 1).split(", ");
    arrayRGB = colorsRGB.map((elem) => parseInt(elem));
    // console.log(826, arrayRGB);
    arrayCMYKright = RGBtoCMYKconversion(arrayRGB);
    console.log(828, arrayCMYKright);
    let ctxB3 = document.getElementById("barCMYKgray").getContext("2d");
    let myBarChart3 = new Chart(ctxB3, {
      type: "bar",
      data: {
        labels: ["Cyan", "Magenta", "Yellow", "Black"],
        datasets: [
          {
            label: "",
            data: [
              arrayCMYKright[0],
              arrayCMYKright[1],
              arrayCMYKright[2],
              arrayCMYKright[3],
            ],
            backgroundColor: [
              "rgba(0,255,255, 0.4)",
              "rgba(255,0,255, 0.4)",
              "rgba(255,255,0, 0.4)",
              "rgba(0, 0, 0, 0.4)",
            ],
            borderColor: [
              "rgba(0,255,255, 1)",
              "rgba(255,0,255, 1)",
              "rgba(255,255,0, 1)",
              "rgba(0, 0, 0, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        events: ["onHover", null],
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },
    });
  }
}
