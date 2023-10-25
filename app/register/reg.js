"use client";

import React from 'react'
import "./reg.css"
import { useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


function AvatarInput() {
  const [originalImg, setOriginalImg] = useState('')
  const [AvatarImgBase64, setAvatarImgBase64] = useState('')
  function getFilds() {
      const filedom = document.getElementById('file');
      filedom.click()
  }
  function imgGet(e) {
      const fileData = e.target.files[0]
      let reader = new FileReader();
      reader.onload = function (e) {
          let base64 = e.target.result;
          setOriginalImg(base64)
      }
      reader.readAsDataURL(fileData);
  }
  const cropperRef = React.createRef();
  const onCrop = () => {
      const cropper = cropperRef.current?.cropper;
      setAvatarImgBase64(cropper.getCroppedCanvas().toDataURL("image/png",0.3));
  };
  return (
      <div className='avatar-edit'>
          <div className='select-edit'>
              <button onClick={getFilds}>
                  上传文件
                  <input id='file' accept='image' type='file' onChange={imgGet} />
              </button>
              <div className='avatarEditor'>
                  <Cropper
                      src={originalImg}
                      style={{ height: "100%", width: "100%"}}
                      // Cropper.js options
                      crop={onCrop}
                      ref={cropperRef}
                      marginHeight={200}
                      marginWidth={200}
                      viewMode={2}
                      cropBoxResizable={false}
                      aspectRatio={1}
                  />
              </div>
          </div>
          <img className="cropper-show" src={AvatarImgBase64} />
      </div>
  )
}

export default function Reg_c() {
  const handleSubmit = event => {//避免表单提交后刷新页面
    event.preventDefault();
  };
  async function handleClick() {
    var formData = new FormData(freg)
    let response = await fetch("/api/register", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    switch (response.status) {
      case 200:
        alert("200注册成功");
        break;
      case 601:
        alert("601用户名重复");
        break;
      case 602:
        alert("602邮箱重复");
        break;
      default:
        alert("未知错误");
    }
  }

  return (
    <main className="lr">
      <div className='reg-pannel'>
        <form id="freg" onSubmit={handleSubmit}>
          <div className='title'>注册</div>
          <label className='input-bar'><input name="username" id="username" placeholder="用户名" autoComplete="username" required autoFocus /></label>
          <label className='input-bar'><input name="email" id="email" placeholder="邮箱" autoComplete="email" required /></label>
          <label className='input-bar'><input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
          <button onClick={handleClick}>登录</button>
        </form>
        <AvatarInput/>
      </div>
    </main>
  )
}