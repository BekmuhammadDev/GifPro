let submitBtn = document.getElementById('submit-btn');

let generateGif= () =>{
let loader = document.querySelector('.loader');
loader.computedStyleMap.display="block";
document.querySelector(".wrapper").style.display = "none"

let q = document.getElementById("search-box").value;
let gifCount = 30;
let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
document.querySelector(".wrapper").innerHTML = "";

fetch(finalURL)
.then((res)=> res.json())
.then((data) => {
    console.log(data);
    
    let gifsData = data;
    gifsData.data.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src",gif.images.downsized_medium.url);
        iframe.onload = () =>{
            gifCount--;
            if(gifCount == 0){
                loader.style.display="none";
                document.querySelector(".wrapper").style.display = "grid"
            }
        };
        container.append(iframe);
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
            let copyLink = `https://mediaa4.giphy.com/media/${gif.id}/giphy.mp4`

            navigator.clipboard.writeText(copyLink).then(()=>{
                alert("Link Copied to Clipboard")
            })
            .catch(()=>{
                alert("Failed to Copy Link to Clipboard");

                let hiddenInput = document.createElement("input");
                hiddenInput.setAttribute("type", "text");
                document.body.appendChild(hiddenInput);
                hiddenInput.value = copyLink;

                hiddenInput.select();
                document.execCommand("copy");
                document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
        
    })
}
)
}

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load",generateGif

)