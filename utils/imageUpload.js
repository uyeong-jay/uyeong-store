//Image upload on cloud
export const imageUpload = async (images) => {
  // console.log(images); // [ 0: {name: "", ...}, ... ] (유사배열 객체)

  let imgArr = [];

  for (const item of images) {
    const formData = new FormData(); //form객체 생성

    //form에 append로 key와 value(문자열) 추가
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);

    //form(body)을 fetch한 후 응답(res) 받아오기
    const res = await fetch(process.env.CLOUD_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json(); //json() 으로 내 데이터 받아오기
    //(fetch대신 axios를 쓸경우 json() 생략 가능)

    //원하는 데이터 배열에 담기
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
