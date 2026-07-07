let CurrentBrushColor = "black"
let CurrentBrushWidth = 10
let IsPenActive = false

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const colorSwatches = document.querySelectorAll(".color")
const reset = document.querySelector("#ResetBtn")

let pen = document.querySelector("#PenBtn")
pen.addEventListener("click", ()=>{
    CurrentBrushColor = "black"
    CurrentBrushWidth = 10
    IsPenActive = true
})

colorSwatches.forEach((swatch)=>{
    swatch.addEventListener("click", (colorname)=>{
        let currentColor = swatch.getAttribute("data-color")
        CurrentBrushColor = currentColor
        CurrentBrushWidth = 30
        IsPenActive = true
    })
})

let painting = false

function StartPosition(e) {
    if (!IsPenActive) return;
    painting = true
    draw(e)
}
function FinishPosition() {
    painting = false
    ctx.beginPath()
}
function draw(e) {
    if (!painting || !IsPenActive) return;
    
    ctx.lineWidth = CurrentBrushWidth
    ctx.strokeStyle = CurrentBrushColor
    ctx.lineCap = "round"

    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
}
reset.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

canvas.addEventListener("mousedown", StartPosition)
canvas.addEventListener("mouseup", FinishPosition)
canvas.addEventListener("mousemove", draw)

