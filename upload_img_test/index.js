console.log(window.location.href);

const upload = document.querySelector("#myFile");
const image = document.querySelector(".image");

upload.onchange = () => {
  console.log(upload.files[0]);
  const file = upload.files[0];

  const blob = new Blob([file], { type: "image/jpg" });
  console.log(blob);
  const url = window.URL.createObjectURL(blob);
  console.log(url);
  image.src = url;
};
