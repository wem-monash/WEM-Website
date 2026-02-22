const url = "../assets/pdf/WEMguide25.pdf";

let pdfDoc = null;
let pageNum = 1;
let isRendering = false;

const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

pdfjsLib.getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf;
    renderPage(pageNum);
});

function renderPage(num) {
    isRendering = true;

    pdfDoc.getPage(num).then((page) => {
    let scale = 1.3;

    // Make ONLY the cover page and last page slightly smaller
    if (num === 1 || num === 37) {
        scale = 1.0;
}

const viewport = page.getViewport({ scale });

canvas.width = viewport.width;
canvas.height = viewport.height;

page.render({
    canvasContext: ctx,
    viewport
    }).promise.then(() => {
        isRendering = false;
        });
    });
}


document.getElementById("next").addEventListener("click", () => {
    if (pageNum < pdfDoc.numPages && !isRendering) {
        pageNum++;
        renderPage(pageNum);
    }
});

document.getElementById("prev").addEventListener("click", () => {
    if (pageNum > 1 && !isRendering) {
        pageNum--;
        renderPage(pageNum);
    }
});