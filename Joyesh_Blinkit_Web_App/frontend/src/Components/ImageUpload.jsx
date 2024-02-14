import { useState } from "react"

export function ImageUpload() {
const [file, setFile] = useState(null);  // initially no file

function fileChangeHandler(e) {
// sets the state var to the input
setFile(e.target.files[0]); //* returns sort-of array of all selected images, and we pick 1st (0th)
}

async function submitHandler() {
// sends fetch POST req with image data to "/uploadImage"
// sending data as FormData 
const formData = new FormData();
formData.append("image", file)   //! in upload.single("image")? This is that "image" 

const token = localStorage.getItem("jwtAuthToken");
alert("Image uploaded!")
const response = await fetch("http://localhost:3000/uploadImage", {
    method : "POST", 
    body : formData
});
const final = await response.json();
console.log(final); 
}
    return (
        <div style={{
            display : "flex",
            flexDirection : "column",
            backgroundColor : "rgb(247, 236, 219)",
            width : "30vw",
            height : "30vw",
            justifyContent : "center",
            alignItems : "center",
            borderRadius : "20px",
            fontFamily : "sans-serif",
            
        }}>
            <div style={{
                marginBottom : "20px"
            }}><h2>Upload image here:</h2></div>
            <input type="file" onChange={fileChangeHandler}/>
            <button onClick={submitHandler}>Upload</button> 
        </div>
    )
}